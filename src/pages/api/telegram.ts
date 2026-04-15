import type { NextApiRequest, NextApiResponse } from "next";

interface TelegramMessage {
  message_id: number;
  from: {
    id: number;
    is_bot: boolean;
    first_name: string;
    username?: string;
  };
  chat: {
    id: number;
    type: string;
  };
  date: number;
  text?: string;
}

interface TelegramUpdate {
  update_id: number;
  message?: TelegramMessage;
}

interface DBDeparture {
  tripId: string;
  stop: {
    id: string;
    name: string;
  };
  when: string | null;
  plannedWhen: string;
  delay: number | null;
  platform: string | null;
  plannedPlatform: string | null;
  direction: string;
  line: {
    name: string;
    product: string;
    mode: string;
  };
}

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const DB_API_BASE = "https://v6.db.transport.rest";

async function sendTelegramMessage(chatId: number, text: string): Promise<void> {
  if (!TELEGRAM_BOT_TOKEN) {
    throw new Error("TELEGRAM_BOT_TOKEN not configured");
  }

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
    }),
  });
}

async function getBerlinHbfDepartures(): Promise<string> {
  try {
    const now = new Date();
    const twoHoursLater = new Date(now.getTime() + 2 * 60 * 60 * 1000);
    
    const url = `${DB_API_BASE}/stops/8011160/departures?duration=120&results=100`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`DB API error: ${response.status}`);
    }
    
    const data = await response.json();
    const departures = data.departures as DBDeparture[];
    
    const trainDepartures = departures.filter((dep: DBDeparture) => {
      const product = dep.line?.product?.toLowerCase() || "";
      return product.includes("national") || 
             product.includes("regional") || 
             dep.line?.mode === "train";
    });
    
    if (trainDepartures.length === 0) {
      return "Keine Züge in den nächsten 2 Stunden gefunden.";
    }
    
    let message = "<b>🚂 Berlin Hauptbahnhof - Nächste 2 Stunden</b>\n\n";
    
    trainDepartures.slice(0, 20).forEach((dep: DBDeparture) => {
      const plannedTime = new Date(dep.plannedWhen);
      const actualTime = dep.when ? new Date(dep.when) : plannedTime;
      const delay = dep.delay || 0;
      
      const timeStr = actualTime.toLocaleTimeString("de-DE", {
        hour: "2-digit",
        minute: "2-digit",
      });
      
      const delayStr = delay > 0 
        ? ` <b>+${delay} Min</b>` 
        : delay < 0 
          ? ` <b>${delay} Min</b>`
          : "";
      
      const platform = dep.platform || dep.plannedPlatform || "?";
      const platformChange = dep.platform && dep.plannedPlatform && dep.platform !== dep.plannedPlatform
        ? " ⚠️"
        : "";
      
      message += `${timeStr}${delayStr} | Gleis ${platform}${platformChange}\n`;
      message += `<b>${dep.line.name}</b> → ${dep.direction}\n\n`;
    });
    
    return message;
    
  } catch (error) {
    console.error("Error fetching DB data:", error);
    return "❌ Fehler beim Abrufen der Zugdaten. Bitte später erneut versuchen.";
  }
}

async function handleCommand(command: string, chatId: number): Promise<void> {
  switch (command.toLowerCase()) {
    case "/start":
      await sendTelegramMessage(
        chatId,
        "Willkommen! 🚂\n\nVerfügbare Befehle:\n/hbf - Züge in Berlin Hauptbahnhof (nächste 2h)"
      );
      break;
      
    case "/hbf":
      const departures = await getBerlinHbfDepartures();
      await sendTelegramMessage(chatId, departures);
      break;
      
    default:
      await sendTelegramMessage(
        chatId,
        "Unbekannter Befehl. Nutze /hbf für Berlin Hauptbahnhof."
      );
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  
  if (!TELEGRAM_BOT_TOKEN) {
    res.status(500).json({ error: "Bot token not configured" });
    return;
  }
  
  try {
    const update = req.body as TelegramUpdate;
    
    if (update.message?.text) {
      const command = update.message.text.trim();
      const chatId = update.message.chat.id;
      
      await handleCommand(command, chatId);
    }
    
    res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Telegram webhook error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
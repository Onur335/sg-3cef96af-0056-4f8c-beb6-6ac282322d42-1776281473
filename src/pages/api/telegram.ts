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

interface BundesligaMatch {
  matchID: number;
  matchDateTime: string;
  team1: {
    teamName: string;
  };
  team2: {
    teamName: string;
  };
  location: {
    locationCity: string;
    locationStadium: string;
  };
}

interface CachedData {
  message: string;
  timestamp: number;
}

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const DB_API_BASE = "https://v6.db.transport.rest";
const CACHE_DURATION_MS = 5 * 60 * 1000;

let cachedDepartures: CachedData | null = null;
let cachedFootball: CachedData | null = null;

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
  // Cache prüfen
  const now = Date.now();
  if (cachedDepartures && (now - cachedDepartures.timestamp) < CACHE_DURATION_MS) {
    console.log("Returning cached data");
    return cachedDepartures.message + "\n\n<i>ℹ️ Daten werden alle 3 Minuten aktualisiert</i>";
  }

  try {
    const url = `${DB_API_BASE}/stops/8011160/departures?duration=120&results=100`;
    
    console.log("Fetching fresh data from DB API...");
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error("DB API HTTP error:", response.status);
      const errorText = await response.text();
      console.error("Error body:", errorText);
      
      // Falls Rate Limit: gecachte Daten zurückgeben (wenn vorhanden)
      if (response.status === 429 && cachedDepartures) {
        return cachedDepartures.message + "\n\n<i>⚠️ API-Limit erreicht - zeige letzte Daten</i>";
      }
      
      throw new Error(`DB API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.departures || !Array.isArray(data.departures)) {
      console.error("Invalid DB API response structure:", data);
      throw new Error("Invalid API response");
    }
    
    const departures = data.departures as DBDeparture[];
    
    const trainDepartures = departures.filter((dep: DBDeparture) => {
      if (!dep.line || !dep.line.name) {
        return false;
      }
      
      const lineName = dep.line.name.trim();
      
      // NUR Fernverkehr und Regionalverkehr
      const isICE = lineName.startsWith("ICE");
      const isIC = lineName.startsWith("IC ") || lineName === "IC";
      const isEC = lineName.startsWith("EC ");
      const isRE = lineName.startsWith("RE");
      const isRB = lineName.startsWith("RB");
      const isIRE = lineName.startsWith("IRE");
      
      return isICE || isIC || isEC || isRE || isRB || isIRE;
    });
    
    if (trainDepartures.length === 0) {
      const message = "Keine Fern- oder Regionalzüge in den nächsten 2 Stunden gefunden.";
      cachedDepartures = { message, timestamp: now };
      return message;
    }
    
    let message = "<b>🚂 Berlin Hauptbahnhof - Nächste 2 Stunden</b>\n";
    message += "<i>Nur Fernverkehr (ICE/IC/EC) und Regionalverkehr (RE/RB/IRE)</i>\n\n";
    
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
    
    // Cache updaten
    cachedDepartures = { message, timestamp: now };
    console.log("Cache updated successfully");
    
    return message;
    
  } catch (error) {
    console.error("Error fetching DB data:", error);
    
    // Bei Fehler: alte gecachte Daten zurückgeben (falls vorhanden)
    if (cachedDepartures) {
      return cachedDepartures.message + "\n\n<i>⚠️ Aktuelle Daten nicht verfügbar - zeige letzte Daten</i>";
    }
    
    if (error instanceof Error) {
      console.error("Error details:", error.message, error.stack);
    }
    return "❌ Fehler beim Abrufen der Zugdaten. Bitte später erneut versuchen.";
  }
}

async function getBundesligaMatches(): Promise<string> {
  const now = Date.now();
  if (cachedFootball && (now - cachedFootball.timestamp) < CACHE_DURATION_MS) {
    console.log("Returning cached football data");
    return cachedFootball.message + "\n\n<i>ℹ️ Daten werden alle 5 Minuten aktualisiert</i>";
  }

  try {
    const currentSeason = 2024;
    const url = `https://api.openligadb.de/getmatchdata/bl1/${currentSeason}`;
    
    console.log("Fetching Bundesliga data...");
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error("Bundesliga API error:", response.status);
      if (cachedFootball) {
        return cachedFootball.message + "\n\n<i>⚠️ API-Limit erreicht - zeige letzte Daten</i>";
      }
      throw new Error(`API error: ${response.status}`);
    }
    
    const matches = await response.json() as BundesligaMatch[];
    
    const berlinTeams = ["Union Berlin", "Hertha BSC"];
    const now = new Date();
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    const relevantMatches = matches.filter((match: BundesligaMatch) => {
      const matchDate = new Date(match.matchDateTime);
      const hasBerlinTeam = 
        berlinTeams.includes(match.team1.teamName) || 
        berlinTeams.includes(match.team2.teamName);
      const isUpcoming = matchDate >= now && matchDate <= nextWeek;
      return hasBerlinTeam && isUpcoming;
    });
    
    if (relevantMatches.length === 0) {
      const message = "⚽ <b>Fußball Berlin</b>\n\nKeine Spiele in den nächsten 7 Tagen.";
      cachedFootball = { message, timestamp: now.getTime() };
      return message;
    }
    
    let message = "⚽ <b>Fußball Berlin - Nächste 7 Tage</b>\n\n";
    
    relevantMatches.forEach((match: BundesligaMatch) => {
      const matchDate = new Date(match.matchDateTime);
      const dateStr = matchDate.toLocaleDateString("de-DE", {
        weekday: "short",
        day: "2-digit",
        month: "2-digit",
      });
      const timeStr = matchDate.toLocaleTimeString("de-DE", {
        hour: "2-digit",
        minute: "2-digit",
      });
      
      const endTime = new Date(matchDate.getTime() + 2 * 60 * 60 * 1000);
      const endTimeStr = endTime.toLocaleTimeString("de-DE", {
        hour: "2-digit",
        minute: "2-digit",
      });
      
      let stadium = "";
      let address = "";
      
      if (match.team1.teamName === "Union Berlin") {
        stadium = "Stadion An der Alten Försterei";
        address = "An der Wuhlheide 263, 12555 Berlin (Köpenick)";
      } else if (match.team1.teamName === "Hertha BSC") {
        stadium = "Olympiastadion";
        address = "Olympischer Platz 3, 14053 Berlin (Charlottenburg)";
      } else {
        stadium = match.location.locationStadium;
        address = match.location.locationCity;
      }
      
      message += `<b>${dateStr} | ${timeStr} - ${endTimeStr}</b>\n`;
      message += `${match.team1.teamName} vs ${match.team2.teamName}\n`;
      message += `📍 ${stadium}\n`;
      message += `${address}\n\n`;
    });
    
    cachedFootball = { message, timestamp: now.getTime() };
    console.log("Football cache updated");
    
    return message;
    
  } catch (error) {
    console.error("Error fetching Bundesliga data:", error);
    
    if (cachedFootball) {
      return cachedFootball.message + "\n\n<i>⚠️ Aktuelle Daten nicht verfügbar - zeige letzte Daten</i>";
    }
    
    if (error instanceof Error) {
      console.error("Error details:", error.message);
    }
    return "❌ Fehler beim Abrufen der Fußballdaten. Bitte später erneut versuchen.";
  }
}

async function handleCommand(command: string, chatId: number): Promise<void> {
  switch (command.toLowerCase()) {
    case "/start":
      await sendTelegramMessage(
        chatId,
        "👋 Hallo Onur!\n\n" +
        "<b>Bahnhöfe:</b>\n" +
        "/hbf — Berlin Hauptbahnhof\n\n" +
        "<b>Sport:</b>\n" +
        "/fussball — Union Berlin & Hertha BSC"
      );
      break;
      
    case "/hbf":
      const departures = await getBerlinHbfDepartures();
      await sendTelegramMessage(chatId, departures);
      break;
      
    case "/fussball":
    case "/fußball":
      const matches = await getBundesligaMatches();
      await sendTelegramMessage(chatId, matches);
      break;
      
    default:
      await sendTelegramMessage(
        chatId,
        "Unbekannter Befehl. Nutze /start für alle Commands."
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
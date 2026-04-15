interface PhilharmonieEvent {
  id: string;
  title: string;
  startTime: string;
  endTime?: string;
  venue: string;
  program?: string;
  artists?: string[];
}

export async function getPhilharmonieEvents(): Promise<string> {
  try {
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0]; // YYYY-MM-DD
    
    // Berliner Philharmonie API
    const url = `https://api.berliner-philharmoniker.de/v1/events?date=${dateStr}`;
    
    console.log("Fetching Philharmonie events from:", url);
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
    });
    
    console.log("Philharmonie API status:", response.status);
    console.log("Philharmonie API headers:", Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      console.error("Philharmonie API error:", response.status);
      const errorText = await response.text();
      console.error("Error body:", errorText);
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("Philharmonie API response:", JSON.stringify(data, null, 2));
    
    // Falls keine Events heute
    if (!data.events || data.events.length === 0) {
      return "🎻 <b>Berliner Philharmonie</b>\n\nHeute keine Veranstaltungen geplant.";
    }
    
    let message = "🎻 <b>Berliner Philharmonie - Heute</b>\n\n";
    
    data.events.forEach((event: PhilharmonieEvent) => {
      const time = new Date(event.startTime).toLocaleTimeString("de-DE", {
        hour: "2-digit",
        minute: "2-digit",
      });
      
      message += `<b>${time} Uhr</b>\n`;
      message += `📍 ${event.venue}\n`;
      message += `🎵 ${event.title}\n`;
      
      if (event.artists && event.artists.length > 0) {
        message += `🎭 ${event.artists.join(", ")}\n`;
      }
      
      message += "\n";
    });
    
    return message;
    
  } catch (error) {
    console.error("Error fetching Philharmonie data:", error);
    
    if (error instanceof Error) {
      console.error("Error details:", error.message);
    }
    
    return "❌ Fehler beim Abrufen der Veranstaltungsdaten. Bitte später erneut versuchen.";
  }
}
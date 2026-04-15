import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const url = "https://v6.db.transport.rest/stops/8011160/departures?duration=120&results=10";
    
    console.log("Fetching from:", url);
    
    const response = await fetch(url);
    
    console.log("Response status:", response.status);
    console.log("Response headers:", Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      const errorText = await response.text();
      return res.status(500).json({
        error: "DB API HTTP Error",
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
    }
    
    const data = await response.json();
    
    console.log("Response data keys:", Object.keys(data));
    console.log("Departures count:", data.departures?.length || 0);
    
    if (data.departures && data.departures.length > 0) {
      console.log("First departure:", JSON.stringify(data.departures[0], null, 2));
    }
    
    return res.status(200).json({
      success: true,
      departuresCount: data.departures?.length || 0,
      firstThree: data.departures?.slice(0, 3) || [],
      rawKeys: Object.keys(data)
    });
    
  } catch (error) {
    console.error("Test endpoint error:", error);
    return res.status(500).json({
      error: "Caught exception",
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
  }
}
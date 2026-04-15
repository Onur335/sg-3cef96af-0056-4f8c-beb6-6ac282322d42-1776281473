import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];
    
    const url = `https://api.berliner-philharmoniker.de/v1/events?date=${dateStr}`;
    
    console.log("Testing Philharmonie API:", url);
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
    });
    
    console.log("Status:", response.status);
    console.log("Headers:", Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      const errorText = await response.text();
      return res.status(500).json({
        error: "Philharmonie API HTTP Error",
        status: response.status,
        statusText: response.statusText,
        url: url,
        body: errorText
      });
    }
    
    const data = await response.json();
    
    return res.status(200).json({
      success: true,
      url: url,
      data: data
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
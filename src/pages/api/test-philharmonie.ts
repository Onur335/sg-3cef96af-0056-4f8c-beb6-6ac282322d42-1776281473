import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const results: Record<string, unknown> = {};
  
  // Test 1: Visit Berlin API (offizielle Berliner Tourismus API)
  try {
    console.log("Testing Visit Berlin API...");
    const visitBerlinUrl = "https://www.visitberlin.de/system/files/document/events.json";
    const vbResponse = await fetch(visitBerlinUrl);
    
    results.visitBerlin = {
      status: vbResponse.status,
      ok: vbResponse.ok,
      headers: Object.fromEntries(vbResponse.headers.entries()),
    };
    
    if (vbResponse.ok) {
      const vbData = await vbResponse.json();
      results.visitBerlinData = {
        type: typeof vbData,
        keys: typeof vbData === 'object' ? Object.keys(vbData) : null,
        sample: Array.isArray(vbData) ? vbData.slice(0, 2) : vbData
      };
    } else {
      results.visitBerlinError = await vbResponse.text();
    }
  } catch (error) {
    results.visitBerlinError = error instanceof Error ? error.message : String(error);
  }
  
  // Test 2: RSS Feed (viele Kulturinstitutionen haben RSS)
  try {
    console.log("Testing RSS Feed...");
    const rssUrl = "https://www.berliner-philharmoniker.de/en/feed/";
    const rssResponse = await fetch(rssUrl);
    
    results.rssFeed = {
      status: rssResponse.status,
      ok: rssResponse.ok,
      contentType: rssResponse.headers.get('content-type'),
    };
    
    if (rssResponse.ok) {
      const rssText = await rssResponse.text();
      results.rssFeedData = {
        length: rssText.length,
        isXML: rssText.includes('<?xml'),
        hasItems: rssText.includes('<item>'),
        preview: rssText.substring(0, 500)
      };
    }
  } catch (error) {
    results.rssFeedError = error instanceof Error ? error.message : String(error);
  }
  
  // Test 3: Berlin Open Data
  try {
    console.log("Testing Berlin Open Data...");
    const openDataUrl = "https://daten.berlin.de/api/3/action/package_search?q=veranstaltungen";
    const odResponse = await fetch(openDataUrl);
    
    results.openData = {
      status: odResponse.status,
      ok: odResponse.ok,
    };
    
    if (odResponse.ok) {
      const odData = await odResponse.json();
      results.openDataData = {
        type: typeof odData,
        keys: typeof odData === 'object' ? Object.keys(odData) : null,
      };
    }
  } catch (error) {
    results.openDataError = error instanceof Error ? error.message : String(error);
  }
  
  return res.status(200).json({
    message: "API Tests Complete",
    timestamp: new Date().toISOString(),
    results
  });
}
# Telegram Deutsche Bahn Bot

Ein Telegram Bot, der Echtzeit-Zugdaten von der Deutschen Bahn API abruft.

## Features

- `/hbf` - Zeigt alle Fernzüge und Regionalzüge der nächsten 2 Stunden in Berlin Hauptbahnhof
- Anzeige von Verspätungen, Plattformen und Zielbahnhöfen
- Echtzeit-Daten von der offiziellen DB API

## Setup

### 1. Environment Variables

Trage deinen Telegram Bot Token in Softgen ein:

1. Klicke auf das Zahnrad-Symbol (oben rechts)
2. Gehe zu "Environment"
3. Füge hinzu:
   - Key: `TELEGRAM_BOT_TOKEN`
   - Value: Dein Bot Token von @BotFather

### 2. Deployment

1. Klicke auf "Publish" in Softgen
2. Deine App wird auf Vercel deployed
3. Notiere dir die URL (z.B. `https://dein-bot.vercel.app`)

### 3. Webhook einrichten

Nach dem Deployment musst du den Telegram Webhook einmalig setzen.

**Option A: Im Browser**
Öffne diese URL (ersetze `<DEIN_TOKEN>` und `<DEINE_VERCEL_URL>`):

```
https://api.telegram.org/bot<DEIN_TOKEN>/setWebhook?url=https://<DEINE_VERCEL_URL>/api/telegram
```

**Option B: Mit curl**
```bash
curl -X POST "https://api.telegram.org/bot<DEIN_TOKEN>/setWebhook" \
  -d "url=https://<DEINE_VERCEL_URL>/api/telegram"
```

Erfolgreiche Antwort:
```json
{"ok":true,"result":true,"description":"Webhook was set"}
```

### 4. Bot testen

Schreibe deinem Bot in Telegram:
- `/start` - Willkommensnachricht
- `/hbf` - Zugdaten Berlin Hauptbahnhof

## API Details

Der Bot nutzt die öffentliche Deutsche Bahn API über transport.rest:
- Keine zusätzliche Registrierung erforderlich
- Echtzeit-Daten mit Verspätungen
- Kostenlos nutzbar

## Troubleshooting

**Bot antwortet nicht:**
1. Prüfe, ob Environment Variable `TELEGRAM_BOT_TOKEN` gesetzt ist
2. Prüfe Webhook-Status: `https://api.telegram.org/bot<TOKEN>/getWebhookInfo`
3. Schau in Vercel Logs nach Fehlern

**Webhook-Fehler:**
- Webhook-URL muss HTTPS sein (Vercel liefert das automatisch)
- Token muss korrekt sein (von @BotFather)
- URL muss auf `/api/telegram` enden
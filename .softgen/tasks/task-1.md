---
title: Telegram Bot Integration mit Deutsche Bahn API
status: in_progress
priority: high
type: feature
tags: [telegram, api, db]
created_by: agent
created_at: 2026-04-15T11:49:00Z
position: 1
---

## Notes
Bau einen Telegram Bot, der auf Commands reagiert und Zugdaten von der Deutschen Bahn API abruft.

Anforderungen:
- Telegram Webhook-Handler für Bot-Messages
- Command `/hbf`: Zeigt alle Fernzüge + Regionalzüge der nächsten 2h in Berlin Hauptbahnhof
- Integration mit öffentlicher DB API (transport.rest oder ähnlich)
- Anzeige von Verspätungen, Plattformen, Zielbahnhöfen
- Formatierte, benutzerfreundliche Telegram-Nachrichten

Tech Stack:
- Next.js API Routes für Webhook
- Öffentliche DB API (keine zusätzlichen API-Keys erforderlich)
- TypeScript für Type Safety

## Checklist
- [ ] API-Route `/api/telegram` für Telegram Webhooks erstellen
- [ ] Command-Handler System implementieren
- [ ] `/hbf` Command: DB API-Integration für Berlin Hauptbahnhof
- [ ] Funktion zum Abrufen von Zugdaten (nächste 2h, Fern- & Regionalzüge)
- [ ] Formatierung der Telegram-Nachrichten (übersichtliche Darstellung)
- [ ] Error Handling & Logging
- [ ] README mit Deployment-Anleitung erstellen
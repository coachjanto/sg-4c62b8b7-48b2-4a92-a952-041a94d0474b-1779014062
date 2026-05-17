---
title: Settings Page - API Integrations
status: done
priority: urgent
type: feature
tags: [settings, api, integrations, oauth]
created_by: agent
created_at: 2026-05-17T11:23:09Z
position: 6
---

## Notes
Settings page untuk menghubungkan YouTube account dan mengintegrasikan API eksternal (OpenAI, Claude, Kling, Veo, Google Sheets, Google Calendar, n8n). Setiap service memiliki connection card dengan status indicator dan form konfigurasi.

## Checklist
- [x] Create src/pages/settings.tsx: settings page dengan navigation dari header
- [x] YouTube OAuth section: Connect button, display connected account info, disconnect option
- [x] AI Services section: OpenAI API key, Claude API key, Kling API key, Veo API key
- [x] Google Services section: Google Sheets OAuth, Google Calendar OAuth
- [x] Automation section: n8n webhook URL configuration
- [x] Connection status indicators (connected/disconnected) untuk setiap service
- [x] Save API keys ke .env.local via instructions, tampilkan masked values
- [x] Test/Validate button untuk setiap API connection
- [x] Add Settings link ke navigation header

## Acceptance
- Settings page accessible dari navigation header
- Setiap service memiliki connection card dengan status dan configuration form
- API keys tersimpan aman di environment variables (masked di UI)
- Connection status indicators berfungsi dengan benar
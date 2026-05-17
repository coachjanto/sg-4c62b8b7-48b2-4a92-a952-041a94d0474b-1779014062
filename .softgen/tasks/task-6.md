---
title: Integration Control Center - Workflow Visualization
status: in_progress
priority: urgent
type: feature
tags: [settings, api, integrations, workflow, visualization]
created_by: agent
created_at: 2026-05-17T11:23:09Z
position: 6
---

## Notes
Redesign Settings into visual workflow map yang menjelaskan arsitektur sistem secara visual (seperti n8n). User harus bisa memahami aliran data, dependency antar service, dan peran setiap integration hanya dengan melihat halaman ini. Bukan form settings biasa — ini peta operasional AI media operating system.

## Checklist
- [ ] Workflow canvas dengan horizontal flow visualization
- [ ] Node untuk setiap layer: Idea Navigation, AI Strategy (OpenAI/Claude), Production (Kling/Veo), Automation (n8n), Data (Supabase/Google Sheets), Publishing (YouTube), Analytics Engine
- [ ] Animated connection lines menunjukkan data flow direction
- [ ] Status indicators di setiap node (connected/disconnected/warning/syncing)
- [ ] Click node membuka configuration panel (API keys, test connection, usage logs)
- [ ] Connection health dashboard section
- [ ] Sync logs dan error center
- [ ] API usage monitoring dan monthly cost estimation
- [ ] Educational tooltips menjelaskan peran setiap integration

## Acceptance
- Workflow map menampilkan semua integration nodes dengan visual data flow
- User bisa memahami arsitektur sistem hanya dari Settings page
- Setiap node menampilkan status, last sync, dan clickable untuk configuration
- Animated connection lines menunjukkan arah aliran data
- Design feels like "AI operating system" — intelligent, analytical, futuristic
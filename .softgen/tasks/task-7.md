---
title: Live Production Command Center
status: in_progress
priority: high
type: feature
tags: [production, monitoring, real-time, workflow]
created_by: agent
created_at: 2026-05-17T11:40:32Z
position: 7
---

## Notes
Live infographic page showing real-time production activity across 3 channels: active commands, workflow pulse status, queue movement, provider usage, remaining credits, payment alerts. User harus bisa langsung tahu channel mana yang aktif, command apa yang running, provider mana yang dipakai, dan credit status.

## Checklist
- [ ] Create src/pages/production.tsx: live production command center
- [ ] 3-channel grid layout (responsive: 3 col desktop, 2 col tablet, 1 col mobile)
- [ ] Channel lane components: name, status pulse, current command, workflow timeline, queue position
- [ ] Pulse status system (idle/planning/generating/rendering/reviewing/scheduled/failed) dengan animated indicators
- [ ] Workflow timeline mini visualization (12 stages: idea → publish)
- [ ] Current command panel per channel (provider, command type, elapsed time, status)
- [ ] Resource credit panel: OpenAI, Claude, Kling, Veo, n8n, YouTube API, Supabase
- [ ] Credit warning logic (healthy >40%, watch 20-40%, critical <20%) dengan color coding
- [ ] Payment alerts section untuk expired/low credit providers
- [ ] Live activity feed (right sidebar): recent events, provider calls, completions, errors
- [ ] Human action center: pending approvals, urgent decisions
- [ ] Add Production link ke navigation header

## Acceptance
- Production page menampilkan real-time status 3 channels dengan pulse animations
- Workflow timeline menunjukkan current stage dengan visual progress
- Credit monitoring menampilkan all providers dengan warning thresholds
- Payment alerts visible saat credit low atau subscription issue
- Live activity feed menampilkan operational events
- Design feels like "live production radar" — operational command center
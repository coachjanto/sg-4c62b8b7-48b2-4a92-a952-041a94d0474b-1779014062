---
title: Channel Production Settings Section
status: done
priority: high
type: feature
tags: [settings, channel, production, configuration]
created_by: agent
created_at: 2026-05-17T11:48:15Z
position: 8
---

## Notes
Add structured Channel Production Settings section ke Settings page. Setiap channel punya control untuk production speed (daily/weekly targets), content format mix (shorts/longform/compilation %), approval mode, resource limits (max credit per week), dan priority level. Summary panel menampilkan total targets dan risk indicator.

## Checklist
- [x] Add Channel Production Settings section di Settings page (below Integration Control Center)
- [x] 3-channel cards dengan production configuration fields per channel
- [x] Production speed settings: daily target, weekly target, production mode, schedule pattern
- [x] Content format mix: shorts %, longform %, compilation % (sliders, total must = 100%)
- [x] Approval mode: manual/auto-publish/schedule-only
- [x] Resource limits: max budget per provider per week, stop threshold
- [x] Priority level: low/normal/high/main growth channel
- [x] Summary panel: total targets all channels, estimated usage, approval load, risk level
- [x] Risk indicators: low (emerald), medium (amber), high (rose) based on targets vs resources

## Acceptance
- Settings page menampilkan Channel Production Settings dengan 3 channel cards
- Format mix sliders validation (total must = 100%)
- Summary panel menunjukkan aggregated targets dan resource estimates
- Risk indicator warns jika target exceeds capacity atau credit insufficient
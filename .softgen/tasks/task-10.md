---
title: Ideas Submission & Override Form
status: done
priority: high
type: feature
tags: [ideas, form, manual-input, content]
created_by: agent
created_at: 2026-05-17T11:56:22Z
position: 10
---

## Notes
Create Ideas page dengan submission form untuk manual content idea requests dan production override commands. User bisa submit idea tanpa AI generation, request specific changes ke workflow, atau force-approve content yang pending. Form terintegrasi dengan idea bank dan production queue.

## Checklist
- [x] Create src/pages/ideas.tsx: Ideas Navigation & Submission page
- [x] Manual idea submission form: channel, title, description, format type, target metrics, priority
- [x] Override request form: select active production, override type (skip approval, change provider, force retry), reason
- [x] Idea bank display: list of submitted ideas dengan status (pending review, approved, in production, rejected)
- [x] Scoring preview: show estimated virality/monetization/production difficulty scores
- [x] Bulk actions: approve multiple ideas, assign to channels, set priority queue
- [x] Add Ideas link ke navigation header
- [x] Visual indicators untuk AI-generated vs manually-submitted ideas

## Acceptance
- Ideas page accessible dari navigation header
- Manual idea submission form works dan adds to idea bank
- Override form allows manual intervention ke active production workflows
- Idea bank displays all ideas dengan clear status dan action buttons
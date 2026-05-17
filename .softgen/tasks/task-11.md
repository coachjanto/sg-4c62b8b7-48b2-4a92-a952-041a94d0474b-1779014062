---
title: Google OAuth Super Admin Approval System
status: in_progress
priority: urgent
type: feature
tags: [auth, oauth, google, admin, security]
created_by: agent
created_at: 2026-05-17T12:00:00Z
position: 11
---

## Notes
Implement Google OAuth sebagai satu-satunya login method dengan Super Admin approval gate. coach.janto@gmail.com dan jantodj@gmail.com auto-approved sebagai Super Admin. Users lain harus menunggu approval dari Super Admin. Reject users tidak bisa akses app.

## Checklist
- [ ] Create profiles table di Supabase (id, email, full_name, avatar_url, role, approval_status, created_at, updated_at)
- [ ] RLS policies: users read own profile, super admins manage all
- [ ] Trigger auto-create profile on auth.users insert
- [ ] Update authService.ts: Google OAuth login + approval checking
- [ ] Create AuthContext untuk state management
- [ ] Update login page: Google OAuth button + post-login approval redirect
- [ ] Create pending-approval page: waiting screen untuk unapproved users
- [ ] Create admin page: Super Admin dashboard untuk approve/reject users
- [ ] Protected route logic: check auth + approval_status on all private pages
- [ ] Auto-approve coach.janto@gmail.com dan jantodj@gmail.com sebagai super_admin

## Acceptance
- Google OAuth login works, creates profile automatically
- coach.janto@gmail.com dan jantodj@gmail.com auto-approved sebagai super_admin
- Other users redirected ke pending-approval page
- Super Admin bisa approve/reject pending users dari admin dashboard
- Approved users bisa akses app, rejected users lihat access-denied
- All protected routes check auth + approval_status
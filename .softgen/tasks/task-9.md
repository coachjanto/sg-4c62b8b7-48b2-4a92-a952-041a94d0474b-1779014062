---
title: Google OAuth Access Control
status: todo
priority: urgent
type: feature
tags: [auth, security, oauth, allowlist]
created_by: agent
created_at: 2026-05-17T11:48:20Z
position: 9
---

## Notes
Restrict aplikasi hanya untuk 2 authorized owner accounts (coach.janto@gmail.com, jantodj@gmail.com). Implement Google OAuth authentication dengan strict allowlist. Users tidak dalam list akan denied access dan redirect ke Access Denied page. Requires Supabase Auth backend integration.

## Checklist
- [ ] **Backend setup**: Enable Supabase Auth dengan Google provider
- [ ] Create login page dengan "Sign in with Google" button
- [ ] Implement auth check: compare user email vs allowlist setelah Google login
- [ ] Create Access Denied page untuk unauthorized users
- [ ] Protect all routes: redirect ke login jika unauthenticated
- [ ] Frontend protection: hide dashboard content sebelum auth validated
- [ ] Backend protection: protect API routes dengan session validation
- [ ] Session management: auto-logout jika session invalid, validate on every protected request
- [ ] Add logout button di header

## Acceptance
- Login page menampilkan Google OAuth button
- Hanya coach.janto@gmail.com dan jantodj@gmail.com bisa access dashboard
- Unauthorized users redirect ke Access Denied page
- All routes protected — manual URL access blocked tanpa valid session
- Logout button berfungsi dan clear session
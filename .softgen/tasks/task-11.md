---
title: Google OAuth Super Admin Approval System
status: done
priority: urgent
type: feature
tags: [auth, oauth, security, admin]
created_by: agent
created_at: 2026-05-17T11:59:48Z
position: 11
---

## Notes
Implement Google OAuth authentication dengan Super Admin approval gate. coach.janto@gmail.com dan jantodj@gmail.com auto-approved sebagai Super Admin. Users lain harus menunggu approval dari Super Admin sebelum bisa akses app.

## Checklist
- [x] Database: profiles table dengan role (user/super_admin) dan approval_status (pending/approved/rejected)
- [x] RLS policies: public read untuk admin, users hanya bisa read own profile
- [x] Trigger: auto-create profile on signup, auto-approve super admin emails
- [x] Auth service: signInWithGoogle, getUserProfile, checkUserApproval, approve/reject functions
- [x] Auth context: session state, approval status, isSuperAdmin flag
- [x] Login page dengan Google OAuth button
- [x] Auth callback handler untuk redirect setelah OAuth
- [x] Pending Approval page untuk non-approved users
- [x] Access Denied page untuk rejected users
- [x] Super Admin dashboard untuk approve/reject pending users
- [x] Protected routes: index, production, ideas, settings redirect ke login/pending based on status
- [x] Sign out buttons di semua protected pages
- [x] Admin panel link untuk super admins

## Acceptance
- Google OAuth login works (requires Supabase OAuth setup)
- Super admins auto-approved, others go to pending-approval
- Super Admin dashboard shows pending users, can approve/reject
- Approved users dapat akses app, rejected users lihat access-denied
- All protected routes check auth + approval_status
import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, CheckCircle2, XCircle, Clock, Loader2, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getAllUsers, approveUser, rejectUser, signOut } from "@/services/authService";
import Link from "next/link";

interface User {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: string;
  approval_status: string;
  created_at: string;
  updated_at: string;
}

export default function Admin() {
  const { isSuperAdmin, loading: authLoading } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !isSuperAdmin) {
      router.replace("/");
    }
  }, [isSuperAdmin, authLoading, router]);

  useEffect(() => {
    if (isSuperAdmin) {
      loadUsers();
    }
  }, [isSuperAdmin]);

  const loadUsers = async () => {
    setLoading(true);
    const data = await getAllUsers();
    setUsers(data);
    setLoading(false);
  };

  const handleApprove = async (userId: string) => {
    try {
      setActionLoading(userId);
      await approveUser(userId);
      await loadUsers();
    } catch (error) {
      console.error("Error approving user:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (userId: string) => {
    try {
      setActionLoading(userId);
      await rejectUser(userId);
      await loadUsers();
    } catch (error) {
      console.error("Error rejecting user:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.replace("/login");
  };

  if (authLoading || !isSuperAdmin) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
      </div>
    );
  }

  const pendingUsers = users.filter(u => u.approval_status === "pending");
  const approvedUsers = users.filter(u => u.approval_status === "approved");
  const rejectedUsers = users.filter(u => u.approval_status === "rejected");

  return (
    <>
      <SEO 
        title="Super Admin - User Management"
        description="Manage user access and approvals"
      />
      
      <div className="min-h-screen bg-slate-950">
        {/* Header */}
        <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-cyan-400" />
                  <div>
                    <h1 className="text-lg font-bold text-slate-100">Super Admin Panel</h1>
                    <p className="text-xs text-slate-400">User Access Management</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Link href="/">
                  <Button variant="outline" className="border-slate-700">
                    Back to Dashboard
                  </Button>
                </Link>
                <Button onClick={handleSignOut} variant="ghost" className="text-slate-400">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-slate-900 border-slate-800 p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="text-slate-400 text-sm">Total Users</div>
                <Users className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-3xl font-mono font-bold text-slate-100">{users.length}</div>
            </Card>

            <Card className="bg-slate-900 border-slate-800 p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="text-slate-400 text-sm">Pending</div>
                <Clock className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-3xl font-mono font-bold text-amber-400">{pendingUsers.length}</div>
            </Card>

            <Card className="bg-slate-900 border-slate-800 p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="text-slate-400 text-sm">Approved</div>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-3xl font-mono font-bold text-emerald-400">{approvedUsers.length}</div>
            </Card>

            <Card className="bg-slate-900 border-slate-800 p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="text-slate-400 text-sm">Rejected</div>
                <XCircle className="w-4 h-4 text-rose-400" />
              </div>
              <div className="text-3xl font-mono font-bold text-rose-400">{rejectedUsers.length}</div>
            </Card>
          </div>

          {/* Pending Approvals */}
          {pendingUsers.length > 0 && (
            <Card className="bg-slate-900 border-slate-800 p-6 mb-6">
              <h2 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-400" />
                Pending Approvals ({pendingUsers.length})
              </h2>
              <div className="space-y-3">
                {pendingUsers.map((user) => (
                  <div key={user.id} className="bg-slate-950/50 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <div className="font-medium text-slate-100">{user.full_name || "No name"}</div>
                      <div className="text-sm text-slate-400">{user.email}</div>
                      <div className="text-xs text-slate-500 mt-1">
                        Requested: {new Date(user.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        onClick={() => handleApprove(user.id)}
                        disabled={actionLoading === user.id}
                        size="sm"
                        className="bg-emerald-500 hover:bg-emerald-600"
                      >
                        {actionLoading === user.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                        Approve
                      </Button>
                      <Button 
                        onClick={() => handleReject(user.id)}
                        disabled={actionLoading === user.id}
                        size="sm"
                        variant="destructive"
                      >
                        {actionLoading === user.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <XCircle className="w-4 h-4" />}
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* All Users */}
          <Card className="bg-slate-900 border-slate-800 p-6">
            <h2 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-cyan-400" />
              All Users ({users.length})
            </h2>
            <div className="space-y-2">
              {loading ? (
                <div className="text-center py-8">
                  <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mx-auto" />
                </div>
              ) : users.length === 0 ? (
                <div className="text-center py-8 text-slate-400">No users found</div>
              ) : (
                users.map((user) => (
                  <div key={user.id} className="bg-slate-950/30 border border-slate-800 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="font-medium text-slate-100">{user.full_name || "No name"}</div>
                        <Badge 
                          variant={user.role === "super_admin" ? "default" : "secondary"}
                          className={user.role === "super_admin" ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" : ""}
                        >
                          {user.role === "super_admin" ? "Super Admin" : "User"}
                        </Badge>
                        <Badge 
                          variant={
                            user.approval_status === "approved" ? "default" : 
                            user.approval_status === "pending" ? "secondary" : 
                            "destructive"
                          }
                          className={
                            user.approval_status === "approved" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                            user.approval_status === "pending" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                            "bg-rose-500/10 text-rose-400 border-rose-500/20"
                          }
                        >
                          {user.approval_status === "approved" ? "Approved" : 
                           user.approval_status === "pending" ? "Pending" : 
                           "Rejected"}
                        </Badge>
                      </div>
                      <div className="text-sm text-slate-400 mt-1">{user.email}</div>
                      <div className="text-xs text-slate-500 mt-1">
                        Joined: {new Date(user.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    {user.approval_status === "pending" && (
                      <div className="flex items-center gap-2">
                        <Button 
                          onClick={() => handleApprove(user.id)}
                          disabled={actionLoading === user.id}
                          size="sm"
                          className="bg-emerald-500 hover:bg-emerald-600"
                        >
                          Approve
                        </Button>
                        <Button 
                          onClick={() => handleReject(user.id)}
                          disabled={actionLoading === user.id}
                          size="sm"
                          variant="destructive"
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </Card>
        </main>
      </div>
    </>
  );
}
import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Mail, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { signOut } from "@/services/authService";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function PendingApproval() {
  const { user, profile, isApproved, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
    if (!loading && isApproved) {
      router.replace("/");
    }
  }, [user, isApproved, loading, router]);

  const handleSignOut = async () => {
    await signOut();
    router.replace("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-slate-400">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title="Pending Approval - YouTube Control Room"
        description="Your access request is pending approval"
      />
      
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <Card className="bg-slate-900 border-slate-800 p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/10 rounded-2xl mb-4">
              <Clock className="w-8 h-8 text-amber-400 animate-pulse" />
            </div>
            <h1 className="text-2xl font-bold text-slate-100 mb-2">Awaiting Approval</h1>
            <p className="text-slate-400 text-sm">
              Your access request has been submitted and is pending Super Admin approval.
            </p>
          </div>

          <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-5 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-5 h-5 text-cyan-400" />
              <div>
                <div className="text-sm font-medium text-slate-300">Signed in as</div>
                <div className="text-sm text-slate-400">{profile?.email || user?.email}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-slate-500 mt-0.5" />
              <div>
                <div className="text-sm font-medium text-slate-300 mb-1">What happens next?</div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  A Super Admin will review your access request. You'll be able to access the system once approved. This typically takes 24-48 hours.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={() => window.location.reload()}
              variant="outline" 
              className="w-full border-slate-700 hover:bg-slate-800"
            >
              Check Status
            </Button>
            <Button 
              onClick={handleSignOut}
              variant="ghost" 
              className="w-full text-slate-400 hover:text-slate-100"
            >
              Sign Out
            </Button>
          </div>

          <div className="mt-6 p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-lg">
            <p className="text-xs text-cyan-400 text-center">
              If you believe this is an error, please contact the system administrator.
            </p>
          </div>
        </Card>
      </div>
    </>
  );
}
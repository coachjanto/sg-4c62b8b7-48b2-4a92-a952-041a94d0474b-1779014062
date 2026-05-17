import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle, LogOut, AlertTriangle, ShieldX, Mail } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import { signOut } from "@/services/authService";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function AccessDenied() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  const handleSignOut = async () => {
    await signOut();
    router.replace("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <SEO 
        title="Access Denied - YouTube Control Room"
        description="Access to this application has been denied"
      />
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex justify-center">
            <Image 
              src="/ChatGPT_Image_May_17_2026_08_29_45_PM.png"
              alt="YouTube Control Room"
              width={200}
              height={200}
              className="object-contain"
            />
          </div>

          <Card className="bg-slate-900 border-slate-800 p-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-500/10 rounded-2xl mb-4">
                <ShieldX className="w-8 h-8 text-rose-400" />
              </div>
              <h1 className="text-2xl font-bold text-slate-100 mb-2">Access Restricted</h1>
              <p className="text-slate-400 text-sm">
                Your access request has been denied. This system is private and only accessible to authorized owner accounts.
              </p>
            </div>

            {user?.email && (
              <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-5 mb-6">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-cyan-400" />
                  <div>
                    <div className="text-sm font-medium text-slate-300">Account</div>
                    <div className="text-sm text-slate-400">{user.email}</div>
                  </div>
                </div>
              </div>
            )}

            <Button 
              onClick={handleSignOut}
              className="w-full bg-slate-800 hover:bg-slate-700 text-slate-100"
            >
              Sign Out
            </Button>

            <div className="mt-6 p-4 bg-rose-500/5 border border-rose-500/20 rounded-lg">
              <p className="text-xs text-rose-400 text-center">
                If you believe this is an error, please contact the system administrator.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
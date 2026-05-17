import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Chrome, Loader2, Shield, Lock, CheckCircle2 } from "lucide-react";
import { signInWithGoogle } from "@/services/authService";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && user) {
      router.replace("/auth/callback");
    }
  }, [user, authLoading, router]);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError("");
      await signInWithGoogle();
      // Redirect handled by OAuth flow
    } catch (err: any) {
      setError(err.message || "Failed to sign in with Google");
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <SEO 
        title="Login - YouTube Control Room"
        description="Sign in to access your YouTube channel control room"
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
              priority
            />
          </div>

          <Card className="bg-slate-900 border-slate-800 p-8 max-w-md w-full">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-500/10 rounded-2xl mb-4">
                <Shield className="w-8 h-8 text-cyan-400" />
              </div>
              <h1 className="text-2xl font-bold text-slate-100 mb-2">YouTube Control Room</h1>
              <p className="text-slate-400 text-sm">
                Secure access to your AI-powered media operating system
              </p>
            </div>

            {error && (
              <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg p-3 mb-6">
                <p className="text-rose-400 text-sm">{error}</p>
              </div>
            )}

            <Button 
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full bg-white hover:bg-slate-100 text-slate-900 font-medium py-6 rounded-xl mb-6"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {loading ? "Signing in..." : "Continue with Google"}
            </Button>

            <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4">
              <div className="flex items-start gap-3 mb-3">
                <Lock className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-xs font-medium text-slate-300 mb-1">Private Owner System</div>
                  <p className="text-xs text-slate-500">
                    Only authorized Google accounts can access this application. All other accounts require Super Admin approval.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-xs font-medium text-slate-300 mb-1">Auto-Approved Accounts</div>
                  <ul className="text-xs text-slate-500 space-y-0.5">
                    <li>• coach.janto@gmail.com</li>
                    <li>• jantodj@gmail.com</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
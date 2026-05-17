import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Chrome } from "lucide-react";
import { useState } from "react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = () => {
    setIsLoading(true);
    // TODO: Implement Supabase Google OAuth
    // const { data, error } = await supabase.auth.signInWithOAuth({
    //   provider: 'google',
    //   options: {
    //     redirectTo: `${window.location.origin}/auth/callback`
    //   }
    // });
    
    alert("Google OAuth integration requires Supabase Auth setup.\n\nSteps:\n1. Enable Supabase in Settings\n2. Configure Google OAuth provider\n3. Add authorized redirect URLs\n4. Implement auth callback handler");
    setIsLoading(false);
  };

  return (
    <>
      <SEO 
        title="Login - YouTube Control Room"
        description="Secure access to your AI-powered YouTube media operating system"
      />
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <Card className="bg-slate-900 border-slate-800 p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-500/10 rounded-2xl mb-4">
              <Shield className="w-8 h-8 text-cyan-400" />
            </div>
            <h1 className="text-2xl font-bold text-slate-100 mb-2">YouTube Control Room</h1>
            <p className="text-sm text-slate-400">AI-Powered Media Operating System</p>
          </div>

          <div className="mb-6">
            <div className="bg-slate-950/50 border border-slate-700 rounded-xl p-4 mb-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-cyan-400 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-slate-100 mb-1">Private Owner System</div>
                  <div className="text-xs text-slate-400">
                    This application is restricted to authorized owner accounts only. Access is granted exclusively to:
                  </div>
                  <ul className="mt-2 space-y-1">
                    <li className="text-xs text-slate-300 font-mono">• coach.janto@gmail.com</li>
                    <li className="text-xs text-slate-300 font-mono">• jantodj@gmail.com</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <Button 
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full bg-slate-100 hover:bg-white text-slate-900 font-medium py-6 mb-4"
          >
            <Chrome className="w-5 h-5 mr-2" />
            {isLoading ? "Connecting..." : "Sign in with Google"}
          </Button>

          <div className="text-center">
            <p className="text-xs text-slate-500">
              By signing in, you confirm you are an authorized owner of this system.
            </p>
          </div>

          {/* Backend Setup Notice */}
          <Card className="bg-amber-500/5 border-amber-500/20 p-4 mt-6">
            <div className="flex items-start gap-2">
              <Shield className="w-4 h-4 text-amber-400 mt-0.5" />
              <div>
                <div className="text-xs font-medium text-amber-300 mb-1">Setup Required</div>
                <div className="text-xs text-amber-200/80">
                  Google OAuth authentication requires Supabase Auth integration. Enable Supabase in Settings → Integration Control Center to activate secure login.
                </div>
              </div>
            </div>
          </Card>
        </Card>
      </div>
    </>
  );
}
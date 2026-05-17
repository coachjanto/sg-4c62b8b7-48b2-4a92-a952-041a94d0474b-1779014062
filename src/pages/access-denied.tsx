import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldAlert, LogOut } from "lucide-react";
import Link from "next/link";

export default function AccessDeniedPage() {
  return (
    <>
      <SEO 
        title="Access Denied - YouTube Control Room"
        description="This system is private and only accessible to authorized owner accounts"
      />
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <Card className="bg-slate-900 border-slate-800 p-8 max-w-md w-full text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-500/10 rounded-2xl mb-4">
            <ShieldAlert className="w-8 h-8 text-rose-400" />
          </div>
          
          <h1 className="text-2xl font-bold text-slate-100 mb-2">Access Restricted</h1>
          <p className="text-sm text-slate-400 mb-6">
            This system is private and only accessible to authorized owner accounts.
          </p>

          <Card className="bg-slate-950/50 border-slate-700 p-4 mb-6 text-left">
            <div className="text-xs text-slate-400 mb-2">Authorized Accounts:</div>
            <ul className="space-y-1">
              <li className="text-sm text-slate-300 font-mono">• coach.janto@gmail.com</li>
              <li className="text-sm text-slate-300 font-mono">• jantodj@gmail.com</li>
            </ul>
          </Card>

          <div className="space-y-3">
            <Link href="/login">
              <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-slate-950">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out & Try Different Account
              </Button>
            </Link>
            
            <p className="text-xs text-slate-500">
              If you believe you should have access, please contact the system administrator.
            </p>
          </div>
        </Card>
      </div>
    </>
  );
}
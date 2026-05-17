import { useEffect } from "react";
import { useRouter } from "next/router";
import { checkUserApproval } from "@/services/authService";
import { Loader2 } from "lucide-react";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Small delay to ensure session is set
        await new Promise(resolve => setTimeout(resolve, 1000));

        const approval = await checkUserApproval();

        if (!approval.approved) {
          if (approval.status === "pending") {
            router.replace("/pending-approval");
          } else if (approval.status === "rejected") {
            router.replace("/access-denied");
          } else {
            router.replace("/login");
          }
        } else {
          router.replace("/");
        }
      } catch (error) {
        console.error("Auth callback error:", error);
        router.replace("/login");
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-4" />
        <p className="text-slate-400">Verifying your access...</p>
      </div>
    </div>
  );
}
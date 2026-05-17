import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Clock, DollarSign, Video, Eye } from "lucide-react";
import Link from "next/link";

type ChannelMetrics = {
  name: string;
  niche: string;
  subscribers: number;
  subscriberGrowth: number;
  views: number;
  watchTime: number;
  rpm: number;
  uploadQueueCount: number;
  status: "active" | "warning" | "critical";
  monetizationStage: string;
};

const mockChannels: ChannelMetrics[] = [
  {
    name: "TechExplained",
    niche: "Tech Education",
    subscribers: 47800,
    subscriberGrowth: 12.3,
    views: 1280000,
    watchTime: 54200,
    rpm: 4.20,
    uploadQueueCount: 3,
    status: "active",
    monetizationStage: "AdSense Active",
  },
  {
    name: "HistoryBytes",
    niche: "History Shorts",
    subscribers: 12400,
    subscriberGrowth: -2.1,
    views: 340000,
    watchTime: 18900,
    rpm: 2.80,
    uploadQueueCount: 5,
    status: "warning",
    monetizationStage: "Eligibility: 85%",
  },
  {
    name: "ScienceMoments",
    niche: "Science Facts",
    subscribers: 8200,
    subscriberGrowth: 28.7,
    views: 180000,
    watchTime: 12400,
    rpm: 0,
    uploadQueueCount: 2,
    status: "active",
    monetizationStage: "Not Eligible",
  },
];

function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

export default function Home() {
  return (
    <>
      <SEO 
        title="YouTube Control Room — Channel Dashboard"
        description="PDCA-driven dashboard for managing faceless YouTube channels toward monetization"
      />
      
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-card">
          <div className="mx-auto max-w-[1600px] px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-wide text-foreground">
                  CONTROL ROOM
                </h1>
                <p className="text-sm text-secondary">
                  YouTube Channel Management System
                </p>
              </div>
              
              <nav className="flex gap-6">
                <button className="text-sm font-medium text-accent border-b-2 border-accent pb-1">
                  Overview
                </button>
                <Link href="/ideas" className="text-sm font-medium text-secondary hover:text-foreground transition-colors">
                  Ideas
                </Link>
                <Link href="/production" className="text-sm font-medium text-secondary hover:text-foreground transition-colors">
                  Production
                </Link>
                <button className="text-sm font-medium text-secondary hover:text-foreground transition-colors">
                  Advisor
                </button>
                <button className="text-sm font-medium text-secondary hover:text-foreground transition-colors">
                  Monetization
                </button>
                <Link href="/settings" className="text-sm font-medium text-secondary hover:text-foreground transition-colors">
                  Settings
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="mx-auto max-w-[1600px] px-6 py-8">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-2">
              Channel Overview
            </h2>
            <p className="text-sm text-secondary">
              Real-time metrics across all channels
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {mockChannels.map((channel) => (
              <Card
                key={channel.name}
                className="p-6 bg-card border-border hover:border-accent/50 transition-all duration-200"
              >
                {/* Channel Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {channel.name}
                    </h3>
                    <p className="text-sm text-secondary">{channel.niche}</p>
                  </div>
                  <Badge
                    variant={
                      channel.status === "active"
                        ? "default"
                        : channel.status === "warning"
                        ? "secondary"
                        : "destructive"
                    }
                    className={
                      channel.status === "active"
                        ? "bg-success/20 text-success border-success/30"
                        : channel.status === "warning"
                        ? "bg-warning/20 text-warning border-warning/30"
                        : "bg-danger/20 text-danger border-danger/30"
                    }
                  >
                    {channel.status}
                  </Badge>
                </div>

                {/* Metrics Grid */}
                <div className="space-y-4">
                  {/* Subscribers */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                        <Eye className="w-4 h-4 text-accent" />
                      </div>
                      <span className="text-sm text-secondary">Subscribers</span>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-mono font-semibold text-foreground tabular-nums">
                        {formatNumber(channel.subscribers)}
                      </p>
                      <div className="flex items-center gap-1 justify-end">
                        {channel.subscriberGrowth > 0 ? (
                          <TrendingUp className="w-3 h-3 text-success" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-danger" />
                        )}
                        <span
                          className={`text-xs font-mono tabular-nums ${
                            channel.subscriberGrowth > 0
                              ? "text-success"
                              : "text-danger"
                          }`}
                        >
                          {channel.subscriberGrowth > 0 ? "+" : ""}
                          {channel.subscriberGrowth.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Views */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                        <Video className="w-4 h-4 text-accent" />
                      </div>
                      <span className="text-sm text-secondary">Total Views</span>
                    </div>
                    <p className="text-lg font-mono font-semibold text-foreground tabular-nums">
                      {formatNumber(channel.views)}
                    </p>
                  </div>

                  {/* Watch Time */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                        <Clock className="w-4 h-4 text-accent" />
                      </div>
                      <span className="text-sm text-secondary">Watch Time (hrs)</span>
                    </div>
                    <p className="text-lg font-mono font-semibold text-foreground tabular-nums">
                      {formatNumber(channel.watchTime)}
                    </p>
                  </div>

                  {/* RPM */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                        <DollarSign className="w-4 h-4 text-accent" />
                      </div>
                      <span className="text-sm text-secondary">RPM</span>
                    </div>
                    <p className="text-lg font-mono font-semibold text-foreground tabular-nums">
                      ${channel.rpm.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                  <div>
                    <p className="text-xs text-secondary">Monetization</p>
                    <p className="text-sm font-medium text-foreground">
                      {channel.monetizationStage}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-secondary">Upload Queue</p>
                    <p className="text-sm font-mono font-semibold text-accent tabular-nums">
                      {channel.uploadQueueCount} videos
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
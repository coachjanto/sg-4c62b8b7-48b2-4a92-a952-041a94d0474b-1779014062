import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import {
  Activity,
  Zap,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  PlayCircle,
  PauseCircle,
  Loader,
  TrendingUp,
  DollarSign,
  AlertCircle,
  Eye,
  Video,
  FileText,
  Image,
  Upload,
  BarChart3,
  Sparkles,
  Brain,
  Wand2,
} from "lucide-react";
import { useState } from "react";

// Mock data
const channels = [
  {
    id: "1",
    name: "AI Productivity Hub",
    category: "Tech & Education",
    status: "generating",
    currentCommand: {
      id: "cmd-8472",
      type: "video_generation",
      description: "Kling is rendering 'Morning Routine Optimization' - Scene 4 of 7",
      provider: "Kling AI",
      startedAt: "11:23 AM",
      elapsedTime: "4m 23s",
      progress: 65,
      retryCount: 0,
    },
    workflowStage: 5,
    queuePosition: 2,
    estimatedCompletion: "~8 minutes",
    lastActivity: "2 minutes ago",
    nextAction: null,
  },
  {
    id: "2",
    name: "Crypto Insights",
    category: "Finance & Investment",
    status: "reviewing",
    currentCommand: {
      id: "cmd-8471",
      type: "approval_pending",
      description: "Video ready for review: 'Bitcoin ETF Analysis'",
      provider: "Human Review",
      startedAt: "10:45 AM",
      elapsedTime: "52m 18s",
      progress: 100,
      retryCount: 0,
    },
    workflowStage: 9,
    queuePosition: null,
    estimatedCompletion: "Awaiting approval",
    lastActivity: "52 minutes ago",
    nextAction: "approve_video",
  },
  {
    id: "3",
    name: "Mindful Living",
    category: "Health & Wellness",
    status: "idle",
    currentCommand: null,
    workflowStage: 0,
    queuePosition: null,
    estimatedCompletion: null,
    lastActivity: "3 hours ago",
    nextAction: "select_next_idea",
  },
];

const workflowStages = [
  { id: 0, label: "Idea", icon: Sparkles },
  { id: 1, label: "Script", icon: FileText },
  { id: 2, label: "Storyboard", icon: Brain },
  { id: 3, label: "Visual Prompt", icon: Wand2 },
  { id: 4, label: "Assets", icon: Image },
  { id: 5, label: "Video Gen", icon: Video },
  { id: 6, label: "Editing", icon: Video },
  { id: 7, label: "Subtitles", icon: FileText },
  { id: 8, label: "Thumbnail", icon: Image },
  { id: 9, label: "Approval", icon: Eye },
  { id: 10, label: "Schedule", icon: Clock },
  { id: 11, label: "Publish", icon: Upload },
];

const providers = [
  {
    name: "Claude",
    type: "AI text and analysis",
    monthlyBudget: 100,
    used: 67.5,
    remaining: 32.5,
    resetDate: "May 29",
    status: "healthy",
  },
  {
    name: "OpenAI",
    type: "AI text, analysis, metadata",
    monthlyBudget: 150,
    used: 128.3,
    remaining: 21.7,
    resetDate: "May 24",
    status: "watch",
  },
  {
    name: "Kling",
    type: "AI video generation",
    availableCredits: 850,
    usedToday: 420,
    estimatedRendersLeft: 43,
    status: "healthy",
  },
  {
    name: "Veo",
    type: "AI video generation",
    availableCredits: 120,
    usedToday: 0,
    estimatedRendersLeft: 12,
    status: "critical",
  },
  {
    name: "n8n",
    type: "Automation execution",
    workflowRuns: 1847,
    executionLimit: 5000,
    failedExecutions: 12,
    status: "healthy",
  },
  {
    name: "YouTube API",
    type: "Upload and analytics",
    quotaUsed: 7234,
    quotaRemaining: 2766,
    quotaReset: "11:59 PM",
    status: "healthy",
  },
];

const activityFeed = [
  {
    id: 1,
    time: "2m ago",
    channel: "AI Productivity Hub",
    event: "Kling rendering started",
    type: "provider_call",
    icon: Video,
  },
  {
    id: 2,
    time: "15m ago",
    channel: "AI Productivity Hub",
    event: "Claude generated 5 hook variations",
    type: "completion",
    icon: CheckCircle2,
  },
  {
    id: 3,
    time: "52m ago",
    channel: "Crypto Insights",
    event: "Video ready for approval",
    type: "approval_needed",
    icon: Eye,
  },
  {
    id: 4,
    time: "1h ago",
    channel: "Crypto Insights",
    event: "Thumbnail generation completed",
    type: "completion",
    icon: Image,
  },
  {
    id: 5,
    time: "1h 23m ago",
    channel: "AI Productivity Hub",
    event: "Storyboard approved by user",
    type: "approval",
    icon: CheckCircle2,
  },
  {
    id: 6,
    time: "2h ago",
    channel: "Mindful Living",
    event: "Video published to YouTube",
    type: "upload",
    icon: Upload,
  },
  {
    id: 7,
    time: "3h ago",
    channel: "Mindful Living",
    event: "OpenAI title optimization completed",
    type: "completion",
    icon: Sparkles,
  },
];

const paymentAlerts = [
  {
    provider: "Veo",
    issue: "Credits below 20%",
    impact: "Video rendering may stop within next 2-3 jobs",
    action: "Top up credits before approving new renders",
    severity: "critical",
  },
  {
    provider: "OpenAI",
    issue: "Budget at 85% for this cycle",
    impact: "May reach limit before reset on May 24",
    action: "Monitor usage or increase budget",
    severity: "watch",
  },
];

const humanActions = [
  {
    id: 1,
    channel: "Crypto Insights",
    type: "approve_video",
    title: "Approve 'Bitcoin ETF Analysis'",
    description: "Video completed and ready for review",
    priority: "urgent",
    waitingFor: "52 minutes",
  },
  {
    id: 2,
    channel: "Mindful Living",
    type: "select_next_idea",
    title: "Select next content idea",
    description: "Channel idle - ready for new production",
    priority: "normal",
    waitingFor: "3 hours",
  },
];

const pulseStyles = {
  idle: "bg-slate-700 text-slate-400",
  planning: "bg-cyan-500/20 text-cyan-400 animate-pulse",
  generating: "bg-purple-500/20 text-purple-400 animate-pulse",
  rendering: "bg-blue-500/20 text-blue-400 animate-pulse",
  reviewing: "bg-amber-500/20 text-amber-400 animate-pulse",
  scheduled: "bg-emerald-500/20 text-emerald-400",
  failed: "bg-rose-500/20 text-rose-400 animate-pulse",
};

const pulseLabels = {
  idle: "Idle",
  planning: "Planning",
  generating: "Generating",
  rendering: "Rendering",
  reviewing: "Awaiting Review",
  scheduled: "Scheduled",
  failed: "Failed",
};

export default function Production() {
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);

  const getProviderStatus = (provider: any) => {
    if (provider.status === "healthy") {
      return { color: "text-emerald-400", icon: CheckCircle2, label: "Healthy" };
    } else if (provider.status === "watch") {
      return { color: "text-amber-400", icon: AlertTriangle, label: "Watch" };
    } else if (provider.status === "critical") {
      return { color: "text-rose-400", icon: AlertCircle, label: "Critical" };
    }
    return { color: "text-slate-400", icon: Activity, label: "Unknown" };
  };

  const getUsagePercentage = (provider: any) => {
    if (provider.monthlyBudget) {
      return (provider.used / provider.monthlyBudget) * 100;
    } else if (provider.executionLimit) {
      return (provider.workflowRuns / provider.executionLimit) * 100;
    } else if (provider.quotaRemaining !== undefined) {
      const total = provider.quotaUsed + provider.quotaRemaining;
      return (provider.quotaUsed / total) * 100;
    }
    return 0;
  };

  return (
    <>
      <SEO
        title="Live Production Command Center - YouTube Channel Control Room"
        description="Real-time monitoring of active workflows, AI commands, credit usage, and production status across all channels"
      />
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-6 py-8 max-w-[1800px]">
          {/* Header */}
          <Card className="bg-card border-border p-8 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Activity className="w-8 h-8 text-accent" />
                  <h1 className="text-3xl font-bold text-foreground tracking-tight">
                    Live Production Command Center
                  </h1>
                </div>
                <p className="text-secondary text-lg">
                  Real-time pulse of all active channel workflows, commands, AI usage, and production resources
                </p>
              </div>
              <Link href="/">
                <Button variant="outline" size="sm">
                  Back to Overview
                </Button>
              </Link>
            </div>

            {/* Global Status */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-secondary mb-1">Active Workflows</p>
                    <p className="text-3xl font-bold font-mono text-cyan-400">2</p>
                  </div>
                  <Zap className="w-8 h-8 text-cyan-400 opacity-50" />
                </div>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-secondary mb-1">Pending Approvals</p>
                    <p className="text-3xl font-bold font-mono text-amber-400">1</p>
                  </div>
                  <Eye className="w-8 h-8 text-amber-400 opacity-50" />
                </div>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-secondary mb-1">Failed Jobs</p>
                    <p className="text-3xl font-bold font-mono text-slate-400">0</p>
                  </div>
                  <XCircle className="w-8 h-8 text-slate-600 opacity-50" />
                </div>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-secondary mb-1">Credit Warnings</p>
                    <p className="text-3xl font-bold font-mono text-rose-400">2</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-rose-400 opacity-50" />
                </div>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content - Channel Lanes */}
            <div className="lg:col-span-2 space-y-6">
              {/* Payment Alerts */}
              {paymentAlerts.length > 0 && (
                <Card className="bg-rose-950/20 border-rose-800/50 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <AlertCircle className="w-5 h-5 text-rose-400" />
                    <h3 className="text-lg font-semibold text-foreground">Payment Alerts</h3>
                  </div>
                  <div className="space-y-3">
                    {paymentAlerts.map((alert, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-lg border ${
                          alert.severity === "critical"
                            ? "bg-rose-950/30 border-rose-800/50"
                            : "bg-amber-950/20 border-amber-800/30"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-semibold text-foreground">{alert.provider}</p>
                            <p className="text-sm text-rose-400">{alert.issue}</p>
                          </div>
                          <Badge
                            variant="outline"
                            className={
                              alert.severity === "critical"
                                ? "border-rose-400 text-rose-400"
                                : "border-amber-400 text-amber-400"
                            }
                          >
                            {alert.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-secondary mb-2">
                          <span className="font-medium">Impact:</span> {alert.impact}
                        </p>
                        <p className="text-sm text-accent">
                          <span className="font-medium">Action:</span> {alert.action}
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Channel Lanes */}
              {channels.map((channel) => (
                <Card
                  key={channel.id}
                  className="bg-card border-border p-6 hover:border-accent/50 transition-colors"
                >
                  {/* Channel Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-foreground">{channel.name}</h3>
                        <Badge variant="outline" className="text-xs border-secondary text-secondary">
                          {channel.category}
                        </Badge>
                        <Badge className={pulseStyles[channel.status as keyof typeof pulseStyles]}>
                          {pulseLabels[channel.status as keyof typeof pulseLabels]}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-secondary">
                        {channel.queuePosition && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            Queue Position: {channel.queuePosition}
                          </span>
                        )}
                        {channel.estimatedCompletion && (
                          <span className="flex items-center gap-1">
                            <TrendingUp className="w-4 h-4" />
                            {channel.estimatedCompletion}
                          </span>
                        )}
                        <span>Last activity: {channel.lastActivity}</span>
                      </div>
                    </div>
                  </div>

                  {/* Workflow Timeline */}
                  <div className="mb-6">
                    <p className="text-sm text-secondary mb-3 font-medium">Workflow Progress</p>
                    <div className="flex items-center gap-2">
                      {workflowStages.map((stage, idx) => {
                        const Icon = stage.icon;
                        const isCompleted = idx < channel.workflowStage;
                        const isCurrent = idx === channel.workflowStage;
                        const isPending = idx > channel.workflowStage;

                        return (
                          <div key={stage.id} className="flex items-center gap-2 flex-1">
                            <div
                              className={`relative flex flex-col items-center group ${
                                idx < workflowStages.length - 1 ? "flex-1" : ""
                              }`}
                            >
                              <div
                                className={`w-10 h-10 rounded-lg flex items-center justify-center border-2 transition-all ${
                                  isCompleted
                                    ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                                    : isCurrent
                                    ? "bg-cyan-500/20 border-cyan-500 text-cyan-400 animate-pulse ring-2 ring-cyan-500/30"
                                    : "bg-slate-800/50 border-slate-700 text-slate-600"
                                }`}
                              >
                                {isCompleted ? (
                                  <CheckCircle2 className="w-5 h-5" />
                                ) : (
                                  <Icon className="w-5 h-5" />
                                )}
                              </div>
                              <span className="absolute -bottom-6 text-[10px] text-secondary whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                                {stage.label}
                              </span>
                            </div>
                            {idx < workflowStages.length - 1 && (
                              <div
                                className={`h-0.5 flex-1 ${
                                  isCompleted ? "bg-emerald-500/30" : "bg-slate-800"
                                }`}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Current Command */}
                  {channel.currentCommand ? (
                    <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Loader className="w-4 h-4 text-accent animate-spin" />
                            <p className="text-sm font-semibold text-foreground">Current Command</p>
                          </div>
                          <p className="text-foreground mb-1">{channel.currentCommand.description}</p>
                          <div className="flex items-center gap-4 text-xs text-secondary">
                            <span className="flex items-center gap-1">
                              <Activity className="w-3 h-3" />
                              {channel.currentCommand.provider}
                            </span>
                            <span>Started: {channel.currentCommand.startedAt}</span>
                            <span>Elapsed: {channel.currentCommand.elapsedTime}</span>
                            <span className="font-mono">#{channel.currentCommand.id}</span>
                          </div>
                        </div>
                      </div>
                      {channel.currentCommand.progress > 0 && (
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-secondary">Progress</span>
                            <span className="font-mono text-cyan-400">{channel.currentCommand.progress}%</span>
                          </div>
                          <Progress value={channel.currentCommand.progress} className="h-1.5" />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="bg-slate-800/20 rounded-lg p-4 border border-slate-700/50">
                      <p className="text-sm text-secondary text-center">
                        No active command — channel is idle
                      </p>
                    </div>
                  )}

                  {/* Next Action */}
                  {channel.nextAction && (
                    <div className="mt-4">
                      <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                        {channel.nextAction === "approve_video"
                          ? "Review & Approve Video"
                          : "Select Next Idea"}
                      </Button>
                    </div>
                  )}
                </Card>
              ))}

              {/* Resource Credit Panel */}
              <Card className="bg-card border-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-accent" />
                  Resource & Credit Status
                </h3>
                <div className="space-y-4">
                  {providers.map((provider, idx) => {
                    const status = getProviderStatus(provider);
                    const StatusIcon = status.icon;
                    const usage = getUsagePercentage(provider);

                    return (
                      <div
                        key={idx}
                        className="bg-slate-800/30 rounded-lg p-4 border border-slate-700"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-semibold text-foreground">{provider.name}</p>
                              <Badge
                                variant="outline"
                                className={`${status.color} border-current text-xs`}
                              >
                                <StatusIcon className="w-3 h-3 mr-1" />
                                {status.label}
                              </Badge>
                            </div>
                            <p className="text-xs text-secondary">{provider.type}</p>
                          </div>
                        </div>

                        {provider.monthlyBudget && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-secondary">Budget Usage</span>
                              <span className="font-mono text-foreground">
                                ${provider.used.toFixed(2)} / ${provider.monthlyBudget}
                              </span>
                            </div>
                            <Progress
                              value={usage}
                              className={`h-1.5 ${
                                usage > 80
                                  ? "[&>div]:bg-rose-400"
                                  : usage > 60
                                  ? "[&>div]:bg-amber-400"
                                  : "[&>div]:bg-emerald-400"
                              }`}
                            />
                            <p className="text-xs text-secondary">Resets: {provider.resetDate}</p>
                          </div>
                        )}

                        {provider.availableCredits !== undefined && (
                          <div className="grid grid-cols-3 gap-3 text-xs">
                            <div>
                              <p className="text-secondary mb-1">Available</p>
                              <p className="font-mono text-foreground font-semibold">
                                {provider.availableCredits}
                              </p>
                            </div>
                            <div>
                              <p className="text-secondary mb-1">Used Today</p>
                              <p className="font-mono text-foreground font-semibold">
                                {provider.usedToday}
                              </p>
                            </div>
                            <div>
                              <p className="text-secondary mb-1">Renders Left</p>
                              <p className="font-mono text-foreground font-semibold">
                                ~{provider.estimatedRendersLeft}
                              </p>
                            </div>
                          </div>
                        )}

                        {provider.workflowRuns !== undefined && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-secondary">Workflow Runs</span>
                              <span className="font-mono text-foreground">
                                {provider.workflowRuns} / {provider.executionLimit}
                              </span>
                            </div>
                            <Progress value={usage} className="h-1.5 [&>div]:bg-emerald-400" />
                            <p className="text-xs text-secondary">
                              Failed: {provider.failedExecutions}
                            </p>
                          </div>
                        )}

                        {provider.quotaUsed !== undefined && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-secondary">Quota Usage</span>
                              <span className="font-mono text-foreground">
                                {provider.quotaUsed.toLocaleString()} /{" "}
                                {(provider.quotaUsed + provider.quotaRemaining).toLocaleString()}
                              </span>
                            </div>
                            <Progress value={usage} className="h-1.5 [&>div]:bg-emerald-400" />
                            <p className="text-xs text-secondary">Resets: {provider.quotaReset}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Human Action Center */}
              <Card className="bg-card border-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-amber-400" />
                  Human Actions Required
                </h3>
                <div className="space-y-3">
                  {humanActions.map((action) => (
                    <div
                      key={action.id}
                      className={`p-4 rounded-lg border ${
                        action.priority === "urgent"
                          ? "bg-amber-950/20 border-amber-800/50"
                          : "bg-slate-800/30 border-slate-700"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <p className="font-semibold text-foreground text-sm mb-1">
                            {action.title}
                          </p>
                          <p className="text-xs text-secondary mb-1">{action.channel}</p>
                          <p className="text-xs text-secondary">{action.description}</p>
                        </div>
                        {action.priority === "urgent" && (
                          <Badge variant="outline" className="border-amber-400 text-amber-400 text-xs">
                            Urgent
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-secondary mb-3">Waiting: {action.waitingFor}</p>
                      <Button size="sm" className="w-full bg-accent hover:bg-accent/90">
                        Take Action
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Live Activity Feed */}
              <Card className="bg-card border-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-accent" />
                  Live Activity Feed
                </h3>
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {activityFeed.map((activity) => {
                    const Icon = activity.icon;
                    return (
                      <div
                        key={activity.id}
                        className="flex items-start gap-3 pb-3 border-b border-slate-800 last:border-0"
                      >
                        <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-accent" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground mb-1">{activity.event}</p>
                          <div className="flex items-center gap-2 text-xs text-secondary">
                            <span>{activity.channel}</span>
                            <span>•</span>
                            <span>{activity.time}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
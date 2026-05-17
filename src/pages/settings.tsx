import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import {
  Brain,
  Cpu,
  Clapperboard,
  Workflow,
  Database,
  Youtube,
  TrendingUp,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Loader2,
  Settings2,
  ChevronRight,
  Eye,
  EyeOff,
  ExternalLink,
  Activity,
} from "lucide-react";

interface ServiceNode {
  id: string;
  name: string;
  layer: string;
  services: string[];
  icon: any;
  color: string;
  description: string;
  functions: string[];
  status: "connected" | "disconnected" | "warning" | "syncing";
  lastSync?: string;
  position: { x: number; y: number };
}

interface ConnectionLine {
  from: string;
  to: string;
  label?: string;
}

export default function Settings() {
  const [selectedNode, setSelectedNode] = useState<ServiceNode | null>(null);
  const [showApiKeys, setShowApiKeys] = useState<{ [key: string]: boolean }>({});

  // Workflow nodes configuration
  const nodes: ServiceNode[] = [
    {
      id: "idea",
      name: "Idea Navigation",
      layer: "Human Layer",
      services: ["Human Strategy"],
      icon: Brain,
      color: "cyan",
      description: "Strategic direction and content decisions",
      functions: [
        "Content ideation",
        "Niche selection",
        "Approval workflow",
        "Final taste-making",
      ],
      status: "connected",
      position: { x: 0, y: 1 },
    },
    {
      id: "ai-strategy",
      name: "AI Strategy",
      layer: "Intelligence Layer",
      services: ["OpenAI", "Claude"],
      icon: Cpu,
      color: "purple",
      description: "AI-powered content planning and optimization",
      functions: [
        "Script generation",
        "Hook optimization",
        "Title generation",
        "Analytics interpretation",
      ],
      status: "warning",
      lastSync: "2 min ago",
      position: { x: 1, y: 0 },
    },
    {
      id: "production",
      name: "Production",
      layer: "Video Generation",
      services: ["Kling AI", "Google Veo"],
      icon: Clapperboard,
      color: "emerald",
      description: "AI video generation and visual assets",
      functions: [
        "Video generation",
        "Scene rendering",
        "Visual effects",
        "Asset creation",
      ],
      status: "disconnected",
      position: { x: 2, y: 0 },
    },
    {
      id: "automation",
      name: "Automation",
      layer: "Orchestration",
      services: ["n8n"],
      icon: Workflow,
      color: "orange",
      description: "Workflow orchestration and scheduling",
      functions: [
        "Task scheduling",
        "Webhook execution",
        "Trigger management",
        "Process automation",
      ],
      status: "connected",
      lastSync: "Active",
      position: { x: 1, y: 2 },
    },
    {
      id: "data",
      name: "Data Layer",
      layer: "Storage & Analytics",
      services: ["Supabase", "Google Sheets"],
      icon: Database,
      color: "blue",
      description: "Data persistence and analytics storage",
      functions: [
        "Analytics storage",
        "Queue tracking",
        "Historical data",
        "Reporting database",
      ],
      status: "warning",
      lastSync: "5 min ago",
      position: { x: 2, y: 2 },
    },
    {
      id: "publishing",
      name: "Publishing",
      layer: "Distribution",
      services: ["YouTube API"],
      icon: Youtube,
      color: "red",
      description: "Content upload and distribution",
      functions: [
        "Video upload",
        "Scheduling",
        "Analytics retrieval",
        "Monetization tracking",
      ],
      status: "connected",
      lastSync: "1 min ago",
      position: { x: 3, y: 1 },
    },
    {
      id: "analytics",
      name: "Analytics Engine",
      layer: "Intelligence Loop",
      services: ["PDCA Engine"],
      icon: TrendingUp,
      color: "cyan",
      description: "Performance monitoring and optimization",
      functions: [
        "PDCA review",
        "KPI monitoring",
        "Recommendation engine",
        "Trend detection",
      ],
      status: "syncing",
      position: { x: 2, y: 1 },
    },
  ];

  const connections: ConnectionLine[] = [
    { from: "idea", to: "ai-strategy", label: "Strategy" },
    { from: "ai-strategy", to: "production", label: "Script" },
    { from: "ai-strategy", to: "automation", label: "Workflow" },
    { from: "production", to: "automation", label: "Assets" },
    { from: "automation", to: "data", label: "Logs" },
    { from: "automation", to: "publishing", label: "Upload" },
    { from: "publishing", to: "analytics", label: "Metrics" },
    { from: "analytics", to: "data", label: "Storage" },
    { from: "analytics", to: "idea", label: "Insights" },
    { from: "data", to: "ai-strategy", label: "History" },
  ];

  const getStatusColor = (status: ServiceNode["status"]) => {
    switch (status) {
      case "connected":
        return "text-success";
      case "disconnected":
        return "text-danger";
      case "warning":
        return "text-warning";
      case "syncing":
        return "text-accent";
      default:
        return "text-secondary";
    }
  };

  const getStatusIcon = (status: ServiceNode["status"]) => {
    switch (status) {
      case "connected":
        return CheckCircle2;
      case "disconnected":
        return XCircle;
      case "warning":
        return AlertTriangle;
      case "syncing":
        return Loader2;
      default:
        return Activity;
    }
  };

  const toggleApiKey = (service: string) => {
    setShowApiKeys((prev) => ({ ...prev, [service]: !prev[service] }));
  };

  return (
    <>
      <SEO
        title="Integration Control Center - YouTube Channel Control Room"
        description="Visual architecture of your AI-powered YouTube media operating system"
      />
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Settings2 className="w-6 h-6 text-accent" />
                <h1 className="text-xl font-bold tracking-tight">Integration Control Center</h1>
              </div>
              <Link
                href="/"
                className="text-sm font-medium text-secondary hover:text-foreground transition-colors flex items-center gap-1"
              >
                Back to Dashboard
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-6 py-8">
          {/* Hero Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-3">System Architecture Map</h2>
            <p className="text-secondary text-lg max-w-3xl">
              Visual architecture of your AI-powered YouTube media operating system. Each node represents a critical service layer in your PDCA workflow.
            </p>
          </div>

          {/* Workflow Visualization */}
          <Card className="p-8 mb-8 bg-slate-900/50 border-slate-700">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Data Flow Visualization</h3>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-success"></div>
                  <span className="text-secondary">Connected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-warning"></div>
                  <span className="text-secondary">Warning</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-danger"></div>
                  <span className="text-secondary">Disconnected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-accent animate-pulse"></div>
                  <span className="text-secondary">Syncing</span>
                </div>
              </div>
            </div>

            {/* Workflow Canvas */}
            <div className="relative min-h-[600px] bg-slate-950 rounded-xl border border-slate-800 p-8 overflow-hidden">
              {/* Connection Lines - SVG Layer */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                <defs>
                  <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgb(34 211 238)" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="rgb(34 211 238)" stopOpacity="0.1" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                {connections.map((conn, idx) => {
                  const fromNode = nodes.find((n) => n.id === conn.from);
                  const toNode = nodes.find((n) => n.id === conn.to);
                  if (!fromNode || !toNode) return null;

                  const startX = (fromNode.position.x * 280 + 140) + 40;
                  const startY = (fromNode.position.y * 200 + 100) + 70;
                  const endX = (toNode.position.x * 280 + 140) + 40;
                  const endY = (toNode.position.y * 200 + 100) + 70;

                  const midX = (startX + endX) / 2;
                  const midY = (startY + endY) / 2;

                  return (
                    <g key={idx}>
                      <path
                        d={`M ${startX} ${startY} Q ${midX} ${startY} ${midX} ${midY} T ${endX} ${endY}`}
                        stroke="url(#connectionGradient)"
                        strokeWidth="2"
                        fill="none"
                        filter="url(#glow)"
                        className="animate-pulse"
                        style={{
                          animationDuration: "3s",
                          animationDelay: `${idx * 0.3}s`,
                        }}
                      />
                      {/* Arrow marker */}
                      <circle cx={endX} cy={endY} r="3" fill="rgb(34 211 238)" opacity="0.6" />
                    </g>
                  );
                })}
              </svg>

              {/* Nodes Layer */}
              <div className="relative grid grid-cols-4 gap-8" style={{ zIndex: 1 }}>
                {nodes.map((node) => {
                  const StatusIcon = getStatusIcon(node.status);
                  const NodeIcon = node.icon;
                  const colorClasses = {
                    cyan: "border-cyan-500/30 bg-cyan-500/5 hover:border-cyan-500/50",
                    purple: "border-purple-500/30 bg-purple-500/5 hover:border-purple-500/50",
                    emerald: "border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-500/50",
                    orange: "border-orange-500/30 bg-orange-500/5 hover:border-orange-500/50",
                    blue: "border-blue-500/30 bg-blue-500/5 hover:border-blue-500/50",
                    red: "border-red-500/30 bg-red-500/5 hover:border-red-500/50",
                  };

                  return (
                    <div
                      key={node.id}
                      className={`col-start-${node.position.x + 1} row-start-${node.position.y + 1}`}
                      style={{
                        gridColumnStart: node.position.x + 1,
                        gridRowStart: node.position.y + 1,
                      }}
                    >
                      <button
                        onClick={() => setSelectedNode(node)}
                        className={`w-full p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 cursor-pointer group ${
                          colorClasses[node.color as keyof typeof colorClasses]
                        } ${selectedNode?.id === node.id ? "ring-2 ring-accent scale-105" : ""}`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <NodeIcon className={`w-6 h-6 text-${node.color}-400`} />
                          <StatusIcon
                            className={`w-5 h-5 ${getStatusColor(node.status)} ${
                              node.status === "syncing" ? "animate-spin" : ""
                            }`}
                          />
                        </div>
                        <h4 className="font-semibold text-sm mb-1 text-left">{node.name}</h4>
                        <p className="text-xs text-secondary mb-2 text-left">{node.layer}</p>
                        <div className="flex flex-wrap gap-1">
                          {node.services.map((service, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="text-xs px-2 py-0 border-slate-700"
                            >
                              {service}
                            </Badge>
                          ))}
                        </div>
                        {node.lastSync && (
                          <p className="text-xs text-secondary mt-2 text-left">
                            Last sync: {node.lastSync}
                          </p>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>

          {/* Configuration Panel */}
          {selectedNode && (
            <Card className="p-6 bg-slate-900 border-slate-700 mb-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold mb-2">{selectedNode.name} Configuration</h3>
                  <p className="text-secondary">{selectedNode.description}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedNode(null)}
                  className="border-slate-700"
                >
                  Close
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-semibold mb-3 text-secondary">Key Functions</h4>
                  <ul className="space-y-2">
                    {selectedNode.functions.map((func, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <ChevronRight className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                        <span>{func}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-3 text-secondary">Active Services</h4>
                  <div className="space-y-3">
                    {selectedNode.services.map((service, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800"
                      >
                        <span className="text-sm font-medium">{service}</span>
                        <Badge
                          variant={
                            selectedNode.status === "connected"
                              ? "default"
                              : selectedNode.status === "warning"
                              ? "outline"
                              : "destructive"
                          }
                          className={
                            selectedNode.status === "connected"
                              ? "bg-success/20 text-success border-success/30"
                              : selectedNode.status === "warning"
                              ? "bg-warning/20 text-warning border-warning/30"
                              : ""
                          }
                        >
                          {selectedNode.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Service-specific configuration */}
              {selectedNode.id === "ai-strategy" && (
                <div className="border-t border-slate-800 pt-6 space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold mb-4">OpenAI Configuration</h4>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="openai-key" className="text-sm">
                          API Key
                        </Label>
                        <div className="flex gap-2 mt-1">
                          <div className="relative flex-1">
                            <Input
                              id="openai-key"
                              type={showApiKeys["openai"] ? "text" : "password"}
                              placeholder="sk-•••••••••••••••••••••••••"
                              className="pr-10 bg-slate-950 border-slate-700 font-mono text-sm"
                            />
                            <button
                              onClick={() => toggleApiKey("openai")}
                              className="absolute right-2 top-1/2 -translate-y-1/2 text-secondary hover:text-foreground"
                            >
                              {showApiKeys["openai"] ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                          <Button variant="outline" className="border-slate-700">
                            Test
                          </Button>
                          <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                            Save
                          </Button>
                        </div>
                        <p className="text-xs text-secondary mt-2">
                          Used for: Script generation, hook optimization, analytics interpretation
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold mb-4">Claude Configuration</h4>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="claude-key" className="text-sm">
                          API Key
                        </Label>
                        <div className="flex gap-2 mt-1">
                          <div className="relative flex-1">
                            <Input
                              id="claude-key"
                              type={showApiKeys["claude"] ? "text" : "password"}
                              placeholder="sk-ant-•••••••••••••••••••••"
                              className="pr-10 bg-slate-950 border-slate-700 font-mono text-sm"
                            />
                            <button
                              onClick={() => toggleApiKey("claude")}
                              className="absolute right-2 top-1/2 -translate-y-1/2 text-secondary hover:text-foreground"
                            >
                              {showApiKeys["claude"] ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                          <Button variant="outline" className="border-slate-700">
                            Test
                          </Button>
                          <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                            Save
                          </Button>
                        </div>
                        <p className="text-xs text-secondary mt-2">
                          Used for: Title generation, content analysis, strategic recommendations
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedNode.id === "production" && (
                <div className="border-t border-slate-800 pt-6 space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold mb-4">Kling AI Configuration</h4>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="kling-key" className="text-sm">
                          API Key
                        </Label>
                        <div className="flex gap-2 mt-1">
                          <div className="relative flex-1">
                            <Input
                              id="kling-key"
                              type={showApiKeys["kling"] ? "text" : "password"}
                              placeholder="Enter Kling API key"
                              className="pr-10 bg-slate-950 border-slate-700 font-mono text-sm"
                            />
                            <button
                              onClick={() => toggleApiKey("kling")}
                              className="absolute right-2 top-1/2 -translate-y-1/2 text-secondary hover:text-foreground"
                            >
                              {showApiKeys["kling"] ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                          <Button variant="outline" className="border-slate-700">
                            Test
                          </Button>
                          <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                            Save
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold mb-4">Google Veo Configuration</h4>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="veo-key" className="text-sm">
                          API Key
                        </Label>
                        <div className="flex gap-2 mt-1">
                          <div className="relative flex-1">
                            <Input
                              id="veo-key"
                              type={showApiKeys["veo"] ? "text" : "password"}
                              placeholder="Enter Google Veo API key"
                              className="pr-10 bg-slate-950 border-slate-700 font-mono text-sm"
                            />
                            <button
                              onClick={() => toggleApiKey("veo")}
                              className="absolute right-2 top-1/2 -translate-y-1/2 text-secondary hover:text-foreground"
                            >
                              {showApiKeys["veo"] ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                          <Button variant="outline" className="border-slate-700">
                            Test
                          </Button>
                          <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                            Save
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedNode.id === "automation" && (
                <div className="border-t border-slate-800 pt-6">
                  <h4 className="text-sm font-semibold mb-4">n8n Webhook Configuration</h4>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="n8n-webhook" className="text-sm">
                        Webhook URL
                      </Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          id="n8n-webhook"
                          type="text"
                          placeholder="https://your-n8n-instance.com/webhook/..."
                          className="bg-slate-950 border-slate-700"
                        />
                        <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-secondary mt-2">
                        Webhook endpoint for workflow automation triggers
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {selectedNode.id === "data" && (
                <div className="border-t border-slate-800 pt-6 space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold mb-4">Supabase Configuration</h4>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-slate-950 border border-slate-800">
                      <div>
                        <p className="text-sm font-medium mb-1">Connection Status</p>
                        <p className="text-xs text-secondary">Database not connected</p>
                      </div>
                      <Button variant="outline" className="border-slate-700">
                        Enable Supabase
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold mb-4">Google Sheets Configuration</h4>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-slate-950 border border-slate-800">
                      <div>
                        <p className="text-sm font-medium mb-1">OAuth Connection</p>
                        <p className="text-xs text-secondary">Not connected</p>
                      </div>
                      <Button variant="outline" className="border-slate-700">
                        Connect Google
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {selectedNode.id === "publishing" && (
                <div className="border-t border-slate-800 pt-6">
                  <h4 className="text-sm font-semibold mb-4">YouTube API Configuration</h4>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-slate-950 border border-slate-800">
                    <div>
                      <p className="text-sm font-medium mb-1">OAuth Connection</p>
                      <p className="text-xs text-secondary">Not connected to YouTube account</p>
                    </div>
                    <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                      Connect YouTube
                    </Button>
                  </div>
                  <p className="text-xs text-secondary mt-3">
                    Required permissions: Upload videos, manage playlists, access analytics
                  </p>
                </div>
              )}
            </Card>
          )}

          {/* System Health Dashboard */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 bg-slate-900 border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <Activity className="w-5 h-5 text-accent" />
                <h3 className="font-semibold">Connection Health</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-secondary">Active</span>
                  <span className="text-lg font-mono text-success">3/7</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-secondary">Warning</span>
                  <span className="text-lg font-mono text-warning">2/7</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-secondary">Offline</span>
                  <span className="text-lg font-mono text-danger">2/7</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-slate-900 border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <ExternalLink className="w-5 h-5 text-accent" />
                <h3 className="font-semibold">API Usage (24h)</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-secondary">OpenAI</span>
                  <span className="text-lg font-mono">1,247</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-secondary">Claude</span>
                  <span className="text-lg font-mono">892</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-secondary">YouTube</span>
                  <span className="text-lg font-mono">156</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-slate-900 border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-5 h-5 text-accent" />
                <h3 className="font-semibold">Est. Monthly Cost</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-secondary">AI Services</span>
                  <span className="text-lg font-mono">$47.80</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-secondary">Video Gen</span>
                  <span className="text-lg font-mono">$89.50</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-secondary font-semibold">Total</span>
                  <span className="text-lg font-mono text-accent font-bold">$137.30</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Error Center */}
          <Card className="p-6 bg-slate-900 border-slate-700">
            <h3 className="font-semibold mb-4">Recent System Events</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-950 border border-amber-500/20">
                <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">AI Strategy Layer: Rate limit warning</p>
                  <p className="text-xs text-secondary mt-1">OpenAI API approaching rate limit. Consider upgrading plan.</p>
                  <p className="text-xs text-secondary mt-1">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-950 border border-emerald-500/20">
                <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Publishing Layer: Upload successful</p>
                  <p className="text-xs text-secondary mt-1">Video uploaded to Tech Explainer channel</p>
                  <p className="text-xs text-secondary mt-1">15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-950 border border-rose-500/20">
                <XCircle className="w-5 h-5 text-danger flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Production Layer: Connection failed</p>
                  <p className="text-xs text-secondary mt-1">Kling AI and Google Veo are disconnected. Configure API keys.</p>
                  <p className="text-xs text-secondary mt-1">1 hour ago</p>
                </div>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </>
  );
}
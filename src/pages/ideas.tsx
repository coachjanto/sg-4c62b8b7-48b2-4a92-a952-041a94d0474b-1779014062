import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Lightbulb, TrendingUp, DollarSign, Zap, Clock, Filter, 
  Search, Plus, CheckCircle2, XCircle, AlertTriangle, 
  Play, Pause, SkipForward, RotateCcw, Ban, ExternalLink,
  Loader2, LogOut, Youtube, Brain, Settings as SettingsIcon,
  Sparkles, Send, PlayCircle, AlertCircle
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { signOut } from "@/services/authService";

export default function Ideas() {
  const { user, isApproved, loading: authLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"submit" | "bank" | "override">("submit");

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login");
    }
    if (!authLoading && user && !isApproved) {
      router.replace("/pending-approval");
    }
  }, [user, isApproved, authLoading, router]);

  const handleSignOut = async () => {
    await signOut();
    router.replace("/login");
  };

  if (authLoading || !user || !isApproved) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <SEO 
        title="Ideas Navigation - YouTube Control Room"
        description="Submit content ideas, review idea bank, and manage production overrides"
      />

      <div className="min-h-screen bg-slate-950">
        {/* Header */}
        <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Youtube className="w-6 h-6 text-cyan-400" />
                  <span className="text-xl font-bold text-slate-100">YouTube Control Room</span>
                </div>
              </div>

              <nav className="flex gap-6">
                <Link href="/" className="text-sm font-medium text-secondary hover:text-foreground transition-colors">
                  Overview
                </Link>
                <button className="text-sm font-medium text-accent border-b-2 border-accent pb-1">
                  Ideas
                </button>
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
            <Button onClick={handleSignOut} variant="ghost" size="sm" className="text-slate-400 hover:text-slate-100">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </header>

        <main className="container mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-100 mb-2">Ideas Navigation & Submission</h1>
            <p className="text-slate-400">Submit manual content ideas, review AI-generated suggestions, and manage production overrides</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab("submit")}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                activeTab === "submit"
                  ? "bg-cyan-500 text-slate-950"
                  : "bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800"
              }`}
            >
              <Plus className="w-4 h-4 inline mr-2" />
              Submit Idea
            </button>
            <button
              onClick={() => setActiveTab("bank")}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                activeTab === "bank"
                  ? "bg-cyan-500 text-slate-950"
                  : "bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800"
              }`}
            >
              <Brain className="w-4 h-4 inline mr-2" />
              Idea Bank
            </button>
            <button
              onClick={() => setActiveTab("override")}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                activeTab === "override"
                  ? "bg-cyan-500 text-slate-950"
                  : "bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800"
              }`}
            >
              <SettingsIcon className="w-4 h-4 inline mr-2" />
              Override Controls
            </button>
          </div>

          {/* Submit Idea Form */}
          {activeTab === "submit" && (
            <Card className="bg-slate-900 border-slate-800 p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-slate-100">Submit New Content Idea</h2>
                <p className="text-sm text-slate-400 mt-1">Manually submit a content idea outside AI generation workflow</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-slate-400 block mb-2">Target Channel</label>
                    <select className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100">
                      <option value="">Select channel...</option>
                      <option value="ai-productivity">AI Productivity Hub</option>
                      <option value="crypto-insights">Crypto Insights</option>
                      <option value="mindful-living">Mindful Living</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm text-slate-400 block mb-2">Content Format</label>
                    <select className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100">
                      <option value="">Select format...</option>
                      <option value="shorts">YouTube Shorts (&lt; 60s)</option>
                      <option value="longform">Longform Video (8-15 min)</option>
                      <option value="compilation">Compilation (5-10 min)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm text-slate-400 block mb-2">Priority Level</label>
                    <select className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100">
                      <option value="normal">Normal</option>
                      <option value="high">High - Fast Track</option>
                      <option value="urgent">Urgent - Produce ASAP</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm text-slate-400 block mb-2">Target Metrics</label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between bg-slate-950/50 border border-slate-700 rounded-lg px-3 py-2">
                        <span className="text-xs text-slate-500">Virality Focus</span>
                        <input type="range" min="0" max="100" defaultValue="60" className="w-32 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400" />
                      </div>
                      <div className="flex items-center justify-between bg-slate-950/50 border border-slate-700 rounded-lg px-3 py-2">
                        <span className="text-xs text-slate-500">Monetization Focus</span>
                        <input type="range" min="0" max="100" defaultValue="70" className="w-32 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400" />
                      </div>
                      <div className="flex items-center justify-between bg-slate-950/50 border border-slate-700 rounded-lg px-3 py-2">
                        <span className="text-xs text-slate-500">Evergreen Value</span>
                        <input type="range" min="0" max="100" defaultValue="50" className="w-32 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-slate-400 block mb-2">Idea Title / Topic</label>
                    <input 
                      type="text"
                      placeholder="e.g., Top 10 AI Tools That Actually Save Time in 2026"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 placeholder:text-slate-600"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-slate-400 block mb-2">Detailed Description</label>
                    <textarea 
                      rows={6}
                      placeholder="Explain the concept, target audience, unique angle, key talking points, and expected outcome..."
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 placeholder:text-slate-600 resize-none"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-slate-400 block mb-2">Reference Links (Optional)</label>
                    <input 
                      type="text"
                      placeholder="Add competitor video, trend article, or inspiration source..."
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 placeholder:text-slate-600"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-slate-400 block mb-2">Specific Instructions (Optional)</label>
                    <textarea 
                      rows={3}
                      placeholder="Special requirements: specific hook style, visual direction, provider preference, deadline..."
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 placeholder:text-slate-600 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Estimated Score Preview */}
              <div className="bg-slate-950/50 border border-slate-700 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-medium text-slate-100">Estimated Scoring Preview</div>
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-mono font-bold text-cyan-400">72</div>
                    <div className="text-xs text-slate-500 mt-1">Priority Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-mono font-bold text-emerald-400">65</div>
                    <div className="text-xs text-slate-500 mt-1">Virality</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-mono font-bold text-amber-400">75</div>
                    <div className="text-xs text-slate-500 mt-1">Monetization</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-mono font-bold text-slate-400">55</div>
                    <div className="text-xs text-slate-500 mt-1">Evergreen</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-mono font-bold text-slate-400">80</div>
                    <div className="text-xs text-slate-500 mt-1">Prod. Speed</div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-slate-950">
                  <Send className="w-4 h-4 mr-2" />
                  Submit Idea to Bank
                </Button>
                <Button variant="outline" className="border-slate-700 text-slate-400 hover:bg-slate-800">
                  Save as Draft
                </Button>
              </div>
            </Card>
          )}

          {/* Idea Bank */}
          {activeTab === "bank" && (
            <div className="space-y-4">
              {/* Filters */}
              <Card className="bg-slate-900 border-slate-800 p-4">
                <div className="flex items-center gap-4">
                  <Filter className="w-4 h-4 text-slate-400" />
                  <select className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-slate-100">
                    <option>All Channels</option>
                    <option>AI Productivity Hub</option>
                    <option>Crypto Insights</option>
                    <option>Mindful Living</option>
                  </select>
                  <select className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-slate-100">
                    <option>All Status</option>
                    <option>Pending Review</option>
                    <option>Approved</option>
                    <option>In Production</option>
                    <option>Rejected</option>
                  </select>
                  <select className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-slate-100">
                    <option>Sort: Priority Score</option>
                    <option>Sort: Submission Date</option>
                    <option>Sort: Virality Score</option>
                    <option>Sort: Monetization Score</option>
                  </select>
                </div>
              </Card>

              {/* Idea Cards */}
              {[
                {
                  id: "ID-2847",
                  channel: "AI Productivity Hub",
                  title: "Top 10 AI Tools That Actually Save Time in 2026",
                  format: "Longform",
                  status: "approved",
                  priority: 82,
                  virality: 75,
                  monetization: 85,
                  source: "manual",
                  submittedBy: "coach.janto@gmail.com",
                  submittedAt: "2 hours ago"
                },
                {
                  id: "ID-2846",
                  channel: "Crypto Insights",
                  title: "Bitcoin Just Hit $120K - What This Means for 2026",
                  format: "Shorts",
                  status: "in_production",
                  priority: 91,
                  virality: 88,
                  monetization: 65,
                  source: "ai",
                  submittedBy: "AI Strategy Layer",
                  submittedAt: "4 hours ago"
                },
                {
                  id: "ID-2845",
                  channel: "Mindful Living",
                  title: "5-Minute Morning Meditation for Busy Professionals",
                  format: "Shorts",
                  status: "pending",
                  priority: 68,
                  virality: 62,
                  monetization: 70,
                  source: "manual",
                  submittedBy: "jantodj@gmail.com",
                  submittedAt: "6 hours ago"
                },
                {
                  id: "ID-2844",
                  channel: "AI Productivity Hub",
                  title: "ChatGPT vs Claude vs Gemini - Real Productivity Test",
                  format: "Longform",
                  status: "rejected",
                  priority: 55,
                  virality: 58,
                  monetization: 52,
                  source: "ai",
                  submittedBy: "AI Strategy Layer",
                  submittedAt: "1 day ago"
                }
              ].map((idea, idx) => (
                <Card key={idx} className="bg-slate-900 border-slate-800 p-5 hover:border-slate-700 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-mono text-slate-500">{idea.id}</span>
                        <Badge variant="secondary" className="text-xs">
                          {idea.channel}
                        </Badge>
                        <Badge 
                          variant={idea.source === "ai" ? "default" : "secondary"}
                          className={idea.source === "ai" ? "bg-purple-500/10 text-purple-400 border-purple-500/20" : ""}
                        >
                          {idea.source === "ai" ? <Sparkles className="w-3 h-3 mr-1" /> : <Plus className="w-3 h-3 mr-1" />}
                          {idea.source === "ai" ? "AI Generated" : "Manual"}
                        </Badge>
                      </div>
                      <h3 className="text-base font-semibold text-slate-100 mb-1">{idea.title}</h3>
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span>{idea.format}</span>
                        <span>•</span>
                        <span>By {idea.submittedBy}</span>
                        <span>•</span>
                        <span>{idea.submittedAt}</span>
                      </div>
                    </div>

                    <Badge 
                      variant={
                        idea.status === "approved" ? "default" : 
                        idea.status === "in_production" ? "secondary" :
                        idea.status === "rejected" ? "destructive" : "secondary"
                      }
                      className={
                        idea.status === "approved" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                        idea.status === "in_production" ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" :
                        idea.status === "rejected" ? "" : ""
                      }
                    >
                      {idea.status === "approved" && <CheckCircle2 className="w-3 h-3 mr-1" />}
                      {idea.status === "in_production" && <PlayCircle className="w-3 h-3 mr-1" />}
                      {idea.status === "rejected" && <XCircle className="w-3 h-3 mr-1" />}
                      {idea.status === "pending" && <AlertCircle className="w-3 h-3 mr-1" />}
                      {idea.status === "approved" ? "Approved" : 
                       idea.status === "in_production" ? "In Production" :
                       idea.status === "rejected" ? "Rejected" : "Pending Review"}
                    </Badge>
                  </div>

                  {/* Scores */}
                  <div className="grid grid-cols-3 gap-3 mb-4 bg-slate-950/50 border border-slate-700 rounded-lg p-3">
                    <div className="text-center">
                      <div className="text-lg font-mono font-bold text-cyan-400">{idea.priority}</div>
                      <div className="text-xs text-slate-500">Priority</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-mono font-bold text-emerald-400">{idea.virality}</div>
                      <div className="text-xs text-slate-500">Virality</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-mono font-bold text-amber-400">{idea.monetization}</div>
                      <div className="text-xs text-slate-500">Monetization</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {idea.status === "pending" && (
                      <>
                        <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-white">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" className="border-slate-700 text-slate-400 hover:bg-slate-800">
                          Revise
                        </Button>
                        <Button size="sm" variant="destructive">
                          <XCircle className="w-3 h-3 mr-1" />
                          Reject
                        </Button>
                      </>
                    )}
                    {idea.status === "approved" && (
                      <Button size="sm" className="bg-cyan-500 hover:bg-cyan-600 text-slate-950">
                        <PlayCircle className="w-3 h-3 mr-1" />
                        Start Production
                      </Button>
                    )}
                    {idea.status === "in_production" && (
                      <Button size="sm" variant="outline" className="border-slate-700 text-slate-400">
                        View Production Status
                      </Button>
                    )}
                    {idea.status === "rejected" && (
                      <Button size="sm" variant="outline" className="border-slate-700 text-slate-400">
                        Restore to Bank
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Override Controls */}
          {activeTab === "override" && (
            <Card className="bg-slate-900 border-slate-800 p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-slate-100">Production Override Controls</h2>
                <p className="text-sm text-slate-400 mt-1">Manually intervene in active production workflows when needed</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-slate-400 block mb-2">Select Active Production</label>
                    <select className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100">
                      <option value="">Choose production to override...</option>
                      <option value="prod-847">AI Productivity Hub - Scene 4 Rendering (Kling)</option>
                      <option value="prod-846">Crypto Insights - Awaiting Video Review</option>
                      <option value="prod-845">Mindful Living - Idle, Ready for Ideas</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm text-slate-400 block mb-2">Override Type</label>
                    <select className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100">
                      <option value="">Select override action...</option>
                      <option value="skip_approval">Skip Approval - Publish Immediately</option>
                      <option value="change_provider">Switch Provider (Kling → Veo)</option>
                      <option value="force_retry">Force Retry Failed Command</option>
                      <option value="pause_workflow">Pause Workflow</option>
                      <option value="cancel_production">Cancel Production</option>
                      <option value="fast_track">Fast Track - Jump Queue Priority</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm text-slate-400 block mb-2">Reason (Required)</label>
                    <textarea 
                      rows={4}
                      placeholder="Explain why this manual override is necessary..."
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 placeholder:text-slate-600 resize-none"
                    />
                  </div>
                </div>

                {/* Right Column - Impact Preview */}
                <div className="bg-slate-950/50 border border-slate-700 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertCircle className="w-5 h-5 text-amber-400" />
                    <div className="text-sm font-medium text-slate-100">Override Impact Preview</div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-3">
                      <div className="text-xs text-slate-500 mb-1">Current Status</div>
                      <div className="text-sm text-slate-100">AI Productivity Hub - Rendering Scene 4 of 7</div>
                    </div>

                    <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-3">
                      <div className="text-xs text-slate-500 mb-1">After Override</div>
                      <div className="text-sm text-cyan-400">Production will skip approval and publish directly to schedule</div>
                    </div>

                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                      <div className="text-xs text-amber-400 font-medium mb-1">Warning</div>
                      <div className="text-xs text-slate-300">Bypassing review may publish content that hasn't been quality-checked. Ensure you've manually verified the video meets standards.</div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500">Estimated Time Saved</span>
                        <span className="font-mono text-emerald-400">~45 minutes</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500">Risk Level</span>
                        <span className="font-mono text-amber-400">Medium</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500">Workflow Stage After</span>
                        <span className="font-mono text-cyan-400">Scheduled</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button className="flex-1 bg-amber-500 hover:bg-amber-600 text-slate-950">
                  <Zap className="w-4 h-4 mr-2" />
                  Execute Override
                </Button>
                <Button variant="outline" className="border-slate-700 text-slate-400 hover:bg-slate-800">
                  Cancel
                </Button>
              </div>
            </Card>
          )}
        </main>
      </div>
    </>
  );
}
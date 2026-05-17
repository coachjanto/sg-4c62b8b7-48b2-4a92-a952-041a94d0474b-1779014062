import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { 
  Youtube, 
  Brain, 
  Sparkles, 
  Video, 
  Sheet, 
  Calendar, 
  Webhook,
  CheckCircle2,
  XCircle,
  Key,
  ArrowLeft
} from "lucide-react";
import { useState, useEffect } from "react";

type ConnectionStatus = "connected" | "disconnected" | "testing";

type ServiceConfig = {
  youtube: ConnectionStatus;
  openai: ConnectionStatus;
  claude: ConnectionStatus;
  kling: ConnectionStatus;
  veo: ConnectionStatus;
  googleSheets: ConnectionStatus;
  googleCalendar: ConnectionStatus;
  n8n: ConnectionStatus;
};

export default function Settings() {
  const [config, setConfig] = useState<ServiceConfig>({
    youtube: "disconnected",
    openai: "disconnected",
    claude: "disconnected",
    kling: "disconnected",
    veo: "disconnected",
    googleSheets: "disconnected",
    googleCalendar: "disconnected",
    n8n: "disconnected",
  });

  const [apiKeys, setApiKeys] = useState({
    openai: "",
    claude: "",
    kling: "",
    veo: "",
    n8nWebhook: "",
  });

  useEffect(() => {
    // Load connection status from localStorage
    const savedConfig = localStorage.getItem("serviceConfig");
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig));
    }

    // Load masked API keys from env (simulated - in production these would be backend-validated)
    const envKeys = {
      openai: process.env.NEXT_PUBLIC_OPENAI_API_KEY ? "sk-••••••••••••••••" : "",
      claude: process.env.NEXT_PUBLIC_CLAUDE_API_KEY ? "sk-ant-••••••••••••" : "",
      kling: process.env.NEXT_PUBLIC_KLING_API_KEY ? "••••••••••••••••" : "",
      veo: process.env.NEXT_PUBLIC_VEO_API_KEY ? "••••••••••••••••" : "",
      n8nWebhook: process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || "",
    };
    setApiKeys(envKeys);
  }, []);

  const saveConfig = (updates: Partial<ServiceConfig>) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    localStorage.setItem("serviceConfig", JSON.stringify(newConfig));
  };

  const handleYoutubeConnect = () => {
    // In production: redirect to YouTube OAuth
    alert("YouTube OAuth flow would trigger here. User would authorize and return with access token.");
    saveConfig({ youtube: "connected" });
  };

  const handleGoogleSheetsConnect = () => {
    // In production: redirect to Google Sheets OAuth
    alert("Google Sheets OAuth flow would trigger here.");
    saveConfig({ googleSheets: "connected" });
  };

  const handleGoogleCalendarConnect = () => {
    // In production: redirect to Google Calendar OAuth
    alert("Google Calendar OAuth flow would trigger here.");
    saveConfig({ googleCalendar: "connected" });
  };

  const handleApiKeyTest = async (service: keyof ServiceConfig) => {
    setConfig({ ...config, [service]: "testing" });
    
    // Simulate API test
    setTimeout(() => {
      saveConfig({ [service]: "connected" });
      alert(`${service} API key validated successfully!`);
    }, 1500);
  };

  const handleDisconnect = (service: keyof ServiceConfig) => {
    saveConfig({ [service]: "disconnected" });
  };

  return (
    <>
      <SEO 
        title="Settings — API Integrations | YouTube Control Room"
        description="Configure YouTube, AI services, and automation integrations"
      />
      
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-card">
          <div className="mx-auto max-w-[1600px] px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/" className="text-secondary hover:text-accent transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                  <h1 className="text-2xl font-bold tracking-wide text-foreground">
                    SETTINGS
                  </h1>
                  <p className="text-sm text-secondary">
                    API Integrations & Connections
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="mx-auto max-w-[1200px] px-6 py-8">
          {/* YouTube Connection */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              YouTube Account
            </h2>
            
            <Card className="p-6 bg-card border-border">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                    <Youtube className="w-6 h-6 text-danger" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground mb-1">
                      YouTube Data API v3
                    </h3>
                    <p className="text-sm text-secondary mb-3">
                      Connect your YouTube account to manage channels and upload videos
                    </p>
                    {config.youtube === "connected" && (
                      <div className="flex items-center gap-2 mb-3">
                        <Badge className="bg-success/20 text-success border-success/30">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Connected
                        </Badge>
                        <span className="text-sm text-secondary">
                          user@example.com
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                {config.youtube === "disconnected" ? (
                  <Button 
                    onClick={handleYoutubeConnect}
                    className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    Connect Account
                  </Button>
                ) : (
                  <Button 
                    onClick={() => handleDisconnect("youtube")}
                    variant="outline"
                    className="border-border text-secondary hover:text-foreground"
                  >
                    Disconnect
                  </Button>
                )}
              </div>
            </Card>
          </section>

          {/* AI Services */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              AI Services
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* OpenAI */}
              <Card className="p-6 bg-card border-border">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <Brain className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-semibold text-foreground">
                        OpenAI
                      </h3>
                      {config.openai === "connected" && (
                        <Badge className="bg-success/20 text-success border-success/30 text-xs">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Active
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-secondary">
                      GPT-4 for content generation
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="openai-key" className="text-sm text-secondary mb-1.5 block">
                      API Key
                    </Label>
                    <Input
                      id="openai-key"
                      type="password"
                      placeholder="sk-..."
                      value={apiKeys.openai}
                      onChange={(e) => setApiKeys({ ...apiKeys, openai: e.target.value })}
                      className="bg-muted border-border text-foreground font-mono text-sm"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleApiKeyTest("openai")}
                      disabled={config.openai === "testing"}
                      className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                    >
                      {config.openai === "testing" ? "Testing..." : "Test Connection"}
                    </Button>
                    {config.openai === "connected" && (
                      <Button 
                        onClick={() => handleDisconnect("openai")}
                        variant="outline"
                        className="border-border text-secondary hover:text-foreground"
                      >
                        <XCircle className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </Card>

              {/* Claude */}
              <Card className="p-6 bg-card border-border">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-semibold text-foreground">
                        Claude
                      </h3>
                      {config.claude === "connected" && (
                        <Badge className="bg-success/20 text-success border-success/30 text-xs">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Active
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-secondary">
                      Anthropic Claude for analysis
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="claude-key" className="text-sm text-secondary mb-1.5 block">
                      API Key
                    </Label>
                    <Input
                      id="claude-key"
                      type="password"
                      placeholder="sk-ant-..."
                      value={apiKeys.claude}
                      onChange={(e) => setApiKeys({ ...apiKeys, claude: e.target.value })}
                      className="bg-muted border-border text-foreground font-mono text-sm"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleApiKeyTest("claude")}
                      disabled={config.claude === "testing"}
                      className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                    >
                      {config.claude === "testing" ? "Testing..." : "Test Connection"}
                    </Button>
                    {config.claude === "connected" && (
                      <Button 
                        onClick={() => handleDisconnect("claude")}
                        variant="outline"
                        className="border-border text-secondary hover:text-foreground"
                      >
                        <XCircle className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </Card>

              {/* Kling */}
              <Card className="p-6 bg-card border-border">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <Video className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-semibold text-foreground">
                        Kling AI
                      </h3>
                      {config.kling === "connected" && (
                        <Badge className="bg-success/20 text-success border-success/30 text-xs">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Active
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-secondary">
                      AI video generation
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="kling-key" className="text-sm text-secondary mb-1.5 block">
                      API Key
                    </Label>
                    <Input
                      id="kling-key"
                      type="password"
                      placeholder="Enter API key..."
                      value={apiKeys.kling}
                      onChange={(e) => setApiKeys({ ...apiKeys, kling: e.target.value })}
                      className="bg-muted border-border text-foreground font-mono text-sm"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleApiKeyTest("kling")}
                      disabled={config.kling === "testing"}
                      className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                    >
                      {config.kling === "testing" ? "Testing..." : "Test Connection"}
                    </Button>
                    {config.kling === "connected" && (
                      <Button 
                        onClick={() => handleDisconnect("kling")}
                        variant="outline"
                        className="border-border text-secondary hover:text-foreground"
                      >
                        <XCircle className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </Card>

              {/* Veo */}
              <Card className="p-6 bg-card border-border">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <Video className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-semibold text-foreground">
                        Google Veo
                      </h3>
                      {config.veo === "connected" && (
                        <Badge className="bg-success/20 text-success border-success/30 text-xs">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Active
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-secondary">
                      Google video synthesis
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="veo-key" className="text-sm text-secondary mb-1.5 block">
                      API Key
                    </Label>
                    <Input
                      id="veo-key"
                      type="password"
                      placeholder="Enter API key..."
                      value={apiKeys.veo}
                      onChange={(e) => setApiKeys({ ...apiKeys, veo: e.target.value })}
                      className="bg-muted border-border text-foreground font-mono text-sm"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleApiKeyTest("veo")}
                      disabled={config.veo === "testing"}
                      className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                    >
                      {config.veo === "testing" ? "Testing..." : "Test Connection"}
                    </Button>
                    {config.veo === "connected" && (
                      <Button 
                        onClick={() => handleDisconnect("veo")}
                        variant="outline"
                        className="border-border text-secondary hover:text-foreground"
                      >
                        <XCircle className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* Google Services */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Google Services
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Google Sheets */}
              <Card className="p-6 bg-card border-border">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <Sheet className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-base font-semibold text-foreground">
                          Google Sheets
                        </h3>
                        {config.googleSheets === "connected" && (
                          <Badge className="bg-success/20 text-success border-success/30 text-xs">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Active
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-secondary">
                        Content planning & data export
                      </p>
                    </div>
                  </div>
                  
                  {config.googleSheets === "disconnected" ? (
                    <Button 
                      onClick={handleGoogleSheetsConnect}
                      size="sm"
                      className="bg-accent hover:bg-accent/90 text-accent-foreground"
                    >
                      Connect
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => handleDisconnect("googleSheets")}
                      size="sm"
                      variant="outline"
                      className="border-border text-secondary hover:text-foreground"
                    >
                      Disconnect
                    </Button>
                  )}
                </div>
              </Card>

              {/* Google Calendar */}
              <Card className="p-6 bg-card border-border">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-base font-semibold text-foreground">
                          Google Calendar
                        </h3>
                        {config.googleCalendar === "connected" && (
                          <Badge className="bg-success/20 text-success border-success/30 text-xs">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Active
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-secondary">
                        Upload scheduling
                      </p>
                    </div>
                  </div>
                  
                  {config.googleCalendar === "disconnected" ? (
                    <Button 
                      onClick={handleGoogleCalendarConnect}
                      size="sm"
                      className="bg-accent hover:bg-accent/90 text-accent-foreground"
                    >
                      Connect
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => handleDisconnect("googleCalendar")}
                      size="sm"
                      variant="outline"
                      className="border-border text-secondary hover:text-foreground"
                    >
                      Disconnect
                    </Button>
                  )}
                </div>
              </Card>
            </div>
          </section>

          {/* Automation */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Automation
            </h2>
            
            <Card className="p-6 bg-card border-border">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <Webhook className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base font-semibold text-foreground">
                      n8n Workflows
                    </h3>
                    {config.n8n === "connected" && (
                      <Badge className="bg-success/20 text-success border-success/30 text-xs">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Active
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-secondary">
                    Workflow automation webhooks
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <Label htmlFor="n8n-webhook" className="text-sm text-secondary mb-1.5 block">
                    Webhook URL
                  </Label>
                  <Input
                    id="n8n-webhook"
                    type="url"
                    placeholder="https://your-n8n-instance.com/webhook/..."
                    value={apiKeys.n8nWebhook}
                    onChange={(e) => setApiKeys({ ...apiKeys, n8nWebhook: e.target.value })}
                    className="bg-muted border-border text-foreground font-mono text-sm"
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={() => handleApiKeyTest("n8n")}
                    disabled={config.n8n === "testing"}
                    className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    {config.n8n === "testing" ? "Testing..." : "Test Connection"}
                  </Button>
                  {config.n8n === "connected" && (
                    <Button 
                      onClick={() => handleDisconnect("n8n")}
                      variant="outline"
                      className="border-border text-secondary hover:text-foreground"
                    >
                      <XCircle className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </section>

          {/* Instructions */}
          <Card className="p-6 bg-muted/50 border-warning/30">
            <div className="flex items-start gap-3">
              <Key className="w-5 h-5 text-warning mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">
                  Security Notice
                </h3>
                <p className="text-sm text-secondary leading-relaxed">
                  API keys are stored in your <code className="px-1.5 py-0.5 rounded bg-background text-accent font-mono text-xs">.env.local</code> file. 
                  Never commit this file to version control. Add these environment variables:
                </p>
                <div className="mt-3 p-3 bg-background rounded-lg border border-border">
                  <code className="text-xs text-secondary font-mono block space-y-1">
                    <div>NEXT_PUBLIC_OPENAI_API_KEY=your_key_here</div>
                    <div>NEXT_PUBLIC_CLAUDE_API_KEY=your_key_here</div>
                    <div>NEXT_PUBLIC_KLING_API_KEY=your_key_here</div>
                    <div>NEXT_PUBLIC_VEO_API_KEY=your_key_here</div>
                    <div>NEXT_PUBLIC_N8N_WEBHOOK_URL=your_webhook_url</div>
                  </code>
                </div>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </>
  );
}
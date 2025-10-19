import { useEffect, useState } from "react";
import { useDocumentTitle } from "@/lib/useDocumentTitle";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  Download, 
  RefreshCw, 
  Save, 
  Plus, 
  Trash2, 
  Shield,
  Calendar,
  BookOpen,
  Radio,
  AlertCircle
} from "lucide-react";

const DATA_KEYS = ["rules", "events", "guides", "stream"] as const;
type DataKey = (typeof DATA_KEYS)[number];

type RuleCategory = { icon: string; title: string; rules: string[] };
type EventItem = {
  id: number;
  title: string;
  date: string;
  status: string;
  description?: string;
  winners?: string;
  youtubeLink?: string;
  twitchLink?: string;
  participants?: string;
  prize?: string;
};
type GuideItem = {
  id: string;
  title: string;
  description?: string;
  steamGuides?: { url: string; label?: string }[];
  videos?: { id: string; label?: string }[];
  tools?: { url: string; label?: string }[];
  images?: { src: string; alt?: string }[];
  note?: string;
};
type StreamData = {
  twitch: { name: string; username: string; url: string }[];
  youtube: { name: string; channelId: string; url: string }[];
};

const Admin = () => {
  useDocumentTitle("Admin - Civ 3 League");
  const [active, setActive] = useState<DataKey>("rules");
  const [status, setStatus] = useState<string | null>(null);
  const [rulesStructured, setRulesStructured] = useState<RuleCategory[] | null>(null);
  const [eventsStructured, setEventsStructured] = useState<EventItem[] | null>(null);
  const [guidesStructured, setGuidesStructured] = useState<GuideItem[] | null>(null);
  const [streamStructured, setStreamStructured] = useState<StreamData | null>(null);

  const load = async (key: DataKey) => {
    setStatus("Loading...");
    try {
      const res = await fetch(`${import.meta.env.BASE_URL}data/${key}.json`);
      if (!res.ok) throw new Error(`Failed to load /data/${key}.json`);
      const json = await res.json();
      if (key === "rules") setRulesStructured(Array.isArray(json) ? json : []);
      if (key === "events") setEventsStructured(Array.isArray(json) ? json : []);
      if (key === "guides") setGuidesStructured(Array.isArray(json) ? json : []);
      if (key === "stream") setStreamStructured(json as StreamData);
      setStatus("✓ Loaded successfully");
    } catch (err: unknown) {
      console.error(err);
      const message = err instanceof Error ? err.message : String(err);
      setStatus("✗ Error: " + message);
    }
  };

  useEffect(() => {
    load(active);
  }, [active]);

  const getActiveBody = () => {
    switch (active) {
      case "rules":
        return (rulesStructured ?? []) as unknown;
      case "events":
        return (eventsStructured ?? []) as unknown;
      case "guides":
        return (guidesStructured ?? []) as unknown;
      case "stream":
        return (streamStructured ?? { twitch: [], youtube: [] }) as unknown;
      default:
        return {} as unknown;
    }
  };

  const save = () => {
    const body = getActiveBody();
    const payload = typeof body === "string" ? body : JSON.stringify(body, null, 2);
    const blob = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${active}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setStatus("✓ Downloaded — Replace file in public/data/ and commit");
  };

  const getIcon = (key: DataKey) => {
    switch (key) {
      case "rules": return Shield;
      case "events": return Calendar;
      case "guides": return BookOpen;
      case "stream": return Radio;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Settings className="w-10 h-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-gradient">
              Admin Panel
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Manage site content and configuration
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {DATA_KEYS.map((k) => {
            const Icon = getIcon(k);
            return (
              <Button
                key={k}
                variant={k === active ? "default" : "outline"}
                onClick={() => setActive(k)}
                className={
                  k === active 
                    ? "bg-primary hover:bg-primary/90 text-white"
                    : "text-foreground hover:text-primary hover:bg-primary/10"
                }
              >
                <Icon className="w-4 h-4 mr-2" />
                <span className="capitalize">{k}</span>
              </Button>
            );
          })}
        </div>

        {/* Action Bar */}
        <Card className="gaming-card mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm">
                {status && (
                  <Badge variant={status.startsWith("✓") ? "default" : "destructive"} className="text-white">
                    {status}
                  </Badge>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => load(active)} className="text-foreground hover:text-primary">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reload
                </Button>
                <Button onClick={save} className="bg-primary hover:bg-primary/90 text-white">
                  <Save className="w-4 h-4 mr-2" />
                  Save & Download
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Editor */}
        <div>
          {active === "rules" && (
            <div className="space-y-6">
              {(rulesStructured || []).map((cat, ci) => (
                <Card key={ci} className="gaming-card">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <input
                        className="w-32 p-2 border border-border rounded bg-background text-foreground"
                        placeholder="Icon"
                        value={cat.icon}
                        onChange={(e) => {
                          const copy = (rulesStructured || []).slice();
                          copy[ci] = { ...copy[ci], icon: e.target.value };
                          setRulesStructured(copy);
                        }}
                      />
                      <input
                        className="flex-1 p-2 border border-border rounded bg-background text-foreground font-semibold text-lg"
                        placeholder="Category Title"
                        value={cat.title}
                        onChange={(e) => {
                          const copy = (rulesStructured || []).slice();
                          copy[ci] = { ...copy[ci], title: e.target.value };
                          setRulesStructured(copy);
                        }}
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          const copy = (rulesStructured || []).slice();
                          copy.splice(ci, 1);
                          setRulesStructured(copy);
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Remove Category
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {(cat.rules || []).map((r, ri) => (
                      <div key={ri} className="flex gap-2 items-start">
                        <Badge variant="outline" className="mt-2 flex-shrink-0 text-foreground">
                          {ri + 1}
                        </Badge>
                        <textarea
                          className="flex-1 p-3 border border-border rounded bg-background text-foreground min-h-[80px]"
                          placeholder="Rule description..."
                          value={r}
                          onChange={(e) => {
                            const copy = (rulesStructured || []).slice();
                            copy[ci].rules[ri] = e.target.value;
                            setRulesStructured(copy);
                          }}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const copy = (rulesStructured || []).slice();
                            copy[ci].rules.splice(ri, 1);
                            setRulesStructured(copy);
                          }}
                          className="hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const copy = (rulesStructured || []).slice();
                        copy[ci].rules.push("New rule");
                        setRulesStructured(copy);
                      }}
                      className="text-foreground hover:text-primary hover:bg-primary/10"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Rule
                    </Button>
                  </CardContent>
                </Card>
              ))}

              <Button
                onClick={() => {
                  const copy = (rulesStructured || []).slice();
                  copy.push({ icon: "Shield", title: "New Category", rules: ["New rule"] });
                  setRulesStructured(copy);
                }}
                className="w-full bg-primary hover:bg-primary/90 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Category
              </Button>
            </div>
          )}

          {active === "events" && (
            <div className="space-y-6">
              {(eventsStructured || []).map((ev, ei) => (
                <Card key={ev.id ?? ei} className="gaming-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl text-foreground">Event #{ev.id}</CardTitle>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          const copy = (eventsStructured || []).slice();
                          copy.splice(ei, 1);
                          setEventsStructured(copy);
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                          Title
                        </label>
                        <input
                          className="w-full p-2 border border-border rounded bg-background text-foreground"
                          value={ev.title}
                          onChange={(e) => {
                            const copy = (eventsStructured || []).slice();
                            copy[ei] = { ...copy[ei], title: e.target.value };
                            setEventsStructured(copy);
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                          Date Range
                        </label>
                        <input
                          className="w-full p-2 border border-border rounded bg-background text-foreground"
                          value={ev.date}
                          onChange={(e) => {
                            const copy = (eventsStructured || []).slice();
                            copy[ei] = { ...copy[ei], date: e.target.value };
                            setEventsStructured(copy);
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                          Status
                        </label>
                        <select
                          className="w-full p-2 border border-border rounded bg-background text-foreground"
                          value={ev.status}
                          onChange={(e) => {
                            const copy = (eventsStructured || []).slice();
                            copy[ei] = { ...copy[ei], status: e.target.value };
                            setEventsStructured(copy);
                          }}
                        >
                          <option value="upcoming">Upcoming</option>
                          <option value="ongoing">Ongoing</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                          Participants
                        </label>
                        <input
                          className="w-full p-2 border border-border rounded bg-background text-foreground"
                          value={ev.participants || ""}
                          placeholder="e.g., 32"
                          onChange={(e) => {
                            const copy = (eventsStructured || []).slice();
                            copy[ei] = { ...copy[ei], participants: e.target.value };
                            setEventsStructured(copy);
                          }}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                          Description
                        </label>
                        <textarea
                          className="w-full p-2 border border-border rounded bg-background text-foreground min-h-[60px]"
                          value={ev.description || ""}
                          onChange={(e) => {
                            const copy = (eventsStructured || []).slice();
                            copy[ei] = { ...copy[ei], description: e.target.value };
                            setEventsStructured(copy);
                          }}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                          Winners
                        </label>
                        <input
                          className="w-full p-2 border border-border rounded bg-background text-foreground"
                          value={ev.winners || ""}
                          placeholder="Champion: Name | Runner-up: Name..."
                          onChange={(e) => {
                            const copy = (eventsStructured || []).slice();
                            copy[ei] = { ...copy[ei], winners: e.target.value };
                            setEventsStructured(copy);
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                          Prize
                        </label>
                        <input
                          className="w-full p-2 border border-border rounded bg-background text-foreground"
                          value={ev.prize || ""}
                          placeholder="e.g., 5000 League Points"
                          onChange={(e) => {
                            const copy = (eventsStructured || []).slice();
                            copy[ei] = { ...copy[ei], prize: e.target.value };
                            setEventsStructured(copy);
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                          YouTube Link
                        </label>
                        <input
                          className="w-full p-2 border border-border rounded bg-background text-foreground"
                          value={ev.youtubeLink || ""}
                          placeholder="https://youtube.com/..."
                          onChange={(e) => {
                            const copy = (eventsStructured || []).slice();
                            copy[ei] = { ...copy[ei], youtubeLink: e.target.value };
                            setEventsStructured(copy);
                          }}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                          Twitch Link
                        </label>
                        <input
                          className="w-full p-2 border border-border rounded bg-background text-foreground"
                          value={ev.twitchLink || ""}
                          placeholder="https://twitch.tv/..."
                          onChange={(e) => {
                            const copy = (eventsStructured || []).slice();
                            copy[ei] = { ...copy[ei], twitchLink: e.target.value };
                            setEventsStructured(copy);
                          }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Button
                onClick={() => {
                  const copy = (eventsStructured || []).slice();
                  const newId = copy.length > 0 ? Math.max(...copy.map(e => e.id)) + 1 : 1;
                  copy.push({
                    id: newId,
                    title: "New Event",
                    date: "TBD",
                    status: "upcoming",
                    description: "",
                    winners: "TBD",
                    participants: "",
                    prize: ""
                  });
                  setEventsStructured(copy);
                }}
                className="w-full bg-primary hover:bg-primary/90 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Event
              </Button>
            </div>
          )}

          {active === "guides" && (
            <div className="space-y-6">
              {(guidesStructured || []).map((g, gi) => (
                <Card key={g.id ?? gi} className="gaming-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl text-foreground">Guide: {g.title || g.id}</CardTitle>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          const copy = (guidesStructured || []).slice();
                          copy.splice(gi, 1);
                          setGuidesStructured(copy);
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">ID</label>
                        <input
                          className="w-full p-2 border border-border rounded bg-background text-foreground"
                          value={g.id}
                          onChange={(e) => {
                            const copy = (guidesStructured || []).slice();
                            copy[gi] = { ...copy[gi], id: e.target.value };
                            setGuidesStructured(copy);
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">Title</label>
                        <input
                          className="w-full p-2 border border-border rounded bg-background text-foreground"
                          value={g.title}
                          onChange={(e) => {
                            const copy = (guidesStructured || []).slice();
                            copy[gi] = { ...copy[gi], title: e.target.value };
                            setGuidesStructured(copy);
                          }}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-muted-foreground mb-2">Description</label>
                        <textarea
                          className="w-full p-2 border border-border rounded bg-background text-foreground min-h-[60px]"
                          value={g.description || ""}
                          onChange={(e) => {
                            const copy = (guidesStructured || []).slice();
                            copy[gi] = { ...copy[gi], description: e.target.value };
                            setGuidesStructured(copy);
                          }}
                        />
                      </div>
                    </div>

                    {/* Steam Guides */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-foreground">Steam Guides</h3>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const copy = (guidesStructured || []).slice();
                            const list = copy[gi].steamGuides ? copy[gi].steamGuides.slice() : [];
                            list.push({ url: "", label: "" });
                            copy[gi] = { ...copy[gi], steamGuides: list };
                            setGuidesStructured(copy);
                          }}
                          className="text-foreground hover:text-primary hover:bg-primary/10"
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add
                        </Button>
                      </div>
                      {(g.steamGuides || []).map((sg, si) => (
                        <div key={si} className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center">
                          <input
                            className="p-2 border border-border rounded bg-background text-foreground"
                            placeholder="URL"
                            value={sg.url}
                            onChange={(e) => {
                              const copy = (guidesStructured || []).slice();
                              const list = (copy[gi].steamGuides || []).slice();
                              list[si] = { ...list[si], url: e.target.value };
                              copy[gi] = { ...copy[gi], steamGuides: list };
                              setGuidesStructured(copy);
                            }}
                          />
                          <div className="flex gap-2">
                            <input
                              className="flex-1 p-2 border border-border rounded bg-background text-foreground"
                              placeholder="Label"
                              value={sg.label || ""}
                              onChange={(e) => {
                                const copy = (guidesStructured || []).slice();
                                const list = (copy[gi].steamGuides || []).slice();
                                list[si] = { ...list[si], label: e.target.value };
                                copy[gi] = { ...copy[gi], steamGuides: list };
                                setGuidesStructured(copy);
                              }}
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const copy = (guidesStructured || []).slice();
                                const list = (copy[gi].steamGuides || []).slice();
                                list.splice(si, 1);
                                copy[gi] = { ...copy[gi], steamGuides: list };
                                setGuidesStructured(copy);
                              }}
                              className="hover:bg-red-500/10"
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Videos */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-foreground">Videos (YouTube IDs)</h3>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const copy = (guidesStructured || []).slice();
                            const list = copy[gi].videos ? copy[gi].videos.slice() : [];
                            list.push({ id: "", label: "" });
                            copy[gi] = { ...copy[gi], videos: list };
                            setGuidesStructured(copy);
                          }}
                          className="text-foreground hover:text-primary hover:bg-primary/10"
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add
                        </Button>
                      </div>
                      {(g.videos || []).map((v, vi) => (
                        <div key={vi} className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center">
                          <input
                            className="p-2 border border-border rounded bg-background text-foreground"
                            placeholder="YouTube Video ID"
                            value={v.id}
                            onChange={(e) => {
                              const copy = (guidesStructured || []).slice();
                              const list = (copy[gi].videos || []).slice();
                              list[vi] = { ...list[vi], id: e.target.value };
                              copy[gi] = { ...copy[gi], videos: list };
                              setGuidesStructured(copy);
                            }}
                          />
                          <div className="flex gap-2">
                            <input
                              className="flex-1 p-2 border border-border rounded bg-background text-foreground"
                              placeholder="Label"
                              value={v.label || ""}
                              onChange={(e) => {
                                const copy = (guidesStructured || []).slice();
                                const list = (copy[gi].videos || []).slice();
                                list[vi] = { ...list[vi], label: e.target.value };
                                copy[gi] = { ...copy[gi], videos: list };
                                setGuidesStructured(copy);
                              }}
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const copy = (guidesStructured || []).slice();
                                const list = (copy[gi].videos || []).slice();
                                list.splice(vi, 1);
                                copy[gi] = { ...copy[gi], videos: list };
                                setGuidesStructured(copy);
                              }}
                              className="hover:bg-red-500/10"
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tools */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-foreground">Tools</h3>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const copy = (guidesStructured || []).slice();
                            const list = copy[gi].tools ? copy[gi].tools.slice() : [];
                            list.push({ url: "", label: "" });
                            copy[gi] = { ...copy[gi], tools: list };
                            setGuidesStructured(copy);
                          }}
                          className="text-foreground hover:text-primary hover:bg-primary/10"
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add
                        </Button>
                      </div>
                      {(g.tools || []).map((tool, ti) => (
                        <div key={ti} className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center">
                          <input
                            className="p-2 border border-border rounded bg-background text-foreground"
                            placeholder="URL"
                            value={tool.url}
                            onChange={(e) => {
                              const copy = (guidesStructured || []).slice();
                              const list = (copy[gi].tools || []).slice();
                              list[ti] = { ...list[ti], url: e.target.value };
                              copy[gi] = { ...copy[gi], tools: list };
                              setGuidesStructured(copy);
                            }}
                          />
                          <div className="flex gap-2">
                            <input
                              className="flex-1 p-2 border border-border rounded bg-background text-foreground"
                              placeholder="Label"
                              value={tool.label || ""}
                              onChange={(e) => {
                                const copy = (guidesStructured || []).slice();
                                const list = (copy[gi].tools || []).slice();
                                list[ti] = { ...list[ti], label: e.target.value };
                                copy[gi] = { ...copy[gi], tools: list };
                                setGuidesStructured(copy);
                              }}
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const copy = (guidesStructured || []).slice();
                                const list = (copy[gi].tools || []).slice();
                                list.splice(ti, 1);
                                copy[gi] = { ...copy[gi], tools: list };
                                setGuidesStructured(copy);
                              }}
                              className="hover:bg-red-500/10"
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Images */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-foreground">Images</h3>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const copy = (guidesStructured || []).slice();
                            const list = copy[gi].images ? copy[gi].images.slice() : [];
                            list.push({ src: "", alt: "" });
                            copy[gi] = { ...copy[gi], images: list };
                            setGuidesStructured(copy);
                          }}
                          className="text-foreground hover:text-primary hover:bg-primary/10"
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add
                        </Button>
                      </div>
                      {(g.images || []).map((img, ii) => (
                        <div key={ii} className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center">
                          <input
                            className="p-2 border border-border rounded bg-background text-foreground"
                            placeholder="Image src (path or URL)"
                            value={img.src}
                            onChange={(e) => {
                              const copy = (guidesStructured || []).slice();
                              const list = (copy[gi].images || []).slice();
                              list[ii] = { ...list[ii], src: e.target.value };
                              copy[gi] = { ...copy[gi], images: list };
                              setGuidesStructured(copy);
                            }}
                          />
                          <div className="flex gap-2">
                            <input
                              className="flex-1 p-2 border border-border rounded bg-background text-foreground"
                              placeholder="Alt text"
                              value={img.alt || ""}
                              onChange={(e) => {
                                const copy = (guidesStructured || []).slice();
                                const list = (copy[gi].images || []).slice();
                                list[ii] = { ...list[ii], alt: e.target.value };
                                copy[gi] = { ...copy[gi], images: list };
                                setGuidesStructured(copy);
                              }}
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const copy = (guidesStructured || []).slice();
                                const list = (copy[gi].images || []).slice();
                                list.splice(ii, 1);
                                copy[gi] = { ...copy[gi], images: list };
                                setGuidesStructured(copy);
                              }}
                              className="hover:bg-red-500/10"
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Button
                onClick={() => {
                  const list = (guidesStructured || []).slice();
                  list.push({ id: "new", title: "New Guide", description: "", steamGuides: [], videos: [], tools: [], images: [] });
                  setGuidesStructured(list);
                }}
                className="w-full bg-primary hover:bg-primary/90 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Guide
              </Button>
            </div>
          )}

          {active === "stream" && (
            <div className="space-y-6">
              {/* Twitch Streamers */}
              <Card className="gaming-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Twitch Streamers</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {(streamStructured?.twitch || []).map((streamer, si) => (
                    <div key={si} className="grid grid-cols-3 gap-2">
                      <input
                        className="p-2 border border-border rounded bg-background text-foreground"
                        placeholder="Name"
                        value={streamer.name}
                        onChange={(e) => {
                          const copy = { ...streamStructured, twitch: [...(streamStructured?.twitch || [])] };
                          copy.twitch[si] = { ...copy.twitch[si], name: e.target.value };
                          setStreamStructured(copy as StreamData);
                        }}
                      />
                      <input
                        className="p-2 border border-border rounded bg-background text-foreground"
                        placeholder="Username"
                        value={streamer.username}
                        onChange={(e) => {
                          const copy = { ...streamStructured, twitch: [...(streamStructured?.twitch || [])] };
                          copy.twitch[si] = { ...copy.twitch[si], username: e.target.value };
                          setStreamStructured(copy as StreamData);
                        }}
                      />
                      <div className="flex gap-2">
                        <input
                          className="flex-1 p-2 border border-border rounded bg-background text-foreground"
                          placeholder="URL"
                          value={streamer.url}
                          onChange={(e) => {
                            const copy = { ...streamStructured, twitch: [...(streamStructured?.twitch || [])] };
                            copy.twitch[si] = { ...copy.twitch[si], url: e.target.value };
                            setStreamStructured(copy as StreamData);
                          }}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const copy = { ...streamStructured, twitch: [...(streamStructured?.twitch || [])] };
                            copy.twitch.splice(si, 1);
                            setStreamStructured(copy as StreamData);
                          }}
                          className="hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const copy = { ...streamStructured, twitch: [...(streamStructured?.twitch || [])] };
                      copy.twitch.push({ name: "", username: "", url: "" });
                      setStreamStructured(copy as StreamData);
                    }}
                    className="text-foreground hover:text-primary hover:bg-primary/10"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Twitch Streamer
                  </Button>
                </CardContent>
              </Card>

              {/* YouTube Channels */}
              <Card className="gaming-card">
                <CardHeader>
                  <CardTitle className="text-foreground">YouTube Channels</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {(streamStructured?.youtube || []).map((channel, yi) => (
                    <div key={yi} className="grid grid-cols-3 gap-2">
                      <input
                        className="p-2 border border-border rounded bg-background text-foreground"
                        placeholder="Name"
                        value={channel.name}
                        onChange={(e) => {
                          const copy = { ...streamStructured, youtube: [...(streamStructured?.youtube || [])] };
                          copy.youtube[yi] = { ...copy.youtube[yi], name: e.target.value };
                          setStreamStructured(copy as StreamData);
                        }}
                      />
                      <input
                        className="p-2 border border-border rounded bg-background text-foreground"
                        placeholder="Channel ID"
                        value={channel.channelId}
                        onChange={(e) => {
                          const copy = { ...streamStructured, youtube: [...(streamStructured?.youtube || [])] };
                          copy.youtube[yi] = { ...copy.youtube[yi], channelId: e.target.value };
                          setStreamStructured(copy as StreamData);
                        }}
                      />
                      <div className="flex gap-2">
                        <input
                          className="flex-1 p-2 border border-border rounded bg-background text-foreground"
                          placeholder="URL"
                          value={channel.url}
                          onChange={(e) => {
                            const copy = { ...streamStructured, youtube: [...(streamStructured?.youtube || [])] };
                            copy.youtube[yi] = { ...copy.youtube[yi], url: e.target.value };
                            setStreamStructured(copy as StreamData);
                          }}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const copy = { ...streamStructured, youtube: [...(streamStructured?.youtube || [])] };
                            copy.youtube.splice(yi, 1);
                            setStreamStructured(copy as StreamData);
                          }}
                          className="hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const copy = { ...streamStructured, youtube: [...(streamStructured?.youtube || [])] };
                      copy.youtube.push({ name: "", channelId: "", url: "" });
                      setStreamStructured(copy as StreamData);
                    }}
                    className="text-foreground hover:text-primary hover:bg-primary/10"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add YouTube Channel
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
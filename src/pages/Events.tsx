import { useDocumentTitle } from "@/lib/useDocumentTitle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Trophy, ExternalLink, PlayCircle, Youtube, Twitch, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useEffect, useState } from "react";

interface EventItem {
  id: number;
  title: string;
  date: string;
  status: "completed" | "ongoing" | "upcoming";
  description: string;
  winners: string;
  youtubeLink: string;
  twitchLink: string;
  participants: string;
  prize: string;
}

const Events = () => {
  useDocumentTitle("Civ 3 League - Events");

  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch(`${import.meta.env.BASE_URL}data/events.json`);
        if (!res.ok) throw new Error('Failed to fetch events');
        const json = await res.json();
        if (!cancelled) setEvents(json);
      } catch (err) {
        console.error('Error loading events.json', err);
      }
    };
    load();
    return () => { cancelled = true; };
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500/20 text-green-500 border-green-500/30">Completed</Badge>;
      case "upcoming":
        return <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30">Upcoming</Badge>;
      case "ongoing":
        return <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">Live</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Trophy className="w-12 h-12 text-primary" />
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gradient drop-shadow-sm">
              Tournament Events
            </h1>
          </div>
          <p className="text-xl text-muted-foreground/90 leading-relaxed tracking-wide max-w-3xl mx-auto">
            Explore past and upcoming competitions in the CivPlayers Civ3 League
          </p>
        </div>

        {/* All Events */}
        <div className="space-y-6">
          {events.map((event) => (
            <Card key={event.id} className="gaming-card">
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-2xl text-primary">{event.title}</CardTitle>
                      {getStatusBadge(event.status)}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-muted/30 p-4 rounded-lg border border-border/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Trophy className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold text-foreground">Winners</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{event.winners}</p>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg border border-border/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold text-foreground">Participants</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{event.participants} Players</p>
                  </div>
                  
                  {event.prize && (
                    <div className="bg-muted/30 p-4 rounded-lg border border-border/50">
                      <div className="flex items-center gap-2 mb-2">
                        <Trophy className="w-5 h-5 text-primary" />
                        <h3 className="font-semibold text-foreground">Prize</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{event.prize}</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-3">
                  {event.youtubeLink !== "N/A" && (
                    <Button
                      variant="outline"
                      className="border-red-500/50 text-red-500 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500"
                      asChild
                    >
                      <a href={event.youtubeLink} target="_blank" rel="noopener noreferrer">
                        <Youtube className="w-4 h-4 mr-2" />
                        Watch on YouTube
                      </a>
                    </Button>
                  )}
                  
                  {event.twitchLink !== "N/A" && (
                    <Button
                      variant="outline"
                      className="border-[#6441a5]/50 text-[#6441a5] hover:bg-[#6441a5]/10 hover:text-[#6441a5] hover:border-[#6441a5]"
                      asChild
                    >
                      <a href={event.twitchLink} target="_blank" rel="noopener noreferrer">
                        <Twitch className="w-4 h-4 mr-2" />
                        Watch on Twitch
                      </a>
                    </Button>
                  )}
                  
                  <Button variant="outline" asChild>
                    <Link to={`/events/${event.id}`}>
                      Event Details
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Events;
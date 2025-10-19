import { useDocumentTitle } from "@/lib/useDocumentTitle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Trophy, ExternalLink, PlayCircle, Youtube, Twitch, Users } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

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

  const events: EventItem[] = [
    {
      id: 1,
      title: "CIV3 Hunger Games",
      date: "Nov 14, 2021 – Feb 20, 2022",
      status: "completed",
      description: "2v2 MPT-style cash tournament, run by Hardrada_1066.",
      winners: "Champion: Suede | 2nd Place: cheeze | 3rd Place: rabdag",
      youtubeLink: "https://youtube.com/playlist?list=PLexample-hunger-games",
      twitchLink: "N/A",
      participants: "32",
      prize: "League Championship Title"
    },
    {
      id: 2,
      title: "Spring Championship 2024",
      date: "March 1, 2024 – March 31, 2024",
      status: "completed",
      description: "The premier spring tournament showcasing tactical excellence and strategic mastery.",
      winners: "Champion: rabdag | 2nd Place: Halu | 3rd Place: Silent Knight",
      youtubeLink: "https://youtube.com/playlist?list=PLexample-spring-2024",
      twitchLink: "N/A",
      participants: "64",
      prize: "5000 League Points"
    },
    {
      id: 3,
      title: "Summer Blitz Series",
      date: "July 1, 2024 – July 31, 2024",
      status: "completed",
      description: "Fast-paced matches with shorter time controls, testing quick decision-making and adaptability.",
      winners: "Champion: Suede | 2nd Place: Zardoz | 3rd Place: Carlot",
      youtubeLink: "https://youtube.com/playlist?list=PLexample-summer-blitz",
      twitchLink: "N/A",
      participants: "48",
      prize: "3000 League Points"
    },
    {
      id: 4,
      title: "Winter Classic 2024",
      date: "Dec 1, 2024 – Dec 31, 2024",
      status: "upcoming",
      description: "Year-end championship tournament featuring the season's top players.",
      winners: "TBD",
      youtubeLink: "N/A",
      twitchLink: "N/A",
      participants: "80",
      prize: "10000 League Points + Trophy"
    },
    {
      id: 5,
      title: "New Year Open 2025",
      date: "Jan 1, 2025 – Jan 31, 2025",
      status: "ongoing",
      description: "Open to all skill levels with multiple divisions and brackets.",
      winners: "TBD",
      youtubeLink: "N/A",
      twitchLink: "https://twitch.tv/example",
      participants: "100",
      prize: "Multiple Division Prizes"
    }
  ];

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
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-10 h-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-gradient">
              Tournament Events
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      Event Details
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
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
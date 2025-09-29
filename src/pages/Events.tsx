import { useDocumentTitle } from "@/lib/useDocumentTitle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Trophy, Users, ExternalLink, PlayCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Events = () => {
  useDocumentTitle("Civ 3 League - Events");
  const events = [
    {
      id: 1,
      title: "CIV3 Hunger Games",
      date: "Winter 2021/22",
      status: "completed",
      description: "An epic battle royale tournament featuring the best players in intense survival matches. Players fought for supremacy in a winner-takes-all format across multiple elimination rounds.",
      winners: "Champion: Suede | Runner-up: cheeze | 3rd Place: rabdag",
      youtubeLink: "https://youtube.com/playlist?list=PLexample-hunger-games",
      participants: 32,
      prize: "League Championship Title"
    },
    {
      id: 2,
      title: "Spring Championship 2024",
      date: "March 2024",
      status: "completed",
      description: "The premier spring tournament showcasing tactical excellence and strategic mastery. A month-long competition with the highest stakes of the season.",
      winners: "Champion: rabdag | Runner-up: Halu | 3rd Place: Silent Knight",
      youtubeLink: "https://youtube.com/playlist?list=PLexample-spring-2024",
      participants: 64,
      prize: "5000 League Points"
    },
    {
      id: 3,
      title: "Summer Blitz Series",
      date: "July 2024",
      status: "completed",
      description: "Fast-paced matches with shorter time controls, testing players' quick decision-making abilities and adaptability under pressure.",
      winners: "Champion: Suede | Runner-up: Zardoz | 3rd Place: Carlot",
      youtubeLink: "https://youtube.com/playlist?list=PLexample-summer-blitz",
      participants: 48,
      prize: "3000 League Points"
    },
    {
      id: 4,
      title: "Winter Classic 2024",
      date: "December 2024",
      status: "upcoming",
      description: "The year-end championship tournament. The ultimate test of skill and endurance, featuring extended matches and the season's top players.",
      winners: "TBD",
      youtubeLink: null,
      participants: 80,
      prize: "10000 League Points + Trophy"
    },
    {
      id: 5,
      title: "New Year Open 2025",
      date: "January 2025",
      status: "upcoming",
      description: "Start the new year with competitive play! Open to all skill levels with multiple divisions and brackets.",
      winners: "TBD",
      youtubeLink: null,
      participants: 100,
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

  const featuredEvent = events.find(e => e.title === "CIV3 Hunger Games");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Tournament Events
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our competitive tournaments, special events, and championship battles
          </p>
        </div>

        {/* Featured Event - Hunger Games */}
        {featuredEvent && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-primary mb-6">Featured Event</h2>
            <Card className="gaming-card border-primary/30 bg-gradient-to-r from-card to-card/80">
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div>
                    <CardTitle className="text-2xl mb-2 flex items-center gap-2">
                      <Trophy className="w-6 h-6 text-primary" />
                      {featuredEvent.title}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {featuredEvent.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {featuredEvent.participants} players
                      </div>
                    </div>
                  </div>
                  {getStatusBadge(featuredEvent.status)}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {featuredEvent.description}
                </p>
                <div className="bg-muted/50 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold text-primary mb-2">Results</h4>
                  <p className="text-foreground">{featuredEvent.winners}</p>
                </div>
                {featuredEvent.youtubeLink && (
                  <div className="flex flex-wrap gap-3">
                    <Button className="btn-hero" asChild>
                      <a href={featuredEvent.youtubeLink} target="_blank" rel="noopener noreferrer">
                        <PlayCircle className="w-4 h-4 mr-2" />
                        Watch on YouTube
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* All Events */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-primary">All Tournaments</h2>
          
          <div className="grid gap-6">
            {events.map((event) => (
              <Card key={event.id} className="gaming-card">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div>
                      <CardTitle className="text-xl mb-2">{event.title}</CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {event.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {event.participants} players
                        </div>
                        <div className="flex items-center gap-1">
                          <Trophy className="w-4 h-4" />
                          {event.prize}
                        </div>
                      </div>
                    </div>
                    {getStatusBadge(event.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {event.description}
                  </p>
                  
                  {event.status === "completed" && (
                    <div className="bg-muted/50 p-3 rounded-lg mb-4">
                      <h4 className="font-semibold text-primary text-sm mb-1">Results</h4>
                      <p className="text-sm text-foreground">{event.winners}</p>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-3">
                    {event.youtubeLink && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={event.youtubeLink} target="_blank" rel="noopener noreferrer">
                          <PlayCircle className="w-4 h-4 mr-2" />
                          Watch Replays
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      </Button>
                    )}
                    
                    {event.status === "upcoming" && (
                      <Button size="sm" className="btn-hero">
                        Register Now
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Events;
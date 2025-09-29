import { useDocumentTitle } from "@/lib/useDocumentTitle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Users, Globe, Target, Heart, Zap } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const About = () => {
  useDocumentTitle("Civ 3 League - About");
  const values = [
    {
      icon: Trophy,
      title: "Competitive Excellence",
      description: "We strive for the highest level of strategic gameplay and fair competition among all participants."
    },
    {
      icon: Users,
      title: "Community First",
      description: "Building lasting friendships and connections through our shared passion for Civilization III."
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Welcoming players from every corner of the world to participate in our tournaments and events."
    },
    {
      icon: Target,
      title: "Skill Development",
      description: "Helping players improve their strategic thinking and gameplay through mentorship and practice."
    }
  ];

  const milestones = [
    { year: "2020", event: "League Founded", description: "CivPlayers Civ3 League was established by passionate community members" },
    { year: "2021", event: "First Major Tournament", description: "Inaugural championship with 50+ participants" },
    { year: "2022", event: "Hunger Games Success", description: "Our most popular tournament format was born" },
    { year: "2023", event: "500 Members", description: "Reached 500 active community members" },
    { year: "2024", event: "International Recognition", description: "Became the premier Civ3 multiplayer community" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            About the League
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            The premier destination for competitive Civilization III multiplayer gaming, 
            bringing together strategic minds from around the world.
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="gaming-card mb-12">
          <CardContent className="p-8 text-center">
            <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto">
              CivPlayers Civ3 League exists to foster a competitive, fair, and welcoming environment 
              where players of all skill levels can enjoy the timeless strategy of Civilization III. 
              We believe in the power of strategic thinking, community building, and the endless 
              possibilities that emerge when great minds come together to compete.
            </p>
          </CardContent>
        </Card>

        {/* What We Do */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">What We Do</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="gaming-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-6 h-6 text-primary" />
                  Competitive Tournaments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  We organize regular tournaments ranging from quick blitz events to extended 
                  championship series. Our signature events like the Hunger Games have become 
                  legendary in the Civ3 community, featuring innovative formats and exciting prizes.
                </p>
              </CardContent>
            </Card>

            <Card className="gaming-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-6 h-6 text-primary" />
                  Community Building
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Beyond competition, we're a thriving community where players share strategies, 
                  discuss game mechanics, and form lasting friendships. Our Discord server is 
                  active 24/7 with discussions, tips, and casual games.
                </p>
              </CardContent>
            </Card>

            <Card className="gaming-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-6 h-6 text-primary" />
                  Skill Development
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  We provide resources, guides, and mentorship opportunities for players looking 
                  to improve their game. From basic tutorials to advanced strategy discussions, 
                  we support growth at every level.
                </p>
              </CardContent>
            </Card>

            <Card className="gaming-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-6 h-6 text-primary" />
                  Global Community
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  With members from every continent, we celebrate the international nature of 
                  our community. We accommodate different time zones and cultural backgrounds, 
                  making everyone feel welcome regardless of where they're from.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card key={index} className="gaming-card text-center">
                  <CardContent className="p-6">
                    <IconComponent className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-3">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* History Timeline */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">Our Journey</h2>
          <Card className="gaming-card">
            <CardContent className="p-8">
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center border-2 border-primary">
                      <span className="text-primary font-bold text-sm">{milestone.year}</span>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-semibold text-foreground mb-2">{milestone.event}</h3>
                      <p className="text-muted-foreground leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Join Us */}
        <Card className="gaming-card">
          <CardContent className="p-8 text-center">
            <Trophy className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-foreground mb-4">Join Our Community</h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
              Whether you're a seasoned veteran or new to Civilization III, there's a place for you 
              in our community. Join us for competitive matches, casual games, strategy discussions, 
              and lasting friendships.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://discord.gg/civplayers" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-hero inline-flex items-center justify-center px-6 py-3 text-lg"
              >
                Join Discord Community
              </a>
              <a 
                href="https://steamcommunity.com/groups/civplayers" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 text-lg border border-primary/30 rounded-lg hover:bg-primary/10 transition-colors"
              >
                Steam Group
              </a>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default About;
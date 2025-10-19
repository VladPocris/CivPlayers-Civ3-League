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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            About the League
          </h1>
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 mb-12">
            <div className="flex-1 flex">
              <Card className="gaming-card flex-1 flex flex-col">
                <CardContent className="p-8 text-center flex-1 flex flex-col justify-center">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    After 6 years of being out of service, we are proud to announce the return of the Civ 3 ladder! Despite some bumps along the road, the Civ 3 community has remained passionate and tightly knit, and there has been a recent wave of new players picking the game up on steam and learning to play multiplayer. With this influx of newer players, we’ve been able to have multiple games running and more consistent activity every day. We hope to continue to expand and keep this amazing game alive.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="flex-1 flex">
              <Card className="gaming-card flex-1 flex flex-col">
                <CardContent className="p-8 text-center flex-1 flex flex-col justify-center">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    The community has a rich history of tactics, stories, and creative mods. Vanilla Civ 3 doesn’t make for a great multiplayer experience, due to game length, imbalances, and inconclusive endings. As a result, league games are played with mods that make for a fair, conclusive match, that can be finished in under 3 hours.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
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
                href="https://discord.gg/teVt5pt" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-hero inline-flex items-center justify-center px-6 py-3 text-lg"
              >
                Join Discord Community
              </a>
              <a 
                href="https://steamcommunity.com/groups/CivPlayersCiv3" 
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
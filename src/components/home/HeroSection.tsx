import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Users, Calendar, Target, ExternalLink } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-hero">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-50">
        <svg className="w-full h-full" width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fillRule="evenodd">
            <g fill="rgb(251 191 36)" fillOpacity="0.05">
              <circle cx="7" cy="7" r="1"/>
            </g>
          </g>
        </svg>
      </div>
      
      <div className="relative container mx-auto px-4 py-20">
        
        <div className="text-center space-y-8">
          {/* Main Hero Content */}
          <div className="space-y-4">
            <div className="relative inline-block">
              <h1 className="text-5xl md:text-7xl font-bold text-gradient tracking-tight">
                CivPlayers
              </h1>
              {/* Logo - positioned absolutely next to title */}
              <img 
                src="public/civ3-assets/Logo/logo.png" 
                alt="CivPlayers Logo" 
                className="absolute right-full top-1/2 -translate-y-1/2 mr-4 md:mr-6 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain hidden md:block"
              />
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
              Welcome to the League!
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We are a multiplayer league dedicated to the best strategy game of all time. After being almost dead back in 2014, a new ladder has now risen from the ashes. With a new generation of players alongside members of the old. Civ3 Multiplayer lives on!
            </p>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Check out our rankings by mode here on this page. In order to be the best, you must build an empire every game that stands the test of time!
            </p>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="btn-hero text-lg px-8 py-4" asChild>
              <a href="https://discord.gg/teVt5pt" target="_blank" rel="noopener noreferrer">
                Join Discord Community
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-4 border-primary/30 hover:bg-primary/10"
              asChild
            >
              <a href="https://steamcommunity.com/groups/CivPlayersCiv3" target="_blank" rel="noopener noreferrer">
                <Users className="w-4 h-4 mr-2" />
                Steam Group
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-16">
            <Card className="gaming-card">
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">50+</div>
                <div className="text-sm text-muted-foreground">Active Players</div>
              </CardContent>
            </Card>
            
            <Card className="gaming-card">
              <CardContent className="p-6 text-center">
                <Trophy className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">10+</div>
                <div className="text-sm text-muted-foreground">Events</div>
              </CardContent>
            </Card>
            
            <Card className="gaming-card">
              <CardContent className="p-6 text-center">
                <Calendar className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">5</div>
                <div className="text-sm text-muted-foreground">Years Running</div>
              </CardContent>
            </Card>
            
            <Card className="gaming-card">
              <CardContent className="p-6 text-center">
                <Target className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">10000+</div>
                <div className="text-sm text-muted-foreground">Games Played</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
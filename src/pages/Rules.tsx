import { useDocumentTitle } from "@/lib/useDocumentTitle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Shield, Clock, Users, AlertTriangle, Trophy, BookOpen } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Rules = () => {
  useDocumentTitle("Civ 3 League - Rules");
  const ruleCategories = [
    {
      icon: Shield,
      title: "General Conduct",
      rules: [
        "Respect all players regardless of skill level, background, or nationality",
        "No harassment, hate speech, or discriminatory language",
        "Keep discussions civil and constructive",
        "Report any violations to administrators immediately",
        "Follow the spirit of fair play at all times"
      ]
    },
    {
      icon: Clock,
      title: "Game Management",
      rules: [
        "Games must be scheduled with at least 24 hours notice",
        "Players have 15 minutes grace period for late arrivals",
        "Pauses are allowed for technical issues or emergencies",
        "Maximum game session is 8 hours with mandatory breaks",
        "Save files must be uploaded within 1 hour of game completion"
      ]
    },
    {
      icon: Users,
      title: "Tournament Play",
      rules: [
        "Registration closes 48 hours before tournament start",
        "Players must be available for their entire bracket",
        "Substitutions allowed only in group stage",
        "Brackets are seeded based on current league rating",
        "Winners must report results within 2 hours"
      ]
    },
    {
      icon: AlertTriangle,
      title: "Violations & Penalties",
      rules: [
        "First offense: Warning and game review",
        "Second offense: Tournament suspension (1 event)",
        "Third offense: League suspension (1 month)",
        "Severe violations may result in permanent ban",
        "Appeals process available through admin contact"
      ]
    }
  ];

  const gameSettings = [
    { setting: "Difficulty", value: "Monarch", required: true },
    { setting: "Map Size", value: "Standard or Large", required: true },
    { setting: "Barbarians", value: "Roaming", required: true },
    { setting: "Victory Conditions", value: "All except Space Race", required: true },
    { setting: "Starting Units", value: "2 Settlers, 2 Workers", required: false },
    { setting: "Tech Trading", value: "Allowed", required: false },
    { setting: "Cultural Linking", value: "On", required: true },
    { setting: "Optimal Number of Cities", value: "Off", required: true }
  ];

  const prohibitedActions = [
    "Exploiting game bugs or glitches",
    "Sharing information between eliminated and active players",
    "Using external tools or modifications during gameplay",
    "Deliberately causing game desyncs or crashes",
    "Pre-game diplomatic agreements (except team games)",
    "Real money trading for in-game advantages",
    "Account sharing or playing on behalf of others"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            League Rules & Guidelines
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Fair play and sportsmanship are the foundation of our competitive community. 
            Please read and understand all rules before participating.
          </p>
        </div>

        {/* Quick Reference */}
        <Card className="gaming-card mb-12 border-primary/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-primary" />
              Quick Reference
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Registration Deadline</h3>
                <p className="text-2xl font-bold text-primary">48 Hours</p>
                <p className="text-sm text-muted-foreground">Before tournament start</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Late Arrival Grace</h3>
                <p className="text-2xl font-bold text-primary">15 Minutes</p>
                <p className="text-sm text-muted-foreground">Maximum wait time</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Result Reporting</h3>
                <p className="text-2xl font-bold text-primary">2 Hours</p>
                <p className="text-sm text-muted-foreground">After game completion</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rule Categories */}
        <div className="space-y-8 mb-12">
          {ruleCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Card key={index} className="gaming-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <IconComponent className="w-6 h-6 text-primary" />
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {category.rules.map((rule, ruleIndex) => (
                      <li key={ruleIndex} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-muted-foreground leading-relaxed">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Game Settings */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <Card className="gaming-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-6 h-6 text-primary" />
                Standard Game Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {gameSettings.map((setting, index) => (
                  <div key={index} className="flex justify-between items-center py-2">
                    <div className="flex items-center gap-2">
                      <span className="text-foreground font-medium">{setting.setting}</span>
                      {setting.required && (
                        <Badge variant="destructive" className="text-xs">Required</Badge>
                      )}
                    </div>
                    <span className="text-muted-foreground font-mono text-sm">{setting.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="gaming-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-destructive" />
                Prohibited Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {prohibitedActions.map((action, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground leading-relaxed">{action}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Rating System */}
        <Card className="gaming-card mb-12">
          <CardHeader>
            <CardTitle>Rating System</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-primary mb-4">How Ratings Work</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p>• All players start with a base rating of 1200 points</p>
                  <p>• Ratings are calculated using a modified Elo system</p>
                  <p>• Points gained/lost depend on opponent strength and game outcome</p>
                  <p>• Tournament games have higher rating impact than casual matches</p>
                  <p>• Ratings reset annually with each new season</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary mb-4">Rating Tiers</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 rounded bg-muted/50">
                    <span className="font-medium">Grandmaster</span>
                    <span className="text-yellow-500 font-mono">2200+</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded bg-muted/50">
                    <span className="font-medium">Master</span>
                    <span className="text-purple-500 font-mono">2000-2199</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded bg-muted/50">
                    <span className="font-medium">Expert</span>
                    <span className="text-blue-500 font-mono">1800-1999</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded bg-muted/50">
                    <span className="font-medium">Advanced</span>
                    <span className="text-green-500 font-mono">1600-1799</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded bg-muted/50">
                    <span className="font-medium">Intermediate</span>
                    <span className="text-yellow-600 font-mono">1400-1599</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded bg-muted/50">
                    <span className="font-medium">Novice</span>
                    <span className="text-gray-500 font-mono">1200-1399</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact for Questions */}
        <Card className="gaming-card">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Questions About Rules?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              If you have any questions about our rules or need clarification on any policies, 
              don't hesitate to reach out to our admin team. We're here to help ensure 
              fair and enjoyable competition for everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:admin@civplayers.com"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Contact Admin Team
              </a>
              <a 
                href="https://discord.gg/civplayers" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-primary/30 rounded-lg hover:bg-primary/10 transition-colors"
              >
                Ask on Discord
              </a>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Rules;
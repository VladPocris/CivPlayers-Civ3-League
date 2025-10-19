import { useDocumentTitle } from "@/lib/useDocumentTitle";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BookOpen, Youtube, FileText, ExternalLink, Image as ImageIcon, Play } from "lucide-react";
import { useState } from "react";

const Guides = () => {
  useDocumentTitle("Civ 3 League - Guides");
  const [activeTab, setActiveTab] = useState("qc");

  const guides = [
    {
      id: "qc",
      title: "QC (Quick Combat)",
      description: "Master the fast-paced Quick Combat mode with these essential guides and video tutorials.",
      steamGuides: [
        { url: "https://steamcommunity.com/sharedfiles/filedetails/?id=793439351", label: "QC Guide - Part 1" },
        { url: "https://steamcommunity.com/sharedfiles/filedetails/?id=688606769&insideModal=0", label: "QC Guide - Part 2" },
        { url: "https://steamcommunity.com/sharedfiles/filedetails/?id=762488798", label: "QC Strategy Guide" },
      ],
      videos: [
        { id: "RUtZSSc3QnU", label: "QC Tutorial Video 1" },
        { id: "Mz4wPiuKqbQ", label: "QC Tutorial Video 2" },
        { id: "F0nL3tZ5t94", label: "QC Advanced Tactics" },
        { id: "b1nY4Xlnmh0", label: "QC Gameplay Example 1" },
        { id: "jcFHSl4wqdE", label: "QC Gameplay Example 2" },
      ]
    },
    {
      id: "mpt",
      title: "MPT (Multiplayer Tournament)",
      description: "Learn competitive strategies and mechanics for MPT-style tournaments.",
      steamGuides: [
        { url: "https://steamcommunity.com/sharedfiles/filedetails/?id=1669107567", label: "MPT Complete Guide" },
      ],
      videos: [
        { id: "tGKTrdDYtd0", label: "MPT Tutorial Video" },
      ]
    },
    {
      id: "future",
      title: "FUTURE",
      description: "Explore futuristic gameplay mechanics and strategies for the FUTURE mod.",
      steamGuides: [
        { url: "https://steamcommunity.com/sharedfiles/filedetails/?id=773801119", label: "FUTURE Guide - Part 1" },
        { url: "https://steamcommunity.com/sharedfiles/filedetails/?id=772527038", label: "FUTURE Guide - Part 2" },
      ],
      videos: [
        { id: "Y2zeHi9NEYE", label: "FUTURE Tutorial Video 1" },
        { id: "GF9Kw-qg7kQ", label: "FUTURE Tutorial Video 2" },
      ]
    },
    {
      id: "modern",
      title: "Modern",
      description: "Modern era strategies, tech trees, and resource management guides.",
      steamGuides: [
        { url: "https://steamcommunity.com/sharedfiles/filedetails/?id=2094304665", label: "Modern Strategy Guide" },
      ],
      tools: [
        { url: "https://civplayersciv3league.github.io/", label: "Resource Builder Tool" },
      ],
      images: [
        { src: "public/civ3-assets/Guides/Modern_Tech_Tree.webp", alt: "Modern Tech Tree" }
      ]
    },
    {
      id: "mdj",
      title: "MDJ",
      description: "Master the MDJ mod with civilization guides, unique units, and strategic insights.",
      steamGuides: [
        { url: "https://steamcommunity.com/sharedfiles/filedetails/?id=2830860167", label: "MDJ Complete Guide" },
      ],
      note: "For a quick look, check the Civ and Unit guides below!",
      images: [
        { src: "public/civ3-assets/Guides/mdj_civs_uus.webp", alt: "MDJ Civilizations & Unique Units" },
        { src: "public/civ3-assets/Guides/mdj_units.webp", alt: "MDJ Units Guide" }
      ]
    }
  ];

  const activeGuide = guides.find(g => g.id === activeTab) || guides[0];

  const getYouTubeEmbedUrl = (videoId: string) => {
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const getYouTubeThumbnail = (videoId: string) => {
    return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-10 h-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-gradient">
              Strategy Guides
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Master Civ3 multiplayer with comprehensive guides, tutorials, and resources
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {guides.map((guide) => (
            <Button
              key={guide.id}
              variant={activeTab === guide.id ? "default" : "outline"}
              onClick={() => setActiveTab(guide.id)}
              className={
                activeTab === guide.id 
                  ? "btn-hero text-foreground" 
                  : "text-foreground hover:text-primary"
              }
            >
              {guide.title}
            </Button>
          ))}
        </div>

        {/* Active Guide Content */}
        <Card className="gaming-card">
          <CardHeader>
            <CardTitle className="text-3xl text-primary text-center">{activeGuide.title}</CardTitle>
            <p className="text-muted-foreground leading-relaxed text-center text-lg">{activeGuide.description}</p>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Video Tutorials */}
            {activeGuide.videos && activeGuide.videos.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Youtube className="w-6 h-6 text-red-500" />
                  <h3 className="text-xl font-semibold text-foreground">Video Tutorials</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeGuide.videos.map((video, idx) => (
                    <Dialog key={idx}>
                      <DialogTrigger asChild>
                        <div className="relative cursor-pointer group border border-border/50 rounded-lg overflow-hidden bg-muted/20 hover:bg-muted/30 transition-all hover:scale-105">
                          <img 
                            src={getYouTubeThumbnail(video.id)} 
                            alt={video.label}
                            className="w-full aspect-video object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/60 transition-colors">
                            <div className="bg-red-500 rounded-full p-4 group-hover:scale-110 transition-transform">
                              <Play className="w-8 h-8 text-white fill-white" />
                            </div>
                          </div>
                          <div className="p-3 border-t border-border/50 bg-background/80">
                            <p className="text-sm font-medium text-foreground">{video.label}</p>
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl w-full">
                        <DialogHeader>
                          <DialogTitle>{video.label}</DialogTitle>
                        </DialogHeader>
                        <div className="aspect-video w-full">
                          <iframe
                            width="100%"
                            height="100%"
                            src={getYouTubeEmbedUrl(video.id)}
                            title={video.label}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="rounded-lg"
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              </div>
            )}

            {/* Steam Guides */}
            {activeGuide.steamGuides && activeGuide.steamGuides.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-6 h-6 text-blue-500" />
                  <h3 className="text-xl font-semibold text-foreground">Written Guides</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeGuide.steamGuides.map((guide, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      className="border-blue-500/50 text-blue-500 hover:bg-blue-500/10 hover:text-blue-400 hover:border-blue-500 h-auto py-4 justify-start"
                      asChild
                    >
                      <a href={guide.url} target="_blank" rel="noopener noreferrer">
                        <FileText className="w-5 h-5 mr-3 flex-shrink-0" />
                        <span className="text-left">{guide.label}</span>
                        <ExternalLink className="w-4 h-4 ml-auto flex-shrink-0" />
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Tools */}
            {activeGuide.tools && activeGuide.tools.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <ExternalLink className="w-6 h-6 text-green-500" />
                  <h3 className="text-xl font-semibold text-foreground">Interactive Tools</h3>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {activeGuide.tools.map((tool, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      className="border-green-500/50 text-green-500 hover:bg-green-500/10 hover:text-green-400 hover:border-green-500 h-auto py-4 justify-start"
                      asChild
                    >
                      <a href={tool.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-5 h-5 mr-3 flex-shrink-0" />
                        <span className="text-left">{tool.label}</span>
                        <ExternalLink className="w-4 h-4 ml-auto flex-shrink-0" />
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Note */}
            {activeGuide.note && (
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                <p className="text-sm text-foreground italic text-center">{activeGuide.note}</p>
              </div>
            )}

            {/* Images */}
            {activeGuide.images && activeGuide.images.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <ImageIcon className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">Visual Guides</h3>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {activeGuide.images.map((image, idx) => (
                    <Dialog key={idx}>
                      <DialogTrigger asChild>
                        <div className="border border-border/50 rounded-lg overflow-hidden bg-muted/20 hover:bg-muted/30 transition-all cursor-pointer hover:scale-105">
                          <img 
                            src={image.src} 
                            alt={image.alt}
                            className="w-full h-auto hover:opacity-90 transition-opacity"
                          />
                          <div className="p-3 border-t border-border/50">
                            <p className="text-sm text-muted-foreground text-center">{image.alt}</p>
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-6xl w-full">
                        <DialogHeader>
                          <DialogTitle>{image.alt}</DialogTitle>
                        </DialogHeader>
                        <div className="w-full">
                          <img 
                            src={image.src} 
                            alt={image.alt}
                            className="w-full h-auto rounded-lg"
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Additional Resources */}
        <Card className="gaming-card mt-12">
          <CardContent className="p-8 text-center">
            <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-3">Need More Help?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
              Join our Discord community to ask questions, share strategies, and connect with experienced players who can help you improve your game.
            </p>
            <Button asChild className="btn-hero">
              <a href="https://discord.gg/teVt5pt" target="_blank" rel="noopener noreferrer">
                Join Discord Community
              </a>
            </Button>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Guides;
import { useDocumentTitle } from "@/lib/useDocumentTitle";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Twitch, Youtube, ExternalLink, Radio } from "lucide-react";
import { useState } from "react";

const Stream = () => {
  useDocumentTitle("Civ 3 League - Stream");
  const [activeStream, setActiveStream] = useState<string | null>(null);

  const twitchStreamers = [
    { name: "Hardrada", username: "hardrada_1066", url: "https://www.twitch.tv/hardrada_1066" },
    { name: "Rabdag", username: "rabdag", url: "https://www.twitch.tv/rabdag" },
  ];

  const youtubeChannels = [
    { 
      name: "Hardrada", 
      channelId: "UC2AuVRKXclTOjg6s3VMJgqg",
      url: "https://www.youtube.com/channel/UC2AuVRKXclTOjg6s3VMJgqg" 
    },
    { 
      name: "Suede", 
      channelId: "UCvJNJ8HF5BWrErL-RpvqbYQ",
      url: "https://www.youtube.com/channel/UCvJNJ8HF5BWrErL-RpvqbYQ" 
    },
    { 
      name: "Towel", 
      channelId: "UCgTbrlr15U1Q-uWpgg8pE6A",
      url: "https://www.youtube.com/channel/UCgTbrlr15U1Q-uWpgg8pE6A" 
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Radio className="w-10 h-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-gradient">
              Live Streams
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch live gameplay and tournaments from our community streamers
          </p>
        </div>

        {/* Featured Stream */}
        {activeStream && (
          <Card className="gaming-card mb-12">
            <CardHeader>
              <CardTitle className="text-2xl text-primary text-center">
                Now Watching: {twitchStreamers.find(s => s.username === activeStream)?.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
                <iframe
                  src={`https://player.twitch.tv/?channel=${activeStream}&parent=${window.location.hostname}&muted=false`}
                  height="100%"
                  width="100%"
                  allowFullScreen
                  frameBorder="0"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Twitch Streamers */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Twitch className="w-8 h-8 text-[#6441a5]" />
            <h2 className="text-3xl font-bold text-primary">Community Streams</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {twitchStreamers.map((streamer) => (
              <Card key={streamer.username} className="gaming-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#6441a5]/20 p-3 rounded-lg">
                        <Twitch className="w-6 h-6 text-[#6441a5]" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{streamer.name}</h3>
                        <p className="text-sm text-muted-foreground">twitch.tv/{streamer.username}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button
                      className="flex-1 bg-[#6441a5] hover:bg-[#7c52bd] text-white"
                      onClick={() => setActiveStream(streamer.username)}
                    >
                      <Radio className="w-4 h-4 mr-2" />
                      Watch Live
                    </Button>
                    <Button
                      variant="outline"
                      className="border-[#6441a5]/50 text-[#6441a5] hover:bg-[#6441a5]/10"
                      asChild
                    >
                      <a href={streamer.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* YouTube Channels */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Youtube className="w-8 h-8 text-red-500" />
            <h2 className="text-3xl font-bold text-primary">YouTube Channels</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {youtubeChannels.map((channel) => (
              <Card key={channel.channelId} className="gaming-card">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center mb-4">
                    <div className="bg-red-500/20 p-4 rounded-full mb-4">
                      <Youtube className="w-8 h-8 text-red-500" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{channel.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Replays, tutorials, and highlights
                    </p>
                  </div>
                  
                  <Button
                    variant="outline"
                    className="w-full border-red-500/50 text-red-500 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500"
                    asChild
                  >
                    <a href={channel.url} target="_blank" rel="noopener noreferrer">
                      <Youtube className="w-4 h-4 mr-2" />
                      Visit Channel
                      <ExternalLink className="w-4 h-4 ml-auto" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <Card className="gaming-card">
          <CardContent className="p-8 text-center">
            <Radio className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-3">Want to Stream?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
              Are you streaming Civ3 content? Join our Discord community and let us know! 
              We love featuring community streamers and helping grow the Civ3 streaming scene.
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

export default Stream;
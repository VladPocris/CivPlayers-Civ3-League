import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useDocumentTitle } from "@/lib/useDocumentTitle";
import { cn } from "@/lib/utils";
import "../styles/old-leaderboards.css";

const leaderboardData = {
  QC: { name: "QC Leaderboard", pages: 5 },
  Future: { name: "Future Leaderboard", pages: 6 },
  MPT: { name: "MPT Leaderboard", pages: 7 },
  Modern: { name: "Modern Leaderboard", pages: 5 },
};

const OldLeaderboards = () => {
  useDocumentTitle("Civ 3 League - Old Leaderboards");

  const [currentPages, setCurrentPages] = useState({
    QC: 1,
    Future: 1,
    MPT: 1,
    Modern: 1,
  });

  const [currentTab, setCurrentTab] = useState<keyof typeof leaderboardData>("QC");
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const loadImage = (src: string) =>
      new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          setLoadedImages((prev) => ({ ...prev, [src]: true }));
          resolve(true);
        };
        img.src = src;
      });

    Object.entries(leaderboardData).forEach(([key, data]) => {
      Array.from({ length: data.pages }, (_, i) => i + 1).forEach((pageNum) => {
        const src = `/CivPlayers-Civ3-League/civ3-assets/OldLeaderboard/${key}Leaderboard/Page_${pageNum}.webp`;
        loadImage(src);
      });
    });
  }, []);

  const handlePageChange = (
    leaderboardType: keyof typeof leaderboardData,
    newPage: number
  ) => {
    setCurrentPages((prev) => ({ ...prev, [leaderboardType]: newPage }));
  };

  const controlButtonClasses =
    "border border-[var(--civ3-border)] font-bold shadow-md bg-[var(--civ3-gold)] text-[var(--civ3-blue)] hover:bg-yellow-300 hover:text-[var(--civ3-blue)] transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[var(--civ3-border)] focus-visible:ring-offset-2";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-4">
          <div className="text-red-600 font-bold">DEBUG: currentTab = {currentTab}</div>
        </div>
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Old Leaderboards
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Historical rankings and achievements from previous seasons
          </p>
        </div>

        <Card className="gaming-card mb-8">
          <CardContent className="p-6">
            <Tabs
              value={currentTab}
              onValueChange={(val) => {
                console.log('Tab changed to:', val);
                setCurrentTab(val as keyof typeof leaderboardData);
              }}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-4 mb-6">
                {Object.entries(leaderboardData).map(([key]) => (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className={cn(
                      "active-leaderboard-tab font-bold border border-[var(--civ3-border)] shadow-md transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[var(--civ3-border)] focus-visible:ring-offset-2",
                      currentTab === key
                        ? ""
                        : "text-[var(--civ3-blue)] hover:bg-black hover:text-white"
                    )}
                  >
                    {leaderboardData[key as keyof typeof leaderboardData].name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {Object.entries(leaderboardData).map(([key, data]) => (
                <TabsContent
                  key={key}
                  value={key}
                  className="motion-safe:transition-opacity motion-safe:duration-300"
                >
                  <div className="flex flex-col items-center gap-6">
                    <div className="w-full max-w-4xl mx-auto overflow-hidden rounded-lg shadow-lg relative aspect-[4/3] bg-background">
                      {Array.from({ length: data.pages }, (_, i) => {
                        const pageNum = i + 1;
                        const src = `/CivPlayers-Civ3-League/civ3-assets/OldLeaderboard/${key}Leaderboard/Page_${pageNum}.webp`;
                        const isVisible =
                          pageNum === currentPages[key as keyof typeof currentPages];
                        return (
                          <img
                            key={pageNum}
                            src={src}
                            alt={`${data.name} Page ${pageNum}`}
                            className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-200 ${
                              isVisible && loadedImages[src]
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                          />
                        );
                      })}
                    </div>

                    {/* Pagination */}
                    <div className="flex flex-wrap justify-center gap-3 mt-4">
                      <Button
                        className={controlButtonClasses}
                        onClick={() =>
                          handlePageChange(
                            key as keyof typeof currentPages,
                            Math.max(
                              1,
                              currentPages[key as keyof typeof currentPages] - 1
                            )
                          )
                        }
                        disabled={currentPages[key as keyof typeof currentPages] === 1}
                      >
                        Previous
                      </Button>

                      <div className="flex flex-wrap items-center justify-center gap-3">
                        {Array.from({ length: data.pages }, (_, i) => i + 1).map(
                          (pageNum) => {
                            const isActive =
                              pageNum === currentPages[key as keyof typeof currentPages];
                            return (
                              <Button
                                key={pageNum}
                                className={`border border-[var(--civ3-border)] font-bold shadow-md transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[var(--civ3-border)] focus-visible:ring-offset-2 ${
                                  isActive
                                    ? "bg-[var(--civ3-gold)] text-[var(--civ3-blue)] hover:bg-yellow-300 hover:text-[var(--civ3-blue)]"
                                    : "bg-yellow-200 text-[var(--civ3-blue)] hover:bg-[var(--civ3-gold)] hover:text-white"
                                }`}
                                onClick={() =>
                                  handlePageChange(
                                    key as keyof typeof currentPages,
                                    pageNum
                                  )
                                }
                                disabled={isActive}
                              >
                                {pageNum}
                              </Button>
                            );
                          }
                        )}
                      </div>

                      <Button
                        className={controlButtonClasses}
                        onClick={() =>
                          handlePageChange(
                            key as keyof typeof currentPages,
                            Math.min(
                              data.pages,
                              currentPages[key as keyof typeof currentPages] + 1
                            )
                          )
                        }
                        disabled={
                          currentPages[key as keyof typeof currentPages] === data.pages
                        }
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default OldLeaderboards;

import { useDocumentTitle } from "@/lib/useDocumentTitle";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip, ChartLegend } from "@/components/ui/chart";
import * as Recharts from "recharts";
import { useState } from "react";
import { ChevronDown, ChevronUp, Trophy, Gamepad2, Award, TrendingUp } from "lucide-react";


const champions = [
  {
    year: 2023,
    name: "Antiquity",
    standings: ["Antiquity", "rabdag", "rever", "SaberBoothTiger", "kismic"],
  },
  {
    year: 2022,
    name: "Suede",
    standings: ["Suede", "Ironclad/claudia", "ObiwanKenNooby", "cheeze", "Halu"],
  },
  {
    year: 2021,
    name: "Suede",
    standings: [
      "Suede - 9764",
      "Ironclad/claudia - 9537",
      "Halu - 8536",
      "cheeze - 8077",
      "Byzantine Fire - 7947",
    ],
  },
  {
    year: 2020,
    name: "Ironclad/claudia",
    standings: [
      "Ironclad/claudia - 8809",
      "Suede - 8803",
      "Halu - 7781",
      "Byzantine Fire - 7476",
      "Gbiebs - 7912",
    ],
  },
];

const mostGamesByYear = {
  2023: [
    { name: "Silent Knight", games: 728 },
    { name: "Sooty", games: 649 },
    { name: "Lothar", games: 639 },
  ],
  2022: [
    { name: "Luv", games: 724 },
    { name: "maclunkey", games: 708 },
    { name: "Lothar", games: 675 },
  ],
  2021: [
    { name: "Luv", games: 808 },
    { name: "maclunkey", games: 748 },
    { name: "MrBobBacklund", games: 726 },
  ],
};

const mostWinsByYear = {
  2023: [
    { name: "Silent Knight", wins: 349, fill: "#f97316" },
    { name: "Sooty", wins: 332, fill: "#06b6d4" },
    { name: "spirts", wins: 302, fill: "#8b5cf6" },
    { name: "maclunkey", wins: 280, fill: "#ec4899" },
    { name: "Lothar", wins: 273, fill: "#10b981" },
  ],
  2022: [
    { name: "Lothar", wins: 341, fill: "#10b981" },
    { name: "maclunkey", wins: 340, fill: "#ec4899" },
    { name: "Ironclad/claudia", wins: 336, fill: "#f59e0b" },
    { name: "Halu", wins: 333, fill: "#3b82f6" },
    { name: "Silent Knight", wins: 320, fill: "#f97316" },
  ],
  2021: [
    { name: "maclunkey", wins: 383, fill: "#ec4899" },
    { name: "Ironclad/claudia", wins: 367, fill: "#f59e0b" },
    { name: "Luv", wins: 362, fill: "#06b6d4" },
    { name: "Halu", wins: 345, fill: "#3b82f6" },
    { name: "MrBobBacklund", wins: 339, fill: "#8b5cf6" },
  ],
};

const winRateByYear = {
  2023: [
    { name: "Antiquity", winRate: 67.9, fill: "#f97316" },
    { name: "Suede", winRate: 67.3, fill: "#06b6d4" },
    { name: "Ragnar Lothbrok", winRate: 61.8, fill: "#8b5cf6" },
  ],
  2022: [
    { name: "ztatiz", winRate: 69, fill: "#10b981" },
    { name: "Antiquity", winRate: 62.07, fill: "#f97316" },
    { name: "cheeze", winRate: 60, fill: "#ec4899" },
  ],
  2021: [
    { name: "cheeze", winRate: 65.3, fill: "#ec4899" },
    { name: "Suede", winRate: 65, fill: "#06b6d4" },
    { name: "Rabbert_Klein", winRate: 61, fill: "#8b5cf6" },
  ],
};

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1d24] border border-primary/30 rounded-lg p-3 shadow-lg">
        <p className="text-foreground font-semibold mb-1">{label}</p>
        <p className="text-primary font-bold">
          {payload[0].name === 'wins' ? 'Wins' : 'Win Rate'}: {payload[0].value}{payload[0].name === 'winRate' ? '%' : ''}
        </p>
      </div>
    );
  }
  return null;
};

const HallOfFame = () => {
  useDocumentTitle("Civ 3 League - Hall of Fame");
  const [openYears, setOpenYears] = useState<Record<number, boolean>>({});

  const toggleYear = (year: number) => {
    setOpenYears((prev) => ({ ...prev, [year]: !prev[year] }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="container mx-auto px-4 py-12 space-y-12">
        <section className="text-center space-y-2">
          <h1 className="text-5xl font-bold text-gradient">Hall of Fame</h1>
          <p className="text-muted-foreground text-lg">Celebrating champions and standout players through the years.</p>
        </section>

        {/* Champions */}
        <Card className="gaming-card">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-3xl font-bold text-primary mb-2">End of Year Champions</CardTitle>
            <p className="text-muted-foreground">Celebrating our legendary champions through the years</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
              {champions.map((c) => {
                const yearKey = Number(c.year);
                const isOpen = openYears[yearKey] === true;
                return (
                  <Card key={yearKey} className="gaming-card overflow-hidden">
                    <CardContent className="p-0">
                      <div
                        onClick={() => toggleYear(yearKey)}
                        className="cursor-pointer p-6 text-center transition-all duration-200 hover:bg-primary/5 select-none"
                        aria-expanded={isOpen}
                        aria-controls={`champion-standings-${yearKey}`}
                      >
                        <div className="flex items-center justify-center gap-2 mb-3">
                          <Trophy className="w-6 h-6 text-primary" />
                          <span className="text-xl font-bold text-primary">{c.year}</span>
                        </div>
                        <h3 className="text-2xl font-extrabold text-foreground mb-3">{c.name}</h3>
                        <div className="flex items-center justify-center text-muted-foreground">
                          <span className="text-sm mr-1">
                            {isOpen ? 'Hide Standings' : 'View Standings'}
                          </span>
                          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </div>
                      </div>
                      
                      <div
                        id={`champion-standings-${yearKey}`}
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                        aria-hidden={!isOpen}
                      >
                        <div className="px-6 pb-6 pt-2 border-t border-border/50">
                          {Array.isArray(c.standings) && c.standings.length > 0 && (
                            <ol className="space-y-2">
                              {c.standings.map((name, idx) => (
                                <li 
                                  key={idx} 
                                  className="flex items-center gap-3 text-sm text-muted-foreground"
                                >
                                  <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                                    idx === 0 
                                      ? 'bg-primary/20 text-primary' 
                                      : 'bg-muted text-muted-foreground'
                                  }`}>
                                    {idx + 1}
                                  </span>
                                  <span className={idx === 0 ? 'font-semibold text-foreground' : ''}>
                                    {name}
                                  </span>
                                </li>
                              ))}
                            </ol>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Most Games Played */}
        <Card className="gaming-card">
          <CardHeader>
            <div className="flex items-center justify-center gap-3 mb-2">
              <Gamepad2 className="w-8 h-8 text-primary" />
              <CardTitle className="text-3xl font-bold text-primary">Most Games Played</CardTitle>
            </div>
            <p className="text-muted-foreground text-center">The most dedicated players by year</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Object.entries(mostGamesByYear).reverse().map(([year, list]) => (
                <div key={year} className="space-y-4">
                  <div className="text-center pb-3 border-b border-primary/30">
                    <h3 className="text-2xl font-bold text-primary">{year}</h3>
                  </div>
                  <div className="space-y-3">
                    {list.map((p, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className={`flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold ${
                            idx === 0 
                              ? 'bg-primary/20 text-primary' 
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            {idx + 1}
                          </span>
                          <span className={`font-medium ${idx === 0 ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {p.name}
                          </span>
                        </div>
                        <span className="font-bold text-primary">{p.games}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Most Wins By Year - Charts */}
        <div className="space-y-6">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Award className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold text-primary">Most Wins By Year</h2>
            </div>
            <p className="text-muted-foreground">Top 5 players with the most victories</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {Object.entries(mostWinsByYear).reverse().map(([year, list]) => (
              <Card key={year} className="gaming-card">
                <CardHeader>
                  <CardTitle className="text-center text-2xl text-primary">{year}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-[450px] flex flex-col items-center">
                    <div className="w-full h-[280px]">
                      <Recharts.ResponsiveContainer width="100%" height="100%">
                        <Recharts.RadialBarChart 
                          cx="50%" 
                          cy="50%" 
                          innerRadius="20%" 
                          outerRadius="90%" 
                          data={list.map((item, idx) => ({ 
                            ...item, 
                            fill: item.fill,
                            rank: idx + 1
                          }))}
                          startAngle={90}
                          endAngle={-270}
                        >
                          <Recharts.PolarGrid gridType="circle" stroke="rgba(255,255,255,0.1)" />
                          <Recharts.RadialBar
                            background
                            dataKey="wins"
                            cornerRadius={6}
                          />
                          <Recharts.Tooltip 
                            content={({ active, payload }: any) => {
                              if (active && payload && payload.length) {
                                const data = payload[0].payload;
                                return (
                                  <div className="bg-[#1a1d24] border border-primary/30 rounded-lg p-3 shadow-lg">
                                    <p className="text-foreground font-semibold mb-1">
                                      {data.rank}. {data.name}
                                    </p>
                                    <p className="text-primary font-bold">
                                      Wins: {data.wins}
                                    </p>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                        </Recharts.RadialBarChart>
                      </Recharts.ResponsiveContainer>
                    </div>
                    <div className="mt-6 space-y-2 w-full px-4">
                      {list.map((entry, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: entry.fill }}
                            />
                            <span className="text-sm text-muted-foreground">{idx + 1}. {entry.name}</span>
                          </div>
                          <span className="text-sm font-bold text-foreground">{entry.wins}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Win Rate By Year - Charts */}
        <div className="space-y-6">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-2">
              <TrendingUp className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold text-primary">Win Rate By Year</h2>
            </div>
            <p className="text-muted-foreground">Highest win percentages among active players</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {Object.entries(winRateByYear).reverse().map(([year, list]) => (
              <Card key={year} className="gaming-card">
                <CardHeader>
                  <CardTitle className="text-center text-2xl text-primary">{year}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-[300px]">
                    <Recharts.ResponsiveContainer width="100%" height="100%">
                      <Recharts.PieChart>
                        <Recharts.Pie
                          data={list}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, winRate }) => `${name.split(' ')[0]}: ${winRate}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="winRate"
                        >
                          {list.map((entry, index) => (
                            <Recharts.Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Recharts.Pie>
                        <Recharts.Tooltip content={<CustomTooltip />} />
                      </Recharts.PieChart>
                    </Recharts.ResponsiveContainer>
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

export default HallOfFame;
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy, Medal, Search, ArrowUpDown, ExternalLink } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  player: string;
  rating: number;
  gamesPlayed: number;
  wins: number;
  winRate: number;
}

const Leaderboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof LeaderboardEntry>("rank");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Sample data - in real app this would come from Supabase
  const leaderboardData: LeaderboardEntry[] = [
    { rank: 1, player: "Suede", rating: 2246, gamesPlayed: 156, wins: 100, winRate: 64.0 },
    { rank: 2, player: "cheeze", rating: 1963, gamesPlayed: 187, wins: 109, winRate: 58.3 },
    { rank: 3, player: "rabdag", rating: 1949, gamesPlayed: 125, wins: 89, winRate: 71.2 },
    { rank: 4, player: "rever", rating: 1832, gamesPlayed: 298, wins: 167, winRate: 56.0 },
    { rank: 5, player: "Halu", rating: 1814, gamesPlayed: 492, wins: 229, winRate: 46.5 },
    { rank: 6, player: "Silent Knight", rating: 1789, gamesPlayed: 382, wins: 222, winRate: 58.1 },
    { rank: 7, player: "Zardoz", rating: 1756, gamesPlayed: 340, wins: 190, winRate: 55.9 },
    { rank: 8, player: "zaxxon", rating: 1723, gamesPlayed: 374, wins: 185, winRate: 49.5 },
    { rank: 9, player: "Carlot", rating: 1698, gamesPlayed: 156, wins: 96, winRate: 61.5 },
    { rank: 10, player: "MasterBuilder", rating: 1676, gamesPlayed: 289, wins: 145, winRate: 50.2 },
  ];

  const filteredAndSortedData = useMemo(() => {
    let filtered = leaderboardData.filter(entry =>
      entry.player.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      
      if (sortDirection === "asc") {
        return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      } else {
        return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
      }
    });

    return filtered;
  }, [searchTerm, sortField, sortDirection]);

  const handleSort = (field: keyof LeaderboardEntry) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-4 h-4 text-yellow-500" />;
    if (rank <= 3) return <Medal className="w-4 h-4 text-amber-600" />;
    return null;
  };

  const SortableHeader = ({ field, children }: { field: keyof LeaderboardEntry; children: React.ReactNode }) => (
    <TableHead 
      className="cursor-pointer hover:bg-muted/50 transition-colors"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center gap-2">
        {children}
        <ArrowUpDown className="w-4 h-4 opacity-50" />
      </div>
    </TableHead>
  );

  return (
    <section className="py-16 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-2">
            Current Season Leaderboard
          </h2>
          <p className="text-xl text-white max-w-2xl mx-auto">
            Track the top players and their performance in the ongoing season
          </p>
        </div>

        <Card className="gaming-card">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-6 h-6 text-primary" />
                2024 Season Rankings
              </CardTitle>
              
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 w-full max-w-full">
                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search players..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full sm:w-64"
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="w-full sm:w-auto truncate"
                >
                  <a href="/CivPlayers-Civ3-League/old-leaderboards" className="flex items-center justify-center w-full">
                    <span className="truncate">Old Leaderboards</span>
                    <ExternalLink className="w-3 h-3 ml-1 flex-shrink-0" />
                  </a>
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="overflow-x-auto">
              <Table className="league-table">
                <TableHeader>
                  <TableRow>
                    <SortableHeader field="rank">Rank</SortableHeader>
                    <SortableHeader field="player">Player</SortableHeader>
                    <SortableHeader field="rating">Rating</SortableHeader>
                    <SortableHeader field="gamesPlayed">Games</SortableHeader>
                    <SortableHeader field="wins">Wins</SortableHeader>
                    <SortableHeader field="winRate">Win Rate</SortableHeader>
                    <TableHead>Profile</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAndSortedData.map((entry) => (
                    <TableRow key={entry.player} className="hover:bg-muted/50 transition-colors">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getRankIcon(entry.rank)}
                          <span className="font-semibold">#{entry.rank}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-foreground">
                        {entry.player}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="gaming-badge font-mono">
                          {entry.rating}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {entry.gamesPlayed}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {entry.wins}
                      </TableCell>
                      <TableCell>
                        <span className={`font-medium ${
                          entry.winRate >= 60 ? 'text-green-500' :
                          entry.winRate >= 50 ? 'text-yellow-500' : 'text-red-500'
                        }`}>
                          {entry.winRate.toFixed(1)}%
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          className="bg-[var(--civ3-gold)] text-[var(--civ3-blue)] border border-[var(--civ3-border)] font-bold shadow-md hover:bg-yellow-300 hover:text-[var(--civ3-blue)] focus:ring-2 focus:ring-[var(--civ3-border)] focus:ring-offset-2 transition-colors"
                        >
                          View Profile
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {filteredAndSortedData.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No players found matching your search.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Leaderboard;
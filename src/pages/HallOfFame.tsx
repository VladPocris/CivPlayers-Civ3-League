import { useDocumentTitle } from "@/lib/useDocumentTitle";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const HallOfFame = () => {
  useDocumentTitle("Civ 3 League - Hall of Fame");
  return (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Hall of Fame</h1>
      <p className="mb-4">Celebrate the top players and legendary moments in CivPlayers Civ3 League history. More details coming soon!</p>
    </main>
    <Footer />
  </div>
  );
}

export default HallOfFame;

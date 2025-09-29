import { useDocumentTitle } from "@/lib/useDocumentTitle";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Modes = () => {
  useDocumentTitle("Civ 3 League - Modes");
  return (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Game Modes</h1>
      <p className="mb-4">Explore the different multiplayer modes available in CivPlayers Civ3 League. More details coming soon!</p>
    </main>
    <Footer />
  </div>
  );
}

export default Modes;

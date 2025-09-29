import { useDocumentTitle } from "@/lib/useDocumentTitle";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Stream = () => {
  useDocumentTitle("Civ 3 League - Stream");
  return (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Live Stream</h1>
      <p className="mb-4">Watch live games and events from the CivPlayers Civ3 League. Streaming integration coming soon!</p>
    </main>
    <Footer />
  </div>
  );
}

export default Stream;

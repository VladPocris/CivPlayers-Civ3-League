import { useDocumentTitle } from "@/lib/useDocumentTitle";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Guides = () => {
  useDocumentTitle("Civ 3 League - Guides");
  return (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Guides</h1>
      <p className="mb-4">Find strategy guides, tips, and resources for mastering Civ3 multiplayer. More content coming soon!</p>
    </main>
    <Footer />
  </div>
  );
}

export default Guides;

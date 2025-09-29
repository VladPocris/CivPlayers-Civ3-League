import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const BASE_NAME = "/CivPlayers-Civ3-League";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Rules from "./pages/Rules";
import Events from "./pages/Events";
import Modes from "./pages/Modes";
import HallOfFame from "./pages/HallOfFame";
import Guides from "./pages/Guides";
import Stream from "./pages/Stream";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
  <BrowserRouter basename={BASE_NAME}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/events" element={<Events />} />
          <Route path="/modes" element={<Modes />} />
          <Route path="/hall-of-fame" element={<HallOfFame />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/stream" element={<Stream />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

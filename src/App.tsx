import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Katalog from "./pages/Katalog";
import StorePartner from "./pages/StorePartner";
import Services from "./pages/Services";
import Contract from "./pages/Contract";
import Kolaborasi from "./pages/Kolaborasi";
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/katalog" element={<Katalog />} />
          <Route path="/store-partner" element={<StorePartner />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contract" element={<Contract />} />
          <Route path="/kolaborasi" element={<Kolaborasi />} />
          <Route path="/blog" element={<Blog />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

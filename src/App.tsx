import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { MusicPlayerProvider } from "@/contexts/MusicPlayerContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import MusicPlayer from "@/components/MusicPlayer";
import Index from "./pages/Index";
import Katalog from "./pages/Katalog";
import StorePartner from "./pages/StorePartner";
import Services from "./pages/Services";
import Pricing from "./pages/Pricing";
import Kolaborasi from "./pages/Kolaborasi";
import Blog from "./pages/Blog";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <MusicPlayerProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/katalog" element={<Katalog />} />
              <Route path="/store-partner" element={<StorePartner />} />
              <Route path="/services" element={<Services />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/kolaborasi" element={<Kolaborasi />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <MusicPlayer />
          </BrowserRouter>
        </TooltipProvider>
      </MusicPlayerProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

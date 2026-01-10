import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Music2 } from "lucide-react";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50"
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Music2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold font-display">SoundPub</span>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Fitur
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Harga
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Tentang
            </a>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="hidden sm:inline-flex">
              Masuk
            </Button>
            <Button variant="hero" size="default">
              Daftar
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;

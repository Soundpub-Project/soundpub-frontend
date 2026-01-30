import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Music2, Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface PricingCategory {
  id: string;
  name: string;
  slug: string;
}

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pricingHover, setPricingHover] = useState(false);
  const [pricingCategories, setPricingCategories] = useState<PricingCategory[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data } = await supabase
      .from('pricing_categories')
      .select('id, name, slug')
      .order('sort_order');
    setPricingCategories(data || []);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Katalog", path: "/katalog" },
    { name: "Store Partner", path: "/store-partner" },
    { name: "Services", path: "/services" },
    { name: "Harga", path: "/pricing", hasDropdown: true },
    { name: "Kolaborasi", path: "/kolaborasi" },
    { name: "Blog", path: "/blog" },
  ];

  const isActive = (path: string) => location.pathname === path;

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
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Music2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold font-display">SoundPub</span>
          </Link>

          {/* Nav Links - Desktop */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              link.hasDropdown ? (
                <div
                  key={link.path}
                  className="relative"
                  onMouseEnter={() => setPricingHover(true)}
                  onMouseLeave={() => setPricingHover(false)}
                >
                  <Link
                    to={link.path}
                    className={`text-sm transition-colors flex items-center gap-1 ${
                      isActive(link.path)
                        ? "text-primary font-medium"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.name}
                    <ChevronDown className={`w-4 h-4 transition-transform ${pricingHover ? 'rotate-180' : ''}`} />
                  </Link>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {pricingHover && pricingCategories.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-48 bg-card border border-border/50 rounded-xl shadow-lg overflow-hidden z-50"
                      >
                        <div className="py-2">
                          <Link
                            to="/pricing"
                            className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                          >
                            Semua Paket
                          </Link>
                          {pricingCategories.map((category) => (
                            <Link
                              key={category.id}
                              to={`/pricing?category=${category.slug}`}
                              className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                            >
                              {category.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm transition-colors ${
                    isActive(link.path)
                      ? "text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="hidden sm:inline-flex" asChild>
              <Link to="/auth">Masuk</Link>
            </Button>
            <Button variant="hero" size="default" className="hidden sm:inline-flex" asChild>
              <Link to="/auth">Daftar</Link>
            </Button>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden py-4 border-t border-border/50"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <div key={link.path}>
                  <Link
                    to={link.path}
                    onClick={() => !link.hasDropdown && setMobileMenuOpen(false)}
                    className={`px-4 py-2 rounded-lg transition-colors flex items-center justify-between ${
                      isActive(link.path)
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {link.name}
                    {link.hasDropdown && <ChevronDown className="w-4 h-4" />}
                  </Link>
                  
                  {/* Mobile dropdown items */}
                  {link.hasDropdown && pricingCategories.length > 0 && (
                    <div className="ml-4 mt-1 space-y-1">
                      {pricingCategories.map((category) => (
                        <Link
                          key={category.id}
                          to={`/pricing?category=${category.slug}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted rounded-lg"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="flex gap-2 mt-4 px-4">
                <Button variant="outline" className="flex-1" asChild>
                  <Link to="/auth">Masuk</Link>
                </Button>
                <Button variant="hero" className="flex-1" asChild>
                  <Link to="/auth">Daftar</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;

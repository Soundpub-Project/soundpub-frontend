import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Music, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Katalog = () => {
  const katalogItems = [
    { title: "Album Rock Indonesia", artist: "Various Artists", genre: "Rock", year: "2024" },
    { title: "Pop Hits Collection", artist: "Various Artists", genre: "Pop", year: "2024" },
    { title: "Jazz Nusantara", artist: "Various Artists", genre: "Jazz", year: "2023" },
    { title: "Indie Vibes", artist: "Various Artists", genre: "Indie", year: "2024" },
    { title: "Electronic Dreams", artist: "Various Artists", genre: "Electronic", year: "2023" },
    { title: "Acoustic Sessions", artist: "Various Artists", genre: "Acoustic", year: "2024" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
              <span className="text-gradient">Katalog</span> Musik
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Jelajahi koleksi musik yang telah didistribusikan melalui SoundPub ke seluruh platform digital dunia.
            </p>
          </motion.div>

          {/* Search & Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col md:flex-row gap-4 mb-12 max-w-2xl mx-auto"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="Cari musik, artis, atau album..." 
                className="pl-10 bg-card border-border/50"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </motion.div>

          {/* Katalog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {katalogItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-card border border-border/50 rounded-2xl p-6 hover:border-primary/50 transition-all duration-300"
              >
                <div className="w-full aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl mb-4 flex items-center justify-center">
                  <Music className="w-16 h-16 text-primary/50" />
                </div>
                <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-2">{item.artist}</p>
                <div className="flex gap-2">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    {item.genre}
                  </span>
                  <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                    {item.year}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Katalog;

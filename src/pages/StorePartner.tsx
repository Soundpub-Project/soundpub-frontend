import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Store, Globe, Music2 } from "lucide-react";

const StorePartner = () => {
  const stores = [
    "Spotify", "Apple Music", "YouTube Music", "Amazon Music", "Deezer",
    "Tidal", "Pandora", "SoundCloud", "Shazam", "TikTok",
    "Instagram/Facebook", "Snapchat", "Tencent", "NetEase", "JioSaavn",
    "Anghami", "Boomplay", "Audiomack", "Resso", "Triller"
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
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm mb-6">
              <Globe className="w-4 h-4" />
              100+ Platform Digital
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
              <span className="text-gradient">Store Partner</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Musik Anda akan tersedia di lebih dari 100 toko digital platform di seluruh dunia.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          >
            <div className="bg-card border border-border/50 rounded-2xl p-8 text-center">
              <Store className="w-12 h-12 text-primary mx-auto mb-4" />
              <div className="text-4xl font-bold font-display text-gradient mb-2">100+</div>
              <p className="text-muted-foreground">Platform Digital</p>
            </div>
            <div className="bg-card border border-border/50 rounded-2xl p-8 text-center">
              <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
              <div className="text-4xl font-bold font-display text-gradient mb-2">190+</div>
              <p className="text-muted-foreground">Negara</p>
            </div>
            <div className="bg-card border border-border/50 rounded-2xl p-8 text-center">
              <Music2 className="w-12 h-12 text-primary mx-auto mb-4" />
              <div className="text-4xl font-bold font-display text-gradient mb-2">24/7</div>
              <p className="text-muted-foreground">Akses Streaming</p>
            </div>
          </motion.div>

          {/* Store Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold font-display text-center mb-8">
              Platform Partner Kami
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {stores.map((store, index) => (
                <motion.div
                  key={store}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-card border border-border/50 rounded-xl p-4 text-center hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                >
                  <span className="font-medium">{store}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StorePartner;

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Store, Globe, Music2 } from "lucide-react";
import {
  SiSpotify,
  SiApplemusic,
  SiYoutubemusic,
  SiTidal,
  SiPandora,
  SiSoundcloud,
  SiShazam,
  SiTiktok,
  SiInstagram,
  SiSnapchat,
} from "@icons-pack/react-simple-icons";

const StorePartner = () => {
  const stores = [
    { name: "Spotify", icon: SiSpotify, color: "#1DB954" },
    { name: "Apple Music", icon: SiApplemusic, color: "#FA243C" },
    { name: "YouTube Music", icon: SiYoutubemusic, color: "#FF0000" },
    { name: "Amazon Music", icon: null, color: "#FF9900" },
    { name: "Deezer", icon: null, color: "#FEAA2D" },
    { name: "Tidal", icon: SiTidal, color: "#000000" },
    { name: "Pandora", icon: SiPandora, color: "#3668FF" },
    { name: "SoundCloud", icon: SiSoundcloud, color: "#FF5500" },
    { name: "Shazam", icon: SiShazam, color: "#0088FF" },
    { name: "TikTok", icon: SiTiktok, color: "#000000" },
    { name: "Instagram", icon: SiInstagram, color: "#E4405F" },
    { name: "Snapchat", icon: SiSnapchat, color: "#FFFC00" },
    { name: "Tencent", icon: null, color: "#12B7F5" },
    { name: "NetEase", icon: null, color: "#C20C0C" },
    { name: "JioSaavn", icon: null, color: "#2BC5B4" },
    { name: "Anghami", icon: null, color: "#6600CC" },
    { name: "Boomplay", icon: null, color: "#FF6B00" },
    { name: "Audiomack", icon: null, color: "#FFA500" },
    { name: "Resso", icon: null, color: "#00F0FF" },
    { name: "Triller", icon: null, color: "#FF0050" },
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
              {stores.map((store, index) => {
                const IconComponent = store.icon;
                return (
                  <motion.div
                    key={store.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-card border border-border/50 rounded-xl p-6 text-center hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                      {IconComponent ? (
                        <IconComponent 
                          size={40} 
                          color={store.color}
                          className="group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg"
                          style={{ backgroundColor: store.color }}
                        >
                          {store.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <span className="font-medium text-sm">{store.name}</span>
                  </motion.div>
                );
              })}
            </div>
            
            {/* Additional info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 text-center"
            >
              <p className="text-muted-foreground">
                Dan 80+ platform digital lainnya di seluruh dunia
              </p>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StorePartner;

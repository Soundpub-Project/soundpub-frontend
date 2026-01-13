import { motion, type Variants } from "framer-motion";
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
import {
  AmazonMusicIcon,
  DeezerIcon,
  TencentIcon,
  NetEaseIcon,
  JioSaavnIcon,
  AnghamiIcon,
  BoomplayIcon,
  AudiomackIcon,
  RessoIcon,
  TrillerIcon,
} from "@/components/PlatformIcons";

const StorePartner = () => {
  const stores = [
    { name: "Spotify", icon: SiSpotify, color: "#1DB954", isSimpleIcon: true },
    { name: "Apple Music", icon: SiApplemusic, color: "#FA243C", isSimpleIcon: true },
    { name: "YouTube Music", icon: SiYoutubemusic, color: "#FF0000", isSimpleIcon: true },
    { name: "Amazon Music", icon: AmazonMusicIcon, color: "#FF9900", isSimpleIcon: false },
    { name: "Deezer", icon: DeezerIcon, color: "#FEAA2D", isSimpleIcon: false },
    { name: "Tidal", icon: SiTidal, color: "#000000", isSimpleIcon: true },
    { name: "Pandora", icon: SiPandora, color: "#3668FF", isSimpleIcon: true },
    { name: "SoundCloud", icon: SiSoundcloud, color: "#FF5500", isSimpleIcon: true },
    { name: "Shazam", icon: SiShazam, color: "#0088FF", isSimpleIcon: true },
    { name: "TikTok", icon: SiTiktok, color: "#000000", isSimpleIcon: true },
    { name: "Instagram", icon: SiInstagram, color: "#E4405F", isSimpleIcon: true },
    { name: "Snapchat", icon: SiSnapchat, color: "#FFFC00", isSimpleIcon: true },
    { name: "Tencent", icon: TencentIcon, color: "#12B7F5", isSimpleIcon: false },
    { name: "NetEase", icon: NetEaseIcon, color: "#C20C0C", isSimpleIcon: false },
    { name: "JioSaavn", icon: JioSaavnIcon, color: "#2BC5B4", isSimpleIcon: false },
    { name: "Anghami", icon: AnghamiIcon, color: "#6600CC", isSimpleIcon: false },
    { name: "Boomplay", icon: BoomplayIcon, color: "#FF6B00", isSimpleIcon: false },
    { name: "Audiomack", icon: AudiomackIcon, color: "#FFA500", isSimpleIcon: false },
    { name: "Resso", icon: RessoIcon, color: "#00F0FF", isSimpleIcon: false },
    { name: "Triller", icon: TrillerIcon, color: "#FF0050", isSimpleIcon: false },
  ];

  const cardVariants: Variants = {
    initial: { opacity: 0, scale: 0.9, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    hover: { 
      scale: 1.05, 
      y: -8,
      boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.3)",
      transition: { duration: 0.3, ease: "easeOut" as const }
    }
  };

  const iconVariants: Variants = {
    initial: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.2, 
      rotate: [0, -10, 10, 0],
      transition: { duration: 0.4, ease: "easeInOut" as const }
    }
  };

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
            <motion.div 
              whileHover={{ scale: 1.02, y: -4 }}
              className="bg-card border border-border/50 rounded-2xl p-8 text-center hover:border-primary/50 transition-colors duration-300"
            >
              <Store className="w-12 h-12 text-primary mx-auto mb-4" />
              <div className="text-4xl font-bold font-display text-gradient mb-2">100+</div>
              <p className="text-muted-foreground">Platform Digital</p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.02, y: -4 }}
              className="bg-card border border-border/50 rounded-2xl p-8 text-center hover:border-primary/50 transition-colors duration-300"
            >
              <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
              <div className="text-4xl font-bold font-display text-gradient mb-2">190+</div>
              <p className="text-muted-foreground">Negara</p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.02, y: -4 }}
              className="bg-card border border-border/50 rounded-2xl p-8 text-center hover:border-primary/50 transition-colors duration-300"
            >
              <Music2 className="w-12 h-12 text-primary mx-auto mb-4" />
              <div className="text-4xl font-bold font-display text-gradient mb-2">24/7</div>
              <p className="text-muted-foreground">Akses Streaming</p>
            </motion.div>
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
                    variants={cardVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-card border border-border/50 rounded-xl p-6 text-center cursor-pointer group relative overflow-hidden"
                  >
                    {/* Background glow effect on hover */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(circle at center, ${store.color}15 0%, transparent 70%)`
                      }}
                    />
                    
                    <motion.div 
                      className="w-12 h-12 mx-auto mb-3 flex items-center justify-center relative z-10"
                      variants={iconVariants}
                    >
                      {store.isSimpleIcon ? (
                        <IconComponent 
                          size={40} 
                          color={store.color}
                        />
                      ) : (
                        <IconComponent size={40} className="transition-transform duration-300" />
                      )}
                    </motion.div>
                    <span className="font-medium text-sm relative z-10 group-hover:text-foreground transition-colors duration-300">
                      {store.name}
                    </span>
                    
                    {/* Bottom highlight bar */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ backgroundColor: store.color }}
                    />
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

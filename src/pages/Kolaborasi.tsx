import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Users, Handshake, Building2, Music2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Kolaborasi = () => {
  const collaborationTypes = [
    {
      icon: Building2,
      title: "Label Rekaman",
      description: "Kerjasama dengan label rekaman untuk distribusi katalog musik secara massal."
    },
    {
      icon: Users,
      title: "Manajemen Artis",
      description: "Partnership dengan management untuk mengelola artis-artis berbakat."
    },
    {
      icon: Handshake,
      title: "Agregator",
      description: "Kolaborasi dengan agregator musik lain untuk memperluas jangkauan."
    },
    {
      icon: Music2,
      title: "Komunitas Musik",
      description: "Bekerjasama dengan komunitas musik untuk memberdayakan artis lokal."
    }
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
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
              Mari <span className="text-gradient">Berkolaborasi</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Bagian dari ekosistem musik industri? Mari berkumpul dan berkolaborasi untuk mempercepat tujuan.
            </p>
          </motion.div>

          {/* Collaboration Types */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {collaborationTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card border border-border/50 rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 group text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <type.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{type.title}</h3>
                <p className="text-muted-foreground text-sm">{type.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-card border border-border/50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold font-display text-center mb-6">
                Hubungi Kami
              </h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Nama</label>
                    <Input placeholder="Nama lengkap Anda" className="bg-background" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <Input type="email" placeholder="email@example.com" className="bg-background" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Perusahaan/Organisasi</label>
                  <Input placeholder="Nama perusahaan atau organisasi Anda" className="bg-background" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Pesan</label>
                  <Textarea 
                    placeholder="Ceritakan tentang kolaborasi yang Anda inginkan..." 
                    className="bg-background min-h-[120px]" 
                  />
                </div>
                <Button variant="hero" className="w-full gap-2">
                  Kirim Pesan
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Kolaborasi;

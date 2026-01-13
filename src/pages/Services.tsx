import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Upload, Send, DollarSign, Shield, Headphones, BarChart3, FileCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Services = () => {
  const services = [
    {
      icon: Upload,
      title: "Distribusi Musik",
      description: "Unggah musik Anda ke 100+ platform digital di seluruh dunia dengan mudah dan cepat."
    },
    {
      icon: Shield,
      title: "Perlindungan Hak Cipta",
      description: "Lindungi karya musik Anda dengan sistem pengelolaan hak cipta yang komprehensif."
    },
    {
      icon: DollarSign,
      title: "Royalti Management",
      description: "Kelola dan terima pembayaran royalti dari semua platform streaming dengan transparan."
    },
    {
      icon: BarChart3,
      title: "Analytics & Reporting",
      description: "Pantau performa musik Anda dengan dashboard analytics yang lengkap."
    },
    {
      icon: FileCheck,
      title: "ISRC & UPC Gratis",
      description: "Dapatkan kode ISRC dan UPC untuk setiap rilisan musik Anda secara gratis."
    },
    {
      icon: Headphones,
      title: "Quality Control",
      description: "Tim kami memastikan kualitas audio dan metadata musik Anda sesuai standar industri."
    },
    {
      icon: Users,
      title: "Artist Support",
      description: "Dukungan penuh dari tim kami untuk membantu perjalanan karir musik Anda."
    },
    {
      icon: Send,
      title: "Fast Delivery",
      description: "Proses distribusi cepat, musik Anda dapat live dalam 24-48 jam."
    }
  ];

  const steps = [
    { number: "01", title: "Daftar", description: "Buat akun dan lengkapi profil artis Anda" },
    { number: "02", title: "Upload", description: "Unggah file musik dan isi informasi rilisan" },
    { number: "03", title: "Review", description: "Tim kami akan mereview kualitas audio & metadata" },
    { number: "04", title: "Distribute", description: "Musik Anda live di 100+ platform digital" },
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
              <span className="text-gradient">Layanan</span> Kami
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Solusi lengkap untuk distribusi dan pengelolaan musik digital Anda.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card border border-border/50 rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <service.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm">{service.description}</p>
              </motion.div>
            ))}
          </div>

          {/* How It Works */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold font-display text-center mb-12">
              Cara <span className="text-gradient">Menjual Musik</span> Anda
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-5xl font-bold text-gradient font-display mb-4">
                    {step.number}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Button variant="hero" size="lg" asChild>
              <Link to="/contract">Mulai Sekarang</Link>
            </Button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Services;

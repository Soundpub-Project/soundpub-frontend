import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Upload, Send, DollarSign, Shield, Headphones, BarChart3, FileCheck, Users,
  Loader2, Plus, X, LucideIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface Service {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  sort_order: number | null;
}

interface AdditionalService {
  id: string;
  title: string;
  description: string | null;
  price: string;
  cover_url: string | null;
  sort_order: number | null;
}

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Upload,
  Send,
  DollarSign,
  Shield,
  Headphones,
  BarChart3,
  FileCheck,
  Users,
  Plus,
};

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [additionalServices, setAdditionalServices] = useState<AdditionalService[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<AdditionalService | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [servicesRes, additionalRes] = await Promise.all([
        supabase.from('services').select('*').order('sort_order'),
        supabase.from('additional_services').select('*').order('sort_order'),
      ]);

      if (servicesRes.error) throw servicesRes.error;
      if (additionalRes.error) throw additionalRes.error;

      setServices(servicesRes.data || []);
      setAdditionalServices(additionalRes.data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const openServiceModal = (service: AdditionalService) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const getIcon = (iconName: string | null): LucideIcon => {
    if (!iconName) return Plus;
    return iconMap[iconName] || Plus;
  };

  const steps = [
    { number: "01", title: "Daftar", description: "Buat akun dan lengkapi profil artis Anda" },
    { number: "02", title: "Upload", description: "Unggah file musik dan isi informasi rilisan" },
    { number: "03", title: "Review", description: "Tim kami akan mereview kualitas audio & metadata" },
    { number: "04", title: "Distribute", description: "Musik Anda live di 100+ platform digital" },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

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
            {services.map((service, index) => {
              const IconComponent = getIcon(service.icon);
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card border border-border/50 rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Additional Services */}
          {additionalServices.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-20"
            >
              <h2 className="text-3xl font-bold font-display text-center mb-12">
                Layanan <span className="text-gradient">Tambahan</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {additionalServices.map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="bg-card border border-border/50 rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 cursor-pointer group"
                    onClick={() => openServiceModal(service)}
                  >
                    {/* Cover Image */}
                    <div className="w-full aspect-video rounded-xl mb-4 overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      {service.cover_url ? (
                        <img 
                          src={service.cover_url} 
                          alt={service.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <Plus className="w-8 h-8 text-primary/50" />
                      )}
                    </div>
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                      {service.description}
                    </p>
                    <p className="text-primary font-bold">{service.price}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

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
              <Link to="/harga">Lihat Harga</Link>
            </Button>
          </motion.div>
        </div>
      </main>

      <Footer />

      {/* Modal for Additional Service Detail */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-display">{selectedService?.title}</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Detail layanan tambahan
            </DialogDescription>
          </DialogHeader>
          
          {selectedService && (
            <div className="space-y-4">
              {/* Cover Image */}
              <div className="w-full aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                {selectedService.cover_url ? (
                  <img 
                    src={selectedService.cover_url} 
                    alt={selectedService.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Plus className="w-12 h-12 text-primary/50" />
                )}
              </div>
              
              {/* Description */}
              <p className="text-muted-foreground">{selectedService.description}</p>
              
              {/* Price */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-muted-foreground">Harga</span>
                <span className="text-2xl font-bold text-gradient">{selectedService.price}</span>
              </div>
              
              {/* CTA */}
              <Button variant="hero" className="w-full" asChild>
                <Link to="/kolaborasi">Pesan Sekarang</Link>
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Services;
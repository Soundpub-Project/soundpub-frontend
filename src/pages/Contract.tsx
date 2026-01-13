import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contract = () => {
  const plans = [
    {
      name: "Basic",
      price: "Gratis",
      description: "Untuk artis pemula yang baru memulai",
      features: [
        "Distribusi ke 50+ platform",
        "1 rilisan per bulan",
        "ISRC gratis",
        "Dashboard analytics basic",
        "Email support"
      ],
      popular: false
    },
    {
      name: "Pro",
      price: "Rp 150.000",
      period: "/bulan",
      description: "Untuk artis yang serius berkarir",
      features: [
        "Distribusi ke 100+ platform",
        "Unlimited rilisan",
        "ISRC & UPC gratis",
        "Dashboard analytics lengkap",
        "Priority support",
        "Royalty split",
        "Pre-save links"
      ],
      popular: true
    },
    {
      name: "Label",
      price: "Custom",
      description: "Untuk label rekaman & manajemen artis",
      features: [
        "Semua fitur Pro",
        "Multi-artist management",
        "White-label dashboard",
        "API access",
        "Dedicated account manager",
        "Custom royalty terms"
      ],
      popular: false
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
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm mb-6">
              <FileText className="w-4 h-4" />
              Pilih Paket Terbaik
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
              <span className="text-gradient">Contract</span> & Pricing
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Pilih paket distribusi musik yang sesuai dengan kebutuhan Anda.
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative bg-card border rounded-2xl p-8 ${
                  plan.popular 
                    ? 'border-primary shadow-lg shadow-primary/20' 
                    : 'border-border/50'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    Populer
                  </div>
                )}
                <h3 className="text-xl font-bold font-display mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-gradient">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                </div>
                <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  variant={plan.popular ? "hero" : "outline"} 
                  className="w-full gap-2"
                >
                  Pilih Paket
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </motion.div>
            ))}
          </div>

          {/* FAQ Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-muted-foreground"
          >
            <p>Punya pertanyaan? <a href="/kolaborasi" className="text-primary hover:underline">Hubungi kami</a></p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contract;

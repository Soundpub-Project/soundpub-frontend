import { motion } from "framer-motion";
import { Zap, Globe, BarChart3, Shield, Music, Wallet } from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "Distribusi Global",
    description: "Jangkau pendengar di 150+ platform streaming termasuk Spotify, Apple Music, dan YouTube Music.",
  },
  {
    icon: Zap,
    title: "Rilis Cepat",
    description: "Musik Anda live dalam hitungan hari, bukan minggu. Proses cepat dan efisien.",
  },
  {
    icon: BarChart3,
    title: "Analitik Real-time",
    description: "Pantau performa rilisan Anda dengan dashboard analitik yang lengkap dan mudah dipahami.",
  },
  {
    icon: Wallet,
    title: "Royalti 100%",
    description: "Dapatkan semua penghasilan dari streaming. Tidak ada potongan tersembunyi.",
  },
  {
    icon: Shield,
    title: "Perlindungan Hak Cipta",
    description: "Lindungi karya Anda dengan Content ID dan sistem proteksi hak cipta kami.",
  },
  {
    icon: Music,
    title: "Multi-Format",
    description: "Dukung berbagai format audio: musik, podcast, audiobook, dan soundscape.",
  },
];

const Features = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Mengapa <span className="text-gradient">SoundPub</span>?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Semua yang Anda butuhkan untuk sukses di industri audio streaming
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

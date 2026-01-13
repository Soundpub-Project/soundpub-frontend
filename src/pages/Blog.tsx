import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Blog = () => {
  const posts = [
    {
      title: "Tips Sukses Distribusi Musik Digital di 2024",
      excerpt: "Pelajari strategi dan tips untuk memaksimalkan distribusi musik Anda di era digital.",
      author: "SoundPub Team",
      date: "10 Jan 2024",
      category: "Tips & Tricks"
    },
    {
      title: "Memahami Royalti Streaming: Panduan Lengkap",
      excerpt: "Bagaimana royalti streaming dihitung dan cara memaksimalkan pendapatan dari musik Anda.",
      author: "SoundPub Team",
      date: "5 Jan 2024",
      category: "Education"
    },
    {
      title: "Mengapa ISRC Penting untuk Musik Anda",
      excerpt: "Kenali pentingnya kode ISRC dan bagaimana hal ini membantu melacak musik Anda secara global.",
      author: "SoundPub Team",
      date: "28 Dec 2023",
      category: "Industry"
    },
    {
      title: "Cara Membuat Cover Art yang Menarik",
      excerpt: "Panduan lengkap membuat artwork album yang profesional dan menarik perhatian.",
      author: "SoundPub Team",
      date: "20 Dec 2023",
      category: "Tips & Tricks"
    },
    {
      title: "Tren Musik Indonesia 2024",
      excerpt: "Analisis tren musik Indonesia dan genre yang sedang naik daun tahun ini.",
      author: "SoundPub Team",
      date: "15 Dec 2023",
      category: "Industry"
    },
    {
      title: "Strategi Promosi Musik di Media Sosial",
      excerpt: "Cara efektif mempromosikan musik Anda di berbagai platform media sosial.",
      author: "SoundPub Team",
      date: "10 Dec 2023",
      category: "Marketing"
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
              <span className="text-gradient">Blog</span> & Artikel
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Insights, tips, dan berita terbaru seputar industri musik digital.
            </p>
          </motion.div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-card border border-border/50 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300"
              >
                <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20" />
                <div className="p-6">
                  <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <h3 className="font-semibold text-lg mt-4 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                    </div>
                  </div>
                  <Link 
                    to="#" 
                    className="inline-flex items-center gap-1 text-primary text-sm mt-4 hover:gap-2 transition-all"
                  >
                    Baca selengkapnya
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;

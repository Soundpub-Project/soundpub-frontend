import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FileText, CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

interface PricingCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  sort_order: number;
}

interface PricingPlan {
  id: string;
  category_id: string;
  name: string;
  price: string;
  period: string | null;
  description: string | null;
  features: unknown[];
  is_popular: boolean;
  sort_order: number;
}

const Pricing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState<PricingCategory[]>([]);
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  // Handle URL category parameter
  useEffect(() => {
    const categorySlug = searchParams.get('category');
    if (categorySlug && categories.length > 0) {
      const category = categories.find(c => c.slug === categorySlug);
      if (category) {
        setActiveCategory(category.id);
      }
    }
  }, [searchParams, categories]);

  const fetchData = async () => {
    try {
      // Fetch categories
      const { data: categoriesData, error: catError } = await supabase
        .from('pricing_categories')
        .select('*')
        .order('sort_order');

      if (catError) throw catError;

      // Fetch plans
      const { data: plansData, error: planError } = await supabase
        .from('pricing_plans')
        .select('*')
        .order('sort_order');

      if (planError) throw planError;

      setCategories(categoriesData || []);
      setPlans((plansData || []).map(plan => ({
        ...plan,
        features: Array.isArray(plan.features) ? plan.features : []
      })));
      
      // Set active category from URL or first category
      const categorySlug = searchParams.get('category');
      if (categorySlug && categoriesData) {
        const category = categoriesData.find(c => c.slug === categorySlug);
        if (category) {
          setActiveCategory(category.id);
        } else if (categoriesData.length > 0) {
          setActiveCategory(categoriesData[0].id);
        }
      } else if (categoriesData && categoriesData.length > 0) {
        setActiveCategory(categoriesData[0].id);
      }
    } catch (error) {
      console.error('Error fetching pricing data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    const category = categories.find(c => c.id === categoryId);
    if (category) {
      setSearchParams({ category: category.slug });
    }
  };

  // Fallback data when database is empty
  const fallbackPlans = [
    {
      id: '1',
      category_id: 'default',
      name: 'Basic',
      price: 'Gratis',
      period: null,
      description: 'Untuk artis pemula yang baru memulai',
      features: [
        'Distribusi ke 50+ platform',
        '1 rilisan per bulan',
        'ISRC gratis',
        'Dashboard analytics basic',
        'Email support'
      ],
      is_popular: false,
      sort_order: 0
    },
    {
      id: '2',
      category_id: 'default',
      name: 'Pro',
      price: 'Rp 150.000',
      period: '/bulan',
      description: 'Untuk artis yang serius berkarir',
      features: [
        'Distribusi ke 100+ platform',
        'Unlimited rilisan',
        'ISRC & UPC gratis',
        'Dashboard analytics lengkap',
        'Priority support',
        'Royalty split',
        'Pre-save links'
      ],
      is_popular: true,
      sort_order: 1
    },
    {
      id: '3',
      category_id: 'default',
      name: 'Label',
      price: 'Custom',
      period: null,
      description: 'Untuk label rekaman & manajemen artis',
      features: [
        'Semua fitur Pro',
        'Multi-artist management',
        'White-label dashboard',
        'API access',
        'Dedicated account manager',
        'Custom royalty terms'
      ],
      is_popular: false,
      sort_order: 2
    }
  ];

  const displayPlans = plans.length > 0 
    ? plans.filter(p => !activeCategory || p.category_id === activeCategory)
    : fallbackPlans;

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
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm mb-6">
              <FileText className="w-4 h-4" />
              Pilih Paket Terbaik
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
              <span className="text-gradient">Harga</span> & Paket
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Pilih paket distribusi musik yang sesuai dengan kebutuhan Anda.
            </p>
          </motion.div>

          {/* Category Tabs */}
          {categories.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-wrap justify-center gap-2 mb-12"
            >
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? 'hero' : 'outline'}
                  onClick={() => handleCategoryChange(category.id)}
                  className="rounded-full"
                >
                  {category.name}
                </Button>
              ))}
            </motion.div>
          )}

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            {displayPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative bg-card border rounded-2xl p-8 flex flex-col ${
                  plan.is_popular 
                    ? 'border-primary shadow-lg shadow-primary/20' 
                    : 'border-border/50'
                }`}
              >
                {plan.is_popular && (
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
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      {String(feature)}
                    </li>
                  ))}
                </ul>
                <Button 
                  variant={plan.is_popular ? 'hero' : 'outline'} 
                  className="w-full gap-2 mt-auto"
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

export default Pricing;

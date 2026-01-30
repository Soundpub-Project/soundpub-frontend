import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Loader2, FolderPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
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

const PricingManager = () => {
  const [categories, setCategories] = useState<PricingCategory[]>([]);
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [planDialogOpen, setPlanDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<PricingCategory | null>(null);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
  const { toast } = useToast();

  // Form states
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    slug: '',
    description: '',
    sort_order: 0
  });

  const [planForm, setPlanForm] = useState({
    category_id: '',
    name: '',
    price: '',
    period: '',
    description: '',
    features: '',
    is_popular: false,
    sort_order: 0
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: cats } = await supabase
        .from('pricing_categories')
        .select('*')
        .order('sort_order');
      
      const { data: pls } = await supabase
        .from('pricing_plans')
        .select('*')
        .order('sort_order');
      
      setCategories(cats || []);
      setPlans((pls || []).map(p => ({
        ...p,
        features: Array.isArray(p.features) ? p.features : []
      })));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveCategory = async () => {
    setIsSaving(true);
    try {
      if (editingCategory) {
        const { error } = await supabase
          .from('pricing_categories')
          .update(categoryForm)
          .eq('id', editingCategory.id);
        if (error) throw error;
        toast({ title: 'Kategori berhasil diupdate' });
      } else {
        const { error } = await supabase
          .from('pricing_categories')
          .insert([categoryForm]);
        if (error) throw error;
        toast({ title: 'Kategori berhasil ditambahkan' });
      }
      setCategoryDialogOpen(false);
      setEditingCategory(null);
      setCategoryForm({ name: '', slug: '', description: '', sort_order: 0 });
      fetchData();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSavePlan = async () => {
    setIsSaving(true);
    try {
      const planData = {
        ...planForm,
        features: planForm.features.split('\n').filter(f => f.trim()),
        period: planForm.period || null,
      };

      if (editingPlan) {
        const { error } = await supabase
          .from('pricing_plans')
          .update(planData)
          .eq('id', editingPlan.id);
        if (error) throw error;
        toast({ title: 'Paket berhasil diupdate' });
      } else {
        const { error } = await supabase
          .from('pricing_plans')
          .insert([planData]);
        if (error) throw error;
        toast({ title: 'Paket berhasil ditambahkan' });
      }
      setPlanDialogOpen(false);
      setEditingPlan(null);
      setPlanForm({
        category_id: '',
        name: '',
        price: '',
        period: '',
        description: '',
        features: '',
        is_popular: false,
        sort_order: 0
      });
      fetchData();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Hapus kategori ini? Semua paket di kategori ini juga akan terhapus.')) return;
    try {
      const { error } = await supabase.from('pricing_categories').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Kategori berhasil dihapus' });
      fetchData();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const handleDeletePlan = async (id: string) => {
    if (!confirm('Hapus paket ini?')) return;
    try {
      const { error } = await supabase.from('pricing_plans').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Paket berhasil dihapus' });
      fetchData();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const openEditCategory = (cat: PricingCategory) => {
    setEditingCategory(cat);
    setCategoryForm({
      name: cat.name,
      slug: cat.slug,
      description: cat.description || '',
      sort_order: cat.sort_order
    });
    setCategoryDialogOpen(true);
  };

  const openEditPlan = (plan: PricingPlan) => {
    setEditingPlan(plan);
    setPlanForm({
      category_id: plan.category_id,
      name: plan.name,
      price: plan.price,
      period: plan.period || '',
      description: plan.description || '',
      features: plan.features.join('\n'),
      is_popular: plan.is_popular,
      sort_order: plan.sort_order
    });
    setPlanDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Categories Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Kategori Harga</h3>
          <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-2" onClick={() => {
                setEditingCategory(null);
                setCategoryForm({ name: '', slug: '', description: '', sort_order: 0 });
              }}>
                <FolderPlus className="w-4 h-4" />
                Tambah Kategori
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingCategory ? 'Edit Kategori' : 'Tambah Kategori'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Nama</Label>
                  <Input
                    value={categoryForm.name}
                    onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Slug</Label>
                  <Input
                    value={categoryForm.slug}
                    onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value })}
                    placeholder="distribusi-musik"
                  />
                </div>
                <div>
                  <Label>Deskripsi</Label>
                  <Textarea
                    value={categoryForm.description}
                    onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Urutan</Label>
                  <Input
                    type="number"
                    value={categoryForm.sort_order}
                    onChange={(e) => setCategoryForm({ ...categoryForm, sort_order: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <Button onClick={handleSaveCategory} disabled={isSaving} className="w-full">
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Simpan
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {categories.map((cat) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border/50 rounded-lg p-4 flex items-center justify-between"
            >
              <div>
                <h4 className="font-medium">{cat.name}</h4>
                <p className="text-sm text-muted-foreground">{cat.slug}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => openEditCategory(cat)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDeleteCategory(cat.id)}>
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            </motion.div>
          ))}
          {categories.length === 0 && (
            <p className="text-muted-foreground text-center py-8">Belum ada kategori</p>
          )}
        </div>
      </div>

      {/* Plans Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Paket Harga</h3>
          <Dialog open={planDialogOpen} onOpenChange={setPlanDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-2" onClick={() => {
                setEditingPlan(null);
                setPlanForm({
                  category_id: categories[0]?.id || '',
                  name: '',
                  price: '',
                  period: '',
                  description: '',
                  features: '',
                  is_popular: false,
                  sort_order: 0
                });
              }}>
                <Plus className="w-4 h-4" />
                Tambah Paket
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>{editingPlan ? 'Edit Paket' : 'Tambah Paket'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                <div>
                  <Label>Kategori</Label>
                  <Select
                    value={planForm.category_id}
                    onValueChange={(v) => setPlanForm({ ...planForm, category_id: v })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Nama Paket</Label>
                  <Input
                    value={planForm.name}
                    onChange={(e) => setPlanForm({ ...planForm, name: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Harga</Label>
                    <Input
                      value={planForm.price}
                      onChange={(e) => setPlanForm({ ...planForm, price: e.target.value })}
                      placeholder="Rp 150.000"
                    />
                  </div>
                  <div>
                    <Label>Periode</Label>
                    <Input
                      value={planForm.period}
                      onChange={(e) => setPlanForm({ ...planForm, period: e.target.value })}
                      placeholder="/bulan"
                    />
                  </div>
                </div>
                <div>
                  <Label>Deskripsi</Label>
                  <Textarea
                    value={planForm.description}
                    onChange={(e) => setPlanForm({ ...planForm, description: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Fitur (satu per baris)</Label>
                  <Textarea
                    value={planForm.features}
                    onChange={(e) => setPlanForm({ ...planForm, features: e.target.value })}
                    rows={5}
                    placeholder="Distribusi ke 100+ platform&#10;Unlimited rilisan&#10;ISRC & UPC gratis"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={planForm.is_popular}
                    onCheckedChange={(v) => setPlanForm({ ...planForm, is_popular: v })}
                  />
                  <Label>Paket Populer</Label>
                </div>
                <div>
                  <Label>Urutan</Label>
                  <Input
                    type="number"
                    value={planForm.sort_order}
                    onChange={(e) => setPlanForm({ ...planForm, sort_order: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <Button onClick={handleSavePlan} disabled={isSaving} className="w-full">
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Simpan
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {plans.map((plan) => {
            const category = categories.find(c => c.id === plan.category_id);
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-border/50 rounded-lg p-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{plan.name}</h4>
                      {plan.is_popular && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                          Populer
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {category?.name} • {plan.price}{plan.period}
                    </p>
                    <p className="text-sm text-muted-foreground">{plan.features.length} fitur</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => openEditPlan(plan)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeletePlan(plan.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
          {plans.length === 0 && (
            <p className="text-muted-foreground text-center py-8">Belum ada paket</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PricingManager;

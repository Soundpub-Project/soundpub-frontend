import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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

interface StorePartner {
  id: string;
  name: string;
  description: string | null;
  icon_type: string;
  color: string | null;
  category: string | null;
  sort_order: number;
}

const StorePartnersManager = () => {
  const [partners, setPartners] = useState<StorePartner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<StorePartner | null>(null);
  const { toast } = useToast();

  const [form, setForm] = useState({
    name: '',
    description: '',
    icon_type: '',
    color: '#1DB954',
    category: 'streaming',
    sort_order: 0
  });

  const iconTypes = [
    'SiSpotify', 'SiApplemusic', 'SiYoutubemusic', 'SiTidal', 'SiPandora',
    'SiSoundcloud', 'SiShazam', 'SiTiktok', 'SiInstagram', 'SiSnapchat',
    'AmazonMusicIcon', 'DeezerIcon', 'TencentIcon', 'NetEaseIcon', 
    'JioSaavnIcon', 'AnghamiIcon', 'BoomplayIcon', 'AudiomackIcon', 
    'RessoIcon', 'TrillerIcon'
  ];

  const categories = [
    { value: 'streaming', label: 'Streaming' },
    { value: 'social', label: 'Social Media' },
    { value: 'regional', label: 'Regional' },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await supabase
        .from('store_partners')
        .select('*')
        .order('sort_order');

      setPartners(data || []);
    } catch (error) {
      console.error('Error fetching partners:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (editing) {
        const { error } = await supabase
          .from('store_partners')
          .update(form)
          .eq('id', editing.id);
        if (error) throw error;
        toast({ title: 'Partner berhasil diupdate' });
      } else {
        const { error } = await supabase
          .from('store_partners')
          .insert([form]);
        if (error) throw error;
        toast({ title: 'Partner berhasil ditambahkan' });
      }
      setDialogOpen(false);
      setEditing(null);
      setForm({
        name: '',
        description: '',
        icon_type: '',
        color: '#1DB954',
        category: 'streaming',
        sort_order: 0
      });
      fetchData();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus partner ini?')) return;
    try {
      const { error } = await supabase.from('store_partners').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Partner berhasil dihapus' });
      fetchData();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const openEdit = (partner: StorePartner) => {
    setEditing(partner);
    setForm({
      name: partner.name,
      description: partner.description || '',
      icon_type: partner.icon_type,
      color: partner.color || '#1DB954',
      category: partner.category || 'streaming',
      sort_order: partner.sort_order
    });
    setDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Store Partners</h3>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-2" onClick={() => {
              setEditing(null);
              setForm({
                name: '',
                description: '',
                icon_type: '',
                color: '#1DB954',
                category: 'streaming',
                sort_order: 0
              });
            }}>
              <Plus className="w-4 h-4" />
              Tambah Partner
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editing ? 'Edit Partner' : 'Tambah Partner'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              <div>
                <Label>Nama</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <Label>Deskripsi</Label>
                <Textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>
              <div>
                <Label>Tipe Icon</Label>
                <Select
                  value={form.icon_type}
                  onValueChange={(v) => setForm({ ...form, icon_type: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih icon" />
                  </SelectTrigger>
                  <SelectContent>
                    {iconTypes.map((icon) => (
                      <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Warna</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={form.color}
                    onChange={(e) => setForm({ ...form, color: e.target.value })}
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    value={form.color}
                    onChange={(e) => setForm({ ...form, color: e.target.value })}
                    placeholder="#1DB954"
                  />
                </div>
              </div>
              <div>
                <Label>Kategori</Label>
                <Select
                  value={form.category}
                  onValueChange={(v) => setForm({ ...form, category: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Urutan</Label>
                <Input
                  type="number"
                  value={form.sort_order}
                  onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })}
                />
              </div>
              <Button onClick={handleSave} disabled={isSaving} className="w-full">
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Simpan
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {partners.map((partner) => (
          <motion.div
            key={partner.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border/50 rounded-lg p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${partner.color}20` }}
              >
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: partner.color || '#1DB954' }}
                />
              </div>
              <div>
                <h4 className="font-medium">{partner.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {partner.icon_type} • {partner.category}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={() => openEdit(partner)}>
                <Edit className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(partner.id)}>
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          </motion.div>
        ))}
        {partners.length === 0 && (
          <p className="text-muted-foreground text-center py-8">Belum ada store partner</p>
        )}
      </div>
    </div>
  );
};

export default StorePartnersManager;

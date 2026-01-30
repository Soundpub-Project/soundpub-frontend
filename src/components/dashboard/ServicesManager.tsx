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
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Service {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  sort_order: number;
}

interface AdditionalService {
  id: string;
  title: string;
  description: string | null;
  price: string;
  cover_url: string | null;
  sort_order: number;
}

const ServicesManager = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [additionalServices, setAdditionalServices] = useState<AdditionalService[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [serviceDialogOpen, setServiceDialogOpen] = useState(false);
  const [additionalDialogOpen, setAdditionalDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [editingAdditional, setEditingAdditional] = useState<AdditionalService | null>(null);
  const { toast } = useToast();

  const [serviceForm, setServiceForm] = useState({
    title: '',
    description: '',
    icon: '',
    sort_order: 0
  });

  const [additionalForm, setAdditionalForm] = useState({
    title: '',
    description: '',
    price: '',
    cover_url: '',
    sort_order: 0
  });

  const iconOptions = [
    'Upload', 'Shield', 'DollarSign', 'BarChart3', 'FileCheck', 
    'Headphones', 'Users', 'Send', 'Music', 'Globe', 'Zap'
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: servicesData } = await supabase
        .from('services')
        .select('*')
        .order('sort_order');

      const { data: additionalData } = await supabase
        .from('additional_services')
        .select('*')
        .order('sort_order');

      setServices(servicesData || []);
      setAdditionalServices(additionalData || []);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveService = async () => {
    setIsSaving(true);
    try {
      if (editingService) {
        const { error } = await supabase
          .from('services')
          .update(serviceForm)
          .eq('id', editingService.id);
        if (error) throw error;
        toast({ title: 'Layanan berhasil diupdate' });
      } else {
        const { error } = await supabase
          .from('services')
          .insert([serviceForm]);
        if (error) throw error;
        toast({ title: 'Layanan berhasil ditambahkan' });
      }
      setServiceDialogOpen(false);
      setEditingService(null);
      setServiceForm({ title: '', description: '', icon: '', sort_order: 0 });
      fetchData();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveAdditional = async () => {
    setIsSaving(true);
    try {
      if (editingAdditional) {
        const { error } = await supabase
          .from('additional_services')
          .update(additionalForm)
          .eq('id', editingAdditional.id);
        if (error) throw error;
        toast({ title: 'Layanan tambahan berhasil diupdate' });
      } else {
        const { error } = await supabase
          .from('additional_services')
          .insert([additionalForm]);
        if (error) throw error;
        toast({ title: 'Layanan tambahan berhasil ditambahkan' });
      }
      setAdditionalDialogOpen(false);
      setEditingAdditional(null);
      setAdditionalForm({ title: '', description: '', price: '', cover_url: '', sort_order: 0 });
      fetchData();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm('Hapus layanan ini?')) return;
    try {
      const { error } = await supabase.from('services').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Layanan berhasil dihapus' });
      fetchData();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const handleDeleteAdditional = async (id: string) => {
    if (!confirm('Hapus layanan tambahan ini?')) return;
    try {
      const { error } = await supabase.from('additional_services').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Layanan tambahan berhasil dihapus' });
      fetchData();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const openEditService = (service: Service) => {
    setEditingService(service);
    setServiceForm({
      title: service.title,
      description: service.description || '',
      icon: service.icon || '',
      sort_order: service.sort_order
    });
    setServiceDialogOpen(true);
  };

  const openEditAdditional = (service: AdditionalService) => {
    setEditingAdditional(service);
    setAdditionalForm({
      title: service.title,
      description: service.description || '',
      price: service.price,
      cover_url: service.cover_url || '',
      sort_order: service.sort_order
    });
    setAdditionalDialogOpen(true);
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
      {/* Main Services */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Layanan Utama</h3>
          <Dialog open={serviceDialogOpen} onOpenChange={setServiceDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-2" onClick={() => {
                setEditingService(null);
                setServiceForm({ title: '', description: '', icon: '', sort_order: 0 });
              }}>
                <Plus className="w-4 h-4" />
                Tambah Layanan
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingService ? 'Edit Layanan' : 'Tambah Layanan'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Judul</Label>
                  <Input
                    value={serviceForm.title}
                    onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Deskripsi</Label>
                  <Textarea
                    value={serviceForm.description}
                    onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Icon</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {iconOptions.map((icon) => (
                      <Button
                        key={icon}
                        type="button"
                        variant={serviceForm.icon === icon ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setServiceForm({ ...serviceForm, icon })}
                      >
                        {icon}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Urutan</Label>
                  <Input
                    type="number"
                    value={serviceForm.sort_order}
                    onChange={(e) => setServiceForm({ ...serviceForm, sort_order: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <Button onClick={handleSaveService} disabled={isSaving} className="w-full">
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Simpan
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {services.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border/50 rounded-lg p-4 flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs bg-muted px-2 py-0.5 rounded">{service.icon}</span>
                  <h4 className="font-medium">{service.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-1">{service.description}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => openEditService(service)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDeleteService(service.id)}>
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            </motion.div>
          ))}
          {services.length === 0 && (
            <p className="text-muted-foreground text-center py-8">Belum ada layanan</p>
          )}
        </div>
      </div>

      {/* Additional Services */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Layanan Tambahan</h3>
          <Dialog open={additionalDialogOpen} onOpenChange={setAdditionalDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-2" onClick={() => {
                setEditingAdditional(null);
                setAdditionalForm({ title: '', description: '', price: '', cover_url: '', sort_order: 0 });
              }}>
                <Plus className="w-4 h-4" />
                Tambah Layanan Tambahan
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingAdditional ? 'Edit Layanan Tambahan' : 'Tambah Layanan Tambahan'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Judul</Label>
                  <Input
                    value={additionalForm.title}
                    onChange={(e) => setAdditionalForm({ ...additionalForm, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Deskripsi</Label>
                  <Textarea
                    value={additionalForm.description}
                    onChange={(e) => setAdditionalForm({ ...additionalForm, description: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Harga</Label>
                  <Input
                    value={additionalForm.price}
                    onChange={(e) => setAdditionalForm({ ...additionalForm, price: e.target.value })}
                    placeholder="Rp 100.000"
                  />
                </div>
                <div>
                  <Label>URL Cover</Label>
                  <Input
                    value={additionalForm.cover_url}
                    onChange={(e) => setAdditionalForm({ ...additionalForm, cover_url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <Label>Urutan</Label>
                  <Input
                    type="number"
                    value={additionalForm.sort_order}
                    onChange={(e) => setAdditionalForm({ ...additionalForm, sort_order: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <Button onClick={handleSaveAdditional} disabled={isSaving} className="w-full">
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Simpan
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {additionalServices.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border/50 rounded-lg p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                {service.cover_url && (
                  <img src={service.cover_url} alt={service.title} className="w-12 h-12 rounded-lg object-cover" />
                )}
                <div>
                  <h4 className="font-medium">{service.title}</h4>
                  <p className="text-sm text-primary">{service.price}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => openEditAdditional(service)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDeleteAdditional(service.id)}>
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            </motion.div>
          ))}
          {additionalServices.length === 0 && (
            <p className="text-muted-foreground text-center py-8">Belum ada layanan tambahan</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServicesManager;

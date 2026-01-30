import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Pencil, Trash2, Save, X, Loader2, Image } from 'lucide-react';
import { toast } from 'sonner';

interface AdditionalService {
  id: string;
  title: string;
  description: string | null;
  price: string;
  cover_url: string | null;
  sort_order: number | null;
}

const AdditionalServicesManager = () => {
  const [services, setServices] = useState<AdditionalService[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    cover_url: '',
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('additional_services')
        .select('*')
        .order('sort_order');

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast.error('Gagal memuat data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!formData.title || !formData.price) {
      toast.error('Title dan harga wajib diisi');
      return;
    }
    
    try {
      const { error } = await supabase
        .from('additional_services')
        .insert({
          title: formData.title,
          description: formData.description || null,
          price: formData.price,
          cover_url: formData.cover_url || null,
          sort_order: services.length,
        });

      if (error) throw error;
      
      toast.success('Layanan berhasil ditambahkan');
      setIsCreating(false);
      setFormData({ title: '', description: '', price: '', cover_url: '' });
      fetchServices();
    } catch (error) {
      console.error('Error creating service:', error);
      toast.error('Gagal menambahkan layanan');
    }
  };

  const handleUpdate = async (id: string) => {
    if (!formData.title || !formData.price) {
      toast.error('Title dan harga wajib diisi');
      return;
    }
    
    try {
      const { error } = await supabase
        .from('additional_services')
        .update({
          title: formData.title,
          description: formData.description || null,
          price: formData.price,
          cover_url: formData.cover_url || null,
        })
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Layanan berhasil diupdate');
      setEditingId(null);
      setFormData({ title: '', description: '', price: '', cover_url: '' });
      fetchServices();
    } catch (error) {
      console.error('Error updating service:', error);
      toast.error('Gagal mengupdate layanan');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus layanan ini?')) return;
    
    try {
      const { error } = await supabase
        .from('additional_services')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Layanan berhasil dihapus');
      fetchServices();
    } catch (error) {
      console.error('Error deleting service:', error);
      toast.error('Gagal menghapus layanan');
    }
  };

  const startEdit = (service: AdditionalService) => {
    setEditingId(service.id);
    setFormData({
      title: service.title,
      description: service.description || '',
      price: service.price,
      cover_url: service.cover_url || '',
    });
    setIsCreating(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsCreating(false);
    setFormData({ title: '', description: '', price: '', cover_url: '' });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Layanan Tambahan</h3>
        {!isCreating && !editingId && (
          <Button onClick={() => setIsCreating(true)} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Tambah Layanan
          </Button>
        )}
      </div>

      {/* Create Form */}
      {isCreating && (
        <Card className="border-primary/50">
          <CardHeader>
            <CardTitle className="text-base">Tambah Layanan Baru</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground">Judul</label>
                <Input
                  placeholder="Nama layanan"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Harga</label>
                <Input
                  placeholder="Rp 500.000"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Deskripsi</label>
              <Textarea
                placeholder="Deskripsi layanan"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Cover URL (opsional)</label>
              <Input
                placeholder="https://example.com/image.jpg"
                value={formData.cover_url}
                onChange={(e) => setFormData({ ...formData, cover_url: e.target.value })}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleCreate} size="sm">
                <Save className="w-4 h-4 mr-2" />
                Simpan
              </Button>
              <Button onClick={cancelEdit} variant="outline" size="sm">
                <X className="w-4 h-4 mr-2" />
                Batal
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service) => (
          <Card key={service.id} className={editingId === service.id ? 'border-primary/50' : ''}>
            <CardContent className="p-4">
              {editingId === service.id ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-muted-foreground">Judul</label>
                      <Input
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Harga</label>
                      <Input
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Deskripsi</label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Cover URL</label>
                    <Input
                      value={formData.cover_url}
                      onChange={(e) => setFormData({ ...formData, cover_url: e.target.value })}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => handleUpdate(service.id)} size="sm">
                      <Save className="w-4 h-4 mr-2" />
                      Simpan
                    </Button>
                    <Button onClick={cancelEdit} variant="outline" size="sm">
                      <X className="w-4 h-4 mr-2" />
                      Batal
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-4">
                  {/* Cover Preview */}
                  <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {service.cover_url ? (
                      <img src={service.cover_url} alt={service.title} className="w-full h-full object-cover" />
                    ) : (
                      <Image className="w-6 h-6 text-primary/50" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold">{service.title}</h4>
                        <p className="text-primary font-medium text-sm">{service.price}</p>
                      </div>
                      <div className="flex gap-1">
                        <Button onClick={() => startEdit(service)} variant="ghost" size="icon">
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button onClick={() => handleDelete(service.id)} variant="ghost" size="icon" className="text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{service.description}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {services.length === 0 && !isCreating && (
        <div className="text-center py-8 text-muted-foreground">
          Belum ada layanan tambahan. Klik "Tambah Layanan" untuk memulai.
        </div>
      )}
    </div>
  );
};

export default AdditionalServicesManager;
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Pencil, Trash2, Save, X, Loader2, GripVertical } from 'lucide-react';
import { toast } from 'sonner';

interface DistributionStep {
  id: string;
  step_number: string;
  title: string;
  description: string | null;
  sort_order: number | null;
}

const DistributionStepsManager = () => {
  const [steps, setSteps] = useState<DistributionStep[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  
  const [formData, setFormData] = useState({
    step_number: '',
    title: '',
    description: '',
  });

  useEffect(() => {
    fetchSteps();
  }, []);

  const fetchSteps = async () => {
    try {
      const { data, error } = await supabase
        .from('distribution_steps')
        .select('*')
        .order('sort_order');

      if (error) throw error;
      setSteps(data || []);
    } catch (error) {
      console.error('Error fetching steps:', error);
      toast.error('Gagal memuat data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      const { error } = await supabase
        .from('distribution_steps')
        .insert({
          step_number: formData.step_number,
          title: formData.title,
          description: formData.description || null,
          sort_order: steps.length,
        });

      if (error) throw error;
      
      toast.success('Step berhasil ditambahkan');
      setIsCreating(false);
      setFormData({ step_number: '', title: '', description: '' });
      fetchSteps();
    } catch (error) {
      console.error('Error creating step:', error);
      toast.error('Gagal menambahkan step');
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      const { error } = await supabase
        .from('distribution_steps')
        .update({
          step_number: formData.step_number,
          title: formData.title,
          description: formData.description || null,
        })
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Step berhasil diupdate');
      setEditingId(null);
      setFormData({ step_number: '', title: '', description: '' });
      fetchSteps();
    } catch (error) {
      console.error('Error updating step:', error);
      toast.error('Gagal mengupdate step');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus step ini?')) return;
    
    try {
      const { error } = await supabase
        .from('distribution_steps')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Step berhasil dihapus');
      fetchSteps();
    } catch (error) {
      console.error('Error deleting step:', error);
      toast.error('Gagal menghapus step');
    }
  };

  const startEdit = (step: DistributionStep) => {
    setEditingId(step.id);
    setFormData({
      step_number: step.step_number,
      title: step.title,
      description: step.description || '',
    });
    setIsCreating(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsCreating(false);
    setFormData({ step_number: '', title: '', description: '' });
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
        <h3 className="text-lg font-semibold">Langkah Distribusi</h3>
        {!isCreating && !editingId && (
          <Button onClick={() => setIsCreating(true)} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Tambah Step
          </Button>
        )}
      </div>

      {/* Create Form */}
      {isCreating && (
        <Card className="border-primary/50">
          <CardHeader>
            <CardTitle className="text-base">Tambah Step Baru</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground">Nomor Step</label>
                <Input
                  placeholder="01"
                  value={formData.step_number}
                  onChange={(e) => setFormData({ ...formData, step_number: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Judul</label>
                <Input
                  placeholder="Judul step"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Deskripsi</label>
              <Textarea
                placeholder="Deskripsi step"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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

      {/* Steps List */}
      <div className="space-y-3">
        {steps.map((step) => (
          <Card key={step.id} className={editingId === step.id ? 'border-primary/50' : ''}>
            <CardContent className="p-4">
              {editingId === step.id ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-muted-foreground">Nomor Step</label>
                      <Input
                        value={formData.step_number}
                        onChange={(e) => setFormData({ ...formData, step_number: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Judul</label>
                      <Input
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                  <div className="flex gap-2">
                    <Button onClick={() => handleUpdate(step.id)} size="sm">
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl font-bold text-gradient font-display w-12">
                      {step.step_number}
                    </div>
                    <div>
                      <h4 className="font-semibold">{step.title}</h4>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => startEdit(step)} variant="ghost" size="icon">
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button onClick={() => handleDelete(step.id)} variant="ghost" size="icon" className="text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {steps.length === 0 && !isCreating && (
        <div className="text-center py-8 text-muted-foreground">
          Belum ada step. Klik "Tambah Step" untuk memulai.
        </div>
      )}
    </div>
  );
};

export default DistributionStepsManager;
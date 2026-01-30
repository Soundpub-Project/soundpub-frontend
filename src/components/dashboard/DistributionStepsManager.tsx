import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Pencil, Trash2, Save, X, Loader2, GripVertical } from 'lucide-react';
import { toast } from 'sonner';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface DistributionStep {
  id: string;
  step_number: string;
  title: string;
  description: string | null;
  sort_order: number | null;
}

interface SortableStepItemProps {
  step: DistributionStep;
  isEditing: boolean;
  formData: { step_number: string; title: string; description: string };
  setFormData: (data: { step_number: string; title: string; description: string }) => void;
  onEdit: (step: DistributionStep) => void;
  onUpdate: (id: string) => void;
  onDelete: (id: string) => void;
  onCancel: () => void;
}

const SortableStepItem = ({
  step,
  isEditing,
  formData,
  setFormData,
  onEdit,
  onUpdate,
  onDelete,
  onCancel,
}: SortableStepItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: step.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`${isEditing ? 'border-primary/50' : ''} ${isDragging ? 'shadow-lg' : ''}`}
    >
      <CardContent className="p-4">
        {isEditing ? (
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
              <Button onClick={() => onUpdate(step.id)} size="sm">
                <Save className="w-4 h-4 mr-2" />
                Simpan
              </Button>
              <Button onClick={onCancel} variant="outline" size="sm">
                <X className="w-4 h-4 mr-2" />
                Batal
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                className="cursor-grab active:cursor-grabbing p-1 hover:bg-muted rounded"
                {...attributes}
                {...listeners}
              >
                <GripVertical className="w-5 h-5 text-muted-foreground" />
              </button>
              <div className="text-3xl font-bold text-gradient font-display w-12">
                {step.step_number}
              </div>
              <div>
                <h4 className="font-semibold">{step.title}</h4>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => onEdit(step)} variant="ghost" size="icon">
                <Pencil className="w-4 h-4" />
              </Button>
              <Button onClick={() => onDelete(step.id)} variant="ghost" size="icon" className="text-destructive">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

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

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = steps.findIndex((s) => s.id === active.id);
      const newIndex = steps.findIndex((s) => s.id === over.id);

      const newSteps = arrayMove(steps, oldIndex, newIndex);
      setSteps(newSteps);

      // Update sort_order in database
      try {
        const updates = newSteps.map((step, index) => ({
          id: step.id,
          step_number: step.step_number,
          title: step.title,
          description: step.description,
          sort_order: index,
        }));

        for (const update of updates) {
          await supabase
            .from('distribution_steps')
            .update({ sort_order: update.sort_order })
            .eq('id', update.id);
        }

        toast.success('Urutan berhasil diubah');
      } catch (error) {
        console.error('Error updating order:', error);
        toast.error('Gagal mengubah urutan');
        fetchSteps(); // Revert on error
      }
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
        <div>
          <h3 className="text-lg font-semibold">Langkah Distribusi</h3>
          <p className="text-sm text-muted-foreground">Drag & drop untuk mengubah urutan</p>
        </div>
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

      {/* Sortable Steps List */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={steps.map(s => s.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {steps.map((step) => (
              <SortableStepItem
                key={step.id}
                step={step}
                isEditing={editingId === step.id}
                formData={formData}
                setFormData={setFormData}
                onEdit={startEdit}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                onCancel={cancelEdit}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {steps.length === 0 && !isCreating && (
        <div className="text-center py-8 text-muted-foreground">
          Belum ada step. Klik "Tambah Step" untuk memulai.
        </div>
      )}
    </div>
  );
};

export default DistributionStepsManager;
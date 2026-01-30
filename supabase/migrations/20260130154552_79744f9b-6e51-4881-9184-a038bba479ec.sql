-- Create table for distribution steps
CREATE TABLE public.distribution_steps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  step_number text NOT NULL,
  title text NOT NULL,
  description text,
  sort_order integer DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.distribution_steps ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view distribution steps"
ON public.distribution_steps FOR SELECT
USING (true);

CREATE POLICY "Admins can manage distribution steps"
ON public.distribution_steps FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add trigger for updated_at
CREATE TRIGGER update_distribution_steps_updated_at
BEFORE UPDATE ON public.distribution_steps
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default steps
INSERT INTO distribution_steps (step_number, title, description, sort_order) VALUES
('01', 'Daftar', 'Buat akun dan lengkapi profil artis Anda', 0),
('02', 'Upload', 'Unggah file musik dan isi informasi rilisan', 1),
('03', 'Review', 'Tim kami akan mereview kualitas audio & metadata', 2),
('04', 'Distribute', 'Musik Anda live di 100+ platform digital', 3);
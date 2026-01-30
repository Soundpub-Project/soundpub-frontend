-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table for role management
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles"
ON public.user_roles
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create pricing_categories table
CREATE TABLE public.pricing_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on pricing_categories
ALTER TABLE public.pricing_categories ENABLE ROW LEVEL SECURITY;

-- RLS policies for pricing_categories (public read, admin write)
CREATE POLICY "Anyone can view pricing categories"
ON public.pricing_categories
FOR SELECT
USING (true);

CREATE POLICY "Admins can manage pricing categories"
ON public.pricing_categories
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create pricing_plans table
CREATE TABLE public.pricing_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES public.pricing_categories(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    price TEXT NOT NULL,
    period TEXT,
    description TEXT,
    features JSONB DEFAULT '[]'::jsonb,
    is_popular BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on pricing_plans
ALTER TABLE public.pricing_plans ENABLE ROW LEVEL SECURITY;

-- RLS policies for pricing_plans
CREATE POLICY "Anyone can view pricing plans"
ON public.pricing_plans
FOR SELECT
USING (true);

CREATE POLICY "Admins can manage pricing plans"
ON public.pricing_plans
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create services table
CREATE TABLE public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on services
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- RLS policies for services
CREATE POLICY "Anyone can view services"
ON public.services
FOR SELECT
USING (true);

CREATE POLICY "Admins can manage services"
ON public.services
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create additional_services table (Layanan Tambahan)
CREATE TABLE public.additional_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    price TEXT NOT NULL,
    cover_url TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on additional_services
ALTER TABLE public.additional_services ENABLE ROW LEVEL SECURITY;

-- RLS policies for additional_services
CREATE POLICY "Anyone can view additional services"
ON public.additional_services
FOR SELECT
USING (true);

CREATE POLICY "Admins can manage additional services"
ON public.additional_services
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create store_partners table
CREATE TABLE public.store_partners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    icon_type TEXT NOT NULL,
    color TEXT,
    category TEXT DEFAULT 'streaming',
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on store_partners
ALTER TABLE public.store_partners ENABLE ROW LEVEL SECURITY;

-- RLS policies for store_partners
CREATE POLICY "Anyone can view store partners"
ON public.store_partners
FOR SELECT
USING (true);

CREATE POLICY "Admins can manage store partners"
ON public.store_partners
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add triggers for updated_at
CREATE TRIGGER update_pricing_categories_updated_at
BEFORE UPDATE ON public.pricing_categories
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_pricing_plans_updated_at
BEFORE UPDATE ON public.pricing_plans
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_services_updated_at
BEFORE UPDATE ON public.services
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_additional_services_updated_at
BEFORE UPDATE ON public.additional_services
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_store_partners_updated_at
BEFORE UPDATE ON public.store_partners
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
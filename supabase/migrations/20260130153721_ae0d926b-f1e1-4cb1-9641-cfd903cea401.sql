-- Insert main pricing category
INSERT INTO pricing_categories (name, slug, description, sort_order)
VALUES ('Distribusi Musik', 'distribusi', 'Pilih paket distribusi musik yang sesuai dengan kebutuhan Anda', 1);

-- Get the category id and insert pricing plans
INSERT INTO pricing_plans (category_id, name, price, period, description, features, is_popular, sort_order)
SELECT 
  id as category_id,
  'Basic' as name,
  'Gratis' as price,
  NULL as period,
  'Untuk artis pemula yang baru memulai' as description,
  '["Distribusi ke 50+ platform", "1 rilisan per bulan", "ISRC gratis", "Dashboard analytics basic", "Email support"]'::jsonb as features,
  false as is_popular,
  0 as sort_order
FROM pricing_categories WHERE slug = 'distribusi'
UNION ALL
SELECT 
  id,
  'Pro',
  'Rp 150.000',
  '/bulan',
  'Untuk artis yang serius berkarir',
  '["Distribusi ke 100+ platform", "Unlimited rilisan", "ISRC & UPC gratis", "Dashboard analytics lengkap", "Priority support", "Royalty split", "Pre-save links"]'::jsonb,
  true,
  1
FROM pricing_categories WHERE slug = 'distribusi'
UNION ALL
SELECT 
  id,
  'Label',
  'Custom',
  NULL,
  'Untuk label rekaman & manajemen artis',
  '["Semua fitur Pro", "Multi-artist management", "White-label dashboard", "API access", "Dedicated account manager", "Custom royalty terms"]'::jsonb,
  false,
  2
FROM pricing_categories WHERE slug = 'distribusi';

-- Clean up test data
DELETE FROM pricing_categories WHERE slug = 'd';
-- Insert main services
INSERT INTO services (title, description, icon, sort_order) VALUES
('Distribusi Musik', 'Unggah musik Anda ke 100+ platform digital di seluruh dunia dengan mudah dan cepat.', 'Upload', 0),
('Perlindungan Hak Cipta', 'Lindungi karya musik Anda dengan sistem pengelolaan hak cipta yang komprehensif.', 'Shield', 1),
('Royalti Management', 'Kelola dan terima pembayaran royalti dari semua platform streaming dengan transparan.', 'DollarSign', 2),
('Analytics & Reporting', 'Pantau performa musik Anda dengan dashboard analytics yang lengkap.', 'BarChart3', 3),
('ISRC & UPC Gratis', 'Dapatkan kode ISRC dan UPC untuk setiap rilisan musik Anda secara gratis.', 'FileCheck', 4),
('Quality Control', 'Tim kami memastikan kualitas audio dan metadata musik Anda sesuai standar industri.', 'Headphones', 5),
('Artist Support', 'Dukungan penuh dari tim kami untuk membantu perjalanan karir musik Anda.', 'Users', 6),
('Fast Delivery', 'Proses distribusi cepat, musik Anda dapat live dalam 24-48 jam.', 'Send', 7);

-- Insert additional services
INSERT INTO additional_services (title, description, price, cover_url, sort_order) VALUES
('Mastering Audio', 'Layanan mastering profesional untuk memastikan musik Anda terdengar sempurna di semua platform. Dikerjakan oleh audio engineer berpengalaman.', 'Rp 500.000', null, 0),
('Cover Art Design', 'Desain artwork album profesional yang menarik dan sesuai dengan branding artis Anda.', 'Rp 350.000', null, 1),
('Music Video Editing', 'Editing video musik berkualitas tinggi dengan berbagai style sesuai kebutuhan.', 'Rp 1.500.000', null, 2),
('Social Media Kit', 'Paket konten promosi untuk media sosial termasuk banner, stories, dan post templates.', 'Rp 250.000', null, 3),
('Spotify Canvas', 'Video loop 8 detik untuk Spotify Canvas yang membuat rilisan Anda lebih menarik.', 'Rp 200.000', null, 4),
('Lyric Video', 'Video lirik animasi profesional untuk mendukung promosi musik Anda.', 'Rp 750.000', null, 5),
('Press Release', 'Penulisan dan distribusi press release ke media musik nasional.', 'Rp 400.000', null, 6),
('Playlist Pitching', 'Promosi musik ke kurator playlist Spotify, Apple Music, dan platform lainnya.', 'Rp 300.000', null, 7);
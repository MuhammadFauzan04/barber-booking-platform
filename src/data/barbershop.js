/* Mock data for the Cartenz Barbershop demo — branches, capsters,
   services, testimonials, FAQs, and every small constant the UI needs. */

import { ArrowRight, BadgeCheck, Banknote, Bell, Brain, Calendar, CalendarCheck, Check, Clock, CreditCard, Crown, Droplet, ExternalLink, Flame, Gift, Hand, Home, Lightbulb, MapPinned, QrCode, Scissors, Smartphone, Sparkles, Star, Tag, Ticket, Timer, User, Wallet, Waves, Wind } from "lucide-react";

export const BRANCHES = [
  { id: "kmg", name: "Kemang", city: "Jakarta Selatan" },
  { id: "kby", name: "Kebayoran Baru", city: "Jakarta Selatan" },
  { id: "dago", name: "Dago", city: "Bandung" },
  { id: "drm", name: "Darmo", city: "Surabaya" },
  { id: "cpi", name: "Centre Point", city: "Makassar", isNew: true },
];

export const CAPSTERS = [
  { id: "c1", name: "Rangga Putra", branch: "kmg", rating: 4.9, reviews: 214, tags: ["Fade", "Pompadour"], years: 6, badge: "TOP RATED", bio: "Spesialis skin fade & styling rapi untuk kebutuhan kantor maupun santai." },
  { id: "c2", name: "Dimas Aditya", branch: "kmg", rating: 4.8, reviews: 178, tags: ["Mullet", "Classic Taper"], years: 4, badge: "TERSEDIA HARI INI", bio: "Suka eksplor gaya berani, dari mullet sampai taper klasik." },
  { id: "c3", name: "Fajar Nugraha", branch: "kby", rating: 5.0, reviews: 302, tags: ["Perm", "Beard Sculpt"], years: 8, badge: "TOP RATED", bio: "Ahli perming & grooming jenggot, teliti sampai detail kecil." },
  { id: "c4", name: "Bima Setiawan", branch: "kby", rating: 4.7, reviews: 96, tags: ["Buzz Cut", "Fade"], years: 3, badge: "BARU", bio: "Cocok untuk potongan simpel, cepat, dan konsisten rapi." },
  { id: "c5", name: "Yoga Pratama", branch: "dago", rating: 4.9, reviews: 187, tags: ["Classic Taper", "Pompadour"], years: 7, badge: "TOP RATED", bio: "Barbershop klasik dengan sentuhan modern, gunting & pisau cukur." },
  { id: "c6", name: "Reza Firmansyah", branch: "dago", rating: 4.8, reviews: 143, tags: ["Fade", "Beard Sculpt"], years: 5, badge: "TERSEDIA HARI INI", bio: "Fade tajam dengan finishing beard line yang presisi." },
  { id: "c7", name: "Adit Wirawan", branch: "drm", rating: 4.9, reviews: 165, tags: ["Mullet", "Perm"], years: 6, badge: "TOP RATED", bio: "Suka menantang gaya baru, referensi K-style jadi andalan." },
  { id: "c8", name: "Nanda Kusuma", branch: "drm", rating: 4.6, reviews: 88, tags: ["Classic Taper", "Buzz Cut"], years: 2, badge: "BARU", bio: "Barber muda dengan tangan rapi dan pelayanan ramah." },
  { id: "c9", name: "Iqbal Ramadhan", branch: "cpi", rating: 4.9, reviews: 41, tags: ["Fade", "Classic Taper"], years: 5, badge: "BARU", bio: "Kepala cabang baru Makassar, spesialis fade bersih dengan finishing rapi." },
  { id: "c10", name: "Fikri Mahendra", branch: "cpi", rating: 4.8, reviews: 33, tags: ["Perm", "Beard Sculpt"], years: 4, badge: "TERSEDIA HARI INI", bio: "Alumni internal training SEA Barber Education, kuat di perm & grooming jenggot." },
];

export const SERVICE_CATEGORIES = ["Semua", "Potong", "Coloring", "Treatment", "Anak"];

export const SERVICES = [
  { id: "s1", name: "Haircut Reguler", price: 75000, duration: "30 menit", category: "Potong", desc: "Potong rambut klasik sesuai style pilihanmu", popular: true, icon: Scissors },
  { id: "s2", name: "Haircut + Beard Grooming", price: 120000, duration: "60 menit", category: "Potong", desc: "Potong rambut & keramas untuk hasil maksimal", popular: true, icon: Wind },
  { id: "s3", name: "Hair Coloring", price: 250000, duration: "90 menit", category: "Coloring", desc: "Potong rambut & styling premium", popular: true, icon: Sparkles },
  { id: "s4", name: "Perm / Ir Rebonding", price: 350000, duration: "120 menit", category: "Treatment", desc: "Perm atau rebonding untuk tekstur baru" },
  { id: "s5", name: "Kids Haircut (di bawah 12 th)", price: 60000, duration: "30 menit", category: "Anak", desc: "Potongan ramah anak, cepat dan rapi" },
  { id: "s6", name: "Creambath & Hair Spa", price: 150000, duration: "50 menit", category: "Treatment", desc: "Relaksasi kulit kepala dengan creambath" },
];

export const SERVICE_ADDONS = [
  { id: "a1", name: "Hair Tonic", desc: "Perawatan rambut & kulit kepala", price: 20000, icon: Droplet },
  { id: "a2", name: "Hair Mask", desc: "Nutrisi rambut agar lebih sehat", price: 25000, icon: Sparkles },
  { id: "a3", name: "Creambath", desc: "Relaksasi dengan creambath premium", price: 25000, icon: Waves },
];

export const TIME_SLOTS = ["10:00", "11:00", "12:30", "14:00", "15:30", "17:00", "18:30", "19:30"];
export const DATES = ["Sab 1 Agu", "Min 2 Agu", "Sen 3 Agu", "Sel 4 Agu", "Rab 5 Agu", "Kam 6 Agu", "Jum 7 Agu"];

export const INSPIRATION_CATEGORIES = ["Semua", "Fade", "Mullet", "Perm", "Pompadour", "Buzz Cut", "Beard Style", "Curly", "Taper", "Undercut"];
export const HAIR_LENGTHS = ["Semua Panjang", "Pendek", "Sedang", "Panjang"];
export const HAIR_STYLE_TYPES = ["Klasik", "Modern", "Korea Style", "American Style", "Minimalis"];
export const HAIR_TEXTURES = ["Lurus", "Bergelombang", "Keriting", "Sangat Keriting"];
export const HAIR_COLORS = [
  { id: "black", hex: "#1B1B1B" },
  { id: "darkbrown", hex: "#4A2F22" },
  { id: "brown", hex: "#7A4A2B" },
  { id: "blonde", hex: "#D9A441" },
  { id: "gray", hex: "#9A9A9A" },
  { id: "red", hex: "#B3402A" },
];

export const INSPIRATIONS = [
  { id: "i1", name: "Low Fade Textured", tag: "Fade", capster: "@capster.dimas", length: "Pendek", styleType: "Modern", texture: "Bergelombang", color: "black", icon: Scissors, size: "lg" },
  { id: "i2", name: "Modern Mullet", tag: "Mullet", capster: "@rio.capster", length: "Sedang", styleType: "Modern", texture: "Bergelombang", color: "black", icon: Wind, size: "md" },
  { id: "i3", name: "Curly Perm Crop", tag: "Perm", capster: "@hair.by.ardi", length: "Pendek", styleType: "Korea Style", texture: "Keriting", color: "darkbrown", icon: Droplet, size: "sm" },
  { id: "i4", name: "Buzz Cut Clean", tag: "Buzz Cut", capster: "@capster.wawan", length: "Pendek", styleType: "Minimalis", texture: "Lurus", color: "black", icon: Flame, size: "sm" },
  { id: "i5", name: "Taper Fade", tag: "Taper", capster: "@capster.fajar", length: "Pendek", styleType: "Klasik", texture: "Lurus", color: "black", icon: Scissors, size: "xl" },
  { id: "i6", name: "Short Beard Classic", tag: "Beard Style", capster: "@beard.master", length: "Pendek", styleType: "Klasik", texture: "Lurus", color: "black", icon: Hand, size: "md" },
  { id: "i7", name: "Mid Fade Crop", tag: "Fade", capster: "@dimas.barber", length: "Pendek", styleType: "Modern", texture: "Lurus", color: "black", icon: Scissors, size: "lg" },
  { id: "i8", name: "Curly Top Taper", tag: "Taper", capster: "@heri.capster", length: "Sedang", styleType: "Korea Style", texture: "Keriting", color: "brown", icon: Waves, size: "md" },
  { id: "i9", name: "Slick Pompadour", tag: "Pompadour", capster: "@capster.andre", length: "Sedang", styleType: "Klasik", texture: "Lurus", color: "black", icon: Crown, size: "md" },
  { id: "i10", name: "Textured Undercut", tag: "Undercut", capster: "@capster.bagas", length: "Pendek", styleType: "Modern", texture: "Bergelombang", color: "darkbrown", icon: Scissors, size: "sm" },
  { id: "i11", name: "Wavy Curly Fringe", tag: "Curly", capster: "@capster.yoga", length: "Sedang", styleType: "American Style", texture: "Keriting", color: "brown", icon: Waves, size: "lg" },
  { id: "i12", name: "Skin Fade Pomp", tag: "Fade", capster: "@capster.reza", length: "Pendek", styleType: "Modern", texture: "Lurus", color: "black", icon: Scissors, size: "sm" },
  { id: "i13", name: "70s Mullet Revival", tag: "Mullet", capster: "@capster.iqbal", length: "Panjang", styleType: "American Style", texture: "Bergelombang", color: "darkbrown", icon: Wind, size: "md" },
  { id: "i14", name: "Perm Wave Crop", tag: "Perm", capster: "@capster.nanda", length: "Sedang", styleType: "Korea Style", texture: "Sangat Keriting", color: "black", icon: Droplet, size: "xl" },
  { id: "i15", name: "Clean Undercut Fade", tag: "Undercut", capster: "@capster.adit", length: "Pendek", styleType: "Minimalis", texture: "Lurus", color: "black", icon: Scissors, size: "md" },
  { id: "i16", name: "Full Beard Fade", tag: "Beard Style", capster: "@capster.galang", length: "Pendek", styleType: "Modern", texture: "Lurus", color: "black", icon: Hand, size: "sm" },
];

export const PROMOS = [
  { id: "p1", title: "Member Baru Diskon 10%", desc: "Berlaku untuk booking pertama di semua cabang.", code: "NEWMEMBER10", type: "percent", value: 10, max: 30000 },
  { id: "p2", title: "Potong + Coloring Hemat 50rb", desc: "Minimal transaksi Rp 250.000.", code: "COLOR50", type: "flat", value: 50000, max: 50000 },
  { id: "p3", title: "Gratis Creambath tiap Booking ke-5", desc: "Otomatis didapat lewat program poin.", code: "LOYAL5", type: "flat", value: 0, max: 0 },
];

export const PROMO_CATEGORIES = [
  { id: "semua", label: "Semua", icon: Sparkles },
  { id: "diskon", label: "Diskon", icon: Ticket },
  { id: "cashback", label: "Cashback", icon: Wallet },
  { id: "member", label: "Member", icon: BadgeCheck },
  { id: "berakhir", label: "Segera Berakhir", icon: Clock },
];

export const FEATURED_PROMOS = [
  {
    id: "fp1",
    badge: "PALING POPULER",
    badgeIcon: Flame,
    title: "Diskon Member Baru",
    titleLine2: "10% Semua Layanan",
    big: "10",
    bigSuffix: "%",
    desc: "Berlaku untuk booking pertama di semua cabang.",
    note: "Maks. potongan Rp 30.000",
    code: "NEWMEMBER10",
    expiry: "Berlaku sampai 31 Agu 2026",
    image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?fm=jpg&q=70&w=700&auto=format&fit=crop",
  },
  {
    id: "fp2",
    badge: "LOYALTY",
    badgeIcon: Crown,
    title: "Gratis Creambath",
    titleLine2: "di Booking ke-5",
    progress: 3,
    progressTotal: 5,
    desc: "Kumpulkan 5 booking dan creambath berikutnya gratis.",
    code: "LOYAL5",
    expiry: "Program berjalan terus",
    image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?fm=jpg&q=70&w=700&auto=format&fit=crop",
  },
];

export const ALL_PROMOS = [
  { id: "p1", category: "diskon", tone: "teal", icon: Ticket, title: "Member Baru Diskon 10%", desc: "Berlaku untuk booking pertama di semua cabang.", code: "NEWMEMBER10", expiry: "s.d. 31 Agu 2026" },
  { id: "p2", category: "diskon", tone: "amber", icon: Scissors, title: "Potong + Coloring Hemat 50rb", desc: "Minimal transaksi Rp 250.000.", code: "COLOR50", expiry: "s.d. 20 Agu 2026" },
  { id: "p3", category: "member", tone: "purple", icon: Gift, title: "Gratis Creambath tiap Booking ke-5", desc: "Otomatis didapat lewat program poin.", code: "LOYAL5", expiry: "Selalu aktif" },
  { id: "p4", category: "cashback", tone: "blue", icon: Wallet, title: "Cashback Poin 5%", desc: "Setiap transaksi otomatis dapat poin tambahan.", code: "POIN5", expiry: "s.d. 15 Agu 2026" },
  { id: "p5", category: "cashback", tone: "teal", icon: CreditCard, title: "Diskon Bayar QRIS", desc: "Potongan langsung untuk pembayaran non-tunai.", code: "QRIS15", expiry: "s.d. 10 Agu 2026" },
  { id: "p6", category: "diskon", tone: "amber", icon: Banknote, title: "Hemat Kids Haircut", desc: "Khusus potongan anak di bawah 12 tahun.", code: "KIDS20", expiry: "s.d. 25 Agu 2026" },
  { id: "p7", category: "member", tone: "purple", icon: BadgeCheck, title: "Upgrade Gratis ke Gold", desc: "Member baru langsung naik ke tier Gold.", code: "GOLDUP", expiry: "s.d. 5 Sep 2026" },
  { id: "p8", category: "diskon", tone: "blue", icon: Sparkles, title: "Diskon Treatment 15%", desc: "Untuk semua layanan creambath & hair spa.", code: "SPA15", expiry: "s.d. 12 Agu 2026" },
];

export const EXPIRING_PROMOS = [
  { id: "e1", icon: Ticket, title: "Diskon Bayar QRIS", code: "QRIS15", days: 2, hours: 14 },
  { id: "e2", icon: Sparkles, title: "Diskon Treatment 15%", code: "SPA15", days: 4, hours: 6 },
  { id: "e3", icon: Wallet, title: "Cashback Poin 5%", code: "POIN5", days: 6, hours: 21 },
];

export const MEMBER_BENEFITS = [
  { id: "mb1", icon: Timer, label: "Booking Prioritas", desc: "Slot booking didahulukan" },
  { id: "mb2", icon: Gift, label: "Hadiah Ulang Tahun", desc: "Voucher spesial tiap tahun" },
  { id: "mb3", icon: CreditCard, label: "Poin 2x Lipat", desc: "Setiap transaksi hari kerja" },
  { id: "mb4", icon: Wallet, label: "Cashback Ekstra", desc: "Untuk pembayaran non-tunai" },
];

export const REDEEMABLE_VOUCHERS = [
  { id: "v1", points: 100, label: "Voucher Rp 20.000", type: "flat", value: 20000 },
  { id: "v2", points: 200, label: "Voucher Rp 50.000", type: "flat", value: 50000 },
  { id: "v3", points: 400, label: "Voucher Rp 100.000", type: "flat", value: 100000 },
];

export const PAYMENT_METHODS = [
  { id: "qris", name: "QRIS", desc: "Scan & bayar dari e-wallet apa saja", icon: Smartphone },
  { id: "ewallet", name: "GoPay / OVO / DANA", desc: "Bayar langsung dari saldo e-wallet", icon: Wallet },
  { id: "card", name: "Kartu Debit / Kredit", desc: "Visa, Mastercard, GPN", icon: CreditCard },
  { id: "cash", name: "Bayar di Tempat", desc: "Tunai saat kedatangan di cabang", icon: Banknote },
];

export const MOMENTS = [
  { id: "m1", caption: "Style In Motion", sub: "Fresh cut, Kemang" },
  { id: "m2", caption: "Internal Training Class", sub: "SEA Barber Education · Makassar" },
  { id: "m3", caption: "New Branch, New Room", sub: "Centre Point of Indonesia" },
  { id: "m4", caption: "Design Perm by Balfin", sub: "Internal training class" },
  { id: "m5", caption: "Chemical Class Results", sub: "Capster development" },
  { id: "m6", caption: "Home Service", sub: "Cukur di rumahmu" },
];

export const BOOKING_HISTORY = [
  { id: "H-2031", date: "28 Jul 2026", time: "10:00", service: "Skin Fade + Beard Sculpt", capster: "Rangga Putra Wijaya", branch: "Kemang", price: 145000, status: "Selesai" },
  { id: "H-2018", date: "14 Jul 2026", time: "14:30", service: "Classic Taper", capster: "Dimas Aji Nugroho", branch: "Kemang", price: 85000, status: "Selesai" },
  { id: "H-1994", date: "29 Jun 2026", time: "11:00", service: "Perm Design", capster: "Fajar Nur Ramadhan", branch: "Kebayoran Baru", price: 320000, status: "Selesai" },
  { id: "H-1972", date: "11 Jun 2026", time: "09:30", service: "Buzz Cut", capster: "Rangga Putra Wijaya", branch: "Kemang", price: 60000, status: "Dibatalkan" },
  { id: "H-1950", date: "25 Mei 2026", time: "13:00", service: "Pompadour + Hair Spa", capster: "Bimo Satria", branch: "Dago", price: 210000, status: "Selesai" },
  { id: "H-1928", date: "6 Mei 2026", time: "15:30", service: "Mullet Revival", capster: "Fajar Nur Ramadhan", branch: "Kebayoran Baru", price: 165000, status: "Selesai" },
];

/* ================================================================== */
/* RIWAYAT BOOKING PAGE — lifetime stats + spending summary            */
/* ================================================================== */

export const HISTORY_FILTERS = ["Semua", "Selesai", "Dijadwalkan", "Dibatalkan"];

export const HISTORY_STATS = {
  totalBooking: 18,
  selesai: 15,
  selesaiPct: 83,
  dibatalkan: 1,
  dibatalkanPct: 5,
  totalPembayaran: 985000,
};

export const EXPENSE_SUMMARY = {
  totalPembayaran: 985000,
  rataRata: 164167,
  bookingTerbanyak: 6,
  hemat: 235000,
};

export const INSTAGRAM_STATS = { handle: "@cartenzbarbershop", posts: "1.487", followers: "13,8rb", following: "189" };

export const TESTIMONIALS = [
  { id: "t1", name: "Bagas Wirawan", branch: "Kemang", rating: 5, quote: "Fade-nya presisi banget, konsultasi juga santai. Sekarang langganan tiap bulan di sini." },
  { id: "t2", name: "Alvin Pratama", branch: "Kebayoran Baru", rating: 5, quote: "Booking-nya gampang, ga perlu nunggu lama pas datang. Capster-nya ngerti maunya gimana." },
  { id: "t3", name: "Reno Saputra", branch: "Dago", rating: 4, quote: "Suka sama suasananya, adem dan rapi. Hasil potongannya juga awet bentuknya." },
  { id: "t4", name: "Farrel Adiyaksa", branch: "Darmo", rating: 5, quote: "Perm pertama kali dan hasilnya melebihi ekspektasi. Bakal balik lagi buat treatment lain." },
  { id: "t5", name: "Doni Kurniawan", branch: "Centre Point", rating: 5, quote: "Cabang baru tapi servicenya udah rapi kayak cabang lama. Poinnya juga lumayan buat diskon." },
  { id: "t6", name: "Yusuf Hakim", branch: "Kemang", rating: 4, quote: "Beard sculpting-nya detail, sesuai referensi yang aku kasih. Recommended buat yang perfeksionis." },
  { id: "t7", name: "Galang Ramadhan", branch: "Kebayoran Baru", rating: 5, quote: "Voucher dari poin lumayan bikin hemat. Sistemnya jelas, ga ribet pas dipakai." },
  { id: "t8", name: "Wisnu Aditya", branch: "Dago", rating: 5, quote: "Dari booking sampai bayar semua di satu aplikasi, praktis banget buat yang sibuk kayak aku." },
  { id: "t9", name: "Zaki Firmansyah", branch: "Darmo", rating: 4, quote: "Mullet-nya rapi, capsternya juga kasih saran styling yang cocok sama bentuk wajah." },
  { id: "t10", name: "Krisna Aditama", branch: "Kemang", rating: 5, quote: "Home service-nya nyelametin banget pas lagi WFH deadline. Hasilnya tetap rapi kayak di outlet." },
  { id: "t11", name: "Bayu Segara", branch: "Centre Point", rating: 5, quote: "Pertama kali nyoba cabang Makassar, ruangannya baru dan capsternya udah jago banget skin fade." },
  { id: "t12", name: "Arka Wibisono", branch: "Kebayoran Baru", rating: 4, quote: "Konsultasi sebelum potong bener-bener didengerin, hasil akhirnya sesuai referensi yang aku bawa." },
  { id: "t13", name: "Naufal Ridho", branch: "Dago", rating: 5, quote: "Antrian real-time di app bikin ga perlu nunggu di tempat, dateng pas giliran aja." },
  { id: "t14", name: "Gilang Ramadhani", branch: "Kemang", rating: 5, quote: "Sudah tiga tahun langganan, capsternya hafal gaya favoritku tanpa perlu dijelasin ulang." },
];

export const FAQS = [
  { q: "Bagaimana cara booking di Cartenz?", a: "Pilih cabang, pilih capster (atau biarkan sistem carikan yang tersedia), pilih layanan, tentukan tanggal & jam, lalu bayar — semua dari aplikasi ini tanpa perlu telepon dulu.", category: "Booking" },
  { q: "Apakah saya perlu memilih capster tertentu?", a: "Tidak wajib. Kamu bisa memilih capster favorit berdasarkan portofolio dan rating, atau biarkan sistem menyarankan capster yang tersedia di jam booking-mu.", category: "Booking" },
  { q: "Apa saja layanan yang tersedia di Cartenz?", a: "Kami menyediakan haircut reguler, haircut + beard grooming, hair coloring, perm/rebonding, creambath & hair spa, hingga potongan khusus anak di semua cabang.", category: "Layanan" },
  { q: "Berapa lama durasi rata-rata satu sesi potong?", a: "Haircut reguler sekitar 30-45 menit, sementara layanan dengan treatment tambahan seperti perm atau coloring bisa memakan waktu 1.5-2.5 jam tergantung panjang & tekstur rambut.", category: "Layanan" },
  { q: "Bagaimana cara kerja poin dan voucher?", a: "Setiap transaksi menambah poin ke akunmu. Poin bisa ditukar jadi voucher diskon mulai dari 100 poin lewat halaman Poin & Voucher.", category: "Poin & Voucher" },
  { q: "Apakah poin bisa hangus?", a: "Poin berlaku selama 12 bulan sejak diperoleh. Kami akan mengirim notifikasi di aplikasi sebelum poin kamu mendekati masa kedaluwarsa.", category: "Poin & Voucher" },
  { q: "Apa yang terjadi kalau pembayaran gagal?", a: "Kamu bisa langsung memilih metode pembayaran lain tanpa kehilangan slot booking, selama masih dalam batas waktu konfirmasi.", category: "Pembayaran" },
  { q: "Metode pembayaran apa saja yang didukung?", a: "Kami mendukung kartu debit/kredit, e-wallet, dan pembayaran di tempat (cash) untuk cabang tertentu — pilih yang paling nyaman saat checkout.", category: "Pembayaran" },
];

// Free-to-use Unsplash photos (barbershop/haircut scenes) for the hero's two
// counter-scrolling columns — left lane climbs, right lane descends.
export const HERO_GALLERY_UP = [
  "https://images.unsplash.com/photo-1647140655214-e4a2d914971f?fm=jpg&q=70&w=700&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1635273051839-003bf06a8751?fm=jpg&q=70&w=700&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1641318175316-795cd2db99f8?fm=jpg&q=70&w=700&auto=format&fit=crop",
];
export const HERO_GALLERY_DOWN = [
  "https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?fm=jpg&q=70&w=700&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1567894340315-735d7c361db0?fm=jpg&q=70&w=700&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1568339434343-2a640a1a9946?fm=jpg&q=70&w=700&auto=format&fit=crop",
];


export const NAV_ITEMS = [
  { id: "home", label: "Beranda", icon: Home },
  { id: "services", label: "Layanan", icon: Scissors },
  { id: "capsters", label: "Capster", icon: User },
  { id: "promo", label: "Promo", icon: Gift },
  { id: "inspiration", label: "Inspirasi", icon: Lightbulb },
];

export const MIRROR_STEPS = [
  { Icon: Flame, title: "Hot Towel", desc: "Kami siapkan hot towel terbaik untukmu." },
  { Icon: Hand, title: "Usap Kaca", desc: "Usap kaca yang berembun untuk memulai." },
  { Icon: Brain, title: "AI Matching", desc: "Sistem mencocokkanmu dengan capster terbaik." },
];

// Small pool of initials used purely to fill the "dipilih oleh ribuan
// pelanggan" avatar cluster — these aren't real customer records, just a
// lightweight visual trust signal, so plain letters are enough.
export const TRUST_AVATAR_INITIALS = ["A", "R", "D", "S"];

// A short wave/curl glyph used for the hair-type question — drawn inline
// instead of imported, since lucide has no direct "hair texture" icon.
// `level` 1-4 controls how tight/curly the lines look (straight -> coily).
export const QUIZ_QUESTIONS = [
  {
    id: "hairType",
    label: "Bagaimana tipe rambutmu?",
    sub: "Pilih yang paling sesuai dengan rambutmu saat ini.",
    options: [
      { value: "Lurus", title: "Lurus", desc: "Mudah diatur & jatuh ke bawah", wave: 1 },
      { value: "Bergelombang", title: "Bergelombang", desc: "Sedikit ikal & bervolume", wave: 2 },
      { value: "Keriting", title: "Keriting", desc: "Ikal jelas & mengembang", wave: 3 },
      { value: "Sangat Keriting", title: "Sangat Keriting", desc: "Ikal rapat & tebal", wave: 4 },
    ],
  },
  {
    id: "style",
    label: "Gaya seperti apa yang kamu inginkan?",
    sub: "Ini membantu kami mencocokkan spesialisasi capster.",
    options: [
      { value: "Fade", title: "Fade", desc: "Rapi & bersih di bagian samping", Icon: Scissors },
      { value: "Pompadour", title: "Pompadour", desc: "Klasik dengan volume di atas", Icon: Crown },
      { value: "Mullet", title: "Mullet", desc: "Berani, pendek depan panjang belakang", Icon: Wind },
      { value: "Perm", title: "Perm / Curly", desc: "Bertekstur dengan hasil ikal", Icon: Droplet },
    ],
  },
  {
    id: "priority",
    label: "Apa prioritas terbesarmu?",
    sub: "Kami utamakan capster yang paling sesuai dengan ini.",
    options: [
      { value: "rating", title: "Rating & Reputasi", desc: "Capster dengan review terbaik", Icon: Star },
      { value: "harga", title: "Harga Terjangkau", desc: "Sesuai budget kamu", Icon: Wallet },
      { value: "pengalaman", title: "Pengalaman", desc: "Capster senior & jam terbang tinggi", Icon: BadgeCheck },
      { value: "cepat", title: "Ketersediaan Cepat", desc: "Bisa booking hari ini", Icon: Timer },
    ],
  },
  {
    id: "budget",
    label: "Berapa budget yang kamu siapkan?",
    sub: "Kami sesuaikan rekomendasi dengan kisaran harga ini.",
    options: [
      { value: "low", title: "< Rp100rb", desc: "Potong reguler & simpel", Icon: Banknote },
      { value: "mid", title: "Rp100rb – 200rb", desc: "Potong + grooming/styling", Icon: Banknote },
      { value: "high", title: "Rp200rb – 350rb", desc: "Coloring / treatment", Icon: Banknote },
      { value: "premium", title: "> Rp350rb", desc: "Perm, rebonding, dsb.", Icon: Banknote },
    ],
  },
  {
    id: "frequency",
    label: "Seberapa sering kamu potong rambut?",
    sub: "Membantu kami menyarankan capster langganan yang pas.",
    options: [
      { value: "2minggu", title: "Tiap 2 Minggu", desc: "Selalu ingin tampil rapi", Icon: Clock },
      { value: "sebulan", title: "Sebulan Sekali", desc: "Rutin & terjadwal", Icon: Clock },
      { value: "2bulan", title: "2 Bulan Sekali", desc: "Santai, sesuai kebutuhan", Icon: Clock },
      { value: "jarang", title: "Jarang / Kadang", desc: "Kalau sempat saja", Icon: Clock },
    ],
  },
];

// Scoring leans on signals from the capster record (rating, badge, tags,
// years of experience) plus a small random jitter so results aren't
// identical every run — and now also on the 5 quiz answers, so the same
// capster pool can produce a different top match per customer.
export const STYLE_TAGS = ["Semua", "Fade", "Mullet", "Perm", "Pompadour", "Beard Sculpt", "Classic Taper", "Buzz Cut"];

/* ================================================================== */
/* FEEDBACK WALL                                                        */
/* A scattered wall of testimonial cards that never sits still: every   */
/* few seconds one random card fades out, swaps its copy for the next   */
/* testimonial in the queue, is reassigned a new (x, y) anchor from a   */
/* scattered pool — so it visually resurfaces somewhere else on the     */
/* wall, even if that means briefly overlapping a neighbour — then      */
/* fades back in on top of the stack. Only one card animates at a time  */
/* so the wall always feels alive without ever feeling busy.            */
/* ================================================================== */

// A loosely hand-scattered pool of anchors (px top, % left, deg rotate),
// kept in a compact vertical band on purpose (see FEEDBACK_SLOT_COUNT note)
// so the wall reads as a dense cluster rather than a sprawling field.
// More anchors than visible slots means a refreshed card can land
// somewhere brand new — occasionally near, or overlapping, a neighbour.
export const FEEDBACK_ANCHOR_POOL = [
  { top: 4, left: 8, rot: -3 },
  { top: 0, left: 30, rot: 2 },
  { top: 8, left: 52, rot: -2 },
  { top: 2, left: 74, rot: 3 },
  { top: 44, left: 20, rot: 2 },
  { top: 40, left: 42, rot: -3 },
  { top: 50, left: 64, rot: 2 },
  { top: 46, left: 86, rot: -2 },
  { top: 90, left: 10, rot: -2 },
  { top: 96, left: 34, rot: 3 },
  { top: 86, left: 58, rot: -3 },
  { top: 94, left: 80, rot: 2 },
  { top: 150, left: 22, rot: -2 },
  { top: 156, left: 46, rot: 3 },
  { top: 148, left: 70, rot: -2 },
  { top: 154, left: 90, rot: 2 },
];

export const FEEDBACK_SLOT_COUNT = 11;
// Fade-out is slow and deliberate. A new card is set loose (starts its own
// fade-out elsewhere) once the current one is HALFWAY through fading — the
// two transitions overlap rather than running one-at-a-time, which is what
// keeps the wall feeling continuously, densely alive instead of static
// with the occasional single swap.
export const FEEDBACK_FADE_MS = 2000;
export const FEEDBACK_OVERLAP_MS = FEEDBACK_FADE_MS * 0.5;
export const FEEDBACK_START_DELAY_MS = 1400;

export const FAQ_CATEGORY_ICON = { "Booking": Timer, "Layanan": Scissors, "Poin & Voucher": Gift, "Pembayaran": CreditCard };
export const FAQ_CATEGORIES = ["Semua", ...Array.from(new Set(FAQS.map((f) => f.category)))];

export const BOOK_STEPS = ["Tanggal & Jam", "Layanan", "Voucher", "Pembayaran"];

export const JOURNEY_STEPS = [
  { key: "arrive", title: "Datang ke Barbershop", desc: "Klik tombol di bawah saat kamu sudah tiba di lokasi cabang.", icon: MapPinned, cta: "Saya Sudah Tiba" },
  { key: "checkin", title: "Check-in", desc: "Tunjukkan nomor antrian ke resepsionis untuk check-in.", icon: Ticket, cta: "Check-in Sekarang" },
  { key: "haircut", title: "Proses Haircut", desc: "Capster sedang mengerjakan gayamu, santai dulu ya.", icon: Scissors, cta: "Tandai Selesai" },
  { key: "done", title: "Booking Selesai", desc: "Potongan rambutmu sudah selesai. Terima kasih sudah booking!", icon: Check, cta: "Lanjut" },
];

export const POINT_HISTORY = [
  { id: "h1", label: "Booking - Haircut + Beard (Rangga Putra)", date: "24 Jul 2026", points: 24 },
  { id: "h2", label: "Booking - Haircut Reguler (Fajar Nugraha)", date: "10 Jul 2026", points: 15 },
  { id: "h3", label: "Tukar Voucher Rp 20.000", date: "02 Jul 2026", points: -100 },
  { id: "h4", label: "Booking - Haircut + Hairwash", date: "28 Jun 2026", points: 50 },
];

/* ================================================================== */
/* POIN & REWARDS PAGE — member stats, gold-tier benefits, achievements */
/* ================================================================== */

export const MEMBER_STATS = { totalBooking: 18, totalHemat: 420000 };

export const GOLD_TIER_TARGET = 500;
export const GOLD_BENEFITS = [
  "Diskon 10% untuk semua layanan",
  "Booking Prioritas",
  "Bonus Poin 2x",
  "Promo Eksklusif Member",
];

export const ACHIEVEMENTS = [
  { id: "ac1", title: "Booking Pertama", desc: "Selamat! Kamu sudah memulai perjalanan", icon: Scissors, unlocked: true },
  { id: "ac2", title: "Member Silver", desc: "Kumpulkan 250 poin", icon: BadgeCheck, unlocked: true },
  { id: "ac3", title: "Booking 10x", desc: "Booking 10 kali untuk mendapatkan bonus", icon: CalendarCheck, unlocked: false },
  { id: "ac4", title: "Gold Member", desc: "Kumpulkan 500 poin", icon: Crown, unlocked: false },
  { id: "ac5", title: "Datang 5 Minggu Berturut-turut", desc: "Konsistensi itu keren!", icon: Flame, unlocked: false },
];

/* ================================================================== */
/* NOTIFICATION CENTER — dropdown opened from the navbar account chip  */
/* ================================================================== */

export const NOTIFICATION_TABS = [
  { id: "semua", label: "Semua", icon: Bell },
  { id: "hari-ini", label: "Hari Ini", icon: Calendar },
  { id: "booking", label: "Booking", icon: CalendarCheck },
  { id: "promo", label: "Promo", icon: Ticket },
  { id: "membership", label: "Membership", icon: Crown },
  { id: "inspirasi", label: "Inspirasi", icon: Lightbulb },
];

export const NOTIFICATIONS = [
  {
    id: "n1", category: "booking", today: true, unread: true, badge: "Baru", tone: "green", icon: CalendarCheck,
    title: "Booking Dikonfirmasi",
    desc: "Booking kamu dengan Dimas Aditya pada Sabtu, 3 Agustus 2025 14:00 di Centre Point telah dikonfirmasi.",
    chips: [
      { icon: Calendar, label: "Sabtu, 3 Agu 2025" },
      { icon: Clock, label: "14:00" },
      { icon: Scissors, label: "Haircut + Hair Wash" },
    ],
    time: "2 menit yang lalu",
    cta: { label: "Lihat Booking", icon: ArrowRight, tone: "dark" }, target: "history",
  },
  {
    id: "n2", category: "booking", today: true, unread: true, badge: "Baru", tone: "blue", icon: Clock,
    title: "Reminder: Booking Dimulai 30 Menit Lagi",
    desc: "Booking kamu akan dimulai pukul 14:00. Jangan lupa datang tepat waktu ya!",
    time: "13:30",
    cta: { label: "Buka QR Check-in", icon: QrCode, tone: "blue" }, target: "journey",
  },
  {
    id: "n3", category: "promo", today: true, unread: true, badge: "Baru", tone: "amber", icon: Ticket,
    title: "Voucher Baru Untukmu!",
    desc: "Kamu mendapatkan voucher diskon 20% untuk semua layanan. Berlaku sampai 10 Agustus 2025.",
    time: "11:05",
    cta: { label: "Gunakan Voucher", icon: Tag, tone: "amber" }, target: "promo",
  },
  {
    id: "n4", category: "booking", today: false, unread: true, tone: "purple", icon: Star,
    title: "Yuk, Beri Review!",
    desc: "Bagaimana hasil potonganmu bersama Dimas Aditya? Review-mu sangat berarti untuk kami dan capster lainnya.",
    time: "Kemarin",
    cta: { label: "Beri Review", icon: Star, tone: "purple" }, target: "history",
  },
  {
    id: "n5", category: "inspirasi", today: false, unread: true, badge: "Baru", tone: "green", icon: Lightbulb,
    title: "Inspirasi Baru Telah Tersedia",
    desc: "10 gaya Fade terbaru telah ditambahkan. Temukan gaya yang cocok untukmu sekarang!",
    time: "Kemarin",
    cta: { label: "Lihat Inspirasi", icon: ExternalLink, tone: "greenOutline" }, target: "inspiration",
  },
  {
    id: "n6", category: "membership", today: false, unread: false, tone: "green", icon: Gift,
    title: "+75 Poin Ditambahkan",
    desc: "Kamu mendapatkan 75 poin dari transaksi Haircut Premium. Terus kumpulkan poin untuk mendapatkan reward menarik.",
    time: "2 hari lalu",
    cta: { label: "Lihat Poin", icon: Gift, tone: "greenOutline" }, target: "points",
  },
];

export const NEXT_BOOKING_NOTIF = {
  capsterName: "Dimas Aditya",
  rating: 4.8,
  service: "Haircut + Hair Wash",
  branchName: "Centre Point",
  dateLabel: "Sab, 3 Agu",
  timeLabel: "14:00",
};

export const ACTIVE_VOUCHER_NOTIF = {
  title: "Diskon 20% Semua Layanan",
  desc: "Berlaku sampai 10 Agu 2025",
  code: "GC20AUG",
};


/* Mock data layer for the Admin panel. Reuses the public-site data where it
   makes sense (branches, capsters, services, promos, vouchers, inspirations)
   and adds admin-only fields/entities on top. Everything lives in memory —
   there is no backend, so edits made in the admin UI reset on page reload. */

import {
  BRANCHES, CAPSTERS, SERVICES, ALL_PROMOS, REDEEMABLE_VOUCHERS,
  PAYMENT_METHODS, INSPIRATIONS, BOOKING_HISTORY,
} from "../data/barbershop";

/* ---------------------------------------------------------------- */
/* AUTH                                                               */
/* ---------------------------------------------------------------- */

export const ADMIN_ACCOUNT = { email: "admin@cartenz.id", password: "admin123" };

export const ADMIN_USER = {
  name: "Bayu Ardiansyah",
  role: "Super Admin",
  email: "admin@cartenz.id",
  branch: "Semua Cabang",
};

/* ---------------------------------------------------------------- */
/* DASHBOARD                                                          */
/* ---------------------------------------------------------------- */

export const DASHBOARD_STATS = [
  { id: "booking", label: "Booking Hari Ini", value: "42", trend: "+12% dari kemarin", tone: "up" },
  { id: "revenue", label: "Pendapatan Hari Ini", value: "Rp 6.850.000", trend: "+8% dari kemarin", tone: "up" },
  { id: "customer", label: "Customer Baru", value: "9", trend: "+3 minggu ini", tone: "up" },
  { id: "capster", label: "Capster Aktif", value: "10 / 10", trend: "Semua cabang beroperasi", tone: "neutral" },
];

export const REVENUE_TREND = [
  { day: "Sen", value: 4200000 },
  { day: "Sel", value: 5100000 },
  { day: "Rab", value: 3800000 },
  { day: "Kam", value: 6100000 },
  { day: "Jum", value: 7300000 },
  { day: "Sab", value: 9200000 },
  { day: "Min", value: 6850000 },
];

export const BRANCH_LOAD = BRANCHES.map((b, i) => ({
  id: b.id,
  name: b.name,
  bookingHariIni: [11, 8, 6, 5, 12][i] ?? 6,
  kapasitasPct: [88, 64, 52, 40, 91][i] ?? 60,
}));

/* ---------------------------------------------------------------- */
/* MONITORING                                                         */
/* ---------------------------------------------------------------- */

const STATUS_CYCLE = ["Menunggu", "Diproses", "Selesai", "Selesai", "Dibatalkan"];

export const MONITORING_BOOKINGS = [
  ...BOOKING_HISTORY.map((h, i) => ({
    id: h.id,
    customer: ["Andi Wijaya", "Rizky Ramadhan", "Farhan Maulana", "Budi Santoso", "Teguh Prasetyo", "Hendra Gunawan"][i % 6],
    service: h.service,
    capster: h.capster,
    branch: h.branch,
    date: h.date,
    time: h.time,
    price: h.price,
    status: h.status === "Selesai" ? "Selesai" : h.status === "Dibatalkan" ? "Dibatalkan" : "Menunggu",
  })),
  { id: "H-2041", customer: "Andi Wijaya", service: "Haircut Reguler", capster: "Iqbal Ramadhan", branch: "Centre Point", date: "5 Agu 2026", time: "13:30", price: 75000, status: "Menunggu" },
  { id: "H-2040", customer: "Sandi Kurniawan", service: "Hair Coloring", capster: "Fajar Nugraha", branch: "Kebayoran Baru", date: "5 Agu 2026", time: "11:00", price: 250000, status: "Diproses" },
];

export const MONITORING_CAPSTERS = CAPSTERS.map((c, i) => ({
  ...c,
  branchName: BRANCHES.find((b) => b.id === c.branch)?.name || "-",
  status: i % 7 === 0 ? "Cuti" : "Aktif",
  bookingHariIni: [3, 5, 2, 4, 6, 1, 3, 2, 5, 4][i] ?? 2,
}));

export const MONITORING_CUSTOMERS = [
  { id: "u1", name: "Andi Wijaya", phone: "0812-3456-7890", email: "andi.wijaya@mail.com", tier: "Silver", branch: "Centre Point", points: 320, status: "Aktif", totalBooking: 18, totalSpend: 1850000, joined: "Jan 2025" },
  { id: "u2", name: "Rizky Ramadhan", phone: "0813-2211-9087", email: "rizky.r@mail.com", tier: "Gold", branch: "Kemang", points: 640, status: "Aktif", totalBooking: 34, totalSpend: 4620000, joined: "Aug 2024" },
  { id: "u3", name: "Farhan Maulana", phone: "0857-6612-0031", email: "farhan.m@mail.com", tier: "Silver", branch: "Kemang", points: 180, status: "Aktif", totalBooking: 7, totalSpend: 610000, joined: "Mar 2026" },
  { id: "u4", name: "Budi Santoso", phone: "0821-4477-2290", email: "budi.s@mail.com", tier: "Bronze", branch: "Kebayoran Baru", points: 40, status: "Aktif", totalBooking: 2, totalSpend: 145000, joined: "Jun 2026" },
  { id: "u5", name: "Teguh Prasetyo", phone: "0878-9012-3345", email: "teguh.p@mail.com", tier: "Gold", branch: "Dago", points: 890, status: "Aktif", totalBooking: 41, totalSpend: 5980000, joined: "Feb 2024" },
  { id: "u6", name: "Hendra Gunawan", phone: "0895-1123-4409", email: "hendra.g@mail.com", tier: "Silver", branch: "Kebayoran Baru", points: 260, status: "Aktif", totalBooking: 12, totalSpend: 1230000, joined: "Nov 2025" },
  { id: "u7", name: "Sandi Kurniawan", phone: "0817-7734-2201", email: "sandi.k@mail.com", tier: "Bronze", branch: "Kebayoran Baru", points: 15, status: "Nonaktif", totalBooking: 1, totalSpend: 75000, joined: "Jul 2026" },
];

export const MONITORING_CABANG = BRANCHES.map((b, i) => ({
  ...b,
  address: ["Jl. Kemang Raya No. 21", "Jl. Ciputat Raya No. 8", "Jl. Ir. H. Djuanda No. 45", "Jl. Raya Darmo No. 102", "Mall Centre Point Lt. 2"][i],
  phone: `021-${5000 + i * 111}${i}23`,
  jamOperasional: "09:00 - 21:00",
  capsterCount: MONITORING_CAPSTERS.filter((c) => c.branch === b.id).length,
  status: "Aktif",
}));

/* ---------------------------------------------------------------- */
/* KELOLA DATA                                                        */
/* ---------------------------------------------------------------- */

export const ADMIN_CABANG = MONITORING_CABANG;

export const ADMIN_LAYANAN = SERVICES.map((s) => ({ ...s, status: "Aktif" }));

export const ADMIN_CAPSTER = MONITORING_CAPSTERS;

export const ADMIN_JADWAL = MONITORING_CAPSTERS.slice(0, 8).map((c, i) => ({
  id: "j" + (i + 1),
  capster: c.name,
  branch: c.branchName,
  hari: ["Senin - Jumat", "Selasa - Sabtu", "Senin - Sabtu", "Rabu - Minggu", "Senin - Jumat", "Selasa - Minggu", "Senin - Sabtu", "Kamis - Selasa"][i],
  shift: i % 2 === 0 ? "09:00 - 17:00" : "13:00 - 21:00",
  status: c.status,
}));

export const ADMIN_PROMO = ALL_PROMOS.map((p) => ({ ...p, status: "Aktif" }));

export const ADMIN_VOUCHER = REDEEMABLE_VOUCHERS.map((v) => ({ ...v, stok: 100, terpakai: Math.round(Math.random() * 40) }));

export const ADMIN_MEMBERSHIP = [
  { id: "m1", tier: "Bronze", target: 0, benefit: "Poin dasar 1x, akses booking reguler", warna: "#8C6A4A" },
  { id: "m2", tier: "Silver", target: 150, benefit: "Booking prioritas, hadiah ulang tahun", warna: "#8A94A6" },
  { id: "m3", tier: "Gold", target: 500, benefit: "Poin 2x lipat, cashback ekstra non-tunai", warna: "#C79A3E" },
  { id: "m4", tier: "Platinum", target: 1200, benefit: "Capster pilihan gratis, layanan home service", warna: "#4A4A4A" },
];

export const ADMIN_INSPIRASI = INSPIRATIONS.map((i) => ({ ...i, status: "Ditampilkan" }));

export const ADMIN_BANNER = [
  { id: "bn1", title: "Diskon Member Baru 10%", posisi: "Beranda - Hero", periode: "1 - 31 Agu 2026", status: "Aktif" },
  { id: "bn2", title: "Promo Gajian Cashback 5%", posisi: "Beranda - Promo", periode: "25 - 30 Agu 2026", status: "Aktif" },
  { id: "bn3", title: "Grand Opening Centre Point", posisi: "Beranda - Hero", periode: "1 - 15 Jul 2026", status: "Nonaktif" },
  { id: "bn4", title: "Weekend Treatment Sale", posisi: "Promo Page", periode: "Setiap Sabtu-Minggu", status: "Aktif" },
];

/* ---------------------------------------------------------------- */
/* LAPORAN & ANALITIK                                                 */
/* ---------------------------------------------------------------- */

export const LAPORAN_PENDAPATAN = BRANCHES.map((b, i) => ({
  id: b.id,
  cabang: b.name,
  bulanIni: [24500000, 18200000, 15800000, 12100000, 9600000][i] ?? 8000000,
  bulanLalu: [22100000, 17650000, 14900000, 12900000, 6100000][i] ?? 7000000,
}));

export const LAPORAN_BOOKING = [
  { id: "st1", status: "Selesai", jumlah: 812, pct: 78 },
  { id: "st2", status: "Menunggu", jumlah: 64, pct: 6 },
  { id: "st3", status: "Diproses", jumlah: 51, pct: 5 },
  { id: "st4", status: "Dibatalkan", jumlah: 115, pct: 11 },
];

export const LAPORAN_CUSTOMER = {
  totalCustomer: 3240,
  customerBaruBulanIni: 186,
  customerKembali: "68%",
  rataRataTransaksi: 172500,
};

export const LAPORAN_LOYALITAS = [
  { id: "l1", label: "Poin Diberikan Bulan Ini", value: "48.200" },
  { id: "l2", label: "Poin Ditukar Bulan Ini", value: "19.400" },
  { id: "l3", label: "Voucher Aktif", value: "312" },
  { id: "l4", label: "Member Naik Tier", value: "27" },
];

export const LAPORAN_RATING = MONITORING_CAPSTERS
  .slice()
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 8)
  .map((c) => ({ id: c.id, capster: c.name, cabang: c.branchName, rating: c.rating, reviews: c.reviews }));

/* ---------------------------------------------------------------- */
/* PENGATURAN SISTEM                                                  */
/* ---------------------------------------------------------------- */

export const ADMIN_ROLES = [
  { id: "r1", name: "Bayu Ardiansyah", email: "bayu.a@cartenz.id", role: "Super Admin", branch: "Semua Cabang", status: "Aktif" },
  { id: "r2", name: "Sinta Marlina", email: "sinta.m@cartenz.id", role: "Admin Cabang", branch: "Kemang", status: "Aktif" },
  { id: "r3", name: "Fadli Ahmad", email: "fadli.a@cartenz.id", role: "Admin Cabang", branch: "Centre Point", status: "Aktif" },
  { id: "r4", name: "Rina Kusuma", email: "rina.k@cartenz.id", role: "Finance", branch: "Semua Cabang", status: "Nonaktif" },
];

/* Convenience list used by the role switcher — only active accounts. */
export const SWITCHABLE_USERS = ADMIN_ROLES.filter((r) => r.status === "Aktif");

export const ADMIN_NOTIF_SETTINGS = [
  { id: "n1", label: "Booking baru masuk", desc: "Notifikasi saat customer membuat booking baru", enabled: true },
  { id: "n2", label: "Booking dibatalkan", desc: "Notifikasi saat customer / sistem membatalkan booking", enabled: true },
  { id: "n3", label: "Stok voucher menipis", desc: "Peringatan saat stok voucher tersisa di bawah 10", enabled: true },
  { id: "n4", label: "Review rating rendah", desc: "Notifikasi saat capster menerima rating di bawah 3", enabled: false },
  { id: "n5", label: "Laporan mingguan otomatis", desc: "Ringkasan performa dikirim tiap Senin pagi", enabled: true },
];

export const ADMIN_JAM_OPERASIONAL = BRANCHES.map((b) => ({
  id: b.id,
  cabang: b.name,
  buka: "09:00",
  tutup: "21:00",
  liburMingguan: "-",
}));

export const ADMIN_PAYMENT_SETTINGS = PAYMENT_METHODS.map((p) => ({ ...p, enabled: true }));

export const ADMIN_BACKUP_LOG = [
  { id: "b1", waktu: "5 Agu 2026, 03:00", ukuran: "182 MB", status: "Berhasil" },
  { id: "b2", waktu: "4 Agu 2026, 03:00", ukuran: "180 MB", status: "Berhasil" },
  { id: "b3", waktu: "3 Agu 2026, 03:00", ukuran: "179 MB", status: "Berhasil" },
  { id: "b4", waktu: "2 Agu 2026, 03:00", ukuran: "177 MB", status: "Gagal" },
];

export const rupiah = (n) => "Rp " + Math.round(n).toLocaleString("id-ID");

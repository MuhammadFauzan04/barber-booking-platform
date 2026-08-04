/* User profile page — full account dashboard: tier banner with progress,
   quick stats, contact info, recent activity, a redeemable voucher, a
   referral card, and quick-action shortcuts. */

import React from "react";
import {
  ArrowRight, BadgeCheck, Cake, Calendar, CalendarCheck, CalendarPlus,
  CalendarDays, ChevronRight, Crown, Gift, Mail, MapPin, Pencil, Phone,
  Sparkles, Star, Ticket, UserPlus, Wallet,
} from "lucide-react";
import { Page, Reveal, Stagger } from "../components/Common";
import { BOOKING_HISTORY, BRANCHES } from "../data/barbershop";
import { rupiah } from "../utils/format";

const TIER_TARGET = 10;

const ACTIVITY = [
  { id: "a1", title: "Booking Selesai", sub: "Haircut Premium · Kemang", date: "12 Mei 2026 · 14:30", badge: "Selesai", badgeTone: "green", icon: CalendarCheck },
  { id: "a2", title: "+50 Poin", sub: "Booking di Kemang", date: "10 Mei 2026 · 10:15", badge: "+50 pts", badgeTone: "green", icon: Gift },
  { id: "a3", title: "Voucher Digunakan", sub: "Diskon 10% Birthday", date: "8 Mei 2026 · 09:20", badge: "-10%", badgeTone: "amber", icon: Ticket },
  { id: "a4", title: "Booking Dibuat", sub: "Hair Coloring · Kemang", date: "5 Mei 2026 · 11:00", badge: "Dibuat", badgeTone: "blue", icon: CalendarPlus },
];

export function ProfilePage({ userName, points, branch, go }) {
  const branchObj = BRANCHES.find((b) => b.id === branch) || BRANCHES[0];
  const totalBooking = BOOKING_HISTORY.length;
  const totalSpend = BOOKING_HISTORY.filter((h) => h.status === "Selesai").reduce((sum, h) => sum + h.price, 0);
  const remaining = Math.max(0, TIER_TARGET - totalBooking);
  const progressPct = Math.min(100, Math.round((totalBooking / TIER_TARGET) * 100));
  const email = userName ? userName.toLowerCase().replace(/\s+/g, ".") + "@gmail.com" : "-";

  return (
    <Page className="kc-section kc-section-tight">
      <div className="kc-section-head">
        <span className="kc-kicker">Akun Saya</span>
        <h2 className="kc-h2">PROFIL KAMU 👋</h2>
        <p className="kc-capster-meta" style={{ marginTop: 6 }}>Kelola informasi pribadi dan aktivitasmu di Cartenz Barber</p>
      </div>

      {/* TIER BANNER */}
      <Reveal className="kc-pf-banner">
        <div className="kc-pf-banner-tierbox">
          <div className="kc-pf-banner-avatar"><Crown size={22} /></div>
          <div>
            <div className="kc-pf-banner-tier">Silver Member <BadgeCheck size={15} /></div>
            <div className="kc-pf-banner-sub">Bergabung sejak Januari 2025</div>
          </div>
        </div>
        <div className="kc-pf-banner-progress">
          <div className="kc-pf-banner-progress-label">
            {remaining > 0
              ? <>Booking {remaining}x lagi untuk naik ke <b>Gold Member</b></>
              : <>Kamu sudah memenuhi syarat naik ke <b>Gold Member</b>!</>}
          </div>
          <div className="kc-pf-progress-track"><div className="kc-pf-progress-fill" style={{ width: `${progressPct}%` }} /></div>
          <div className="kc-pf-progress-count">{totalBooking} / {TIER_TARGET} booking</div>
        </div>
        <div className="kc-pf-banner-crown"><Crown size={64} strokeWidth={1.2} /></div>
      </Reveal>

      {/* STATS */}
      <div className="kc-pf-stats-row">
        <Stagger>
          <div className="kc-pf-stat-card">
            <div className="kc-pf-stat-icon"><Calendar size={18} /></div>
            <div>
              <div className="kc-pf-stat-value">{totalBooking}</div>
              <div className="kc-pf-stat-label">Total Booking</div>
              <button className="kc-pf-stat-link" onClick={() => go("history")}>Lihat riwayat <ArrowRight size={11} /></button>
            </div>
          </div>
          <div className="kc-pf-stat-card">
            <div className="kc-pf-stat-icon"><Gift size={18} /></div>
            <div>
              <div className="kc-pf-stat-value">{points}</div>
              <div className="kc-pf-stat-label">Poin Aktif</div>
              <button className="kc-pf-stat-link" onClick={() => go("points")}>Lihat poin <ArrowRight size={11} /></button>
            </div>
          </div>
          <div className="kc-pf-stat-card">
            <div className="kc-pf-stat-icon"><Wallet size={18} /></div>
            <div>
              <div className="kc-pf-stat-value" style={{ fontSize: 17 }}>{rupiah(totalSpend)}</div>
              <div className="kc-pf-stat-label">Total Transaksi</div>
              <button className="kc-pf-stat-link" onClick={() => go("history")}>Lihat transaksi <ArrowRight size={11} /></button>
            </div>
          </div>
          <div className="kc-pf-stat-card">
            <div className="kc-pf-stat-icon"><Star size={18} /></div>
            <div>
              <div className="kc-pf-stat-value">4.8</div>
              <div className="kc-pf-stat-label">Rating Kamu</div>
              <span className="kc-pf-stat-link static">Lihat ulasan <ArrowRight size={11} /></span>
            </div>
          </div>
        </Stagger>
      </div>

      {/* MAIN GRID */}
      <div className="kc-pf-grid">
        {/* CONTACT INFO */}
        <div className="kc-pf-card">
          <div className="kc-pf-card-head">
            <span className="kc-pf-card-title">Informasi Kontak</span>
            <button className="kc-btn kc-btn-outline kc-btn-sm"><Pencil size={13} /> Edit</button>
          </div>
          <Stagger>
            <div className="kc-pf-detail-row">
              <div className="kc-pf-detail-icon"><Mail size={16} /></div>
              <div>
                <div className="kc-pf-detail-label">Email</div>
                <div className="kc-pf-detail-value">{email} {userName && <BadgeCheck size={13} color="var(--kc-accent-dark)" />}</div>
              </div>
            </div>
            <div className="kc-pf-detail-row">
              <div className="kc-pf-detail-icon"><Phone size={16} /></div>
              <div>
                <div className="kc-pf-detail-label">No. HP</div>
                <div className="kc-pf-detail-value">0812-3456-7890</div>
              </div>
            </div>
            <div className="kc-pf-detail-row">
              <div className="kc-pf-detail-icon"><MapPin size={16} /></div>
              <div>
                <div className="kc-pf-detail-label">Cabang Favorit</div>
                <div className="kc-pf-detail-value">{branchObj.name}, {branchObj.city}</div>
              </div>
            </div>
            <div className="kc-pf-detail-row">
              <div className="kc-pf-detail-icon"><Cake size={16} /></div>
              <div>
                <div className="kc-pf-detail-label">Tanggal Lahir</div>
                <div className="kc-pf-detail-value">12 Mei 2000</div>
              </div>
            </div>
            <div className="kc-pf-detail-row">
              <div className="kc-pf-detail-icon"><CalendarDays size={16} /></div>
              <div>
                <div className="kc-pf-detail-label">Bergabung Sejak</div>
                <div className="kc-pf-detail-value">Januari 2025</div>
              </div>
            </div>
          </Stagger>
        </div>

        {/* RECENT ACTIVITY */}
        <div className="kc-pf-card">
          <div className="kc-pf-card-head">
            <span className="kc-pf-card-title">Aktivitas Terbaru</span>
            <button className="kc-pf-card-link" onClick={() => go("history")}>Lihat Semua</button>
          </div>
          <div>
            {ACTIVITY.map((a) => (
              <div key={a.id} className="kc-pf-activity-row" onClick={() => go("history")}>
                <div className={"kc-pf-activity-icon " + a.badgeTone}><a.icon size={17} /></div>
                <div className="kc-pf-activity-body">
                  <div className="kc-pf-activity-title">{a.title}</div>
                  <div className="kc-pf-activity-sub">{a.sub}</div>
                  <div className="kc-pf-activity-sub">{a.date}</div>
                </div>
                <span className={"kc-pf-activity-badge " + a.badgeTone}>{a.badge}</span>
                <ChevronRight size={15} color="var(--kc-ink-dim)" />
              </div>
            ))}
          </div>
        </div>

        {/* VOUCHER + REFERRAL */}
        <div>
          <div className="kc-pf-card">
            <div className="kc-pf-card-head" style={{ marginBottom: 12 }}>
              <span className="kc-pf-card-title">Voucher Spesial Untukmu 🎉</span>
            </div>
            <div className="kc-pf-voucher-ticket">
              <div className="kc-pf-voucher-label">Diskon Member</div>
              <div className="kc-pf-voucher-pct">10%</div>
              <div className="kc-pf-voucher-desc">Untuk semua layanan</div>
              <div className="kc-pf-voucher-expire">Berlaku hingga 31 Agustus 2026</div>
              <button className="kc-btn kc-btn-primary" style={{ width: "100%" }} onClick={() => go("points")}>Gunakan Sekarang</button>
            </div>
          </div>

          <div className="kc-pf-referral">
            <div className="kc-pf-referral-title">Ajak Teman, Dapat Poin!</div>
            <div className="kc-pf-referral-desc">Dapatkan 100 poin untuk setiap teman yang berhasil kamu ajak.</div>
            <div className="kc-pf-referral-foot">
              <button className="kc-btn kc-btn-primary kc-btn-sm"><UserPlus size={13} /> Undang Sekarang</button>
              <div className="kc-pf-referral-avatars">
                <span className="kc-avatar-stack">
                  <span className="kc-avatar-chip">RP</span>
                  <span className="kc-avatar-chip">DA</span>
                  <span className="kc-avatar-chip">FN</span>
                  <span className="kc-avatar-chip">BS</span>
                </span>
                <span className="kc-pf-referral-more">+12</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="kc-kicker" style={{ margin: "22px 0 4px" }}>Aksi Cepat</div>
      <div className="kc-pf-quick-row">
        <button className="kc-pf-quick-card" onClick={() => go("history")}>
          <span className="kc-pf-quick-left">
            <span className="kc-pf-quick-icon"><Calendar size={18} /></span>
            <span>
              <span className="kc-pf-quick-title" style={{ display: "block" }}>Riwayat Booking</span>
              <span className="kc-pf-quick-desc" style={{ display: "block" }}>Lihat semua booking-mu</span>
            </span>
          </span>
          <ChevronRight size={16} />
        </button>
        <button className="kc-pf-quick-card" onClick={() => go("points")}>
          <span className="kc-pf-quick-left">
            <span className="kc-pf-quick-icon"><Gift size={18} /></span>
            <span>
              <span className="kc-pf-quick-title" style={{ display: "block" }}>Poin & Voucher</span>
              <span className="kc-pf-quick-desc" style={{ display: "block" }}>Cek poin dan voucher tersedia</span>
            </span>
          </span>
          <ChevronRight size={16} />
        </button>
        <button className="kc-pf-quick-card dark" onClick={() => go("capsters")}>
          <span className="kc-pf-quick-left">
            <span className="kc-pf-quick-icon"><Sparkles size={18} /></span>
            <span>
              <span className="kc-pf-quick-title" style={{ display: "block" }}>Booking Sekarang</span>
              <span className="kc-pf-quick-desc" style={{ display: "block" }}>Pesan jadwalmu sekarang</span>
            </span>
          </span>
          <ChevronRight size={16} />
        </button>
      </div>
    </Page>
  );
}

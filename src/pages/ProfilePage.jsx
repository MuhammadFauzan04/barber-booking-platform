/* User profile page. */

import React from "react";
import { ArrowRight, BadgeCheck, Gift, History, Mail, MapPin, Pencil, Phone } from "lucide-react";
import { Page, Reveal, Stagger } from "../components/Common";
import { BOOKING_HISTORY, BRANCHES } from "../data/barbershop";
import { rupiah } from "../utils/format";

export function ProfilePage({ userName, points, branch, go }) {
  const branchObj = BRANCHES.find((b) => b.id === branch) || BRANCHES[0];
  const totalBooking = BOOKING_HISTORY.length;
  const totalSpend = BOOKING_HISTORY.filter((h) => h.status === "Selesai").reduce((sum, h) => sum + h.price, 0);
  const initials = (userName || "Tamu").split(" ").map((n) => n[0]).join("").slice(0, 2);

  return (
    <Page className="kc-section">
      <div className="kc-section-head"><span className="kc-kicker">Akun Saya</span><h2 className="kc-h2">PROFIL KAMU</h2></div>

      <Reveal className="kc-profile-card">
        <div className="kc-profile-avatar">{initials}</div>
        <div className="kc-profile-info">
          <div className="kc-profile-name">{userName || "Tamu"} <BadgeCheck size={16} /></div>
          <div className="kc-profile-tier">{userName ? "Member Silver · Bergabung Jan 2025" : "Belum masuk akun terdaftar"}</div>
        </div>
        <button className="kc-btn kc-btn-outline kc-btn-sm"><Pencil size={13} /> Edit Profil</button>
      </Reveal>

      <div className="kc-profile-stats">
        <div className="kc-profile-stat"><div className="kc-profile-stat-num">{totalBooking}</div><div className="kc-profile-stat-label">Total Booking</div></div>
        <div className="kc-profile-stat"><div className="kc-profile-stat-num">{points}</div><div className="kc-profile-stat-label">Poin Aktif</div></div>
        <div className="kc-profile-stat"><div className="kc-profile-stat-num" style={{ fontSize: 18 }}>{rupiah(totalSpend)}</div><div className="kc-profile-stat-label">Total Transaksi</div></div>
      </div>

      <div className="kc-kicker" style={{ margin: "30px 0 12px" }}>Informasi Kontak</div>
      <div className="kc-card-list">
        <Stagger>
          <div className="kc-profile-detail-row">
            <Mail size={16} />
            <div><div className="kc-service-name">Email</div><div className="kc-capster-meta">{userName ? userName.toLowerCase().replace(/\s+/g, ".") + "@gmail.com" : "-"}</div></div>
          </div>
          <div className="kc-profile-detail-row">
            <Phone size={16} />
            <div><div className="kc-service-name">No. HP</div><div className="kc-capster-meta">0812-3456-7890</div></div>
          </div>
          <div className="kc-profile-detail-row">
            <MapPin size={16} />
            <div><div className="kc-service-name">Cabang Favorit</div><div className="kc-capster-meta">{branchObj.name}, {branchObj.city}</div></div>
          </div>
        </Stagger>
      </div>

      <div className="kc-kicker" style={{ margin: "30px 0 12px" }}>Aksi Cepat</div>
      <div className="kc-profile-actions">
        <button className="kc-btn kc-btn-outline" onClick={() => go("history")}><History size={15} /> Riwayat Booking</button>
        <button className="kc-btn kc-btn-outline" onClick={() => go("points")}><Gift size={15} /> Poin & Voucher</button>
        <button className="kc-btn kc-btn-primary" onClick={() => go("capsters")}>Booking Sekarang <ArrowRight size={15} /></button>
      </div>
    </Page>
  );
}


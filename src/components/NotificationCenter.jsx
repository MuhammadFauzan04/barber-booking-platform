/* Notification Center dropdown — opened from the navbar account chip.
   Left column: filterable notification feed. Right column: upcoming
   booking countdown, membership progress, active voucher, and popular
   inspiration shortcuts. State (read/unread, active tab) is owned by
   the parent Header so it survives the dropdown being closed/reopened. */

import React, { useEffect, useState } from "react";
import { Bell, CheckCheck, Copy, Crown, History, LogOut, QrCode, Settings, UserCircle } from "lucide-react";
import { ACTIVE_VOUCHER_NOTIF, INSPIRATIONS, NEXT_BOOKING_NOTIF, NOTIFICATION_TABS } from "../data/barbershop";

const PLATINUM_THRESHOLD = 500;
const POPULAR_INSPIRATIONS = INSPIRATIONS.slice(0, 4);

function formatClock(totalSeconds) {
  const s = Math.max(0, totalSeconds);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return { h: String(h).padStart(2, "0"), m: String(m).padStart(2, "0"), s: String(sec).padStart(2, "0") };
}

export function NotificationPanel({ userName, points, go, onLogout, onClose, items, setItems, tab, setTab, targetTime }) {
  const [remaining, setRemaining] = useState(() => Math.round((targetTime - Date.now()) / 1000));
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setRemaining(Math.round((targetTime - Date.now()) / 1000)), 1000);
    return () => clearInterval(t);
  }, [targetTime]);

  const clock = formatClock(remaining);

  const filtered = items.filter((n) => {
    if (tab === "semua") return true;
    if (tab === "hari-ini") return n.today;
    return n.category === tab;
  });

  const markAllRead = () => setItems((list) => list.map((n) => ({ ...n, unread: false, badge: undefined })));

  const handleCta = (n) => {
    setItems((list) => list.map((x) => (x.id === n.id ? { ...x, unread: false, badge: undefined } : x)));
    onClose();
    go(n.target);
  };

  const copyCode = () => {
    if (navigator.clipboard) navigator.clipboard.writeText(ACTIVE_VOUCHER_NOTIF.code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const pointsToGo = Math.max(0, PLATINUM_THRESHOLD - points);
  const progressPct = Math.min(100, Math.round((points / PLATINUM_THRESHOLD) * 100));
  const initials = (userName || "Tamu").split(" ").map((n) => n[0]).join("").slice(0, 2);

  return (
    <div className="kc-notif-panel">
      <div className="kc-notif-userrow">
        <div className="kc-user-dropdown-avatar">{initials}</div>
        <div>
          <div className="kc-user-dropdown-name">{userName || "Tamu"}</div>
          <div className="kc-user-dropdown-sub">{userName ? "Member Gold" : "Belum masuk akun"}</div>
        </div>
        <div className="kc-notif-userrow-actions">
          <button className="kc-notif-icon-btn" title="Lihat Profil" onClick={() => { onClose(); go("profile"); }}><UserCircle size={15} /></button>
          <button className="kc-notif-icon-btn" title="Riwayat Booking" onClick={() => { onClose(); go("history"); }}><History size={15} /></button>
          <button className="kc-notif-icon-btn danger" title="Keluar" onClick={() => { onClose(); onLogout(); }}><LogOut size={15} /></button>
        </div>
      </div>

      <div className="kc-notif-header">
        <div className="kc-notif-title-row">
          <div className="kc-notif-bell-badge"><Bell size={17} /></div>
          <div>
            <div className="kc-notif-title">Notification Center</div>
            <div className="kc-notif-sub">Tetap update dengan booking, promo, dan aktivitas akunmu.</div>
          </div>
        </div>
        <div className="kc-notif-header-actions">
          <button className="kc-notif-pill-btn" onClick={markAllRead}><CheckCheck size={13} /> Tandai dibaca</button>
          <button className="kc-notif-pill-btn" onClick={() => { onClose(); go("profile"); }}><Settings size={13} /></button>
        </div>
      </div>

      <div className="kc-notif-tabs">
        {NOTIFICATION_TABS.map((t) => {
          const Icon = t.icon;
          return (
            <button key={t.id} className={"kc-notif-tab" + (tab === t.id ? " active" : "")} onClick={() => setTab(t.id)}>
              <Icon size={12} /> {t.label}
            </button>
          );
        })}
      </div>

      <div className="kc-notif-body">
        <div className="kc-notif-list">
          {filtered.length === 0 && <div className="kc-notif-empty">Tidak ada notifikasi di kategori ini.</div>}
          {filtered.map((n) => {
            const Icon = n.icon;
            const CtaIcon = n.cta.icon;
            return (
              <div key={n.id} className={"kc-notif-card" + (!n.unread ? " read" : "")}>
                <div className={"kc-notif-icon-wrap tone-" + n.tone}>
                  <Icon size={16} />
                  {n.unread && <span className={"kc-notif-dot tone-" + n.tone} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="kc-notif-card-top">
                    <div className="kc-notif-card-title">
                      {n.title}
                      {n.badge && <span className="kc-notif-badge-new">{n.badge}</span>}
                    </div>
                    <div className="kc-notif-card-time">{n.time}</div>
                  </div>
                  <p className="kc-notif-card-desc">{n.desc}</p>
                  {n.chips && (
                    <div className="kc-notif-chip-row">
                      {n.chips.map((c, i) => {
                        const ChipIcon = c.icon;
                        return <span key={i} className="kc-notif-chip"><ChipIcon size={11} /> {c.label}</span>;
                      })}
                    </div>
                  )}
                  <button className={"kc-notif-cta tone-" + n.cta.tone} onClick={() => handleCta(n)}>
                    <CtaIcon size={13} /> {n.cta.label}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="kc-notif-sidebar">
          <div className="kc-notif-booking-card">
            <div className="kc-notif-booking-head">
              Booking Selanjutnya
              <button className="kc-notif-booking-link" onClick={() => { onClose(); go("history"); }}>Lihat Semua</button>
            </div>
            <div className="kc-notif-booking-capster">
              <div className="kc-notif-booking-avatar">{NEXT_BOOKING_NOTIF.capsterName.split(" ").map((n) => n[0]).join("").slice(0, 2)}</div>
              <div style={{ flex: 1 }}>
                <div className="kc-notif-booking-name">{NEXT_BOOKING_NOTIF.capsterName} <span className="kc-notif-booking-rating">★ {NEXT_BOOKING_NOTIF.rating}</span></div>
                <div className="kc-notif-booking-service">{NEXT_BOOKING_NOTIF.service} · {NEXT_BOOKING_NOTIF.branchName}</div>
              </div>
              <div className="kc-notif-booking-date"><b>{NEXT_BOOKING_NOTIF.timeLabel}</b>{NEXT_BOOKING_NOTIF.dateLabel}</div>
            </div>
            <div className="kc-notif-countdown">
              <div>
                <div className="kc-notif-countdown-label">WAKTU MENUJU BOOKING</div>
                <div className="kc-notif-countdown-nums">
                  <div className="kc-notif-countdown-num"><b>{clock.h}</b><span>Jam</span></div>
                  <div className="kc-notif-countdown-num"><b>{clock.m}</b><span>Menit</span></div>
                  <div className="kc-notif-countdown-num"><b>{clock.s}</b><span>Detik</span></div>
                </div>
              </div>
              <button className="kc-notif-qr-btn" onClick={() => { onClose(); go("journey"); }}><QrCode size={16} /> QR Check-in</button>
            </div>
          </div>

          <div className="kc-notif-side-card kc-notif-membership-card">
            <div className="kc-notif-membership-top"><Crown size={14} color="#B8860B" /> Gold Member</div>
            <div className="kc-notif-progress-meta"><span>Menuju Platinum</span><span>{points} / {PLATINUM_THRESHOLD}</span></div>
            <div className="kc-notif-progress-track"><div className="kc-notif-progress-fill" style={{ width: progressPct + "%" }} /></div>
            <button className="kc-notif-pill-btn" style={{ marginTop: 8 }} onClick={() => { onClose(); go("points"); }}>Lihat Benefit</button>
          </div>

          <div className="kc-notif-side-card kc-notif-voucher-card">
            <div className="kc-notif-voucher-icon"><Bell size={16} /></div>
            <div style={{ minWidth: 0 }}>
              <div className="kc-notif-card-title" style={{ fontSize: 12 }}>{ACTIVE_VOUCHER_NOTIF.title}</div>
              <div className="kc-notif-sub" style={{ margin: 0 }}>{ACTIVE_VOUCHER_NOTIF.desc}</div>
            </div>
            <button className="kc-notif-voucher-code" onClick={copyCode}>
              {copied ? "Disalin!" : ACTIVE_VOUCHER_NOTIF.code} <Copy size={11} />
            </button>
          </div>

          <div className="kc-notif-side-card" style={{ padding: 12 }}>
            <div className="kc-notif-insp-head">
              Inspirasi Populer
              <button className="kc-notif-booking-link" style={{ color: "var(--kc-accent-dark)" }} onClick={() => { onClose(); go("inspiration"); }}>Lihat Semua</button>
            </div>
            <div className="kc-notif-insp-grid">
              {POPULAR_INSPIRATIONS.map((it) => {
                const Icon = it.icon;
                const hue = (it.name.length * 47) % 360;
                return (
                  <button key={it.id} className="kc-notif-insp-tile" style={{ background: `linear-gradient(150deg, hsl(${hue} 60% 38%), hsl(${hue + 30} 65% 24%))` }} onClick={() => { onClose(); go("inspiration"); }}>
                    <Icon size={18} strokeWidth={1.5} />
                    {it.tag}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

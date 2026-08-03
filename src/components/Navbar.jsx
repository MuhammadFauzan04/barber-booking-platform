/* Site header/navigation (exported as `Header` to match its usage
   throughout the app; the filename follows the project's component-folder
   convention). */

import React, { useState, useEffect, useRef } from "react";
import { Bell, ChevronDown, Gift, History, LogOut, Menu, Scissors, User, UserCircle, X } from "lucide-react";
import { PromoBar } from "./PromoBar";
import { NotificationPanel } from "./NotificationCenter";
import { BRANCHES, NAV_ITEMS, NOTIFICATIONS } from "../data/barbershop";

const NOTIF_TARGET_TIME = Date.now() + (1 * 3600 + 43 * 60 + 15) * 1000;

export function Header({ stage, go, branch, setBranch, points, menuOpen, setMenuOpen, userName, onLogout }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifItems, setNotifItems] = useState(NOTIFICATIONS);
  const [notifTab, setNotifTab] = useState("semua");
  const profileRef = useRef(null);
  const unreadCount = notifItems.filter((n) => n.unread).length;

  useEffect(() => {
    const onDocClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <header className="kc-header">
      <PromoBar />
      <div className="kc-header-row">
     <button className="kc-logo" onClick={() => go("home")}>
    <img
        src="/logo.png"
        alt="Logo"
        className="kc-logo-image"
    />

<div className="kc-logo-text">
        <span className="kc-logo-main">CARTENZ BARBERSHOP</span>

    </div>
</button>

        <nav className="kc-nav-desktop">
          {NAV_ITEMS.map((it) => (
            <button
              key={it.id}
              className={"kc-nav-link" + (stage === it.id || (stage === "capsterDetail" && it.id === "capsters") ? " active" : "")}
              onClick={() => go(it.id)}
            >
              {it.label}
            </button>
          ))}
        </nav>

        <div className="kc-header-right">
          <select className="kc-branch-select" value={branch} onChange={(e) => setBranch(e.target.value)} aria-label="Pilih cabang">
            {BRANCHES.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
          <button className="kc-points-chip" onClick={() => go("points")}>
            <Gift size={13} /> {points} pts
          </button>
          <div className="kc-user-menu" ref={profileRef}>
            <button className="kc-user-chip" onClick={() => setProfileOpen((v) => !v)}>
              <User size={14} /> {userName || "Tamu"}
              {unreadCount > 0 && <span className="kc-user-chip-dot" />}
              <ChevronDown size={12} className={"kc-user-chip-caret" + (profileOpen ? " open" : "")} />
            </button>
            {profileOpen && (
              <NotificationPanel
                userName={userName}
                points={points}
                go={go}
                onLogout={onLogout}
                onClose={() => setProfileOpen(false)}
                items={notifItems}
                setItems={setNotifItems}
                tab={notifTab}
                setTab={setNotifTab}
                targetTime={NOTIF_TARGET_TIME}
              />
            )}
          </div>
          <button className="kc-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="kc-nav-mobile">
          {NAV_ITEMS.map((it) => (
            <button key={it.id} className={"kc-nav-link" + (stage === it.id ? " active" : "")}
              onClick={() => { go(it.id); setMenuOpen(false); }}>
              {it.label}
            </button>
          ))}
          <div className="kc-nav-mobile-divider" />
          <button className="kc-nav-link" onClick={() => { setMenuOpen(false); setProfileOpen(true); }}>
            <Bell size={15} /> Notifikasi {unreadCount > 0 && <span className="kc-user-chip-dot" style={{ position: "static", marginLeft: 4 }} />}
          </button>
          <button className="kc-nav-link" onClick={() => { go("profile"); setMenuOpen(false); }}><UserCircle size={15} /> Lihat Profil</button>
          <button className="kc-nav-link" onClick={() => { go("history"); setMenuOpen(false); }}><History size={15} /> Riwayat Booking</button>
          <button className="kc-nav-link" onClick={() => { setMenuOpen(false); onLogout(); }}><LogOut size={15} /> Keluar</button>
        </div>
      )}
    </header>
  );
}

/* ================================================================== */
/* AUTH GATE (Login/Register vs Guest User)                            */
/* ================================================================== */


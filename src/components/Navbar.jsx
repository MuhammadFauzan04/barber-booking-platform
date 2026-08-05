/* Site header/navigation (exported as `Header` to match its usage
   throughout the app; the filename follows the project's component-folder
   convention). */

import React, { useState, useEffect, useRef } from "react";
import { Bell, ChevronDown, Gift, History, LogOut, MapPin, Menu, Scissors, User, UserCircle, X } from "lucide-react";
import { PromoBar } from "./PromoBar";
import { NotificationPanel } from "./NotificationCenter";
import { BRANCHES, GOLD_TIER_TARGET, NAV_ITEMS, NOTIFICATIONS } from "../data/barbershop";

const NOTIF_TARGET_TIME = Date.now() + (1 * 3600 + 43 * 60 + 15) * 1000;

export function Header({ stage, go, branch, setBranch, points, menuOpen, setMenuOpen, userName, onLogout }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [branchOpen, setBranchOpen] = useState(false);
  const [notifItems, setNotifItems] = useState(NOTIFICATIONS);
  const [notifTab, setNotifTab] = useState("semua");
  const profileRef = useRef(null);
  const branchRef = useRef(null);
  const unreadCount = notifItems.filter((n) => n.unread).length;

  const activeBranch = BRANCHES.find((b) => b.id === branch) || BRANCHES[0];
  const tier = points >= GOLD_TIER_TARGET ? "Gold" : "Silver";
  const initials = (userName || "Tamu").trim().split(/\s+/).map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  useEffect(() => {
    const onDocClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
      if (branchRef.current && !branchRef.current.contains(e.target)) setBranchOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <header className="kc-header">
      <PromoBar />
      <div className="kc-header-row">
          <button className="kc-logo" onClick={() => go("home")}>
            <img  src="/logo.png" alt="Logo"className="kc-logo-image"/>
            <div className="kc-logo-text"> <span className="kc-logo-main">CARTENZ</span> </div>
          </button>

        <nav className="kc-nav-desktop">
          {NAV_ITEMS.map((it) => {
            const Icon = it.icon;
            const isActive = stage === it.id || (stage === "capsterDetail" && it.id === "capsters");
            return (
              <button
                key={it.id}
                className={"kc-nav-link" + (isActive ? " active" : "")}
                onClick={() => go(it.id)}
              >
                {Icon && <Icon size={16} />}
                {it.label}
              </button>
            );
          })}
        </nav>

        <div className="kc-header-right">
          <div className="kc-branch-menu" ref={branchRef}>
            <button className="kc-branch-chip" onClick={() => setBranchOpen((v) => !v)}>
              <span className="kc-branch-chip-icon"><MapPin size={16} /></span>
              <span className="kc-branch-chip-text">
                <span className="kc-branch-chip-name">{activeBranch.name}</span>
                <span className="kc-branch-chip-city">{activeBranch.city}</span>
              </span>
              <ChevronDown size={14} className={"kc-user-chip-caret" + (branchOpen ? " open" : "")} />
            </button>
            {branchOpen && (
              <div className="kc-branch-dropdown">
                {BRANCHES.map((b) => (
                  <button
                    key={b.id}
                    className={"kc-branch-option" + (b.id === branch ? " active" : "")}
                    onClick={() => { setBranch(b.id); setBranchOpen(false); }}
                  >
                    <span className="kc-branch-option-name">{b.name}</span>
                    <span className="kc-branch-option-city">{b.city}</span>
                    {b.isNew && <span className="kc-branch-option-new">Baru</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="kc-points-chip" onClick={() => go("points")}>
            <span className="kc-points-chip-icon"><Gift size={16} /></span>
            <span className="kc-points-chip-text">
              <span className="kc-points-chip-num">{points} pts</span>
              <span className="kc-points-chip-tier">{tier} Member</span>
            </span>
          </button>

          <div className="kc-user-menu" ref={profileRef}>
            <button className="kc-user-chip" onClick={() => setProfileOpen((v) => !v)}>
              <span className="kc-user-chip-avatar">
                {initials || <User size={14} />}
                {unreadCount > 0 && <span className="kc-user-chip-dot" />}
              </span>
              <span className="kc-user-chip-text">
                <span className="kc-user-chip-name">{userName || "Tamu"}</span>
                <span className="kc-user-chip-tier">{tier} Member</span>
              </span>
              <ChevronDown size={14} className={"kc-user-chip-caret" + (profileOpen ? " open" : "")} />
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
          <div className="kc-branch-chip kc-branch-chip-mobile">
            <span className="kc-branch-chip-icon"><MapPin size={16} /></span>
            <span className="kc-branch-chip-text">
              <span className="kc-branch-chip-name">{activeBranch.name}</span>
              <span className="kc-branch-chip-city">{activeBranch.city}</span>
            </span>
          </div>
          {NAV_ITEMS.map((it) => {
            const Icon = it.icon;
            return (
              <button key={it.id} className={"kc-nav-link" + (stage === it.id ? " active" : "")}
                onClick={() => { go(it.id); setMenuOpen(false); }}>
                {Icon && <Icon size={15} />} {it.label}
              </button>
            );
          })}
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


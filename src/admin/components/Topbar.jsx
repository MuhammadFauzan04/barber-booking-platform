import React, { useEffect, useRef, useState } from "react";
import { Bell, Check, ChevronDown, Menu, Search, UserCog } from "lucide-react";
import { SWITCHABLE_USERS } from "../adminData";

const PAGE_TITLES = {
  "dashboard": "Dashboard",
  "master-data": "Master Data",
  "monitoring-booking": "Monitoring / Booking",
  "monitoring-capster": "Monitoring / Capster",
  "monitoring-customer": "Monitoring / Customer",
  "monitoring-cabang": "Monitoring / Cabang",
  "kelola-cabang": "Kelola Data / Cabang",
  "kelola-layanan": "Kelola Data / Layanan",
  "kelola-capster": "Kelola Data / Capster",
  "kelola-jadwal": "Kelola Data / Jadwal",
  "kelola-promo": "Kelola Data / Promo",
  "kelola-voucher": "Kelola Data / Voucher",
  "kelola-membership": "Kelola Data / Membership",
  "kelola-inspirasi": "Kelola Data / Inspirasi Rambut",
  "kelola-banner": "Kelola Data / Banner",
  "laporan-pendapatan": "Laporan & Analitik / Pendapatan",
  "laporan-booking": "Laporan & Analitik / Booking",
  "laporan-customer": "Laporan & Analitik / Customer",
  "laporan-loyalitas": "Laporan & Analitik / Loyalitas",
  "laporan-rating": "Laporan & Analitik / Rating Capster",
  "laporan-export": "Laporan & Analitik / Export PDF/Excel",
  "pengaturan-role": "Pengaturan Sistem / Role User",
  "pengaturan-notifikasi": "Pengaturan Sistem / Notifikasi",
  "pengaturan-jam": "Pengaturan Sistem / Jam Operasional",
  "pengaturan-payment": "Pengaturan Sistem / Payment",
  "pengaturan-backup": "Pengaturan Sistem / Backup Database",
};

export function Topbar({ page, user, onMenuClick, onSwitchUser }) {
  const title = PAGE_TITLES[page] || "Dashboard";
  const initials = (user.name || "Admin").split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const switcherRef = useRef(null);

  useEffect(() => {
    const onDocClick = (e) => {
      if (switcherRef.current && !switcherRef.current.contains(e.target)) setSwitcherOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <header className="adm-topbar">
      <button className="adm-topbar-menu" onClick={onMenuClick} aria-label="Buka menu">
        <Menu size={20} />
      </button>
      <h1 className="adm-topbar-title">{title}</h1>
      <div className="adm-topbar-right">
        <div className="adm-topbar-search">
          <Search size={14} />
          <input placeholder="Cari di admin panel..." />
        </div>
        <button className="adm-topbar-bell" aria-label="Notifikasi">
          <Bell size={17} />
          <span className="adm-topbar-bell-dot" />
        </button>
        <div className="adm-user-switcher" ref={switcherRef}>
          <button className="adm-topbar-user" onClick={() => setSwitcherOpen((v) => !v)}>
            <span className="adm-topbar-avatar">{initials}</span>
            <span className="adm-topbar-user-text">
              <span className="adm-topbar-user-name">{user.name}</span>
              <span className="adm-topbar-user-role">{user.role} &middot; {user.branch}</span>
            </span>
            <ChevronDown size={14} className={"adm-user-switcher-caret" + (switcherOpen ? " open" : "")} />
          </button>
          {switcherOpen && (
            <div className="adm-user-switcher-dropdown">
              <div className="adm-user-switcher-hint">
                <UserCog size={13} /> Demo: coba ganti peran login
              </div>
              {SWITCHABLE_USERS.map((u) => (
                <button
                  key={u.id}
                  className={"adm-user-switcher-option" + (u.email === user.email ? " active" : "")}
                  onClick={() => { onSwitchUser(u); setSwitcherOpen(false); }}
                >
                  <span className="adm-user-switcher-option-text">
                    <span className="adm-user-switcher-option-name">{u.name}</span>
                    <span className="adm-user-switcher-option-role">{u.role} &middot; {u.branch}</span>
                  </span>
                  {u.email === user.email && <Check size={14} />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

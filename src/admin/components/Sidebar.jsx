/* Left sidebar for the admin panel. Structure mirrors the "Flow Admin"
   diagram exactly: Dashboard, Master Data, Monitoring (with sub-items),
   Kelola Data (with sub-items), Laporan & Analitik (with sub-items),
   Pengaturan Sistem (with sub-items, ending in Logout). */

import React, { useState } from "react";
import {
  BarChart3, Building2, ChevronDown, ChevronRight,
  LayoutDashboard, LayoutGrid, LogOut, ShieldCheck, TrendingUp,
} from "lucide-react";

const NAV_TREE = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "master-data", label: "Master Data", icon: LayoutGrid },
  {
    id: "monitoring", label: "Monitoring", icon: BarChart3,
    children: [
      { id: "monitoring-booking", label: "Booking" },
      { id: "monitoring-capster", label: "Capster" },
      { id: "monitoring-customer", label: "Customer" },
      { id: "monitoring-cabang", label: "Cabang" },
    ],
  },
  {
    id: "kelola", label: "Kelola Data", icon: Building2,
    children: [
      { id: "kelola-cabang", label: "Cabang" },
      { id: "kelola-layanan", label: "Layanan" },
      { id: "kelola-capster", label: "Capster" },
      { id: "kelola-jadwal", label: "Jadwal" },
      { id: "kelola-promo", label: "Promo" },
      { id: "kelola-voucher", label: "Voucher" },
      { id: "kelola-membership", label: "Membership" },
      { id: "kelola-inspirasi", label: "Inspirasi Rambut" },
      { id: "kelola-banner", label: "Banner" },
    ],
  },
  {
    id: "laporan", label: "Laporan & Analitik", icon: TrendingUp,
    children: [
      { id: "laporan-pendapatan", label: "Pendapatan" },
      { id: "laporan-booking", label: "Booking" },
      { id: "laporan-customer", label: "Customer" },
      { id: "laporan-loyalitas", label: "Loyalitas" },
      { id: "laporan-rating", label: "Rating Capster" },
      { id: "laporan-export", label: "Export PDF/Excel" },
    ],
  },
  {
    id: "pengaturan", label: "Pengaturan Sistem", icon: ShieldCheck,
    children: [
      { id: "pengaturan-role", label: "Role User" },
      { id: "pengaturan-notifikasi", label: "Notifikasi" },
      { id: "pengaturan-jam", label: "Jam Operasional" },
      { id: "pengaturan-payment", label: "Payment" },
      { id: "pengaturan-backup", label: "Backup Database" },
      { id: "logout", label: "Logout", isLogout: true },
    ],
  },
];

export function Sidebar({ page, go, onLogout, mobileOpen, setMobileOpen }) {
  const activeParent = NAV_TREE.find(
    (item) => item.id === page || item.children?.some((c) => c.id === page)
  )?.id;
  const [openGroup, setOpenGroup] = useState(activeParent || "dashboard");

  const handleParentClick = (item) => {
    if (item.children) {
      setOpenGroup((g) => (g === item.id ? null : item.id));
    } else {
      go(item.id);
      setMobileOpen(false);
    }
  };

  const handleChildClick = (child) => {
    if (child.isLogout) { onLogout(); return; }
    go(child.id);
    setMobileOpen(false);
  };

  return (
    <>
      {mobileOpen && <div className="adm-sidebar-scrim" onClick={() => setMobileOpen(false)} />}
      <aside className={"adm-sidebar" + (mobileOpen ? " open" : "")}>
        <div className="adm-sidebar-brand">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="adm-sidebar-logo">
            <path d="M33 7C33 7 19 5 13 13C7 21 13 27 19 25C25 23 21 15 15 17C9 19 9 27 15 31C21 35 29 33 31 27"
              stroke="#EAF4EC" strokeWidth="3.4" strokeLinecap="round" fill="none" />
          </svg>
          <div className="adm-sidebar-brand-text">
            <div className="adm-sidebar-brand-main">CARTENZ</div>
            <div className="adm-sidebar-brand-sub">Admin Panel</div>
          </div>
        </div>

        <nav className="adm-sidebar-nav">
          {NAV_TREE.map((item) => {
            const Icon = item.icon;
            const isOpen = openGroup === item.id;
            const isActiveParent = item.id === page;
            return (
              <div key={item.id} className="adm-sidebar-group">
                <button
                  className={"adm-sidebar-link" + (isActiveParent ? " active" : "")}
                  onClick={() => handleParentClick(item)}
                >
                  <Icon size={17} />
                  <span>{item.label}</span>
                  {item.children && (
                    isOpen ? <ChevronDown size={14} className="adm-sidebar-caret" /> : <ChevronRight size={14} className="adm-sidebar-caret" />
                  )}
                </button>
                {item.children && isOpen && (
                  <div className="adm-sidebar-children">
                    {item.children.map((child) => (
                      <button
                        key={child.id}
                        className={"adm-sidebar-sublink" + (page === child.id ? " active" : "") + (child.isLogout ? " logout" : "")}
                        onClick={() => handleChildClick(child)}
                      >
                        {child.isLogout && <LogOut size={14} />}
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

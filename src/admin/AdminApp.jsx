/* Admin panel entry point. Owns simple auth + page-routing state (no
   react-router — consistent with the rest of this project) and renders
   the sidebar/topbar shell around whichever admin page is active. */

import "./admin.css";
import React, { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Topbar } from "./components/Topbar";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { MasterData } from "./pages/MasterData";
import { Monitoring } from "./pages/Monitoring";
import { KelolaData } from "./pages/KelolaData";
import { Laporan } from "./pages/Laporan";
import { Pengaturan } from "./pages/Pengaturan";
import { ADMIN_USER } from "./adminData";

export default function AdminApp() {
  const [authed, setAuthed] = useState(false);
  const [page, setPage] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  const go = (next) => {
    setPage(next);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogout = () => {
    setAuthed(false);
    setPage("dashboard");
  };

  if (!authed) {
    return (
      <div className="adm-root">
        <Login onLogin={() => setAuthed(true)} />
      </div>
    );
  }

  return (
    <div className="adm-root">
      <div className="adm-shell">
        <Sidebar page={page} go={go} onLogout={handleLogout} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <div className="adm-main">
          <Topbar page={page} user={ADMIN_USER} onMenuClick={() => setMobileOpen(true)} />
          <div className="adm-content">
            {page === "dashboard" && <Dashboard go={go} />}
            {page === "master-data" && <MasterData go={go} />}
            {page.startsWith("monitoring-") && <Monitoring page={page} />}
            {page.startsWith("kelola-") && <KelolaData page={page} />}
            {page.startsWith("laporan-") && <Laporan page={page} />}
            {page.startsWith("pengaturan-") && <Pengaturan page={page} />}
          </div>
        </div>
      </div>
    </div>
  );
}

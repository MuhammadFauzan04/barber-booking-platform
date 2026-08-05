import React from "react";
import { ArrowUpRight, Building2, Scissors, Users, UserSquare } from "lucide-react";
import { ADMIN_CABANG, ADMIN_LAYANAN, ADMIN_CAPSTER, MONITORING_CUSTOMERS } from "../adminData";
import { isSuperScope, scopeByBranch } from "../scope";

export function MasterData({ go, user }) {
  const superScope = isSuperScope(user);
  const cabang = scopeByBranch(ADMIN_CABANG, user, ["name"]);
  const capster = scopeByBranch(ADMIN_CAPSTER, user, ["branchName"]);
  const customer = scopeByBranch(MONITORING_CUSTOMERS, user, ["branch"]);

  const CARDS = [
    { id: "kelola-cabang", icon: Building2, label: "Cabang", value: cabang.length, desc: superScope ? "Total cabang terdaftar" : "Cabang yang kamu kelola" },
    { id: "kelola-layanan", icon: Scissors, label: "Layanan", value: ADMIN_LAYANAN.length, desc: "Total layanan aktif (berlaku semua cabang)" },
    { id: "kelola-capster", icon: UserSquare, label: "Capster", value: capster.length, desc: superScope ? "Total capster terdaftar" : "Capster di cabangmu" },
    { id: "monitoring-customer", icon: Users, label: "Customer", value: customer.length, desc: superScope ? "Total customer terdaftar" : "Customer di cabangmu" },
  ];

  return (
    <div className="adm-page">
      {!superScope && (
        <div className="adm-locked-note">Menampilkan ringkasan khusus cabang <b>{user.branch}</b>.</div>
      )}
      <p className="adm-page-intro">
        Ringkasan data inti yang dipakai di seluruh sistem — cabang, layanan, capster, dan customer.
        Klik salah satu kartu untuk mengelola datanya secara detail.
      </p>
      <div className="adm-master-grid">
        {CARDS.map((c) => {
          const Icon = c.icon;
          return (
            <button key={c.id} className="adm-master-card" onClick={() => go(c.id)}>
              <span className="adm-master-icon"><Icon size={20} /></span>
              <span className="adm-master-value">{c.value}</span>
              <span className="adm-master-label">{c.label}</span>
              <span className="adm-master-desc">{c.desc}</span>
              <span className="adm-master-link">Kelola data <ArrowUpRight size={13} /></span>
            </button>
          );
        })}
      </div>

      <div className="adm-card">
        <div className="adm-card-head">
          <div>
            <h3 className="adm-card-title">{superScope ? "Cabang Terdaftar" : "Cabang yang Kamu Kelola"}</h3>
            <div className="adm-card-count">{cabang.length} cabang {superScope ? "aktif di seluruh Indonesia" : ""}</div>
          </div>
        </div>
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead><tr><th>Cabang</th><th>Kota</th><th>Alamat</th><th>Jumlah Capster</th></tr></thead>
            <tbody>
              {cabang.map((b) => (
                <tr key={b.id}>
                  <td>{b.name}</td>
                  <td>{b.city}</td>
                  <td>{b.address}</td>
                  <td>{b.capsterCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

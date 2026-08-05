import React from "react";
import { ArrowUpRight, Building2, Scissors, Users, UserSquare } from "lucide-react";
import { ADMIN_CABANG, ADMIN_LAYANAN, ADMIN_CAPSTER, MONITORING_CUSTOMERS } from "../adminData";

const CARDS = [
  { id: "kelola-cabang", icon: Building2, label: "Cabang", get: () => ADMIN_CABANG.length, desc: "Total cabang terdaftar" },
  { id: "kelola-layanan", icon: Scissors, label: "Layanan", get: () => ADMIN_LAYANAN.length, desc: "Total layanan aktif" },
  { id: "kelola-capster", icon: UserSquare, label: "Capster", get: () => ADMIN_CAPSTER.length, desc: "Total capster terdaftar" },
  { id: "monitoring-customer", icon: Users, label: "Customer", get: () => MONITORING_CUSTOMERS.length, desc: "Total customer terdaftar" },
];

export function MasterData({ go }) {
  return (
    <div className="adm-page">
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
              <span className="adm-master-value">{c.get()}</span>
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
            <h3 className="adm-card-title">Cabang Terdaftar</h3>
            <div className="adm-card-count">{ADMIN_CABANG.length} cabang aktif di seluruh Indonesia</div>
          </div>
        </div>
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead><tr><th>Cabang</th><th>Kota</th><th>Alamat</th><th>Jumlah Capster</th></tr></thead>
            <tbody>
              {ADMIN_CABANG.map((b) => (
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

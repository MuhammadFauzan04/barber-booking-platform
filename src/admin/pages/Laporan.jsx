import React, { useState } from "react";
import { CheckCircle2, Download, FileSpreadsheet, FileText, Star } from "lucide-react";
import { DataTable, StatCard, Badge } from "../components/ui";
import {
  LAPORAN_PENDAPATAN, LAPORAN_BOOKING, LAPORAN_CUSTOMER,
  LAPORAN_LOYALITAS, LAPORAN_RATING, rupiah,
} from "../adminData";
import { isSuperScope, scopeByBranch } from "../scope";

function PendapatanReport({ user }) {
  const data = scopeByBranch(LAPORAN_PENDAPATAN, user, ["cabang"]);
  const totalBulanIni = data.reduce((s, r) => s + r.bulanIni, 0);
  const totalBulanLalu = data.reduce((s, r) => s + r.bulanLalu, 0);
  const growth = (((totalBulanIni - totalBulanLalu) / totalBulanLalu) * 100).toFixed(1);
  const columns = [
    { key: "cabang", label: "Cabang" },
    { key: "bulanIni", label: "Bulan Ini", render: (r) => rupiah(r.bulanIni) },
    { key: "bulanLalu", label: "Bulan Lalu", render: (r) => rupiah(r.bulanLalu) },
    {
      key: "growth", label: "Pertumbuhan",
      render: (r) => {
        const g = (((r.bulanIni - r.bulanLalu) / r.bulanLalu) * 100).toFixed(1);
        return <span className={g >= 0 ? "adm-trend-up" : "adm-trend-down"}>{g >= 0 ? "+" : ""}{g}%</span>;
      },
    },
  ];
  const top = [...data].sort((a, b) => b.bulanIni - a.bulanIni)[0];
  return (
    <>
      {!isSuperScope(user) && <div className="adm-locked-note">Laporan khusus cabang <b>{user.branch}</b>.</div>}
      <div className="adm-stat-grid">
        <StatCard label="Total Pendapatan Bulan Ini" value={rupiah(totalBulanIni)} trend={`${growth >= 0 ? "+" : ""}${growth}% dari bulan lalu`} tone={growth >= 0 ? "up" : "down"} />
        <StatCard label="Total Pendapatan Bulan Lalu" value={rupiah(totalBulanLalu)} />
        {isSuperScope(user) && <StatCard label="Cabang Terlaris" value={top.cabang} trend={rupiah(top.bulanIni)} tone="up" />}
      </div>
      <DataTable title="Pendapatan per Cabang" columns={columns} data={data} searchKeys={["cabang"]} />
    </>
  );
}

function BookingReport() {
  const total = LAPORAN_BOOKING.reduce((s, r) => s + r.jumlah, 0);
  return (
    <>
      <div className="adm-stat-grid">
        <StatCard label="Total Booking Bulan Ini" value={total} />
        {LAPORAN_BOOKING.map((r) => (
          <StatCard key={r.id} label={r.status} value={r.jumlah} trend={`${r.pct}% dari total`} />
        ))}
      </div>
      <div className="adm-card">
        <div className="adm-card-head"><h3 className="adm-card-title">Distribusi Status Booking</h3></div>
        <div className="adm-branch-load">
          {LAPORAN_BOOKING.map((r) => (
            <div key={r.id} className="adm-branch-load-row">
              <div className="adm-branch-load-top"><span>{r.status}</span><span>{r.jumlah} ({r.pct}%)</span></div>
              <div className="adm-progress-track"><div className="adm-progress-fill" style={{ width: `${r.pct}%` }} /></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function CustomerReport() {
  const c = LAPORAN_CUSTOMER;
  return (
    <div className="adm-stat-grid">
      <StatCard label="Total Customer" value={c.totalCustomer.toLocaleString("id-ID")} />
      <StatCard label="Customer Baru Bulan Ini" value={c.customerBaruBulanIni} trend="Terus bertumbuh" tone="up" />
      <StatCard label="Tingkat Kembali (Retensi)" value={c.customerKembali} />
      <StatCard label="Rata-rata Transaksi" value={rupiah(c.rataRataTransaksi)} />
    </div>
  );
}

function LoyalitasReport() {
  return (
    <div className="adm-stat-grid">
      {LAPORAN_LOYALITAS.map((r) => <StatCard key={r.id} label={r.label} value={r.value} />)}
    </div>
  );
}

function RatingReport({ user }) {
  const data = scopeByBranch(LAPORAN_RATING, user, ["cabang"]);
  const columns = [
    { key: "capster", label: "Capster" },
    { key: "cabang", label: "Cabang" },
    { key: "rating", label: "Rating", render: (r) => <span className="adm-inline-icon"><Star size={13} fill="#C79A3E" stroke="#C79A3E" /> {r.rating.toFixed(1)}</span> },
    { key: "reviews", label: "Jumlah Ulasan" },
  ];
  return <DataTable title="Peringkat Rating Capster" columns={columns} data={data} searchKeys={["capster", "cabang"]} />;
}

function ExportReport() {
  const [exported, setExported] = useState(null);
  const handle = (type) => {
    setExported(type);
    setTimeout(() => setExported(null), 2500);
  };
  return (
    <div className="adm-card">
      <div className="adm-card-head">
        <div>
          <h3 className="adm-card-title">Export Laporan</h3>
          <div className="adm-card-count">Unduh laporan pendapatan, booking, dan customer dalam format PDF atau Excel</div>
        </div>
      </div>
      <div className="adm-export-grid">
        <button className="adm-export-card" onClick={() => handle("pdf")}>
          <FileText size={22} />
          <span>Export ke PDF</span>
          <span className="adm-export-sub">Ringkasan siap cetak</span>
        </button>
        <button className="adm-export-card" onClick={() => handle("excel")}>
          <FileSpreadsheet size={22} />
          <span>Export ke Excel</span>
          <span className="adm-export-sub">Data mentah untuk analisis lanjutan</span>
        </button>
      </div>
      {exported && (
        <div className="adm-export-toast">
          <CheckCircle2 size={15} /> File {exported === "pdf" ? "PDF" : "Excel"} sedang disiapkan dan akan diunduh otomatis.
        </div>
      )}
    </div>
  );
}

export function Laporan({ page, user }) {
  return (
    <div className="adm-page">
      {page === "laporan-pendapatan" && <PendapatanReport user={user} />}
      {page === "laporan-booking" && <BookingReport />}
      {page === "laporan-customer" && <CustomerReport />}
      {page === "laporan-loyalitas" && <LoyalitasReport />}
      {page === "laporan-rating" && <RatingReport user={user} />}
      {page === "laporan-export" && <ExportReport />}
    </div>
  );
}

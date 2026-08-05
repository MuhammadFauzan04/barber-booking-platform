import React, { useState } from "react";
import { Star } from "lucide-react";
import { DataTable, Badge } from "../components/ui";
import { MONITORING_BOOKINGS, MONITORING_CAPSTERS, MONITORING_CUSTOMERS, MONITORING_CABANG, rupiah } from "../adminData";

const STATUS_OPTIONS = ["Menunggu", "Diproses", "Selesai", "Dibatalkan"];

function BookingMonitor() {
  const [rows, setRows] = useState(MONITORING_BOOKINGS);

  const updateStatus = (id, status) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  const columns = [
    { key: "id", label: "ID Booking" },
    { key: "customer", label: "Customer" },
    { key: "service", label: "Layanan" },
    { key: "capster", label: "Capster" },
    { key: "branch", label: "Cabang" },
    { key: "date", label: "Jadwal", render: (r) => `${r.date}, ${r.time}` },
    { key: "price", label: "Harga", render: (r) => rupiah(r.price) },
    {
      key: "status", label: "Status",
      render: (r) => (
        <select className="adm-status-select" value={r.status} onChange={(e) => updateStatus(r.id, e.target.value)}>
          {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      ),
    },
  ];

  return (
    <DataTable
      title="Semua Booking"
      columns={columns}
      data={rows}
      searchKeys={["id", "customer", "service", "capster", "branch", "status"]}
    />
  );
}

function CapsterMonitor() {
  const columns = [
    { key: "name", label: "Nama Capster" },
    { key: "branchName", label: "Cabang" },
    { key: "rating", label: "Rating", render: (r) => <span className="adm-inline-icon"><Star size={13} fill="#C79A3E" stroke="#C79A3E" /> {r.rating}</span> },
    { key: "reviews", label: "Ulasan" },
    { key: "bookingHariIni", label: "Booking Hari Ini" },
    { key: "status", label: "Status", render: (r) => <Badge>{r.status}</Badge> },
  ];
  return <DataTable title="Semua Capster" columns={columns} data={MONITORING_CAPSTERS} searchKeys={["name", "branchName", "status"]} />;
}

function CustomerMonitor() {
  const columns = [
    { key: "name", label: "Nama" },
    { key: "phone", label: "No. HP" },
    { key: "email", label: "Email" },
    { key: "tier", label: "Tier", render: (r) => <Badge>{r.tier}</Badge> },
    { key: "totalBooking", label: "Total Booking" },
    { key: "totalSpend", label: "Total Belanja", render: (r) => rupiah(r.totalSpend) },
    { key: "joined", label: "Bergabung" },
  ];
  return <DataTable title="Semua Customer" columns={columns} data={MONITORING_CUSTOMERS} searchKeys={["name", "phone", "email", "tier"]} />;
}

function CabangMonitor() {
  const columns = [
    { key: "name", label: "Nama Cabang" },
    { key: "city", label: "Kota" },
    { key: "address", label: "Alamat" },
    { key: "phone", label: "Telepon" },
    { key: "capsterCount", label: "Jml Capster" },
    { key: "status", label: "Status", render: (r) => <Badge>{r.status}</Badge> },
  ];
  return <DataTable title="Semua Cabang" columns={columns} data={MONITORING_CABANG} searchKeys={["name", "city"]} />;
}

export function Monitoring({ page }) {
  return (
    <div className="adm-page">
      {page === "monitoring-booking" && <BookingMonitor />}
      {page === "monitoring-capster" && <CapsterMonitor />}
      {page === "monitoring-customer" && <CustomerMonitor />}
      {page === "monitoring-cabang" && <CabangMonitor />}
    </div>
  );
}

import React, { useState } from "react";
import { DataTable, Badge, Modal, FormField } from "../components/ui";
import {
  ADMIN_CABANG, ADMIN_LAYANAN, ADMIN_CAPSTER, ADMIN_JADWAL, ADMIN_PROMO,
  ADMIN_VOUCHER, ADMIN_MEMBERSHIP, ADMIN_INSPIRASI, ADMIN_BANNER, rupiah,
} from "../adminData";
import { isSuperScope, scopeByBranch } from "../scope";

/* Generic CRUD section: local state + DataTable + a small "add" modal
   whose fields are described declaratively per entity. */
function CrudSection({ title, addLabel, initialData, columns, fields, buildRow, searchKeys, canAdd = true, lockedNote }) {
  const [rows, setRows] = useState(initialData);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({});

  const handleAdd = () => {
    const newRow = buildRow(form, rows.length);
    setRows((r) => [newRow, ...r]);
    setForm({});
    setOpen(false);
  };

  const handleDelete = (row) => setRows((r) => r.filter((x) => x.id !== row.id));

  return (
    <>
      {lockedNote && <div className="adm-locked-note">{lockedNote}</div>}
      <DataTable
        title={title}
        addLabel={addLabel}
        columns={columns}
        data={rows}
        searchKeys={searchKeys}
        onAdd={canAdd ? () => setOpen(true) : undefined}
        onDelete={canAdd ? handleDelete : undefined}
      />
      {open && (
        <Modal title={addLabel} onClose={() => setOpen(false)}>
          <div className="adm-form-grid">
            {fields.map((f) => (
              <FormField
                key={f.key}
                label={f.label}
                placeholder={f.placeholder}
                type={f.type || "text"}
                value={form[f.key] || ""}
                onChange={(e) => setForm((s) => ({ ...s, [f.key]: e.target.value }))}
              />
            ))}
          </div>
          <div className="adm-modal-footer">
            <button className="adm-btn ghost" onClick={() => setOpen(false)}>Batal</button>
            <button className="adm-btn primary" onClick={handleAdd}>Simpan</button>
          </div>
        </Modal>
      )}
    </>
  );
}

const uid = (prefix) => `${prefix}-${Date.now().toString(36)}`;

export function KelolaData({ page, user }) {
  const superScope = isSuperScope(user);
  return (
    <div className="adm-page">
      {page === "kelola-cabang" && (
        <CrudSection
          title="Kelola Cabang"
          addLabel="Tambah Cabang"
          initialData={scopeByBranch(ADMIN_CABANG, user, ["name"])}
          searchKeys={["name", "city", "address"]}
          canAdd={superScope}
          lockedNote={!superScope ? `Kamu login sebagai Admin Cabang ${user.branch} — hanya bisa melihat & mengubah data cabang sendiri. Tambah/hapus cabang baru khusus Super Admin.` : null}
          columns={[
            { key: "name", label: "Nama Cabang" },
            { key: "city", label: "Kota" },
            { key: "address", label: "Alamat" },
            { key: "phone", label: "Telepon" },
            { key: "jamOperasional", label: "Jam Operasional" },
            { key: "status", label: "Status", render: (r) => <Badge>{r.status}</Badge> },
          ]}
          fields={[
            { key: "name", label: "Nama Cabang", placeholder: "Cth: Alam Sutera" },
            { key: "city", label: "Kota", placeholder: "Cth: Tangerang" },
            { key: "address", label: "Alamat", placeholder: "Jl. ..." },
            { key: "phone", label: "Telepon", placeholder: "021-xxxxxxx" },
          ]}
          buildRow={(f) => ({ id: uid("cb"), name: f.name || "Cabang Baru", city: f.city || "-", address: f.address || "-", phone: f.phone || "-", jamOperasional: "09:00 - 21:00", capsterCount: 0, status: "Aktif" })}
        />
      )}

      {page === "kelola-layanan" && (
        <CrudSection
          title="Kelola Layanan"
          addLabel="Tambah Layanan"
          initialData={ADMIN_LAYANAN}
          searchKeys={["name", "category"]}
          columns={[
            { key: "name", label: "Nama Layanan" },
            { key: "category", label: "Kategori" },
            { key: "price", label: "Harga", render: (r) => rupiah(r.price) },
            { key: "duration", label: "Durasi" },
            { key: "status", label: "Status", render: (r) => <Badge>{r.status}</Badge> },
          ]}
          fields={[
            { key: "name", label: "Nama Layanan", placeholder: "Cth: Hair Spa Premium" },
            { key: "category", label: "Kategori", placeholder: "Potong / Coloring / Treatment / Anak" },
            { key: "price", label: "Harga (Rp)", placeholder: "100000", type: "number" },
            { key: "duration", label: "Durasi", placeholder: "45 menit" },
          ]}
          buildRow={(f) => ({ id: uid("sv"), name: f.name || "Layanan Baru", category: f.category || "Potong", price: Number(f.price) || 0, duration: f.duration || "30 menit", status: "Aktif" })}
        />
      )}

      {page === "kelola-capster" && (
        <CrudSection
          title="Kelola Capster"
          addLabel="Tambah Capster"
          initialData={scopeByBranch(ADMIN_CAPSTER, user, ["branchName"])}
          searchKeys={["name", "branchName"]}
          columns={[
            { key: "name", label: "Nama" },
            { key: "branchName", label: "Cabang" },
            { key: "years", label: "Pengalaman", render: (r) => `${r.years} tahun` },
            { key: "rating", label: "Rating" },
            { key: "status", label: "Status", render: (r) => <Badge>{r.status}</Badge> },
          ]}
          fields={[
            { key: "name", label: "Nama Capster", placeholder: "Cth: Rama Aditya" },
            { key: "branchName", label: "Cabang", placeholder: "Cth: Kemang" },
            { key: "years", label: "Pengalaman (tahun)", placeholder: "2", type: "number" },
          ]}
          buildRow={(f) => ({ id: uid("cp"), name: f.name || "Capster Baru", branchName: f.branchName || "-", years: Number(f.years) || 0, rating: 0, reviews: 0, status: "Aktif" })}
        />
      )}

      {page === "kelola-jadwal" && (
        <CrudSection
          title="Kelola Jadwal Capster"
          addLabel="Tambah Jadwal"
          initialData={scopeByBranch(ADMIN_JADWAL, user, ["branch"])}
          searchKeys={["capster", "branch"]}
          columns={[
            { key: "capster", label: "Capster" },
            { key: "branch", label: "Cabang" },
            { key: "hari", label: "Hari Kerja" },
            { key: "shift", label: "Jam Shift" },
            { key: "status", label: "Status", render: (r) => <Badge>{r.status}</Badge> },
          ]}
          fields={[
            { key: "capster", label: "Nama Capster", placeholder: "Cth: Rama Aditya" },
            { key: "branch", label: "Cabang", placeholder: "Cth: Kemang" },
            { key: "hari", label: "Hari Kerja", placeholder: "Senin - Jumat" },
            { key: "shift", label: "Jam Shift", placeholder: "09:00 - 17:00" },
          ]}
          buildRow={(f) => ({ id: uid("jd"), capster: f.capster || "-", branch: f.branch || "-", hari: f.hari || "-", shift: f.shift || "-", status: "Aktif" })}
        />
      )}

      {page === "kelola-promo" && (
        <CrudSection
          title="Kelola Promo"
          addLabel="Tambah Promo"
          initialData={ADMIN_PROMO}
          searchKeys={["title", "code"]}
          columns={[
            { key: "title", label: "Judul Promo" },
            { key: "code", label: "Kode" },
            { key: "category", label: "Kategori" },
            { key: "expiry", label: "Masa Berlaku" },
            { key: "status", label: "Status", render: (r) => <Badge>{r.status}</Badge> },
          ]}
          fields={[
            { key: "title", label: "Judul Promo", placeholder: "Cth: Diskon Akhir Tahun" },
            { key: "code", label: "Kode Promo", placeholder: "Cth: NEWYEAR25" },
            { key: "category", label: "Kategori", placeholder: "diskon / cashback / member" },
            { key: "expiry", label: "Masa Berlaku", placeholder: "s.d. 31 Des 2026" },
          ]}
          buildRow={(f) => ({ id: uid("pr"), title: f.title || "Promo Baru", code: (f.code || "PROMO").toUpperCase(), category: f.category || "diskon", expiry: f.expiry || "-", status: "Aktif" })}
        />
      )}

      {page === "kelola-voucher" && (
        <CrudSection
          title="Kelola Voucher"
          addLabel="Tambah Voucher"
          initialData={ADMIN_VOUCHER}
          searchKeys={["label"]}
          columns={[
            { key: "label", label: "Nama Voucher" },
            { key: "points", label: "Butuh Poin" },
            { key: "value", label: "Nilai", render: (r) => rupiah(r.value) },
            { key: "stok", label: "Stok" },
            { key: "terpakai", label: "Terpakai" },
          ]}
          fields={[
            { key: "label", label: "Nama Voucher", placeholder: "Cth: Voucher Rp 30.000" },
            { key: "points", label: "Butuh Poin", placeholder: "150", type: "number" },
            { key: "value", label: "Nilai (Rp)", placeholder: "30000", type: "number" },
            { key: "stok", label: "Stok", placeholder: "100", type: "number" },
          ]}
          buildRow={(f) => ({ id: uid("vc"), label: f.label || "Voucher Baru", points: Number(f.points) || 0, type: "flat", value: Number(f.value) || 0, stok: Number(f.stok) || 0, terpakai: 0 })}
        />
      )}

      {page === "kelola-membership" && (
        <CrudSection
          title="Kelola Tier Membership"
          addLabel="Tambah Tier"
          initialData={ADMIN_MEMBERSHIP}
          searchKeys={["tier"]}
          columns={[
            { key: "tier", label: "Tier", render: (r) => <Badge>{r.tier}</Badge> },
            { key: "target", label: "Target Poin" },
            { key: "benefit", label: "Benefit" },
          ]}
          fields={[
            { key: "tier", label: "Nama Tier", placeholder: "Cth: Diamond" },
            { key: "target", label: "Target Poin", placeholder: "2000", type: "number" },
            { key: "benefit", label: "Benefit", placeholder: "Deskripsi benefit tier" },
          ]}
          buildRow={(f) => ({ id: uid("mb"), tier: f.tier || "Tier Baru", target: Number(f.target) || 0, benefit: f.benefit || "-", warna: "#2F7A4C" })}
        />
      )}

      {page === "kelola-inspirasi" && (
        <CrudSection
          title="Kelola Inspirasi Rambut"
          addLabel="Tambah Inspirasi"
          initialData={ADMIN_INSPIRASI}
          searchKeys={["name", "tag", "capster"]}
          columns={[
            { key: "name", label: "Nama Gaya" },
            { key: "tag", label: "Kategori" },
            { key: "capster", label: "Sumber Capster" },
            { key: "status", label: "Status", render: (r) => <Badge>{r.status}</Badge> },
          ]}
          fields={[
            { key: "name", label: "Nama Gaya", placeholder: "Cth: Modern Quiff" },
            { key: "tag", label: "Kategori", placeholder: "Fade / Mullet / Perm / ..." },
            { key: "capster", label: "Sumber Capster", placeholder: "@capster.nama" },
          ]}
          buildRow={(f) => ({ id: uid("is"), name: f.name || "Gaya Baru", tag: f.tag || "Fade", capster: f.capster || "-", status: "Ditampilkan" })}
        />
      )}

      {page === "kelola-banner" && (
        <CrudSection
          title="Kelola Banner Promosi"
          addLabel="Tambah Banner"
          initialData={ADMIN_BANNER}
          searchKeys={["title", "posisi"]}
          columns={[
            { key: "title", label: "Judul Banner" },
            { key: "posisi", label: "Posisi Tampil" },
            { key: "periode", label: "Periode" },
            { key: "status", label: "Status", render: (r) => <Badge>{r.status}</Badge> },
          ]}
          fields={[
            { key: "title", label: "Judul Banner", placeholder: "Cth: Promo Ulang Tahun" },
            { key: "posisi", label: "Posisi Tampil", placeholder: "Beranda - Hero" },
            { key: "periode", label: "Periode Tayang", placeholder: "1 - 30 Sep 2026" },
          ]}
          buildRow={(f) => ({ id: uid("bn"), title: f.title || "Banner Baru", posisi: f.posisi || "-", periode: f.periode || "-", status: "Aktif" })}
        />
      )}
    </div>
  );
}

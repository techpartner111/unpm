import { useEffect, useState } from "react";
import api from "../../../api/axios";

export default function BiayaAdmin() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    prodi: "",
    per_bulan: "",
    per_semester: "",
    bpi: "",
    pkkmb: "",
    daftar_ulang_a: "",
    daftar_ulang_b: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => { getData(); }, []);

  // ================= GET DATA =================
  const getData = async () => {
    const res = await api.get("/biaya-admin");
    setData(res.data);
  };

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/biaya-admin/${editId}`, form);
      } else {
        await api.post("/biaya-admin", form);
      }
      resetForm();
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= EDIT =================
  const handleEdit = (item) => {
    setForm(item);
    setEditId(item.id);
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (confirm("Yakin hapus data?")) {
      await api.delete(`/biaya-admin/${id}`);
      getData();
    }
  };

  // ================= RESET =================
  const resetForm = () => {
    setForm({ prodi: "", per_bulan: "", per_semester: "", bpi: "", pkkmb: "", daftar_ulang_a: "", daftar_ulang_b: "" });
    setEditId(null);
  };

  const inputClass =
    "border border-blue-200 bg-white text-blue-900 px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition placeholder-blue-300 w-full";

  const labelClass =
    "block text-xs font-semibold text-blue-400 uppercase tracking-widest mb-1.5";

  const fields = [
    { name: "prodi",          label: "Program Studi",       placeholder: "contoh: Teknik Informatika" },
    { name: "per_bulan",      label: "Biaya Per Bulan",     placeholder: "contoh: 500000" },
    { name: "per_semester",   label: "Biaya Per Semester",  placeholder: "contoh: 3000000" },
    { name: "bpi",            label: "BPI",                 placeholder: "contoh: 1500000" },
    { name: "pkkmb",          label: "PKKMB",               placeholder: "contoh: 250000" },
    { name: "daftar_ulang_a", label: "Daftar Ulang Tipe A", placeholder: "contoh: 1000000" },
    { name: "daftar_ulang_b", label: "Daftar Ulang Tipe B", placeholder: "contoh: 750000" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6">

      {/* ── Header ── */}
      <div className="flex items-end gap-3 mb-8 pb-5 border-b border-blue-100">
        <div className="w-1 h-10 rounded-full bg-gradient-to-b from-yellow-400 to-blue-700 flex-shrink-0" />
        <div>
          <p className="text-xs font-medium tracking-widest text-blue-400 uppercase mb-0.5">Manajemen Keuangan</p>
          <h1 className="text-2xl font-bold text-blue-900 leading-none tracking-tight">Admin Biaya Kuliah</h1>
        </div>
      </div>

      {/* ── Form Card ── */}
      <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6 mb-8">
        <div className="flex items-center gap-2 mb-6">
          <span className="w-2 h-2 rounded-full bg-yellow-400" />
          <h2 className="text-sm font-semibold text-blue-900 tracking-wide uppercase">
            {editId ? "Edit Data Biaya" : "Tambah Data Biaya"}
          </h2>
          {editId && (
            <span className="ml-auto bg-yellow-100 text-yellow-700 border border-yellow-300 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              Mode Edit
            </span>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {fields.map(({ name, label, placeholder }) => (
              <div key={name} className={name === "prodi" ? "md:col-span-2" : ""}>
                <label className={labelClass}>{label}</label>
                <input
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className={inputClass}
                />
              </div>
            ))}
          </div>

          <div className="flex gap-3 pt-4 border-t border-blue-50">
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-300 text-blue-900 font-semibold text-sm px-6 py-2.5 rounded-xl shadow-sm hover:from-yellow-300 hover:to-yellow-200 hover:shadow-md transition-all duration-150"
            >
              {editId ? (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                  Update Data
                </>
              ) : (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  Tambah Data
                </>
              )}
            </button>

            {editId && (
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-gray-200 transition-all duration-150"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
                Batal
              </button>
            )}
          </div>
        </form>
      </div>

      {/* ── Table Card ── */}
      <div className="bg-white rounded-2xl border border-blue-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-blue-50 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500" />
          <h2 className="text-sm font-semibold text-blue-900 tracking-wide uppercase">Daftar Biaya Kuliah</h2>
          <span className="ml-auto bg-blue-50 text-blue-500 border border-blue-100 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            {data.length} data
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-blue-900 to-blue-700">
                {["No", "Program Studi", "Per Bulan", "Per Semester", "BPI", "PKKMB", "Daftar A", "Daftar B", "Aksi"].map((h) => (
                  <th key={h} className="px-4 py-3.5 text-left text-xs font-medium tracking-widest uppercase text-white/70 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-50">
              {data.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-5 py-12 text-center text-blue-300 text-sm font-medium">
                    Belum ada data biaya kuliah
                  </td>
                </tr>
              ) : (
                data.map((item, i) => (
                  <tr key={item.id} className="hover:bg-blue-50/50 transition-colors duration-100">
                    <td className="px-4 py-3.5">
                      <span className="inline-block bg-yellow-50 text-yellow-800 border border-yellow-200 text-xs font-bold px-2.5 py-0.5 rounded-full">
                        {i + 1}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 font-semibold text-blue-900 whitespace-nowrap">{item.prodi}</td>
                    <td className="px-4 py-3.5 text-blue-700 whitespace-nowrap">{item.per_bulan}</td>
                    <td className="px-4 py-3.5 text-blue-700 whitespace-nowrap">{item.per_semester}</td>
                    <td className="px-4 py-3.5 text-blue-700 whitespace-nowrap">{item.bpi}</td>
                    <td className="px-4 py-3.5 text-blue-700 whitespace-nowrap">{item.pkkmb}</td>
                    <td className="px-4 py-3.5 text-blue-700 whitespace-nowrap">{item.daftar_ulang_a}</td>
                    <td className="px-4 py-3.5 text-blue-700 whitespace-nowrap">{item.daftar_ulang_b}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="inline-flex items-center gap-1 border border-blue-300 text-blue-600 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-150"
                        >
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                          </svg>
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="inline-flex items-center gap-1 border border-red-200 text-red-500 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-150"
                        >
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                          </svg>
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
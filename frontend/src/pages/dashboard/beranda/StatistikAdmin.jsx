import React, { useEffect, useState } from "react";
import api from "../../../api/axios";

export default function StatistikAdmin() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ label: "", value: "" });
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    const res = await api.get("/statistik");
    setList(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/statistik/${editId}`, form);
        setEditId(null);
      } else {
        await api.post("/statistik", form);
      }
      setForm({ label: "", value: "" });
      fetchData();
    } catch (err) {
      console.error(err.response?.data || err);
    }
  };

  const handleEdit = (item) => {
    setForm({ label: item.label, value: item.value });
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin mau hapus?")) return;
    await api.delete(`/statistik/${id}`);
    fetchData();
  };

  const inputClass =
    "border border-blue-200 bg-white text-blue-900 px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition placeholder-blue-300 w-full";

  return (
    <div className="min-h-screen bg-slate-50 p-6">

      {/* ── Header ── */}
      <div className="flex items-end gap-3 mb-8 pb-5 border-b border-blue-100">
        <div className="w-1 h-10 rounded-full bg-gradient-to-b from-yellow-400 to-blue-700 flex-shrink-0" />
        <div>
          <p className="text-xs font-medium tracking-widest text-blue-400 uppercase mb-0.5">Manajemen Konten</p>
          <h1 className="text-2xl font-bold text-blue-900 leading-none tracking-tight">Kelola Statistik</h1>
        </div>
      </div>

      {/* ── Form Card ── */}
      <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6 mb-8 max-w-2xl">
        <div className="flex items-center gap-2 mb-5">
          <span className="w-2 h-2 rounded-full bg-yellow-400" />
          <h2 className="text-sm font-semibold text-blue-900 tracking-wide uppercase">
            {editId ? "Edit Statistik" : "Tambah Statistik"}
          </h2>
          {editId && (
            <span className="ml-auto bg-yellow-100 text-yellow-700 border border-yellow-300 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              Mode Edit
            </span>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Label  (contoh: Mahasiswa)"
            value={form.label}
            onChange={(e) => setForm({ ...form, label: e.target.value })}
            className={inputClass}
            required
          />
          <input
            type="text"
            placeholder="Value  (contoh: 10K+)"
            value={form.value}
            onChange={(e) => setForm({ ...form, value: e.target.value })}
            className={inputClass}
            required
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-300 text-blue-900 font-semibold text-sm px-5 py-2.5 rounded-xl shadow-sm hover:from-yellow-300 hover:to-yellow-200 hover:shadow-md transition-all duration-150 whitespace-nowrap flex-shrink-0"
          >
            {editId ? (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
                Update
              </>
            ) : (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                Tambah
              </>
            )}
          </button>
        </form>
      </div>

      {/* ── Grid Statistik ── */}
      {list.length === 0 ? (
        <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-12 text-center max-w-2xl">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="20" x2="18" y2="10"/>
              <line x1="12" y1="20" x2="12" y2="4"/>
              <line x1="6" y1="20" x2="6" y2="14"/>
            </svg>
          </div>
          <p className="text-blue-300 text-sm font-medium">Belum ada data statistik</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {list.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-blue-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-200 overflow-hidden group"
            >
              {/* Top accent bar */}
              <div className="h-1 w-full bg-gradient-to-r from-blue-700 via-blue-500 to-yellow-400" />

              <div className="p-5">
                {/* Value */}
                <p className="text-3xl font-bold text-blue-800 tracking-tight leading-none mb-1.5">
                  {item.value}
                </p>
                {/* Label */}
                <p className="text-sm text-blue-400 font-medium uppercase tracking-widest">
                  {item.label}
                </p>

                {/* Actions */}
                <div className="flex gap-2 mt-5 pt-4 border-t border-blue-50">
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 border border-blue-300 text-blue-600 text-xs font-semibold py-1.5 rounded-lg hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-150"
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 border border-red-200 text-red-500 text-xs font-semibold py-1.5 rounded-lg hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-150"
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                    </svg>
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
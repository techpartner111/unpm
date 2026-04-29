import { useEffect, useState } from "react";
import api from "../../../api/axios";

export default function RplAdmin() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    type: "",
    title: "",
    content: "",
    order: 0,
    extra: null,
  });
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    const res = await api.get("/rpl-section-admin");
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "extra") {
      setForm({ ...form, extra: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      if (form[key] !== null && form[key] !== "") {
        formData.append(key, form[key]);
      }
    });

    if (editId) {
      await api.post(`/rpl-section-admin/${editId}?_method=PUT`, formData);
    } else {
      await api.post("/rpl-section-admin", formData);
    }

    setForm({
      type: "",
      title: "",
      content: "",
      order: 0,
      extra: null,
    });
    setEditId(null);
    fetchData();
  };

  const handleEdit = (item) => {
    setForm({
      type: item.type,
      title: item.title || "",
      content: item.content || "",
      order: item.order,
      extra: null,
    });
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    await api.delete(`/rpl-section-admin/${id}`);
    fetchData();
  };

  const inputClass =
    "border border-blue-200 bg-white text-blue-900 px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition placeholder-blue-300 w-full";

  const labelClass =
    "block text-xs font-semibold text-blue-400 uppercase tracking-widest mb-1.5";

  return (
    <div className="min-h-screen bg-slate-50 p-6">

      {/* ── Header ── */}
      <div className="flex items-end gap-3 mb-8 pb-5 border-b border-blue-100">
        <div className="w-1 h-10 rounded-full bg-gradient-to-b from-yellow-400 to-blue-700 flex-shrink-0" />
        <div>
          <p className="text-xs font-medium tracking-widest text-blue-400 uppercase mb-0.5">Manajemen Konten</p>
          <h1 className="text-2xl font-bold text-blue-900 leading-none tracking-tight">Admin RPL Section</h1>
        </div>
      </div>

      {/* ── Form Card ── */}
      <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6 mb-8">
        <div className="flex items-center gap-2 mb-6">
          <span className="w-2 h-2 rounded-full bg-yellow-400" />
          <h2 className="text-sm font-semibold text-blue-900 tracking-wide uppercase">
            {editId ? "Edit Data Section" : "Tambah Data Section"}
          </h2>
          {editId && (
            <span className="ml-auto bg-yellow-100 text-yellow-700 border border-yellow-300 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              Mode Edit
            </span>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

            {/* Type */}
            <div>
              <label className={labelClass}>Type</label>
              <input
                name="type"
                value={form.type}
                onChange={handleChange}
                placeholder="header, skema, tahapan, sk, persyaratan"
                className={inputClass}
              />
            </div>

            {/* Order */}
            <div>
              <label className={labelClass}>Order</label>
              <input
                type="number"
                name="order"
                value={form.order}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            {/* Title */}
            <div className="md:col-span-2">
              <label className={labelClass}>Title</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Judul section"
                className={inputClass}
              />
            </div>

            {/* Content */}
            <div className="md:col-span-2">
              <label className={labelClass}>Content</label>
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                placeholder="Isi konten section..."
                rows={4}
                className={inputClass + " resize-none"}
              />
            </div>

            {/* File Upload */}
            <div className="md:col-span-2">
              <label className={labelClass}>Extra (File)</label>
              <div className="border border-blue-200 rounded-xl px-3 py-2.5 bg-white hover:border-blue-400 transition">
                <input
                  type="file"
                  name="extra"
                  onChange={handleChange}
                  className="text-sm text-blue-700 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 w-full"
                />
              </div>
            </div>

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
                onClick={() => { setForm({ type: "", title: "", content: "", order: 0, extra: null }); setEditId(null); }}
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
          <h2 className="text-sm font-semibold text-blue-900 tracking-wide uppercase">Daftar RPL Section</h2>
          <span className="ml-auto bg-blue-50 text-blue-500 border border-blue-100 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            {data.length} data
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-blue-900 to-blue-700">
                {["No", "Type", "Title", "Order", "Aksi"].map((h) => (
                  <th key={h} className="px-4 py-3.5 text-left text-xs font-medium tracking-widest uppercase text-white/70 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-50">
              {data.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-blue-300 text-sm font-medium">
                    Belum ada data RPL section
                  </td>
                </tr>
              ) : (
                data.map((item, index) => (
                  <tr key={item.id} className="hover:bg-blue-50/50 transition-colors duration-100">
                    <td className="px-4 py-3.5">
                      <span className="inline-block bg-yellow-50 text-yellow-800 border border-yellow-200 text-xs font-bold px-2.5 py-0.5 rounded-full">
                        {index + 1}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="inline-block bg-blue-50 text-blue-600 border border-blue-100 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        {item.type}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 font-semibold text-blue-900 whitespace-nowrap">{item.title}</td>
                    <td className="px-4 py-3.5 text-blue-700 whitespace-nowrap">{item.order}</td>
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
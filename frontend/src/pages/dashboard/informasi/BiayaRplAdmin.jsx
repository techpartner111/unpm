import { useEffect, useState } from "react";
import api from "../../../api/axios";
import { DollarSign, Plus, Pencil, Trash2 } from "lucide-react";

export default function BiayaRplAdmin() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    program_studi: "",
    biaya_semester: "",
    pkkmb: "",
    bpi_gel_1: "",
    bpi_gel_2: "",
    bpi_gel_3: "",
  });
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    const res = await api.get("/biaya-rpl-admin");
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await api.put(`/biaya-rpl-admin/${editId}`, form);
    } else {
      await api.post("/biaya-rpl-admin", form);
    }

    setForm({
      program_studi: "",
      biaya_semester: "",
      pkkmb: "",
      bpi_gel_1: "",
      bpi_gel_2: "",
      bpi_gel_3: "",
    });

    setEditId(null);
    fetchData();
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    if (confirm("Yakin hapus data?")) {
      await api.delete(`/biaya-rpl-admin/${id}`);
      fetchData();
    }
  };

  const inputClass =
    "border border-blue-200 bg-white text-blue-900 px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition placeholder-blue-300 w-full";

  const labelClass =
    "block text-xs font-semibold text-blue-400 uppercase tracking-widest mb-1.5";

  const fields = [
    { name: "program_studi",  label: "Program Studi",  placeholder: "contoh: Rekayasa Perangkat Lunak" },
    { name: "biaya_semester", label: "Biaya Semester", placeholder: "contoh: 3000000" },
    { name: "pkkmb",          label: "PKKMB",          placeholder: "contoh: 250000" },
    { name: "bpi_gel_1",      label: "BPI Gelombang 1", placeholder: "contoh: 1500000" },
    { name: "bpi_gel_2",      label: "BPI Gelombang 2", placeholder: "contoh: 1250000" },
    { name: "bpi_gel_3",      label: "BPI Gelombang 3", placeholder: "contoh: 1000000" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6">

      {/* ── Header ── */}
      <div className="flex items-end gap-3 mb-8 pb-5 border-b border-blue-100">
        <div className="w-1 h-10 rounded-full bg-gradient-to-b from-yellow-400 to-blue-700 flex-shrink-0" />
        <div>
          <p className="text-xs font-medium tracking-widest text-blue-400 uppercase mb-0.5">Manajemen Keuangan</p>
          <h1 className="text-2xl font-bold text-blue-900 leading-none tracking-tight">Admin Biaya RPL</h1>
        </div>
      </div>

      {/* ── Form Card ── */}
      <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6 mb-8">
        <div className="flex items-center gap-2 mb-6">
          <span className="w-2 h-2 rounded-full bg-yellow-400" />
          <h2 className="text-sm font-semibold text-blue-900 tracking-wide uppercase">
            {editId ? "Edit Data Biaya RPL" : "Tambah Data Biaya RPL"}
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
              <div key={name} className={name === "program_studi" ? "md:col-span-2" : ""}>
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
                  <Pencil size={13} />
                  Update Data
                </>
              ) : (
                <>
                  <Plus size={13} />
                  Tambah Data
                </>
              )}
            </button>

            {editId && (
              <button
                type="button"
                onClick={() => { setForm({ program_studi: "", biaya_semester: "", pkkmb: "", bpi_gel_1: "", bpi_gel_2: "", bpi_gel_3: "" }); setEditId(null); }}
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
          <h2 className="text-sm font-semibold text-blue-900 tracking-wide uppercase">Daftar Biaya RPL</h2>
          <span className="ml-auto bg-blue-50 text-blue-500 border border-blue-100 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            {data.length} data
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-blue-900 to-blue-700">
                {["No", "Program Studi", "Semester", "PKKMB", "Gel 1", "Gel 2", "Gel 3", "Aksi"].map((h) => (
                  <th key={h} className="px-4 py-3.5 text-left text-xs font-medium tracking-widest uppercase text-white/70 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-50">
              {data.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center text-blue-300 text-sm font-medium">
                    Belum ada data biaya RPL
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
                    <td className="px-4 py-3.5 font-semibold text-blue-900 whitespace-nowrap">{item.program_studi}</td>
                    <td className="px-4 py-3.5 text-blue-700 whitespace-nowrap">{item.biaya_semester}</td>
                    <td className="px-4 py-3.5 text-blue-700 whitespace-nowrap">{item.pkkmb}</td>
                    <td className="px-4 py-3.5 text-blue-700 whitespace-nowrap">{item.bpi_gel_1}</td>
                    <td className="px-4 py-3.5 text-blue-700 whitespace-nowrap">{item.bpi_gel_2}</td>
                    <td className="px-4 py-3.5 text-blue-700 whitespace-nowrap">{item.bpi_gel_3}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="inline-flex items-center gap-1 border border-blue-300 text-blue-600 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-150"
                        >
                          <Pencil size={11} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="inline-flex items-center gap-1 border border-red-200 text-red-500 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-150"
                        >
                          <Trash2 size={11} />
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
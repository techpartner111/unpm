import React, { useEffect, useState } from "react";
import api from "../../../api/axios";

export default function HeroSliderAdmin() {
  const [sliders, setSliders] = useState([]);
  const [form, setForm] = useState({
    image: null,
    is_active: true,
  });
  const [preview, setPreview] = useState(null);
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    try {
      const res = await api.get("/hero-sliders");
      setSliders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, type, checked, files } = e.target;
    if (type === "file") {
      setForm({ ...form, image: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm({
        ...form,
        [name]: type === "checkbox" ? checked : e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", form.image);
    formData.append("is_active", form.is_active ? 1 : 0);

    try {
      if (editId) {
        await api.post(`/hero-sliders/${editId}?_method=PUT`, formData);
        alert("Data berhasil diupdate");
      } else {
        await api.post("/hero-sliders", formData);
        alert("Data berhasil ditambahkan");
      }

      setForm({ image: null, is_active: true });
      setPreview(null);
      setEditId(null);
      fetchData();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const handleEdit = (slider) => {
    setForm({ image: null, is_active: slider.is_active });
    setPreview(`http://127.0.0.1:8000/storage/${slider.image}`);
    setEditId(slider.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin hapus data?")) return;
    try {
      await api.delete(`/hero-sliders/${id}`);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* HEADER */}
      <div className="flex items-end gap-4 mb-10 border-b pb-6">
        <div className="w-1 h-10 bg-gradient-to-b from-yellow-400 to-blue-500 rounded"></div>
        <div>
          <p className="text-xs tracking-widest uppercase text-gray-500">Manajemen Konten</p>
          <h2 className="text-3xl font-serif font-semibold text-gray-800">Hero Slider</h2>
        </div>
      </div>

      {/* FORM */}
      <div className="bg-white p-8 rounded-xl shadow mb-8">
        <h3 className="text-lg font-semibold mb-6 text-blue-700">{editId ? "Edit Slider" : "Tambah Slider Baru"}</h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-wrap gap-6">
            {/* UPLOAD */}
            <label className="flex-1 min-w-[220px]">
              <span className="text-xs uppercase text-gray-500">Gambar Slider</span>

              <div className="mt-2 border-2 border-dashed rounded-lg p-4 flex items-center gap-3 cursor-pointer hover:bg-blue-50">
                <input type="file" name="image" onChange={handleChange} className="hidden" />

                <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center text-white">⬆</div>

                <span className="text-sm text-gray-500">
                  <strong className="text-blue-600">Pilih file</strong>
                </span>
              </div>
            </label>

            {/* PREVIEW */}
            {preview && (
              <div>
                <p className="text-xs text-gray-500 mb-2">Preview</p>
                <img src={preview} alt="preview" className="w-36 h-24 object-cover rounded-lg border" />
              </div>
            )}
          </div>

          {/* TOGGLE */}
          <div className="flex items-center gap-3">
            <input type="checkbox" name="is_active" checked={form.is_active} onChange={handleChange} className="w-5 h-5" />
            <span className="text-sm">{form.is_active ? "Slider Aktif" : "Slider Nonaktif"}</span>
          </div>

          {/* BUTTON */}
          <button className="bg-yellow-400 hover:bg-yellow-300 px-6 py-2 rounded font-semibold text-sm shadow">{editId ? "Update Slider" : "Tambah Slider"}</button>
        </form>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-blue-700">Daftar Slider</h3>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gradient-to-r from-gray-800 to-blue-700 text-white text-xs uppercase">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {sliders.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center p-6 text-gray-500">
                  Belum ada data slider
                </td>
              </tr>
            ) : (
              sliders.map((item, index) => (
                <tr key={item.id}>
                  <td className="p-3 font-semibold">{index + 1}</td>

                  <td className="p-3">
                    <img src={`http://127.0.0.1:8000/storage/${item.image}`} className="w-20 h-14 object-cover rounded" />
                  </td>

                  <td className="p-3">
                    <span className={`px-3 py-1 rounded-full text-xs ${item.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{item.is_active ? "Aktif" : "Nonaktif"}</span>
                  </td>

                  <td className="p-3 flex gap-2">
                    <button onClick={() => handleEdit(item)} className="px-3 py-1 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white text-xs">
                      Edit
                    </button>

                    <button onClick={() => handleDelete(item.id)} className="px-3 py-1 border border-red-400 text-red-500 rounded hover:bg-red-500 hover:text-white text-xs">
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

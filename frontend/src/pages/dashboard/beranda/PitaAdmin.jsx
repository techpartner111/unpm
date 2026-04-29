import React, { useEffect, useState } from "react";
import api from "../../../api/axios";

export default function PitaAdmin() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [current, setCurrent] = useState(null);

  // ambil data lama
  useEffect(() => {
    const fetchPita = async () => {
      const res = await api.get("/pita");
      setCurrent(res.data);
    };
    fetchPita();
  }, []);

  // preview gambar
  const handleChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // upload
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);

    try {
      await api.post("/pita", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Berhasil update pita!");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Gagal upload");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Kelola Pita Akreditasi</h1>

      {/* gambar lama */}
      {current && (
        <div className="mb-6">
          <p className="mb-2">Gambar Saat Ini:</p>
          <img
            src={`http://127.0.0.1:8000/storage/${current.image}`}
            className="w-40"
          />
        </div>
      )}

      {/* form upload */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="file" onChange={handleChange} required />

        {preview && (
          <img src={preview} className="w-40 mt-2" />
        )}

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Upload
        </button>
      </form>
    </div>
  );
}
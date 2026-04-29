import React, { useEffect, useState } from "react";
import api from "../../../api/axios";

export default function VideoAdmin() {
  const [file, setFile] = useState(null);
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      const res = await api.get("/video");
      setCurrent(res.data);
    };
    fetchVideo();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    try {
      await api.post("/video", formData);
      alert("Video berhasil diupdate");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Gagal upload");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Kelola Video</h1>

      {current && (
        <video
          src={`http://127.0.0.1:8000/storage/${current.file}`}
          controls
          className="w-64 mb-4"
        />
      )}

      <form onSubmit={handleSubmit}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
        <button className="bg-blue-600 text-white px-4 py-2 ml-2 rounded">
          Upload
        </button>
      </form>
    </div>
  );
}
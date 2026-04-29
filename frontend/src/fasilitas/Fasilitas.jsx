import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { Building2, ChevronRight, Sparkles } from "lucide-react";

export default function Fasilitas() {
  const [fasilitas, setFasilitas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getFasilitas();
  }, []);

  const getFasilitas = async () => {
    try {
      const res = await api.get("/fasilitas");
      setFasilitas(res.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-50 via-blue-50/20 to-white py-20 px-6 md:px-12 lg:px-20 overflow-hidden">
      
      {/* Header */}
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-3xl md:text-5xl font-light text-gray-900">
          Fasilitas{" "}
          <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
            UNIPMA
          </span>
        </h1>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {fasilitas.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/fasilitas/${item.slug}`)}
            className="cursor-pointer group rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
          >
            {/* Gambar */}
            <div className="h-64 overflow-hidden rounded-t-2xl">
              <img
                src={`http://127.0.0.1:8000/storage/${item.thumbnail}`}
                alt={item.nama}
                className="w-full h-full object-cover group-hover:scale-110 transition"
              />
            </div>

            {/* Konten */}
            <div className="p-5">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-lg">{item.nama}</h2>
                <ChevronRight />
              </div>

              <p className="text-sm text-gray-500 mt-2">
                {item.deskripsi?.substring(0, 60)}...
              </p>

              <div className="flex items-center gap-2 mt-3 text-sm text-cyan-600">
                <Sparkles size={16} />
                <span>Fasilitas modern</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
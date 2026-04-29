import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, DollarSign, Award, HelpCircle } from "lucide-react";
import api from "../api/axios";

export default function BeasiswaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDetail();
  }, [id]);

  const fetchDetail = async () => {
    try {
      const res = await api.get(`/beasiswas/${id}`);
      setData(res.data);
    } catch (err) {
      console.error(err);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  // 🔄 loading state
  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  // ❌ data tidak ditemukan
  if (!data) {
    return (
      <div className="p-10 text-center text-gray-600 text-lg">
        Beasiswa tidak ditemukan.
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 py-16 px-6 md:px-12">
      
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-10 text-gray-700 hover:text-cyan-600"
      >
        <ArrowLeft className="w-5 h-5" />
        Kembali
      </button>

      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* Image */}
        <div className="flex justify-center">
          <img
            src={data.gambar || "/fallback.png"}
            alt={data.nama}
            className="w-full max-h-72 object-contain"
          />
        </div>

        <div className="p-10 space-y-10">

          {/* Title */}
          <div>
            <h1 className="text-3xl font-bold">{data.nama}</h1>
            <p className="text-gray-600 mt-2">{data.deskripsi}</p>
          </div>

          {/* Manfaat */}
          <div>
            <h2 className="flex items-center gap-2 text-xl font-semibold text-cyan-700">
              <Award className="w-5 h-5" /> Manfaat
            </h2>

            <ul className="mt-3 space-y-2">
              {data.manfaat?.map((item, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="w-2 h-2 bg-cyan-500 rounded-full mt-2"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Syarat */}
          <div>
            <h2 className="flex items-center gap-2 text-xl font-semibold text-blue-700">
              <HelpCircle className="w-5 h-5" /> Syarat
            </h2>

            <ul className="mt-3 space-y-2">
              {data.syarat?.map((item, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <a
              href="#kontak"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:scale-105 transition"
            >
              <DollarSign className="w-5 h-5" />
              Ajukan Sekarang
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
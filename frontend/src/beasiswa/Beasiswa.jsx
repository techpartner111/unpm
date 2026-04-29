import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

import { Award, DollarSign, Sparkles, ChevronRight } from "lucide-react";

export default function Beasiswa() {
  const navigate = useNavigate();

  const [beasiswaList, setBeasiswaList] = useState([]);

  useEffect(() => {
    fetchBeasiswa();
  }, []);

  const fetchBeasiswa = async () => {
    try {
      const res = await api.get("/beasiswas");
      setBeasiswaList(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDetail = (id) => {
    navigate(`/beasiswa/${id}`);
  };

  return (
    <div className="relative py-20 bg-gradient-to-br from-cyan-100 via-cyan-200 to-blue-200 overflow-hidden ui-text">

      {/* Header */}
      <div className="relative text-center mb-16 space-y-4">
        <h1 className="text-3xl md:text-5xl font-light text-gray-900">
          Jenis{" "}
          <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
            Beasiswa UNIPMA
          </span>
        </h1>
      </div>

      {/* Grid */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto mb-16">
        {beasiswaList.map((item, index) => {
          const words = item.nama.split(" ");
          const firstWord = words[0];
          const restWords = words.slice(1).join(" ");

          return (
            <div
              key={index}
              onClick={() => handleDetail(item.id)}
              className="group relative cursor-pointer hover:scale-105 transition duration-300"
            >
              <div className="relative">

                {/* Image */}
                <div className="relative z-10 transform translate-x-20 group-hover:translate-x-14 transition-transform duration-500">
                  <img
                    src={item.gambar || "/fallback.png"}
                    alt={item.nama}
                    className="w-4/5 h-80 object-cover rounded-2xl shadow-xl mx-auto"
                  />
                </div>

                {/* TEXT BOX (INI YANG TADI HILANG 🔥) */}
                <div className="relative -mt-8 z-20 px-4">
                  <div className="backdrop-blur-sm bg-white/95 rounded-xl shadow-xl p-5 border-l-4 border-cyan-500 group-hover:border-blue-600 transition-colors duration-300">
                    
                    <h2 className="text-xl font-bold leading-tight">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
                        {firstWord}
                      </span>
                      <br />
                      <span className="text-gray-800">{restWords}</span>
                    </h2>

                    <p className="text-sm text-cyan-700 mt-2 flex items-center gap-1">
                      Lihat Detail <ChevronRight className="w-4 h-4" />
                    </p>

                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* CTA Section */}
      <div className="relative max-w-4xl mx-auto mt-16">
        <div className="backdrop-blur-sm bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-200/50 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
              <DollarSign className="w-7 h-7 text-white" />
            </div>

            <div className="text-center md:text-left">
              <p className="text-lg font-semibold text-gray-900">
                Butuh informasi lebih detail?
              </p>
              <p className="text-gray-600 font-light">
                Konsultasi gratis mengenai persyaratan beasiswa
              </p>
            </div>
          </div>

          <a
            href="#kontak"
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3.5 rounded-xl font-semibold hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            Hubungi Kami
            <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Info Cards */}
      <div className="relative max-w-7xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="backdrop-blur-sm bg-white/60 border rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Award className="w-6 h-6 text-white" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">
            {beasiswaList.length}+ Jenis Beasiswa
          </h4>
          <p className="text-sm text-gray-600">
            Pilihan beasiswa yang beragam
          </p>
        </div>

        <div className="backdrop-blur-sm bg-white/60 border rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">
            Proses Mudah
          </h4>
          <p className="text-sm text-gray-600">
            Pendaftaran yang simpel dan cepat
          </p>
        </div>

      </div>

    </div>
  );
}
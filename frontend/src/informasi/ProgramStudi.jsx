import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { GraduationCap, BookOpen, Award, ChevronRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProgramStudi() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  // slug
  const toSlug = (str) =>
    str
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

  // fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/program-studi");
        setData(res.data);
      } catch (err) {
        console.error("Error ambil data:", err);
      }
    };

    fetchData();
  }, []);

  // card prodi
  const ProdiCard = ({ prodi }) => (
    <div
      onClick={() => navigate(`/prodi-detail/${toSlug(prodi.nama)}`)}
      className="cursor-pointer group backdrop-blur-sm bg-white/80 rounded-xl border border-gray-100 hover:border-cyan-200 shadow-md hover:shadow-xl p-5 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-gray-800 font-medium leading-snug group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-600 group-hover:to-blue-600 transition-all">{prodi.nama}</p>
        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-cyan-500 group-hover:translate-x-1 transition-all flex-shrink-0" />
      </div>
    </div>
  );

  // ================= HITUNG DATA =================
  const totalFakultas = data.reduce((total, j) => {
    return total + (j.fakultas?.length || 0);
  }, 0);

  const totalProdi = data.reduce((total, j) => {
    return total + (j.fakultas?.reduce((sum, f) => sum + (f.prodis?.length || 0), 0) || 0);
  }, 0);
  return (
    <div className="relative bg-gradient-to-b from-gray-50 via-blue-50/20 to-white min-h-screen py-20 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-3xl md:text-5xl font-light text-gray-900">
            Program Studi <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">UNIPMA</span>
          </h1>
        </div>

        {/* LOOP JENJANG */}
        {data.map((jenjang, jIndex) => (
          <section key={jIndex} className="mb-16">
            {/* TITLE JENJANG */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                {jenjang.nama.toLowerCase().includes("s2") && <Award className="w-6 h-6 text-white" />}
                {jenjang.nama.toLowerCase().includes("s1") && <GraduationCap className="w-6 h-6 text-white" />}
                {jenjang.nama.toLowerCase().includes("d3") && <Sparkles className="w-6 h-6 text-white" />}
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">{jenjang.nama}</h2>
              </div>
            </div>

            {/* LOOP FAKULTAS */}
            {jenjang.fakultas.map((fak, fIndex) => (
              <div key={fIndex} className="mb-12">
                <div className="backdrop-blur-sm bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-100 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-cyan-600" />
                    <h3 className="text-xl font-semibold text-gray-900">{fak.nama}</h3>
                  </div>
                </div>

                {/* LOOP PRODI */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {fak.prodis.map((prodi, pIndex) => (
                    <ProdiCard key={pIndex} prodi={prodi} />
                  ))}
                </div>
              </div>
            ))}
          </section>
        ))}
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* TOTAL PRODI */}
          <div className="backdrop-blur-sm bg-white/60 border border-gray-100 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 mb-2">{totalProdi}+</div>
            <p className="text-gray-600 font-medium">Program Studi</p>
          </div>

          {/* TOTAL FAKULTAS */}
          <div className="backdrop-blur-sm bg-white/60 border border-gray-100 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">{totalFakultas}</div>
            <p className="text-gray-600 font-medium">Fakultas</p>
          </div>

          {/* AKREDITASI */}
          <div className="backdrop-blur-sm bg-white/60 border border-gray-100 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-teal-600 mb-2">100%</div>
            <p className="text-gray-600 font-medium">Terakreditasi</p>
          </div>
        </div>
      </div>
    </div>
  );
}

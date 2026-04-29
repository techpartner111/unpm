import React, { useEffect, useState } from "react";
import {
  Award,
  FileCheck,
  BookOpen,
  DollarSign,
  BookMarked,
  ChevronRight
} from "lucide-react";
import api from "../api/axios";

// mapping icon dari string DB → komponen
const iconMap = {
  Award,
  FileCheck,
  BookOpen,
  DollarSign,
  BookMarked,
};

export default function JalurPendaftaran() {
  const [jalurs, setJalurs] = useState([]);

  useEffect(() => {
    api
      .get("/jalur")
      .then((res) => setJalurs(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="relative bg-gradient-to-b from-gray-50 via-blue-50/20 to-white py-20 min-h-screen overflow-hidden" id="jalur">
      
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-16 text-center md:text-left space-y-4">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-medium border border-cyan-200/50 shadow-sm">
            <Award className="w-4 h-4" />
            Pilihan Jalur
          </div>

          <h2 className="text-3xl md:text-5xl font-light text-gray-900">
            Jalur Pendaftaran{" "}
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
              PMB UNIPMA
            </span>
          </h2>

          <p className="text-gray-600 max-w-2xl font-light">
            Pilih jalur pendaftaran yang sesuai dengan kondisi dan prestasi Anda untuk bergabung bersama UNIPMA
          </p>

          <div className="flex justify-center md:justify-start">
            <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full"></div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {jalurs.map((jalur, index) => {
            const Icon = iconMap[jalur.icon] || Award;

            return (
              <div key={index} className="group relative backdrop-blur-sm bg-white/80 rounded-2xl p-8 border border-gray-100 hover:border-cyan-200 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">

                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative mb-5 flex items-center justify-between">
                  <div className={`w-14 h-14 bg-gradient-to-br ${jalur.gradient} rounded-xl shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-cyan-500 group-hover:translate-x-1 transition-all duration-300" />
                </div>

                <div className="relative space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-600 group-hover:to-blue-600 transition-all duration-300">
                    {jalur.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed font-light">
                    {jalur.description}
                  </p>
                </div>

                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${jalur.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16">
          <div className="backdrop-blur-sm bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-200/50 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                <Award className="w-7 h-7 text-white" />
              </div>

              <div className="text-center md:text-left">
                <p className="text-lg font-semibold text-gray-900">
                  Butuh bantuan memilih jalur?
                </p>
                <p className="text-gray-600 font-light">
                  Konsultasi gratis dengan tim PMB kami
                </p>
              </div>
            </div>

            <a
              href="#kontak"
              className="whitespace-nowrap bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3.5 rounded-xl font-semibold hover:shadow-xl hover:shadow-cyan-500/30 hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              Hubungi Kami
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
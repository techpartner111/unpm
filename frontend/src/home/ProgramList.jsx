import React, { useState, useEffect } from "react";
import api from "../api/axios";
import { GraduationCap, Award, Sparkles, ChevronRight, X } from "lucide-react";


const FontLinks = () => (
  <>
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Playfair+Display:wght@400;600;700&display=swap"
      rel="stylesheet"
    />
    <style>{`
      .pf-heading { font-family: "Playfair Display", serif; }
      .ui-text { font-family: "Inter", sans-serif; }
      .navy { background-color: #00a2ff; } 
      .azure { color: #0EA5E9; } /* biru azure */
      .azure-bg { background: linear-gradient(90deg, #0EA5E9, #38BDF8); }
      .gold { color: #D4AF37; }
      .gold-bg { background: linear-gradient(90deg, rgba(212,175,55,0.12), rgba(212,175,55,0.06)); }
    `}</style>
  </>
);

export default function ProgramListAdvanced() {
const [data, setData] = useState([]);

  const [activeJenjang, setActiveJenjang] = useState("s2");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  
useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await api.get("/program-studi");

      // mapping biar sesuai format kamu
      const formatted = res.data.map((item) => ({
        jenjang: item.nama,
        key: item.nama.toLowerCase(),
        faculties: item.fakultas.map((f) => ({
          name: f.nama,
          programs: f.prodis.map((p) => p.nama),
        })),
      }));

      setData(formatted);
      setActiveJenjang(formatted[0]?.key);
    } catch (err) {
      console.error(err);
    }
  };

  fetchData();
}, []);
  const openDetail = (facultyName, programName, jenjangLabel) => {
    setSelectedFaculty(facultyName);
    setSelectedProgram({ name: programName, jenjang: jenjangLabel });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProgram(null);
    setSelectedFaculty(null);
  };

 const activeData = data.find((d) => d.key === activeJenjang) || {
  faculties: [],
};
  return (
    <>
      <FontLinks />

      <div className="relative py-20 bg-gradient-to-br from-cyan-100 via-cyan-200 to-blue-200 overflow-hidden ui-text">     <div className="relative max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl navy flex items-center justify-center shadow-lg">
                {activeData?.icon}
              </div>
              <div>
                <h2 className="pf-heading text-3xl md:text-4xl font-semibold text-[#2a54c6]">
                  Program Studi <span className=" text-[#b6b000] font-semibold">UNIPMA</span>
                </h2>
                <p className="text-gray-600 mt-1 max-w-xl">
                  Pilihan program studi unggulan. Klik tab untuk memilih jenjang, lalu pilih fakultas & lihat detail
                  program.
                </p>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-2 bg-white rounded-2xl p-1 shadow-md gold-bg">
              {data.map((d) => (
                <button
                  key={d.key}
                  onClick={() => setActiveJenjang(d.key)}
                  className={`px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                    activeJenjang === d.key
                      ? "bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8] text-white shadow-lg"
                      : "text-[#1E3A8A] hover:bg-[#f0f9ff] hover:text-[#0EA5E9]"
                  }`}
                >
                  {d.jenjang}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="space-y-10">
            {activeData?.faculties.map((fac, fi) => (
              <section key={fi}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl md:text-2xl pf-heading text-[#2a54c6] font-semibold">{fac.name}</h3>
                    <div
                      className="h-1 w-20 rounded-full mt-2"
                      style={{ background: "linear-gradient(90deg,#0EA5E9,#38BDF8)" }}
                    />
                  </div>
                  <div className="text-sm text-gray-500">{fac.programs.length} program</div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {fac.programs.map((prodi, pi) => (
                    <article
                      key={pi}
                      className="relative group bg-white rounded-2xl border border-gray-100 shadow-lg p-6 hover:shadow-2xl transition-all transform hover:-translate-y-1"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-lg bg-[#00a2ff] flex items-center justify-center shadow-md">
                          <GraduationCap className="w-6 h-6 text-white" />
                        </div>

                        <div className="flex-1">
                          <h4 className="pf-heading text-lg text-[#2a54c6] font-semibold leading-tight">{prodi}</h4>
                          <p className="text-sm text-gray-500 mt-1">
                            {activeData.jenjang} • {fac.name}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-3">
                        <span className="text-xs font-medium uppercase text-gray-400 tracking-wider">
                          Terakreditasi BAN-PT
                        </span>
                        <button
                          onClick={() => openDetail(fac.name, prodi, activeData.jenjang)}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00a2ff] hover:bg-[#1D4ED8] text-white text-sm font-medium transition-all shadow"
                        >
                          Lihat Detail
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>

                      <div
                        className="absolute -bottom-1 left-6 right-6 h-1 rounded-b-lg"
                        style={{ background: "linear-gradient(90deg,#0EA5E9,#38BDF8)" }}
                      />
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-4 px-6 py-5 rounded-2xl shadow-2xl gold-bg">
              <div className="text-left">
                <div className="pf-heading text-xl text-[#2a54c6] font-semibold">
                  Ingin info lebih mendalam?
                </div>
                <div className="text-sm text-gray-600">
                  Hubungi kantor PMB atau jadwalkan kunjungan kampus.
                </div>
              </div>
              <a
                href="https://pmb.unipma.ac.id/portal/daftar"
                className="ml-4 inline-flex items-center gap-2 px-5 py-2 rounded-xl border border-[#0EA5E9] text-[#2a54c6] font-semibold hover:bg-[#00a2ff] hover:text-[#ffffff] transition-all"
              >
                Daftar Sekarang
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && selectedProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal} />

          <div className="relative max-w-3xl w-full bg-white rounded-2xl shadow-2xl p-6 ring-1 ring-black/5">
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 p-2 rounded-full bg-white border border-gray-100 shadow-sm"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-gray-700" />
            </button>

            <div className="flex items-start gap-5">
              <div className="w-16 h-16 rounded-lg bg-[#1E3A8A] flex items-center justify-center shadow-lg">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="pf-heading text-2xl text-[#1E3A8A] font-semibold">{selectedProgram.name}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {selectedProgram.jenjang} • {selectedFaculty}
                </p>

                <div className="mt-4 text-gray-700">
                  <p className="mb-3">
                    Ringkasan singkat program studi. (Contoh: kurikulum berbasis kompetensi, durasi studi, peluang
                    karier, dan akreditasi.)
                  </p>
                  <ul className="list-disc ml-5 text-sm text-gray-600 space-y-1">
                    <li>Durasi: 4 Tahun (S1) / 2 Tahun (S2) / 3 Tahun (D3)</li>
                    <li>Akreditasi: BAN-PT</li>
                    <li>Peluang Karier: Guru, Konselor, Pengembang Perangkat Lunak, Analis, dsb.</li>
                  </ul>
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <a
                    href={`/prodi/${encodeURIComponent(selectedProgram.name)}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1E3A8A] text-white font-semibold transition-all hover:bg-[#1D4ED8]"
                  >
                    Halaman Program
                    <ChevronRight className="w-4 h-4" />
                  </a>

                  <a
                    href="/kontak"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-all"
                  >
                    Kontak PMB
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

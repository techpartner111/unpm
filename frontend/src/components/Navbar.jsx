import React, { useState, useRef, useEffect } from "react";
import unipmaLogo from "../assets/images/unipma.png";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X, Mail, MapPin, Facebook, Instagram, Youtube, User } from "lucide-react";

export default function Navbar() {
  const [programDropdown, setProgramDropdown] = useState(false);
  const [grafikDropdown, setGrafikDropdown] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showTopbar, setShowTopbar] = useState(true);
  const [topbarHeight, setTopbarHeight] = useState(0);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [mobileLoginOpen, setMobileLoginOpen] = useState(false);

  const closeTimeoutProgram = useRef(null);
  const closeTimeoutGrafik = useRef(null);
  const topbarRef = useRef(null);
  const navbarRef = useRef(null);

  // Hitung tinggi topbar & navbar otomatis
  useEffect(() => {
    const updateHeights = () => {
      if (topbarRef.current) setTopbarHeight(topbarRef.current.offsetHeight);
      if (navbarRef.current) setNavbarHeight(navbarRef.current.offsetHeight);
    };
    updateHeights();
    window.addEventListener("resize", updateHeights);
    return () => window.removeEventListener("resize", updateHeights);
  }, []);

  // Sembunyikan topbar saat scroll
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        setShowTopbar(false);
      } else {
        setShowTopbar(true);
      }
      lastScrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* 🌐 TOPBAR */}
      <div
        ref={topbarRef}
        className={`w-full bg-gradient-to-r from-cyan-700 via-blue-700 to-blue-800 text-white text-sm fixed top-0 left-0 z-50 transition-all duration-500 ease-in-out ${
          showTopbar ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
          <div className="flex items-center gap-4 md:gap-6">
            {/* Login */}
            <a href="/login" className="flex items-center gap-1.5 hover:text-yellow-300 transition-colors">
              <User className="w-4 h-4 text-yellow-300" />
              <span className="hidden md:inline">Login</span>
            </a>

            {/* Email */}
            <a href="mailto:pmb@unipma.ac.id" className="flex items-center gap-1.5 hover:text-yellow-300 transition-colors">
              <Mail className="w-4 h-4 text-yellow-300" />
              <span className="hidden md:inline">pmb@unipma.ac.id</span>
            </a>

            {/* Wisata */}
            <a href="/wisata" className="flex items-center gap-1.5 hover:text-yellow-300 transition-colors">
              <MapPin className="w-4 h-4 text-yellow-300" />
              <span className="hidden md:inline">Wisata Madiun</span>
            </a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a href="https://www.facebook.com/share/16PWRdAMkp/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/unipma_pmb?igsh=aDV5ZXcyMXFiMzJx" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://youtube.com/@unipma?si=VRqGqGr9zjUaN4YW" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition-colors">
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* 🧭 NAVBAR */}
      <header
        ref={navbarRef}
        className="w-full backdrop-blur-lg bg-gradient-to-r from-cyan-600/95 via-blue-600/95 to-blue-700/95 fixed left-0 z-40 shadow-lg border-b border-white/10 transition-all duration-500 ease-in-out"
        style={{
          top: showTopbar ? `${topbarHeight}px` : "0px",
          fontFamily: "'Barlow Condensed', sans-serif",
        }}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-2 sm:py-3.5 flex justify-between items-center">
          {/* 🔹 Logo */}
          <div className="flex items-center gap-3">
            <img src={unipmaLogo} alt="Logo UNIPMA" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain" />

            <h1 className="text-lg sm:text-xl md:text-2xl font-light text-white tracking-wide">
              PMB
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-yellow-300"> UNIPMA</span>
            </h1>
          </div>

          {/* 🔹 Menu Desktop */}
          <nav className="space-x-1 hidden lg:flex items-center text-[21px] font-medium">
            <a href="/" className="text-white/90 hover:text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-all">
              Beranda
            </a>

            {/* Dropdown Informasi */}
            <div
              className="relative"
              onMouseEnter={() => {
                clearTimeout(closeTimeoutProgram.current);
                setProgramDropdown(true);
              }}
              onMouseLeave={() => {
                closeTimeoutProgram.current = setTimeout(() => setProgramDropdown(false), 300);
              }}
            >
              <button className="text-white/90 hover:text-white px-1 py-2 rounded-lg hover:bg-white/10 flex items-center gap-1.5 transition-all">
                Informasi
                <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${programDropdown ? "rotate-180" : ""}`} />
              </button>

              {programDropdown && (
                <div className="absolute top-full mt-2 w-52 bg-white rounded-xl shadow-2xl border overflow-hidden z-50 text-[18px]">
                  {[
                    ["Jadwal", "/jadwal"],
                    ["Jalur Pendaftaran", "/pendaftaran"],
                    ["RPL", "/rpl"],
                    ["Biaya", "/biaya"],
                    ["Program Studi", "/studi"],
                    ["Akreditasi", "https://akreditasi.unipma.ac.id/", true],
                    ["Cara VA", "/va"],
                    ["Ukm Unit Kegiatan Mahasiswa", "/ukm"],
                    ["Ibadah", "/ibadah"],
                  ].map(([label, href, external], i) =>
                    external ? (
                      <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="block px-5 py-2.5 hover:bg-cyan-50 text-gray-700 hover:text-cyan-600 transition-all">
                        {label}
                      </a>
                    ) : (
                      <a key={i} href={href} className="block px-5 py-2.5 hover:bg-cyan-50 text-gray-700 hover:text-cyan-600 transition-all">
                        {label}
                      </a>
                    ),
                  )}
                </div>
              )}
            </div>

            <a href="/beasiswa" className="text-white/90 hover:text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-all">
              Beasiswa
            </a>

            <a href="/hasil" className="text-white/90 hover:text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-all">
              Hasil Seleksi
            </a>

            <a href="/fasilitas" className="text-white/90 hover:text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-all">
              Fasilitas
            </a>

            {/* Dropdown Pendaftaran */}
            <div
              className="relative"
              onMouseEnter={() => {
                clearTimeout(closeTimeoutGrafik.current);
                setGrafikDropdown(true);
              }}
              onMouseLeave={() => {
                closeTimeoutGrafik.current = setTimeout(() => setGrafikDropdown(false), 300);
              }}
            >
              <button className="text-white/90 hover:text-white px-4 py-2 rounded-lg hover:bg-white/10 flex items-center gap-1.5 transition-all">
                Pendaftaran
                <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${grafikDropdown ? "rotate-180" : ""}`} />
              </button>

              {grafikDropdown && (
                <div className="absolute top-full mt-2 w-60 bg-white rounded-xl shadow-2xl border overflow-hidden z-50 text-[18px]">
                  <a href="https://pmb.unipma.ac.id/portal/daftar" target="_blank" rel="noopener noreferrer" className="block px-5 py-2.5 hover:bg-cyan-50 text-gray-700 hover:text-cyan-600 transition-all">
                    Sarjana S1 & D3
                  </a>
                  <a href="https://pmb.unipma.ac.id/portal/daftar_S2" target="_blank" rel="noopener noreferrer" className="block px-5 py-2.5 hover:bg-cyan-50 text-gray-700 hover:text-cyan-600 transition-all">
                    Pasca Sarjana S2
                  </a>
                  <Link to="/register?jenjang=s3" className="block px-5 py-2.5 hover:bg-cyan-50 text-gray-700 hover:text-cyan-600 transition-all">
                    Pasca Sarjana S3
                  </Link>
                  <a href="https://pmb.unipma.ac.id/ln/daftar/" target="_blank" rel="noopener noreferrer" className="block px-5 py-2.5 hover:bg-cyan-50 text-gray-700 hover:text-cyan-600 transition-all">
                    International Student
                  </a>
                  <a href="https://pmb.unipma.ac.id/portal/daftar_RPL" target="_blank" rel="noopener noreferrer" className="block px-5 py-2.5 hover:bg-cyan-50 text-gray-700 hover:text-cyan-600 transition-all">
                    RPL Rekognisi Pembelajaran Lampau
                  </a>
                </div>
              )}
            </div>

            <a href="/hubungi" className="text-white/90 hover:text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-all">
              Hubungi Kami
            </a>
          </nav>

          {/* 🔹 Tombol Aksi */}
          <div className="flex items-center gap-2.5">
            <div className="relative hidden md:block group">
              <button
                className="border border-white/30 text-white px-5 py-2 rounded-lg 
               hover:bg-white/10 hover:border-white/50 transition-all 
               text-sm font-medium"
              >
                Login ▾
              </button>

              <div
                className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg 
                  overflow-hidden opacity-0 invisible 
                  group-hover:opacity-100 group-hover:visible transition-all duration-200"
              >
                <a href="https://pmb.unipma.ac.id/" className="block px-4 py-2 hover:bg-gray-100 text-sm">
                  Login Mahasiswa
                </a>
                <a href="https://pmb.unipma.ac.id/ln" className="block px-4 py-2 hover:bg-gray-100 text-sm">
                  Login Mahasiswa International
                </a>
              </div>
            </div>

            <a
              href="https://pmb.unipma.ac.id/portal/daftar"
              className="hidden md:block bg-gradient-to-r from-yellow-400 to-yellow-300 text-blue-900 font-semibold px-5 py-2 rounded-lg hover:shadow-lg hover:shadow-yellow-400/30 hover:scale-105 transition-all text-sm"
            >
              Daftar
            </a>

            {/* 📱 Tombol Menu Mobile */}
            <button onClick={() => setMobileMenu(!mobileMenu)} className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-all">
              {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* 📱 Menu Mobile */}
        {mobileMenu && (
          <div className="lg:hidden bg-gradient-to-b from-blue-700 via-blue-800 to-blue-900 text-white text-lg px-6 py-4 space-y-3 border-t border-white/20">
            <a href="/" className="block py-2 hover:text-yellow-300">
              Beranda
            </a>

            <details className="group">
              <summary className="cursor-pointer flex justify-between items-center py-2 hover:text-yellow-300">
                Informasi <ChevronDown className="w-4 h-4" />
              </summary>
              <div className="pl-4 mt-1 space-y-2 text-sm text-gray-200">
                <a href="/jadwal" className="block hover:text-yellow-300">
                  Jadwal
                </a>
                <a href="/pendaftaran" className="block hover:text-yellow-300">
                  Jalur Pendaftaran
                </a>
                <a href="/rpl" className="block hover:text-yellow-300">
                  RPL
                </a>
                <a href="/biaya" className="block hover:text-yellow-300">
                  Biaya
                </a>
                <a href="/studi" className="block hover:text-yellow-300">
                  Program Studi
                </a>
                <a href="https://unipma.ac.id/akademik/akreditasi.php" target="_blank" rel="noreferrer" className="block hover:text-yellow-300">
                  Akreditasi
                </a>
                <a href="/va" className="block hover:text-yellow-300">
                  Cara VA
                </a>
              </div>
            </details>

            <a href="/beasiswa" className="block py-2 hover:text-yellow-300">
              Beasiswa
            </a>
            <a href="/hasil" className="block py-2 hover:text-yellow-300">
              Hasil Seleksi
            </a>
            <a href="/fasilitas" className="block py-2 hover:text-yellow-300">
              Fasilitas
            </a>

            <details className="group">
              <summary className="cursor-pointer flex justify-between items-center py-2 hover:text-yellow-300">
                Pendaftaran <ChevronDown className="w-4 h-4" />
              </summary>
              <div className="pl-4 mt-1 space-y-2 text-sm text-gray-200">
                <a href="https://pmb.unipma.ac.id/portal/daftar" target="_blank" rel="noreferrer" className="block hover:text-yellow-300">
                  Sarjana S1 & D3
                </a>
                <a href="https://pmb.unipma.ac.id/portal/daftar_S2" target="_blank" rel="noreferrer" className="block hover:text-yellow-300">
                  Pasca Sarjana S2
                </a>
                <Link to="/register?jenjang=s3" className="block px-5 py-2.5 hover:bg-cyan-50 text-gray-700 hover:text-cyan-600 transition-all">
                  Pasca Sarjana S3
                </Link>
                <a href="https://pmb.unipma.ac.id/ln/daftar/" target="_blank" rel="noopener noreferrer" className="block px-5 py-2.5 hover:bg-cyan-50 text-gray-700 hover:text-cyan-600 transition-all">
                  International Student
                </a>
                <a href="https://pmb.unipma.ac.id/portal/daftar_RPL" target="_blank" rel="noreferrer" className="block hover:text-yellow-300">
                  RPL Rekognisi Pembelajaran Lampau
                </a>
              </div>
            </details>

            <a href="/hubungi" className="block py-2 hover:text-yellow-300">
              Hubungi Kami
            </a>

            <div className="pt-4 border-t border-white/20">
              {/* Button Login */}
              <button
                onClick={() => setMobileLoginOpen(!mobileLoginOpen)}
                className="w-full border border-white/30 text-white px-4 py-2 rounded-lg 
               text-center hover:bg-white/10 mb-2 flex items-center justify-center gap-2"
              >
                Login
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileLoginOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown */}
              <div className={`overflow-hidden transition-all duration-300 ${mobileLoginOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                <a href="https://pmb.unipma.ac.id/" className="block bg-white/10 text-white px-4 py-2 rounded-lg mb-1 hover:bg-white/20 text-center">
                  Login Lokal
                </a>
                <a href="https://pmb.unipma.ac.id/ln" className="block bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 text-center">
                  Login International
                </a>
              </div>

              {/* Tombol Daftar */}
              <a href="https://pmb.unipma.ac.id/portal/daftar" className="block bg-yellow-300 text-blue-900 font-semibold px-4 py-2 rounded-lg text-center hover:scale-105 transition-all mt-2">
                Daftar
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Spacer */}
      <div style={{ height: `${topbarHeight + navbarHeight}px` }}></div>
    </>
  );
}

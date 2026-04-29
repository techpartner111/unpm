import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import LandingPage from "./pages/LandingPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import Jadwal from "./informasi/Jadwal";
import JalurPendaftaran from "./informasi/JalurPendaftaran";
import RPLPage from "./informasi/Rpl";
import BiayaPage from "./informasi/Biaya";
import ProgramStudi from "./informasi/ProgramStudi";
import Va from "./informasi/Va";
import HasilSeleksi from "./Hasil_Seleksi/HasilSeleksi";
import HubungiKami from "./hubungi_kami/HubungiKami";
import Beasiswa from "./beasiswa/Beasiswa";
import Fasilitas from "./fasilitas/Fasilitas";
import Wisata from "./wisata/Wisata";
import DetailWisata from "./wisata/DetailWisata";
import DetailFasilitas from "./fasilitas/DetailFasilitas";
import Ibadah from "./informasi/Ibadah";
import Ukm from "./informasi/Ukm";
import UkmDetail from "./informasi/UkmDetail";
import IbadahDetail from "./informasi/IbadahDetail";
import BeasiswaDetail from "./beasiswa/BeasiswaDetail";
import ProgramStudiDetail from "./informasi/ProgramStudiDetail";

import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";

import HeroSliderAdmin from "./pages/dashboard/beranda/HeroSliderAdmin";
import PitaAdmin from "./pages/dashboard/beranda/PitaAdmin";
import VideoAdmin from "./pages/dashboard/beranda/VideoAdmin";
import BrosurAdmin from "./pages/dashboard/beranda/BrosurAdmin";
import StatistikAdmin from "./pages/dashboard/beranda/StatistikAdmin";
import ProgramStudiAdmin from "./pages/dashboard/beranda/ProgramStudiAdmin";
import SchedulesAdmin from "./pages/dashboard/beranda/SchedulesAdmin";
import JadwalImage from "./pages/dashboard/beranda/JadwalImage";
import BeasiswaAdmin from "./pages/dashboard/beasiswa/BeasiswaAdmin";
import ManfaatBeasiswa from "./pages/dashboard/beasiswa/ManfaatBeasiswa";
import SyaratBeasiswa from "./pages/dashboard/beasiswa/SyaratBeasiswa";
import FasilitasAdmin from "./pages/dashboard/fasilitas/FasilitasAdmin";
import GaleriFasilitasAdmin from "./pages/dashboard/fasilitas/GaleriFasilitasAdmin";
import BiayaAdmin from "./pages/dashboard/informasi/BiayaAdmin";
import RplAdmin from "./pages/dashboard/informasi/RplAdmin";
import BiayaRplAdmin from "./pages/dashboard/informasi/BiayaRplAdmin";
import JalurAdmin from "./pages/dashboard/informasi/JalurAdmin";



function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC ================= */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/jadwal" element={<Jadwal />} />
          <Route path="/pendaftaran" element={<JalurPendaftaran />} />
          <Route path="/rpl" element={<RPLPage />} />
          <Route path="/biaya" element={<BiayaPage />} />
          <Route path="/studi" element={<ProgramStudi />} />
          <Route path="/prodi-detail/:id" element={<ProgramStudiDetail />} />

          <Route path="/va" element={<Va />} />
          <Route path="/ukm" element={<Ukm />} />
          <Route path="/ukm/:id" element={<UkmDetail />} />
          <Route path="/ibadah" element={<Ibadah />} />
          <Route path="/ibadah/:id" element={<IbadahDetail />} />

          <Route path="/beasiswa" element={<Beasiswa />} />
          <Route path="/beasiswa/:id" element={<BeasiswaDetail />} />

          <Route path="/hasil" element={<HasilSeleksi />} />

          <Route path="/fasilitas" element={<Fasilitas />} />
          <Route path="/fasilitas/:id" element={<DetailFasilitas />} />

          <Route path="/hubungi" element={<HubungiKami />} />

          <Route path="/wisata" element={<Wisata />} />
          <Route path="/wisata/:id" element={<DetailWisata />} />
        </Route>

        {/* ================= DASHBOARD ================= */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/hero" element={<HeroSliderAdmin />} />
          <Route path="/pita" element={<PitaAdmin />} />
          <Route path="/video" element={<VideoAdmin />} />
          <Route path="/browsur" element={<BrosurAdmin />} />
          <Route path="/informasi" element={<StatistikAdmin />} />
          <Route path="/prodi" element={<ProgramStudiAdmin />} />
          <Route path="/schedule" element={<SchedulesAdmin />} />
          <Route path="/schedule-image" element={<JadwalImage />} />

          <Route path="/beasiswa-admin" element={<BeasiswaAdmin />} />
          <Route path="/manfaat-admin" element={<ManfaatBeasiswa />} />
          <Route path="/syarat-admin" element={<SyaratBeasiswa />} />

          <Route path="/fasilitas-admin" element={<FasilitasAdmin />} />
          <Route path="/fasilitas-img-admin" element={<GaleriFasilitasAdmin />} />

          <Route path="/biaya-admin" element={<BiayaAdmin />} />
          <Route path="/rpl-admin" element={<RplAdmin />} />
          <Route path="/biayarpl-admin" element={<BiayaRplAdmin />} />
          <Route path="/jalur-pendaftaran-admin" element={<JalurAdmin />} />
        </Route>

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
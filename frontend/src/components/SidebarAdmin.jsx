import React, { useState } from "react";
import { LayoutDashboard, Image, Video, BarChart3, Users, LogOut, Menu, ChevronDown, BookOpen, Calendar, FileImage, Info, GraduationCap, Building2, DollarSign, Award, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SidebarAdmin() {
  const [open, setOpen] = useState(true);
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
    },

    // ================= BERANDA =================
    {
      name: "Beranda",
      icon: <Home size={20} />,
      children: [
        { name: "Foto Dashboard", path: "/hero", icon: <Image size={16} /> },
        { name: "Pita", path: "/pita", icon: <FileImage size={16} /> },
        { name: "Video", path: "/video", icon: <Video size={16} /> },
        { name: "Browsur", path: "/browsur", icon: <BookOpen size={16} /> },
        { name: "Informasi", path: "/informasi", icon: <Info size={16} /> },
        { name: "Program Studi", path: "/prodi", icon: <GraduationCap size={16} /> },
        { name: "Jadwal", path: "/schedule", icon: <Calendar size={16} /> },
        { name: "Jadwal Image", path: "/schedule-image", icon: <Image size={16} /> },
      ],
    },

    // ================= INFORMASI =================
    {
      name: "Informasi",
      icon: <Info size={20} />,
      children: [
        { name: "Biaya", path: "/biaya-admin", icon: <DollarSign size={16} /> },
        { name: "Rpl", path: "/rpl-admin", icon: <DollarSign size={16} /> },
        { name: "Biaya Rpl", path: "/biayarpl-admin", icon: <DollarSign size={16} /> },
        { name: "Jalur Pendaftaran", path: "/jalur-pendaftaran-admin", icon: <DollarSign size={16} /> },
      ],
    },

    // ================= BEASISWA =================
    {
      name: "Beasiswa",
      icon: <Award size={20} />,
      children: [
        { name: "Beasiswa", path: "/beasiswa-admin", icon: <Award size={16} /> },
        { name: "Manfaat", path: "/manfaat-admin", icon: <BarChart3 size={16} /> },
        { name: "Syarat", path: "/syarat-admin", icon: <Users size={16} /> },
      ],
    },

    // ================= FASILITAS =================
    {
      name: "Fasilitas",
      icon: <Building2 size={20} />,
      children: [
        { name: "Fasilitas", path: "/fasilitas-admin", icon: <Building2 size={16} /> },
        { name: "Image Fasilitas", path: "/fasilitas-img-admin", icon: <Image size={16} /> },
      ],
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className={`fixed top-0 left-0 h-screen overflow-hidden bg-[#0f172a] text-white transition-all duration-300 ${open ? "w-64" : "w-20"}`}>
      {/* HEADER */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <span className={`font-bold text-lg ${!open && "hidden"}`}>Admin Panel</span>
        <button onClick={() => setOpen(!open)}>
          <Menu />
        </button>
      </div>

      {/* MENU */}
      <div className="mt-4 flex flex-col gap-2">
        {menuItems.map((item, index) => (
          <div key={index}>
            {/* MENU UTAMA */}
            <div
              onClick={() => {
                if (item.children) {
                  setOpenMenu(openMenu === index ? null : index);
                } else {
                  navigate(item.path);
                }
              }}
              className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-cyan-600 transition rounded-lg mx-2"
            >
              {item.icon}
              <span className={`${!open && "hidden"}`}>{item.name}</span>

              {item.children && open && <ChevronDown size={18} className={`ml-auto transition-transform duration-300 ${openMenu === index ? "rotate-180" : ""}`} />}
            </div>

            {/* SUB MENU */}
            {item.children && openMenu === index && (
              <div className="ml-8 flex flex-col gap-1">
                {item.children.map((sub, i) => (
                  <div key={i} onClick={() => navigate(sub.path)} className="flex items-center gap-2 text-sm px-4 py-2 cursor-pointer hover:bg-cyan-500 rounded-lg transition">
                    {sub.icon}
                    {sub.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className={`absolute bottom-0 ${open ? "w-64" : "w-20"} p-4 border-t border-gray-700`}>
        <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-red-500 rounded-lg transition w-full">
          <LogOut size={20} />
          <span className={`${!open && "hidden"}`}>Logout</span>
        </button>
      </div>
    </div>
  );
}

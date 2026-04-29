import { Outlet } from "react-router-dom";
import SidebarAdmin from "../components/SidebarAdmin";

export default function DashboardLayout() {
  return (
<div className="flex">
  <SidebarAdmin />

  <div className="flex-1 ml-64 p-1">
    <Outlet />
  </div>
</div>
  );
}
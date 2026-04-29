import Navbar from "../components/Navbar";
import ContactCTA from "../components/ContactCTA";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <ContactCTA />
    </>
  );
}
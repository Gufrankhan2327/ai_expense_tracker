import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#020617] to-[#0f172a] overflow-hidden">

      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main */}
      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        <Navbar toggleSidebar={() => setIsOpen(!isOpen)} />

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
}


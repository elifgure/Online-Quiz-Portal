import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  Package,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  BarChart3,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";


const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    // Logout işlemi burada yapılacak
    navigate("/login");
  };

  const adminMenuItems = [
    {
      title: "Kullanıcı Yönetimi",
      icon: Users,
      path: "/admin/users",
      description: "Öğretmen ve öğrenci hesaplarını yönetin",
    },
    {
      title: "Quiz Yönetimi",
      icon: Package,
      path: "/admin/quizzes",
      description: "Tüm quizleri görüntüleyin ve yönetin",
    },
    {
      title: "Sistem Ayarları",
      icon: Settings,
      path: "/admin/settings",
      description: "Platform ayarlarını yapılandırın",
    },
    {
      title: "Raporlar",
      icon: BarChart3,
      path: "/admin/reports",
      description: "Sistem geneli istatistikleri inceleyin",
    },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-100 via-white to-orange-100">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-64 bg-white/90 backdrop-blur-sm shadow-2xl border-r border-purple-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-purple-200">
          <h2 className="text-xl font-bold text-[#044c5c]">Admin Panel</h2>
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-md text-white/80 hover:text-white hover:bg-white/20 transition-colors duration-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-6 px-4">
          <ul className="space-y-3">
            {adminMenuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 group ${
                        isActive
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform scale-105"
                          : "text-[#2d6c74] hover:bg-gradient-to-r hover:from-purple-50 hover:to-orange-50 hover:text-[#044c5c] hover:shadow-md hover:transform hover:scale-105"
                      }`
                    }
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon size={20} className="mr-3 group-hover:scale-110 transition-transform duration-300" />
                    {item.title}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 w-full p-4 border-t border-purple-200">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-500 rounded-xl hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 hover:shadow-md transition-all duration-300 group"
          >
            <LogOut size={20} className="mr-3 group-hover:scale-110 transition-transform duration-300" />
            Çıkış Yap
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Top Header */}
        <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-purple-200">
          <div className="flex items-center justify-between h-16 px-6">
            {/* Mobile menu button */}
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-md text-[#2d6c74] hover:text-[#044c5c] hover:bg-purple-100 transition-colors duration-200"
            >
              <Menu size={20} />
            </button>

            {/* Header Title */}
            <div className="flex-1 flex items-center justify-end">

              {/* User Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-orange-50 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">{user.displayName.charAt(0)}</span>
                  </div>
                  <span className="hidden md:block text-sm font-medium text-[#2d6c74]">
                    {user.displayName}
                  </span>
                  <ChevronDown size={16} className="text-[#37747c]" />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl border border-purple-200 z-50">
                    <div className="py-2">
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          navigate("/admin/profile");
                        }}
                        className="block w-full text-left px-4 py-3 text-sm text-[#2d6c74] hover:bg-gradient-to-r hover:from-purple-50 hover:to-orange-50 hover:text-[#044c5c] transition-all duration-200 rounded-lg"
                      >
                        Profil
                      </button>
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          navigate("/admin/settings");
                        }}
                        className="block w-full text-left px-4 py-3 text-sm text-[#2d6c74] hover:bg-gradient-to-r hover:from-purple-50 hover:to-orange-50 hover:text-[#044c5c] transition-all duration-200 rounded-lg"
                      >
                        Ayarlar
                      </button>
                      <hr className="my-2 border-purple-200" />
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          handleLogout();
                        }}
                        className="block w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all duration-200 rounded-lg"
                      >
                        Çıkış Yap
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gradient-to-b from-indigo-50 to-rose-50 p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default AdminLayout;
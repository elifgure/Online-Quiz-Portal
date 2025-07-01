import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/logo-transparent.png";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { logOut } from "../../features/Auth/authService";
import { LogOut, User, ChevronDown, FileText, BarChart3, Settings } from "lucide-react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleLogout = async () => {
    try {
      const result = await logOut();
      console.log("Logout result:", result);
      if (result.success) {
        toast.success("Başarıyla çıkış yaptınız!", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        navigate("/");
      } else {
        toast.success("Çıkış yaparken hata oluştu.", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Beklenmeyen bir hata oluştu", {
        position: "bottom-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
    setShowUserMenu(false);
  };

  const handleMenuItemClick = () => {
    setShowUserMenu(false);
  };

  return (
    <>
      <header className="w-full bg-gradient-to-r from-white via-purple-50/50 to-orange-50/50 shadow-lg border-b border-purple-200/30 py-2 px-6 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center group h-30 w-32">
            <img
              src={logo || "/placeholder.svg"}
              alt="Logo"
              className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105 max-h-16 drop-shadow-sm"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-2 items-center">
            <Link
              to="/quiz-list"
              className="text-[#044c5c] hover:text-purple-600 px-4 py-2 rounded-lg font-semibold transition-all duration-200 hover:bg-purple-50/70 relative group"
            >
              Quizlere Göz At
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={toggleUserMenu}
                    className="flex items-center space-x-2 bg-purple-50 px-3 py-2 rounded-full border border-purple-200 hover:bg-purple-100 transition-colors duration-200 group"
                  >
                    <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold text-sm">
                      {user?.displayName?.charAt(0).toUpperCase() ||
                        user?.email?.charAt(0).toUpperCase() ||
                        "U"}
                    </div>
                    <span className="text-sm font-medium text-[#044c5c] max-w-24 truncate">
                      {user?.displayName || user?.email?.split('@')[0] || "Kullanıcı"}
                    </span>
                    <ChevronDown className={`h-4 w-4 text-[#044c5c] transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Menu Overlay - Dış tıklama için */}
                  {showUserMenu && (
                    <div 
                      className="fixed inset-0 z-40"
                      onClick={() => setShowUserMenu(false)}
                    />
                  )}

                  {/* Dropdown Menu */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-purple-200/50 py-2 z-50 backdrop-blur-sm">
                      <div className="px-4 py-3 border-b border-purple-100">
                        <p className="text-sm font-medium text-[#044c5c]">
                          {user?.displayName || "Kullanıcı"}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user?.email}
                        </p>
                      </div>
                      
                      <div className="py-1">
                        <Link
                          to={user?.role === "teacher" ? "/teacher" : "/student"}
                          onClick={handleMenuItemClick}
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-[#044c5c] hover:bg-purple-50 transition-colors duration-200"
                        >
                          <User className="h-4 w-4" />
                          <span>Profilim</span>
                        </Link>
                        
                        <Link
                          to="/reports"
                          onClick={handleMenuItemClick}
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-[#044c5c] hover:bg-purple-50 transition-colors duration-200"
                        >
                          <BarChart3 className="h-4 w-4" />
                          <span>Raporlarım</span>
                        </Link>
                        
                        <Link
                          to="/my-exams"
                          onClick={handleMenuItemClick}
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-[#044c5c] hover:bg-purple-50 transition-colors duration-200"
                        >
                          <FileText className="h-4 w-4" />
                          <span>Sınavlarım</span>
                        </Link>
                        
                        <Link
                          to="/settings"
                          onClick={handleMenuItemClick}
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-[#044c5c] hover:bg-purple-50 transition-colors duration-200"
                        >
                          <Settings className="h-4 w-4" />
                          <span>Ayarlar</span>
                        </Link>
                      </div>
                      
                      <div className="border-t border-purple-100 py-1">
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 w-full text-left"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Çıkış Yap</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-[#044c5c] hover:text-orange-600 px-4 py-2 rounded-lg font-semibold transition-all duration-200 hover:bg-orange-50/70 relative group"
                >
                  Giriş Yap
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-yellow-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-2.5 rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border border-purple-600/20"
                >
                  Kayıt Ol
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden flex flex-col gap-1.5 p-3 rounded-lg bg-white/70 hover:bg-white/90 transition-all duration-200 border border-purple-200/50 shadow-sm"
            aria-label="Menüyü aç/kapat"
          >
            <span
              className={`w-6 h-0.5 bg-[#044c5c] transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-[#044c5c] transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-[#044c5c] transition-all duration-300 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-x-0 top-[96px] bg-gradient-to-b from-white/95 via-purple-50/90 to-orange-50/90 backdrop-blur-md shadow-xl border-b border-purple-200/50 z-40 transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-4"
        }`}
      >
        <nav className="flex flex-col p-6 space-y-4">
          <Link
            to="/quiz-list"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-[#044c5c] hover:text-purple-600 px-4 py-3 rounded-lg font-semibold transition-all duration-200 hover:bg-purple-50/70 border border-transparent hover:border-purple-200/50 hover:shadow-sm"
          >
            Quizlere Göz At
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link
                to={user?.role === "teacher" ? "/teacher" : "/student"}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-3 text-[#044c5c] hover:text-purple-600 px-4 py-3 rounded-lg font-semibold transition-all duration-200 hover:bg-purple-50/70 border border-transparent hover:border-purple-200/50 hover:shadow-sm"
              >
                <User className="h-4 w-4" />
                <span>Profilim</span>
              </Link>
              
              <Link
                to="/reports"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-3 text-[#044c5c] hover:text-purple-600 px-4 py-3 rounded-lg font-semibold transition-all duration-200 hover:bg-purple-50/70 border border-transparent hover:border-purple-200/50 hover:shadow-sm"
              >
                <BarChart3 className="h-4 w-4" />
                <span>Raporlarım</span>
              </Link>
              
              <Link
                to="/my-exams"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-3 text-[#044c5c] hover:text-purple-600 px-4 py-3 rounded-lg font-semibold transition-all duration-200 hover:bg-purple-50/70 border border-transparent hover:border-purple-200/50 hover:shadow-sm"
              >
                <FileText className="h-4 w-4" />
                <span>Sınavlarım</span>
              </Link>
              
              <Link
                to="/settings"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-3 text-[#044c5c] hover:text-purple-600 px-4 py-3 rounded-lg font-semibold transition-all duration-200 hover:bg-purple-50/70 border border-transparent hover:border-purple-200/50 hover:shadow-sm"
              >
                <Settings className="h-4 w-4" />
                <span>Ayarlar</span>
              </Link>
              
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleLogout();
                }}
                className="flex items-center space-x-3 text-red-600 hover:text-red-700 px-4 py-3 rounded-lg font-semibold transition-all duration-200 hover:bg-red-50/70 border border-transparent hover:border-red-200/50 hover:shadow-sm text-left"
              >
                <LogOut className="h-4 w-4" />
                <span>Çıkış Yap</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[#044c5c] hover:text-orange-600 px-4 py-3 rounded-lg font-semibold transition-all duration-200 hover:bg-orange-50/70 border border-transparent hover:border-orange-200/50 hover:shadow-sm"
              >
                Giriş Yap
              </Link>
              <Link
                to="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-3 rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-xl text-center border border-purple-600/20 transform hover:-translate-y-0.5"
              >
                Kayıt Ol
              </Link>
            </>
          )}
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-gradient-to-b from-purple-900/10 to-pink-900/10 backdrop-blur-sm z-30 top-[96px]"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Header;
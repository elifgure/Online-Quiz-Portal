import { Link } from "react-router-dom"
import { useState } from "react"
import logo from "../../assets/logo-transparent.png"

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

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
              to="/quizzes"
              className="text-[#044c5c] hover:text-purple-600 px-4 py-2 rounded-lg font-semibold transition-all duration-200 hover:bg-purple-50/70 relative group"
            >
              Quizlere Göz At
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              to="/auth/login"
              className="text-[#044c5c] hover:text-orange-600 px-4 py-2 rounded-lg font-semibold transition-all duration-200 hover:bg-orange-50/70 relative group"
            >
              Giriş Yap
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-yellow-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              to="/auth/register"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-2.5 rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border border-purple-600/20"
            >
              Kayıt Ol
            </Link>
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
              className={`w-6 h-0.5 bg-[#044c5c] transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}
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
          isMobileMenuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-4"
        }`}
      >
        <nav className="flex flex-col p-6 space-y-4">
          <Link
            to="/quizzes"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-[#044c5c] hover:text-purple-600 px-4 py-3 rounded-lg font-semibold transition-all duration-200 hover:bg-purple-50/70 border border-transparent hover:border-purple-200/50 hover:shadow-sm"
          >
            Quizlere Göz At
          </Link>
          <Link
            to="/auth/login"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-[#044c5c] hover:text-orange-600 px-4 py-3 rounded-lg font-semibold transition-all duration-200 hover:bg-orange-50/70 border border-transparent hover:border-orange-200/50 hover:shadow-sm"
          >
            Giriş Yap
          </Link>
          <Link
            to="/auth/register"
            onClick={() => setIsMobileMenuOpen(false)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-3 rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-xl text-center border border-purple-600/20 transform hover:-translate-y-0.5"
          >
            Kayıt Ol
          </Link>
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
  )
}

export default Header

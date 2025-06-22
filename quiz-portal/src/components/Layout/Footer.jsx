"use client"

import { Link } from "react-router-dom"
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube, Heart, ExternalLink } from "lucide-react"
import logo from "../../assets/logo-transparent.png"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-gradient-to-br from-indigo-50 via-purple-50 to-rose-50 text-[#044c5c] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(68,76,92,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(68,76,92,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* Decorative Elements - Anasayfayla uyumlu */}
      <div className="absolute top-10 right-20 w-32 h-32 bg-purple-400/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-orange-400/10 rounded-full blur-2xl"></div>
      <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-pink-400/10 rounded-full blur-2xl"></div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1 -mt-8">
              <div className="flex items-center gap-3 mb-6">
                <img
                  src={logo || "/assets/logo-transparent.png"}
                  alt="QuizPortal Logo"
                  className="size-32 w-auto object-contain"
                />
              </div>
              <p className="text-[#37747c] leading-relaxed mb-6 text-sm">
                QuizPortal ile bilgini test et, kendini geliştir ve öğrenme yolculuğunda ilerle. Eğitim teknolojilerinde
                yenilikçi çözümler sunuyoruz.
              </p>

              {/* Social Media */}
              <div className="flex gap-3">
                {[
                  { icon: Facebook, href: "#", label: "Facebook", color: "from-blue-500 to-blue-600" },
                  { icon: Twitter, href: "#", label: "Twitter", color: "from-sky-400 to-sky-500" },
                  { icon: Instagram, href: "#", label: "Instagram", color: "from-pink-500 to-purple-500" },
                  { icon: Linkedin, href: "#", label: "LinkedIn", color: "from-blue-600 to-blue-700" },
                  { icon: Youtube, href: "#", label: "YouTube", color: "from-red-500 to-red-600" },
                ].map(({ icon: Icon, href, label, color }) => (
                  <a
                    key={label}
                    href={href}
                    className={`w-10 h-10 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl group text-white`}
                    aria-label={label}
                  >
                    <Icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-[#044c5c]">Hızlı Erişim</h3>
              <ul className="space-y-3">
                {[
                  { label: "Ana Sayfa", href: "/" },
                  { label: "Quizler", href: "/quizzes" },
                  { label: "Quiz Oluştur", href: "/create-quiz" },
                  { label: "Kategoriler", href: "/categories" },
                  { label: "Liderlik Tablosu", href: "/leaderboard" },
                  { label: "Hakkımızda", href: "/about" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      to={href}
                      className="text-[#37747c] hover:text-[#044c5c] transition-colors duration-200 text-sm flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-purple-400 rounded-full group-hover:bg-[#044c5c] transition-colors duration-200"></span>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-[#044c5c]">Destek</h3>
              <ul className="space-y-3">
                {[
                  { label: "Yardım Merkezi", href: "/help" },
                  { label: "SSS", href: "/faq" },
                  { label: "İletişim", href: "/contact" },
                  { label: "Geri Bildirim", href: "/feedback" },
                  { label: "Topluluk", href: "/community" },
                  { label: "Blog", href: "/blog" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      to={href}
                      className="text-[#37747c] hover:text-[#044c5c] transition-colors duration-200 text-sm flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-orange-400 rounded-full group-hover:bg-[#044c5c] transition-colors duration-200"></span>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-[#044c5c]">İletişim</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 shadow-lg">
                    <Mail className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-[#37747c] text-sm">E-posta</p>
                    <a
                      href="mailto:info@quizportal.com"
                      className="text-[#044c5c] hover:text-purple-600 transition-colors duration-200 text-sm font-medium"
                    >
                      info@quizportal.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 shadow-lg">
                    <Phone className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-[#37747c] text-sm">Telefon</p>
                    <a
                      href="tel:+905551234567"
                      className="text-[#044c5c] hover:text-orange-600 transition-colors duration-200 text-sm font-medium"
                    >
                      +90 555 123 45 67
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 shadow-lg">
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-[#37747c] text-sm">Adres</p>
                    <p className="text-[#044c5c] text-sm font-medium leading-relaxed">
                      Teknoloji Caddesi No:123
                      <br />
                      Ankara, Türkiye
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-purple-200/50">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 backdrop-blur-sm rounded-3xl p-8 border border-purple-200/30">
              <div className="text-center max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Güncellemelerden Haberdar Ol
                </h3>
                <p className="text-[#37747c] mb-6 leading-relaxed">
                  Yeni quizler, özellikler ve eğitim içerikleri hakkında bilgi almak için bültenimize abone ol.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <div className="flex-1 relative">
                    <input
                      type="email"
                      placeholder="E-posta adresiniz"
                      className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-purple-200 rounded-xl text-[#044c5c] placeholder-[#37747c] focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400 transition-all duration-200"
                    />
                  </div>
                  <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 group shadow-lg hover:shadow-xl">
                    Abone Ol
                    <ExternalLink className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-purple-200/50">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Copyright */}
              <div className="flex items-center gap-2 text-[#37747c] text-sm">
                <span>© {currentYear} QuizPortal.</span>
                <span>Tüm hakları saklıdır.</span>
                
              </div>

              {/* Legal Links */}
              <div className="flex items-center gap-6">
                {[
                  { label: "Gizlilik Politikası", href: "/privacy" },
                  { label: "Kullanım Koşulları", href: "/terms" },
                  { label: "Çerez Politikası", href: "/cookies" },
                ].map(({ label, href }) => (
                  <Link
                    key={label}
                    to={href}
                    className="text-[#37747c] hover:text-[#044c5c] transition-colors duration-200 text-sm"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

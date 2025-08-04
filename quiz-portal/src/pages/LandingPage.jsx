import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LandingPage = () => {
  const { isAuthenticated, role } = useAuth();
  return (
    <>
      <Header />

      {/* Hero Section */}
      <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-purple-100 via-white to-orange-100 flex flex-col items-center justify-center px-4 text-center relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-400/20 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-orange-400/15 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-pink-400/15 rounded-full blur-xl"></div>
        <div className="absolute bottom-40 right-1/3 w-24 h-24 bg-blue-400/20 rounded-full blur-xl"></div>

        {/* Main Content */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-[#044c5c] via-purple-600 to-orange-500 bg-clip-text text-transparent mb-6 leading-tight">
            Kendini Test Et,
            <br />
            <span className="text-4xl sm:text-5xl lg:text-6xl bg-gradient-to-r from-pink-500 via-[#21817c] to-blue-600 bg-clip-text text-transparent">
              Öğrenmeye Devam Et!
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-[#2d6c74] mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            QuizPortal ile bilgini sınayabilir, gelişimini takip edebilir ve
            kendine
            <span className="text-[#044c5c] font-semibold">
              {" "}
              meydan okuyabilirsin.
            </span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col items-center gap-8">
              {isAuthenticated ? (
                <Link
                  to={
                    role === "student"
                      ? "/student"
                      : role === "teacher"
                      ? "/teacher"
                      : "/"
                  }
                  className="group bg-gradient-to-r from-[#0f766e] to-[#065f46] text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Profilime Git
                </Link>
              ) : (
                <>
                  <div className="flex flex-col sm:flex-row gap-6">
                    <Link
                      to="/login"
                      className="group bg-white/90 backdrop-blur-sm border-2 border-orange-400 text-orange-600 hover:text-white hover:bg-orange-500 font-semibold px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      Giriş Yap
                    </Link>
                    
                    <Link
                      to="/register"
                      className="group bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 border border-blue-500"
                    >
                      Kayıt Ol
                    </Link>
                  </div>

                  <Link
                    to="/quiz-list"
                    className="group bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 border-2 border-purple-600 relative overflow-hidden"
                  >
                    <span className="relative z-10">Quizlere Göz At</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Floating Cards */}
        <div className="absolute top-1/4 left-8 hidden lg:block">
          <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-purple-400/30 transform rotate-12 hover:rotate-6 transition-transform duration-300">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mb-2"></div>
            <div className="w-16 h-2 bg-purple-200 rounded"></div>
            <div className="w-12 h-2 bg-pink-200 rounded mt-1"></div>
          </div>
        </div>

        <div className="absolute top-1/3 right-8 hidden lg:block">
          <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-orange-400/30 transform -rotate-12 hover:-rotate-6 transition-transform duration-300">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full mb-2"></div>
            <div className="w-16 h-2 bg-orange-200 rounded"></div>
            <div className="w-12 h-2 bg-yellow-200 rounded mt-1"></div>
          </div>
        </div>

        <div className="absolute bottom-1/4 left-1/4 hidden lg:block">
          <div className="bg-white/60 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-blue-400/30 transform rotate-6 hover:rotate-3 transition-transform duration-300">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mb-1"></div>
            <div className="w-12 h-1.5 bg-blue-200 rounded"></div>
            <div className="w-8 h-1.5 bg-cyan-200 rounded mt-0.5"></div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1200 120"
            className="w-full h-20 fill-purple-500/20"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
            ></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
          </svg>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-indigo-50 to-rose-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-[#044c5c] mb-16">
            Neden{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent ">
              QuizPortal?
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-6">
            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-purple-200 transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🧠</span>
              </div>
              <h3 className="text-2xl font-bold text-[#044c5c] mb-4">
                Öğrenme Odaklı
              </h3>
              <p className="text-[#37747c] leading-relaxed">
                Her quiz sonrasında detaylı açıklamalar ve doğru cevaplar ile
                bilgini pekiştir.
              </p>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-orange-200 transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-2xl font-bold text-[#044c5c] mb-4">
                İlerleme Takibi
              </h3>
              <p className="text-[#37747c] leading-relaxed">
                Performansını izle, güçlü ve zayıf alanlarını keşfet, gelişimini
                gözlemle.
              </p>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-blue-200 transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-2xl font-bold text-[#044c5c] mb-4">
                Rekabet Ruhu
              </h3>
              <p className="text-[#37747c] leading-relaxed">
                Diğer kullanıcılarla yarış, liderlik tablolarında yerini al ve
                başarılarını sergile.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default LandingPage;

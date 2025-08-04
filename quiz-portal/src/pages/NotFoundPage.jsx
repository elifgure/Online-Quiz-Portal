import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NotFoundPage = () => {
  const { isAuthenticated, role } = useAuth();

  return (
    <>
      {/* 404 Section */}
      <div className="min-h-[calc(100vh)] bg-gradient-to-br from-purple-100 via-white to-orange-100 flex flex-col items-center justify-center px-4 text-center relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-orange-400/15 rounded-full blur-xl animate-pulse delay-300"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-pink-400/15 rounded-full blur-xl animate-pulse delay-500"></div>
        <div className="absolute bottom-40 right-1/3 w-24 h-24 bg-blue-400/20 rounded-full blur-xl animate-pulse delay-700"></div>

        {/* Main Content */}
        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Large 404 Number */}
          <div className="text-8xl sm:text-9xl lg:text-[12rem] font-bold bg-gradient-to-r from-[#044c5c] via-purple-600 to-orange-500 bg-clip-text text-transparent mb-8 leading-none animate-bounce">
            404
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-pink-500 via-[#21817c] to-blue-600 bg-clip-text text-transparent mb-6 leading-relaxed py-4">
            Sayfa Bulunamadı!
          </h1>

          <p className="text-xl sm:text-2xl text-[#2d6c74] mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            Aradığınız sayfa kaybolmuş gibi görünüyor.
            <span className="text-[#044c5c] font-semibold">
              {" "}
              Endişelenmeyin, size yardımcı olabiliriz!
            </span>
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col sm:flex-row gap-6">
              <Link
                to="/"
                className="group bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 border-2 border-purple-600 relative overflow-hidden"
              >
                <span className="relative z-10">🏠 Ana Sayfaya Dön</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </Link>

              {isAuthenticated ? (
                <Link
                  to={
                    role === "student"
                      ? "/student"
                      : role === "teacher"
                      ? "/teacher"
                      : "/"
                  }
                  className="group bg-gradient-to-r from-[#0f766e] to-[#065f46] hover:from-[#134e4a] hover:to-[#052e16] text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  📊 Profilime Git
                </Link>
              ) : (
                <Link
                  to="/quiz-list"
                  className="group bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 relative overflow-hidden"
                >
                  <span className="relative z-10">🧠 Quizlere Göz At</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </Link>
              )}
            </div>

            {/* Help Text */}
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-blue-200 max-w-md">
              <p className="text-[#37747c] text-sm">
                💡 <strong>İpucu:</strong> URL'yi kontrol edin veya ana sayfadan
                istediğiniz bölüme ulaşmayı deneyin.
              </p>
            </div>
          </div>
        </div>

        {/* Floating Error Elements */}
        <div className="absolute top-1/4 left-8 hidden lg:block">
          <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-red-400/30 transform rotate-12 hover:rotate-6 transition-transform duration-300 animate-float">
            <div className="text-2xl mb-2">❌</div>
            <div className="w-16 h-2 bg-red-200 rounded"></div>
            <div className="w-12 h-2 bg-pink-200 rounded mt-1"></div>
          </div>
        </div>

        <div className="absolute top-1/3 right-8 hidden lg:block">
          <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-orange-400/30 transform -rotate-12 hover:-rotate-6 transition-transform duration-300 animate-float delay-200">
            <div className="text-2xl mb-2">🔍</div>
            <div className="w-16 h-2 bg-orange-200 rounded"></div>
            <div className="w-12 h-2 bg-yellow-200 rounded mt-1"></div>
          </div>
        </div>

        <div className="absolute bottom-1/4 left-1/4 hidden lg:block">
          <div className="bg-white/60 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-blue-400/30 transform rotate-6 hover:rotate-3 transition-transform duration-300 animate-float delay-500">
            <div className="text-xl mb-1">🤔</div>
            <div className="w-12 h-1.5 bg-blue-200 rounded"></div>
            <div className="w-8 h-1.5 bg-cyan-200 rounded mt-0.5"></div>
          </div>
        </div>

        {/* Animated Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1200 120"
            className="w-full h-20 fill-purple-500/20"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
            >
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                values="0 0;50 0;0 0"
                dur="10s"
                repeatCount="indefinite"
              />
            </path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
            >
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                values="0 0;-30 0;0 0"
                dur="8s"
                repeatCount="indefinite"
              />
            </path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                values="0 0;25 0;0 0"
                dur="12s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(12deg);
          }
          50% {
            transform: translateY(-10px) rotate(12deg);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-500 {
          animation-delay: 0.5s;
        }
      `}</style>
    </>
  );
};

export default NotFoundPage;

import Header from "../components/Layout/Header";
import { Link } from "react-router-dom";


const LandingPage = () => {
  return (
   <>
      <Header />

      <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-white to-blue-100 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-700 mb-4">
          Kendini test et, öğrenmeye devam et!
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-xl">
          Quiz Portalı ile bilgini sınayabilir, gelişimini takip edebilir ve kendine meydan okuyabilirsin.
        </p>

        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/quizzes"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl transition"
            >
              Quizlere Göz At
            </Link>
            <Link
              to="/auth/login"
              className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium px-6 py-3 rounded-xl transition"
            >
              Giriş Yap
            </Link>
            <Link
              to="/auth/register"
              className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium px-6 py-3 rounded-xl transition"
            >
              Kayıt Ol
            </Link>
          </div>
          
          <Link 
            to="/create-quiz"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl transition mt-4"
          >
            Quiz Oluştur
          </Link>
        </div>
      </div>
    </>
  )
}

export default LandingPage

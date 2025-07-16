import { Link } from 'react-router-dom'
import logo from "../../assets/logo-transparent.png"
import OrnekQuiz from '../../components/Quiz/OrnekQuiz'
import { useAuth } from "../../context/AuthContext";
import { useSelector } from "react-redux";

const QuizPage = () => {
  const { userName } = useAuth();
  const activeQuiz = useSelector((state) => state.activeQuiz);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/60 via-white to-rose-100/60 relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-purple-400/20 rounded-full blur-xl z-0"></div>
      <div className="absolute top-40 right-20 w-48 h-48 bg-orange-400/15 rounded-full blur-xl z-0"></div>
      <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-pink-400/15 rounded-full blur-xl z-0"></div>
      <header className="relative z-10 w-full bg-white/90 shadow-sm px-6 flex items-center justify-between py-3">
        <Link to="/" className="logo flex items-center gap-2">
          <img src={logo} alt="Quiz Portal Logo" className='h-16 w-16 object-contain' />
        </Link>
        <nav className="flex items-center gap-4">
          <Link to="/student-quizzes" className="text-gray-700 hover:text-purple-600 transition font-medium">Quizlerim</Link>
          {userName && (
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full font-semibold shadow text-sm">
              {userName}
            </span>
          )}
        </nav>
      </header>
      {activeQuiz?.title && (
        <div className="relative z-10 w-full flex justify-center mt-8 mb-4">
          <span className="text-xl sm:text-2xl font-bold px-5 py-2 rounded-xl bg-gradient-to-r from-purple-100 via-white to-pink-100 border border-purple-100 shadow text-[#5a2770] tracking-wide">
            {activeQuiz.title}
          </span>
        </div>
      )}
      <div className="relative z-10 max-w-2xl mx-auto pb-12">
        <OrnekQuiz />
      </div>
    </div>
  )
}

export default QuizPage
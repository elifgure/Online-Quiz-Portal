import { Link } from 'react-router-dom'
import logo from "../../assets/logo-transparent.png"
import OrnekQuiz from '../../components/Quiz/OrnekQuiz'
import { useAuth } from "../../context/AuthContext";

const QuizPage = () => {
  const { userName } = useAuth();
  return (
    <>
      <header className="w-full bg-white shadow-sm px-6 flex flex-col sm:flex-row justify-between items-center py-3 gap-2 sm:gap-0">
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
      <OrnekQuiz />
    </>
  )
}

export default QuizPage
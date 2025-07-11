import { Link } from 'react-router-dom'
import logo from "../../assets/logo-transparent.png"
import OrnekQuiz from '../../components/Quiz/OrnekQuiz'

const QuizPage = () => {
  return (
    <>
<header className="w-full bg-white shadow-sm  px-6 flex justify-between items-center">
    <Link to="/" className="logo">
        <img src={logo} alt="" className='size-32 object-cover'/>
    </Link>
    <nav className="hidden sm:flex gap-4">
        <a href="/my-quizzes" className="text-gray-700 hover:text-blue-600 transition">Quizlerim</a>
        <Link to="/">Giriş</Link>
        </nav>
        </header>
         <OrnekQuiz />
    </>
   
  )
}

export default QuizPage
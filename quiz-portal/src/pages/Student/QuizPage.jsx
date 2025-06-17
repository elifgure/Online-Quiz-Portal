import React from 'react'
import OrnekQuiz2 from '../../components/Quiz/OrnekQuiz2'
import QuizCard from '../../components/Quiz/OrnekQuiz'

const QuizPage = () => {
  return (
    <>
<header className="w-full bg-white shadow-sm py-4 px-6 flex justify-between items-center">
    <div className="logo">
        <a href="" className='text-2xl font-bold text-blue-600'>QuizPortal</a>
    </div>
    <nav className="hidden sm:flex gap-4">
        <a href="/my-quizzes" className="text-gray-700 hover:text-blue-600 transition">Quizlerim</a>
        <a href="/create-quiz" className="text-gray-700 hover:text-blue-600 transition">Login</a>
        </nav>
        </header>
         <QuizCard />
    </>
   
  )
}

export default QuizPage
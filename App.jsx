import { Route, Routes } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import LoginForm from "./components/Forms/LoginForm"
import LoginPage from "./pages/Auth/LoginPage"
import Roles from "./pages/roles"
import FormsPage from "./pages/FormsPage"
import FormCreate from "./components/Forms/FormCreate"
import QuizPage from "./pages/Student/QuizPage"
import RegisterPage from "./pages/Auth/RegisterPage"


function App() { 
  return (
    <>
      <Routes>
        <Route path="/roles" element={<Roles />}/>
        <Route path="/" element={<LandingPage />}/>
          <Route path="/register" element={<RegisterPage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/create-quiz" element={<FormCreate />}/>
        <Route path="/quizzes" element={<QuizPage />}/>
      </Routes>
    </>
  )
}

export default App

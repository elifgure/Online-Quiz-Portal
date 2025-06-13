import { Route, Routes } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import LoginForm from "./components/Forms/LoginForm"
import LoginPage from "./pages/Auth/LoginPage"


function App() { 
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="/login" element={<LoginPage />}/>
      </Routes>
    </>
  )
}

export default App

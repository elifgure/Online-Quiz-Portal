import { Route, RouterProvider, Routes } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Roles from "./pages/roles"
import FormCreate from "./components/Forms/FormCreate"
import QuizPage from "./pages/Student/QuizPage"
import router from "./routes/router"


function App() { 
  return (
    <>
      {/* <Routes>
        <Route path="/roles" element={<Roles />}/>
        <Route path="/create-quiz" element={<FormCreate />}/>
        <Route path="/quizzes" element={<QuizPage />}/>
      </Routes> */}
      
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <RouterProvider router={router} />
    </>
  )
}

export default App

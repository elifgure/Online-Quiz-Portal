import { RouterProvider} from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import router from "./routes/router"
import { AuthProvider } from "./context/AuthContext"


function App() { 
  return (
    <>
      
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
     <AuthProvider>
       <RouterProvider router={router} />
     </AuthProvider>
    </>
  )
}

export default App

import QuizCard from "../components/Quiz/OrnekQuiz";
import LandingPage from "../pages/LandingPage";
import QuizPage from "../pages/Student/QuizPage";
import StudentPage from "../pages/Student/StudentPage";

const mainRoutes =[
    {
        path: "/",
        element:<LandingPage />,
    },{
        path:"/quizzes",
        element:<QuizPage />
    },
    {
        path:"/student",
        element:<StudentPage/>
    }
]
export default mainRoutes;
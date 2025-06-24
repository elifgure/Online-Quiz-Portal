import QuizCard from "../components/Quiz/OrnekQuiz";
import LandingPage from "../pages/LandingPage";
import QuizListPage from "../pages/QuizListPage";
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
    },
    {
        path:"quiz-list",
        element: <QuizListPage />
    }
]
export default mainRoutes;
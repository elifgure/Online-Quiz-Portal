import FormBuilder from "../components/Forms/FormBuilder";
import FormCreate from "../components/Forms/FormCreate";
import QuizCard from "../components/Quiz/OrnekQuiz";
import LandingPage from "../pages/LandingPage";
import QuizListPage from "../pages/QuizListPage";
import QuizPage from "../pages/Student/QuizPage";
import StudentPage from "../pages/Student/StudentPage";
import TeacherPage from "../pages/Teacher/TeacherPage";

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
    },
    {
        path:"create-quiz",
        element:<FormBuilder />
    },
      {
        path:"create-quiz2",
        element:<FormCreate />
    },
    {
        path:"teacher",
        element:<TeacherPage />
    }
]
export default mainRoutes;

import FormCreate from "../components/Forms/FormCreate";
import QuizCard from "../components/Quiz/OrnekQuiz";
import LandingPage from "../pages/LandingPage";
import QuizListPage from "../pages/QuizListPage";
import QuizPage from "../pages/Student/QuizPage";
import StudentPage from "../pages/Student/StudentPage";
import MyQuiz from "../pages/Teacher/MyQuiz";
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
        path:"create-quiz2",
        element:<FormCreate />
    },
    {
        path:"teacher",
        element:<TeacherPage />
    },
    {
        path:"my-quiz",
        element:<MyQuiz />
    },

]
export default mainRoutes;
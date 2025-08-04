import FormCreate from "../components/Forms/FormCreate";
import LandingPage from "../pages/LandingPage";
import QuizListPage from "../pages/QuizListPage";
import QuizPage from "../pages/Student/QuizPage";
import StudentPage from "../pages/Student/StudentPage";
import StudentQuizzesPage from "../components/Student/StudentQuizzes";
import MyQuiz from "../pages/Teacher/MyQuiz";
import TeacherPage from "../pages/Teacher/TeacherPage";
import ResultsPage from "../pages/Student/ResultsPage";
import ReportsPage from "../pages/Teacher/ReportsPage";

const mainRoutes = [
  {
    path: "/",
    element: <LandingPage />,
    shouldProtect: false,
  },
  {
    path: "/quiz1",
    element: <QuizPage />,
  },
  {
    path: "/student",
    element: <StudentPage />,
  },
  {
    path: "quiz-list",
    element: <QuizListPage />,
  },

  {
    path: "create-quiz2",
    element: <FormCreate />,
  },
  {
    path: "teacher",
    element: <TeacherPage />,
  },
  {
    path: "my-quiz",
    element: <MyQuiz />,
  },
  {
    path: "student-quizzes",
    element: <StudentQuizzesPage />,
  },
  {
    path: "/results",
    element: <ResultsPage />,
  },
  {
    path: "/treports",
    element: <ReportsPage />,
  },
];
export default mainRoutes;

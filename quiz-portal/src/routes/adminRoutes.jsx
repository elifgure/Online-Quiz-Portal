import AdminLayout from "../layouts/AdminLayout";
import AdminHomePage from "../pages/Admin/AdminHomePage";
import EditQuizPage from "../pages/Admin/EditQuizPage";
import QuizDetailPage from "../pages/Admin/QuizDetailPage";
import QuizzesPage from "../pages/Admin/QuizzesPage";
import ReportsPage from "../pages/Admin/ReportsPage";
import UsersPage from "../pages/Admin/UsersPage";

const adminRoutes = [
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminHomePage />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "quizzes",
        element: <QuizzesPage />,
      },
      {
        path: "quizzes/detail/:quizId",
        element: <QuizDetailPage />,
      },
       {
        path: "edit-quiz/:quizId",
        element: <EditQuizPage />,
      },
      {
        path: 'reports',
        element: <ReportsPage />,
      },
    ],
  },
];

export default adminRoutes;

import AdminLayout from '../layouts/AdminLayout';
import AdminHomePage from '../pages/Admin/AdminHomePage';
import UsersPage from '../pages/Admin/UsersPage';

const adminRoutes = [
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true, 
        element: <AdminHomePage />, 
      },
      {
        path: 'users',
        element: <UsersPage />,
      },
      // {
      //   path: 'quizzes',
      //   element: <QuizzesPage />,
      // },
      // {
      //   path: 'settings',
      //   element: <SettingsPage />,
      // },
      // {
      //   path: 'reports',
      //   element: <ReportsPage />,
      // },
    ],
  },
];

export default adminRoutes;

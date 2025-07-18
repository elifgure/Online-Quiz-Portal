// src/routes/router.jsx
import { createBrowserRouter } from "react-router-dom";
import mainRoutes from "./mainRoutes";
import authRoutes from "./authRoutes";
import adminRoutes from "./adminRoutes";

import ProtectedRoute from "../components/guards/ProtectedRoute";
import RoleBasedRoute from "../components/guards/RoleBasedRoute";


const teacherOnlyRoutes = ["teacher", "create-quiz2", "my-quiz"];
const studentOnlyRoutes = ["student", "student-quizzes"];

const wrapWithGuards = (routes) =>
  routes.map((route) => {
     
    // Öğretmen koruması
    if (teacherOnlyRoutes.includes(route.path)) {
      return {
        ...route,
        element: (
          <RoleBasedRoute requiredRole="teacher">
            {route.element}
          </RoleBasedRoute>
        ),
      };
    }

    // Öğrenci koruması
    if (studentOnlyRoutes.includes(route.path)) {
      
      return {
        ...route,
        element: (
          <RoleBasedRoute requiredRole="student">
            {route.element}
          </RoleBasedRoute>
        ),
      };
    }

    // Diğer main/admin route'lar için login yeterli
   
    return {
      ...route,
      element: (
        <ProtectedRoute>
          {route.element}
        </ProtectedRoute>
      ),
    };
  });

const router = createBrowserRouter([
  ...authRoutes, 

  ...wrapWithGuards(mainRoutes),
  ...wrapWithGuards(adminRoutes),

  {
    path: "*",
    element: <h1>404 Not Found</h1>,
  },
]);

export default router;


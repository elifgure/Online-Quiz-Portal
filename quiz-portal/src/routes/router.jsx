import { createBrowserRouter } from "react-router-dom";
import mainRoutes from "./mainRoutes";
import authRoutes from "./authRoutes";
import adminRoutes from "./adminRoutes";

import ProtectedRoute from "../components/guards/ProtectedRoute";
import RoleBasedRoute from "../components/guards/RoleBasedRoute";
import NotFoundPage from "../pages/NotFoundPage";

const teacherOnlyRoutes = ["teacher", "create-quiz2", "my-quiz"];
const studentOnlyRoutes = ["student", "student-quizzes"];
const adminOnlyRoutes = ["admin", "users", "quizzes", "edit-quiz", "reports"];

const getBasePath = (path) => {
  if (!path) return "";
  const parts = path.startsWith("/")
    ? path.slice(1).split("/")
    : path.split("/");
  return parts[0];
};

const wrapWithGuards = (routes) =>
  routes.map((route) => {
    const basePath = getBasePath(route.path);
    let element = route.element;

    if (route.shouldProtect === false) {
      return route;
    }

    if (adminOnlyRoutes.includes(basePath)) {
      element = <RoleBasedRoute requiredRole="admin">{element}</RoleBasedRoute>;
    } else if (teacherOnlyRoutes.includes(basePath)) {
      element = (
        <RoleBasedRoute requiredRole="teacher">{element}</RoleBasedRoute>
      );
    } else if (studentOnlyRoutes.includes(basePath)) {
      element = (
        <RoleBasedRoute requiredRole="student">{element}</RoleBasedRoute>
      );
    } else {
      element = <ProtectedRoute>{element}</ProtectedRoute>;
    }

    return {
      ...route,
      element,
      children: route.children ? wrapWithGuards(route.children) : undefined,
    };
  });

const router = createBrowserRouter([
  ...authRoutes,

  ...wrapWithGuards(mainRoutes),
  ...wrapWithGuards(adminRoutes),

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;

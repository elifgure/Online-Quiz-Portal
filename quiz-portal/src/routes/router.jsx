import { createBrowserRouter } from "react-router-dom";
import mainRoutes from "./mainRoutes";
import authRoutes from "./authRoutes";
import adminRoutes from "./adminRoutes";

const router = createBrowserRouter([
  ...mainRoutes,
  ...authRoutes,
  ...adminRoutes,
  {
    path: "*",
    element: <h1>404 Not Found</h1>,
  },
]);
export default router;

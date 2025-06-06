import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Home Page</h1>,
    // use component instead
    children: [
      {
        path: "auth",
        // Component: AuthLayout,
        element: <h1>Auth Layout</h1>,

        children: [
          {
            path: "login",
            // Component: LoginPage
            element: <h1>Login Page</h1>,
          },
        ],
      },
      {
        index: true,
        // Component: DashboardPage,
        element: <h2>Dashboard Page</h2>,
      },
    ],
  },
]);

export default router;

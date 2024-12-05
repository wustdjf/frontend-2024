import {
  createBrowserRouter,
  Navigate,
  type RouteObject,
} from "react-router-dom";

const routes: RouteObject[] = [
  {
    path: "/",
    lazy: async () => ({
      Component: (await import("@/layout")).default,
    }),
    children: [
      {
        index: true,
        element: <Navigate replace to="/main" />,
      },
      {
        path: "main",
        lazy: async () => ({
          Component: (await import("@/pages/main")).default,
        }),
      },

      {
        path: "/detail/:id",
        lazy: async () => ({
          Component: (await import("@/pages/detail")).default,
        }),
      },
    ],
  },
];

export const router = createBrowserRouter(routes, {
  basename: import.meta.env.VITE_APP_BASE_URL,
});

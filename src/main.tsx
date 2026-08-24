import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import "./global.css";

import Pomodoro from "./app/pomodoro/Pomodoro";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Pomodoro />,
  },
]);

// when use StrictMode, useEffect is called twice in development mode, it bugs the pomodoro timer!
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

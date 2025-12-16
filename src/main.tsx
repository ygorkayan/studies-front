import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import "./global.css";
import App from "./app/App";
import Pomodoro from "./app/pomodoro/Pomodoro";
import FlashCards from "./app/flash-cards/FlashCards";
import Login from "./app/login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/pomodoro",
    element: <Pomodoro />,
  },
  {
    path: "/flash-cards",
    element: (
      <Login>
        <FlashCards />
      </Login>
    ),
  },
]);

// when use StrictMode, useEffect is called twice in development mode, it bugs the pomodoro timer!
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

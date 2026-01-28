import { createBrowserRouter } from "react-router";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Chat from "./pages/Chat";
import Welcome from "./pages/Welcome";
import Protect from "./components/Protect";
import PublicRoute from "./components/Public";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protect>
        <Welcome />
      </Protect>
    ),
  },
  {
    path: "/signin",
    element: (
      <PublicRoute>
        <SignIn />
      </PublicRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <PublicRoute>
        <SignUp />
      </PublicRoute>
    ),
  },
  {
    path: "/chat",
    element: (
      <Protect>
        <Chat />
      </Protect>
    ),
  },
]);

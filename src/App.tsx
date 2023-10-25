import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RegisterPage } from "./pages/RegisterPage";
import { FormPage } from "./pages/FormPage";
import { EditFormPage } from "./pages/EditFormPage";
import { SignInPage } from "./pages/SignInPage";
import { HomePage } from "./pages/HomePage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAppDispatch } from "./store/hooks";
import { login, logout } from "./store/authSlice";
import { UsersPage } from "./pages/UsersPage";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ErrorPage } from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },

  {
    path: "signup",
    element: <RegisterPage />,
    errorElement: <ErrorPage />,
  },

  {
    path: "signIn",
    element: <SignInPage />,
    errorElement: <ErrorPage />,
  },

  { path: "createUser", element: <FormPage />, errorElement: <ErrorPage /> },

  {
    path: "listOfUsers",
    element: <UsersPage />,
    errorElement: <ErrorPage />,
  },

  {
    path: "editUser/",
    element: <EditFormPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ":id",
        element: <EditFormPage />,
      },
    ],
  },
]);

export const App = () => {
  const dispatch = useAppDispatch();
  const auth = getAuth();
  useEffect(() => {
    const listener = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(login());
      } else {
        dispatch(logout());
      }
    });

    return () => {
      listener();
    };
  }, [auth, dispatch]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export const AppWithStore = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
};

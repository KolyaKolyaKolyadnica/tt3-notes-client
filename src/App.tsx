import React, { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  useRoutes,
  Navigate,
} from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import NotePage from "./pages/NotePage/NotePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import style from "./App.module.css";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { useAppSelector } from "./hooks/useAppSelector";
import { checkAuth } from "./redux/auth/authOptions";
import api from "./api/notesApi";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { PublicRoute } from "./components/PublicRoute/PublicRoute";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const dispatch = useAppDispatch();
  const storeAuth = useAppSelector((store) => store.auth);
  const { notes, isLoading, error } = useAppSelector((store) => store.notes);

  let navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("notes-token");
    if (accessToken) {
      dispatch(checkAuth());
      // navigate("note");
    }
    // navigate("/auth");
  }, []);

  useEffect(() => {
    if (!error || isLoading) return;
    toast.error(error);
  }, [error]);

  useEffect(() => {
    if (!storeAuth.error || storeAuth.isLoading) return;

    if (storeAuth.error?.statusCode !== 401) {
      toast.error("Your problems is: " + storeAuth.error.message);
    }

    if (storeAuth.error?.statusCode === 401) {
      navigate("/auth");
    }
  }, [storeAuth.error]);

  const pages = useRoutes([
    {
      element: <Navigation />,
      children: [
        { path: "/", element: <NotePage /> },
        { path: "auth", element: <LoginPage /> },
        { path: "/*", element: <div>Not found</div> },
      ],
    },
  ]);

  return (
    // <React.StrictMode>
    <div className={style.App}>
      {pages}
      <ToastContainer />
    </div>
    // </React.StrictMode>
  );
}

export default App;

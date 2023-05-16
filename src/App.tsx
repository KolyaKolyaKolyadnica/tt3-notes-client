import { useEffect, useState } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import NotePage from "./pages/NotePage/NotePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import style from "./App.module.css";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { useAppSelector } from "./hooks/useAppSelector";
import api from "./api/notesApi";
import { checkAuth } from "./redux/auth/authOptions";

function App() {
  const dispatch = useAppDispatch();
  const { isAutorizated } = useAppSelector((store) => store.auth);

  let navigate = useNavigate();

  useEffect(() => {
    console.log("mount");

    if (localStorage.getItem("notes-token")) {
      dispatch(checkAuth());
    }
  }, []);

  useEffect(() => {
    isAutorizated ? navigate("note") : navigate("");
  }, [isAutorizated]);

  const pages = useRoutes([
    {
      element: <Navigation />,
      children: [
        { path: "/", element: <LoginPage /> },
        { path: "note", element: <NotePage /> },
        { path: "/*", element: <div>Not found</div> },
      ],
    },
  ]);
  return <div className={style.App}>{pages}</div>;
}

export default App;

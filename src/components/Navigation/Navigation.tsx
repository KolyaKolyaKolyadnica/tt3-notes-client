import {
  Outlet,
  useLocation,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { useState } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { logout } from "../../redux/auth/authOptions";
import { claerNotesFromRedux } from "../../redux/notes/notesOptions";
import style from "./Navigation.module.css";

type ContextType = { isUserNeedRegistration: boolean };

export default function Navigation() {
  const dispatch = useAppDispatch();
  const [isUserNeedRegistration, setIsUserNeedRegistration] = useState(false);

  let location = useLocation();
  let navigate = useNavigate();

  const { user } = useAppSelector((store) => store.auth);
  const clickOnLogoutBtn = () => {
    dispatch(logout());
    localStorage.removeItem("notes-token");

    dispatch(claerNotesFromRedux());
    navigate("/auth");
  };

  return (
    <>
      <header className={style.header}>
        <p className={style.text}>
          {location.pathname === "/" && user.username}
        </p>

        {location.pathname === "/" ? (
          <button className={style.buttons} onClick={clickOnLogoutBtn}>
            Logout
          </button>
        ) : (
          <div className={style.btnGroup}>
            <button
              className={isUserNeedRegistration ? style.active : style.buttons}
              onClick={() => setIsUserNeedRegistration(true)}
            >
              Sign in
            </button>
            <button
              className={!isUserNeedRegistration ? style.active : style.buttons}
              onClick={() => setIsUserNeedRegistration(false)}
            >
              Log in
            </button>
          </div>
        )}
      </header>

      <Outlet context={{ isUserNeedRegistration }} />
    </>
  );
}

export function useButtonFunction() {
  return useOutletContext<ContextType>();
}

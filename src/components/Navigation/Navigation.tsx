import { Outlet, useOutletContext } from "react-router-dom";
import { useState } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { logout } from "../../redux/auth/authOptions";
import style from "./Navigation.module.css";

type ContextType = { isUserNeedRegistration: boolean };

export default function Navigation() {
  const dispatch = useAppDispatch();
  const { isAutorizated } = useAppSelector((store) => store.auth);
  const [isUserNeedRegistration, setIsUserNeedRegistration] = useState(false);

  const clickOnLogoutBtn = () => {
    dispatch(logout());
    localStorage.removeItem("notes-token");
  };

  return (
    <>
      <header className={style.header}>
        <p className={style.text}>{false && "Username"}</p>

        {isAutorizated ? (
          <button className={style.buttons} onClick={clickOnLogoutBtn}>
            Logout
          </button>
        ) : (
          <div className={style.btnGroup}>
            <button
              className={style.buttons}
              onClick={() => setIsUserNeedRegistration(true)}
            >
              Sign in
            </button>
            <button
              className={style.buttons}
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

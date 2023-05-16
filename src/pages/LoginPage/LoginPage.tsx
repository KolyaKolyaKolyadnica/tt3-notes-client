import { useEffect, useState } from "react";
import style from "./LoginPage.module.css";
import api from "../../api/notesApi";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useButtonFunction } from "../../components/Navigation/Navigation";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { login, registration } from "../../redux/auth/authOptions";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const { isAutorizated } = useAppSelector((store) => store.auth);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isUserNeedRegistration } = useButtonFunction();

  let navigate = useNavigate();
  useEffect(() => {
    isAutorizated ? navigate("note") : navigate("");
  }, [isAutorizated]);
  // if (isAutorizated) {
  //   navigate("note");
  // }

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userBody = {
      username,
      email,
      password,
    };

    isUserNeedRegistration
      ? dispatch(registration(userBody))
      : dispatch(login(userBody));

    setUsername("");
    setEmail("");
    setPassword("");

    navigate("note");
  };
  return (
    <form className={style.form} onSubmit={submit}>
      {isUserNeedRegistration && (
        <div className={style.inputContainer}>
          <p className={style.comment}>User name</p>
          <input
            type="input"
            placeholder="User name"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            className={style.input}
          />
        </div>
      )}

      <div className={style.inputContainer}>
        <p className={style.comment}>Email</p>
        <input
          type="input"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className={style.input}
        />
      </div>

      <div className={style.inputContainer}>
        <p className={style.comment}>Password (min 6 symbols)</p>
        <input
          autoComplete="on"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className={style.input}
        />
      </div>

      {isUserNeedRegistration ? (
        <button type="submit" className={style.button}>
          Registration
        </button>
      ) : (
        <button type="submit" className={style.button}>
          Login
        </button>
      )}
    </form>
  );
}
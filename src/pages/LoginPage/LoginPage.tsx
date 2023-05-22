import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useButtonFunction } from "../../components/Navigation/Navigation";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { login, registration } from "../../redux/auth/authOptions";
import Form from "../../components/Form/Form";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const { isAutorizated, isLoading } = useAppSelector((store) => store.auth);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isUserNeedRegistration } = useButtonFunction();

  let navigate = useNavigate();

  useEffect(() => {
    if (isAutorizated && !isLoading) {
      navigate("/");
    }
  }, [isAutorizated]);

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
  };
  return (
    <Form
      isUserNeedRegistration={isUserNeedRegistration}
      submit={submit}
      username={username}
      setUsername={setUsername}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      isLoading={isLoading}
    />
  );
}

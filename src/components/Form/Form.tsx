import style from "./Form.module.css";
interface IFormProps {
  isUserNeedRegistration: boolean;
  submit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
}

export default function Form({
  isUserNeedRegistration,
  submit,
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  isLoading,
}: IFormProps) {
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
          type="email"
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
          pattern="^().{6,}"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className={style.input}
        />
      </div>

      {isUserNeedRegistration ? (
        <button type="submit" className={style.button}>
          {isLoading ? "Loading..." : "Registration"}
        </button>
      ) : (
        <button type="submit" className={style.button}>
          {isLoading ? "Loading..." : "Login"}
        </button>
      )}
    </form>
  );
}

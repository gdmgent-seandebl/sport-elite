import React, { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../../core/modules/auth/auth.api";
import { User } from "../../core/modules/auth/auth.types";
import style from "./Login.module.css";

interface LoginProps {
  onLogin: (user: User, token: string, refreshtoken: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await login({ email, password });
      const { user, token, refreshtoken } = response.data;
      onLogin(user, token, refreshtoken);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className={style["content-wrapper"]}>
      <form onSubmit={handleLoginSubmit} className={style["form-container"]}>
        <h2>Login</h2>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className={style["buttons"]}>
          <button className={style["primary"]} type="submit">
            Login
          </button>
          <div className={style["register"]}>
            <span>Not yet registered?</span>
            <Link to="/register">
              <button className={style["secondary"]}>Register</button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;

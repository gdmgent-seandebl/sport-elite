import React, { useState } from "react";
import { Link } from "react-router-dom";
import { register, login } from "../../core/modules/auth/auth.api";
import { User } from "../../core/modules/auth/auth.types";
import style from "./Login.module.css";

interface LoginProps {
  onLogin: (user: User, token: string, refreshtoken: string) => void;
}

const Register: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSeller, setIsSeller] = useState(false);

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await register({ email, password, name, seller: isSeller });
      const loginResponse = await login({ email, password });
      const { user, token, refreshtoken } = loginResponse.data;
      onLogin(user, token, refreshtoken);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className={style["content-wrapper"]}>
      <form onSubmit={handleRegister} className={style["form-container"]}>
        <h2>Register</h2>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <div>
          <label>
            <input
              type="checkbox"
              checked={isSeller}
              onChange={(e) => setIsSeller(e.target.checked)}
            />
            Register as seller
          </label>
        </div>
        <div className={style["buttons"]}>
          <button className={style["primary"]} type="submit">
            Register
          </button>
          <div className={style["login"]}>
            <span>Already have an account?</span>
            <Link to="/login">
              <button className={style["secondary"]}>Login</button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;

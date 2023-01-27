import React, { useState } from "react";
import { logInWithEmailAndPassword } from "../firebase";
import logo from "../assets/logo.png";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <form action="">
        <h1>Login</h1>
        <div className="loginFormContainer">
          <label>Email </label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <label>Password </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          ></input>

          <button
            onClick={(e) => logInWithEmailAndPassword(email, password, e)}
          >
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default SignIn;

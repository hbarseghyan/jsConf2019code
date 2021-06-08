import React, { useState } from "react";
import { login } from "./actions/loginActions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    login(email, password);
  };

  const handleChange = e => {
    const { value } = e.currentTarget;
    const { fieldName } = e.currentTarget.dataset;
    switch (fieldName) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={handleChange}
        placeholder="email"
        value={email}
      />
      <input
        data-field-name="password"
        type="text"
        onChange={handleChange}
        placeholder="pa"
        value={password}
      />
      <button type="submit">Log in</button>
    </form>
  );
};

export default Login;

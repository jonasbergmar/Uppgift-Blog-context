import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

const LoginButton = () => {
  const { user, login, logout } = useContext(UserContext);

  const handleLogin = () => {
    // Check if user is already logged in
    if (user) {
      logout();
    } else {
      login({ username: "Jonas" });
    }
  };

  return <button onClick={handleLogin}>{user ? "Log out" : "Log in"}</button>;
};

export default LoginButton;

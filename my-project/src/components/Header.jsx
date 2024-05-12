import React, { useContext } from "react";
import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import { UserContext } from "../context/UserContext";

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="header items-center flex justify-between p-4 bg-slate-900">
      <h3>BLOG</h3>
      <div className="links flex gap-4 items-center">
        <Link to="/">Blog</Link>
        <Link to="/add-post">Add Post</Link>
        <LoginButton />
        <div className="avatar flex items-center justify-center rounded-[1000px] border w-[100px]  h-[100px]">
          <p>{user ? user.username : "Guest"}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;

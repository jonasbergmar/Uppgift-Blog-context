import React, { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);

  const login = (userData) => {
    setUser(userData);
    // Hämta användarens egna inlägg när de loggar in
    setUserPosts(/* Hämta användarens inlägg från en källa */);
  };

  const logout = () => {
    setUser(null);
    // Rensa användarens inlägg när de loggar ut
    setUserPosts([]);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, userPosts }}>
      {children}
    </UserContext.Provider>
  );
};
export { UserProvider, UserContext };

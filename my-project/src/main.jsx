import React from "react";
import { createRoot } from "react-dom/client"; // Uppdatera importen här
import App from "./App.jsx";
import "./index.css";
import { UserProvider } from "./context/UserContext";
import { BlogProvider } from "./context/BlogContext";

createRoot(document.getElementById("root")).render(
  // Använd createRoot från "react-dom/client"
  <React.StrictMode>
    <UserProvider>
      <BlogProvider>
        <App />
      </BlogProvider>
    </UserProvider>
  </React.StrictMode>
);

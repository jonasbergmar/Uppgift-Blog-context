import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import BlogPage from "./pages/BlogPage";
import AddPostPage from "./pages/AddPostPage";
import { UserProvider } from "./context/UserContext";
import { BlogProvider } from "./context/BlogContext";

function App() {
  return (
    <UserProvider>
      <BlogProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<BlogPage />} />
            <Route path="/add-post" element={<AddPostPage />} />
          </Routes>
        </BrowserRouter>
      </BlogProvider>
    </UserProvider>
  );
}

export default App;

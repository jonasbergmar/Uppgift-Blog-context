// BlogContext.jsx
import React, { createContext, useState, useContext } from "react";
import BlogArray from "../data/blogArray";

const BlogContext = createContext();

const BlogProvider = ({ children }) => {
  const [blogPosts, setBlogPosts] = useState(BlogArray);

  const addBlogPost = (newPost) => {
    setBlogPosts((prevPosts) => [...prevPosts, newPost]);
  };

  const updateBlogPost = (postId, updatedPost) => {
    setBlogPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === postId ? updatedPost : post))
    );
  };

  const deleteBlogPost = (postId) => {
    setBlogPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  return (
    <BlogContext.Provider
      value={{ blogPosts, addBlogPost, updateBlogPost, deleteBlogPost }}
    >
      {children}
    </BlogContext.Provider>
  );
};

const useBlogContext = () => useContext(BlogContext);

export { BlogProvider, useBlogContext };

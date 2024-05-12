import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useBlogContext } from "../context/BlogContext";
import LoginButton from "../components/LoginButton";

const AddPostPage = () => {
  const { addBlogPost } = useBlogContext();
  const { user } = useContext(UserContext);
  const [newPost, setNewPost] = useState({
    title: "",
    text: "",
    author: user ? user.username : "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addBlogPost({ ...newPost, id: Date.now(), comments: [] });
    setNewPost({
      title: "",
      text: "",
      author: user ? user.username : "",
      category: "",
    });
  };

  return (
    <div className="bg-gray-900 min-h-screen py-8 px-4 flex flex-col gap-4 items-center">
      <h2 className="text-4xl font-semibold text-slate-200 mb-8">
        Hi {user ? user.username : "Guest"}, Add New Post
      </h2>

      {user ? ( // Render form only if user is logged in
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <input
            type="text"
            name="title"
            value={newPost.title}
            onChange={handleChange}
            placeholder="Title"
            required
            className="border border-gray-300 p-2 mb-4 w-full bg-transparent text-slate-200"
          />
          <textarea
            name="text"
            value={newPost.text}
            onChange={handleChange}
            placeholder="Text"
            required
            className="border border-gray-300 p-2 mb-4 w-full bg-transparent text-slate-200"
          />
          {/* Remove author input field as author is set automatically */}
          <input
            type="text"
            name="category"
            value={newPost.category}
            onChange={handleChange}
            placeholder="Category"
            required
            className="border border-gray-300 p-2 mb-4 w-full bg-transparent text-slate-200"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Add Post
          </button>
        </form>
      ) : (
        <>
          <p className="text-slate-200 mb-8">Please login to add a new post.</p>
          <LoginButton />
        </>
      )}
      <Link
        to="/"
        className="bg-green-500 text-gray-900 py-2 px-4 rounded hover:bg-green-600"
      >
        Go back
      </Link>
    </div>
  );
};

export default AddPostPage;

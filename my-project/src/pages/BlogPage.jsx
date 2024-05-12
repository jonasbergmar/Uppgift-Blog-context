import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useBlogContext } from "../context/BlogContext";

const BlogPage = () => {
  const { blogPosts, updateBlogPost, deleteBlogPost } = useBlogContext();
  const { user } = useContext(UserContext);
  const [category, setCategory] = useState("all");
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [editedPost, setEditedPost] = useState(null); // State to hold the edited post
  const [editMode, setEditMode] = useState(false); // State to toggle edit mode

  const handleCommentSubmit = (postId, username) => {
    const newComment = {
      id: comments.length + 1,
      postId: postId,
      text: commentText,
      author: username,
    };
    setComments([...comments, newComment]);
    setCommentText("");
  };

  const handleEditPost = (post) => {
    setEditedPost((prevEditedPost) => ({ ...prevEditedPost, ...post }));
    setEditMode(true);
  };

  const handleEditPostSubmit = (e) => {
    e.preventDefault();
    updateBlogPost(editedPost.id, editedPost);
    setEditMode(false);
    setEditedPost(null);
  };

  const handleDeletePost = (postId) => {
    deleteBlogPost(postId);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPost({ ...editedPost, [name]: value });
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedPost(null);
  };

  const filteredPosts =
    category === "all"
      ? blogPosts
      : blogPosts.filter((post) => post.category === category);

  const uniqueCategories = Array.from(
    new Set(blogPosts.map((post) => post.category))
  );

  return (
    <div className="bg-gray-900 min-h-screen py-8 px-4">
      <h1 className=" mb-4 text-center">
        Welcome {user ? user.username : "Guest"}
      </h1>
      <div className="flex justify-center mb-4">
        <button
          className={`${
            category === "all" ? "bg-blue-500" : "bg-gray-900"
          } py-2 px-4 rounded mr-2`}
          onClick={() => setCategory("all")}
        >
          All
        </button>
        {uniqueCategories.map((cat) => (
          <button
            key={cat}
            className={`${
              category === cat ? "bg-blue-500" : "bg-gray-900"
            } py-2 px-4 rounded mr-2`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className=" bg-slate-800 p-4 rounded-lg shadow-md border "
          >
            <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
            <p>{post.text}</p>
            <p className="mt-2">Author: {post.author}</p>
            <h3 className="mt-4 mb-2 font-semibold">Comments:</h3>
            <ul>
              {post.comments.map((comment) => (
                <li key={comment.id} className="mb-2">
                  <p>{comment.text}</p>
                  <p className="text-gray-300">By: {comment.author}</p>
                </li>
              ))}
              {comments
                .filter((comment) => comment.postId === post.id)
                .map((comment) => (
                  <li key={comment.id} className="mb-2">
                    <p>{comment.text}</p>
                    <p className="text-gray-500">By: {comment.author}</p>
                  </li>
                ))}
            </ul>
            {user && (
              <div className="mt-4">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="border border-gray-300 p-2 w-full bg-transparent "
                  placeholder="Write a comment..."
                />
                <button
                  onClick={() => handleCommentSubmit(post.id, user.username)}
                  className="mt-2 bg-blue-500  py-2 px-4 rounded hover:bg-blue-600"
                >
                  Add Comment
                </button>
              </div>
            )}
            {user && user.username === post.author && (
              <div className="mt-4">
                <button
                  onClick={() => handleEditPost(post)}
                  className="bg-yellow-500  py-2 px-4 rounded hover:bg-yellow-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="bg-red-500  py-2 px-4 rounded hover:bg-red-600"
                >
                  Delete
                </button>
                {editMode && editedPost && editedPost.id === post.id && (
                  <form onSubmit={handleEditPostSubmit} className="mt-4 ">
                    <input
                      type="text"
                      name="title"
                      value={editedPost.title}
                      onChange={handleInputChange}
                      className="border border-gray-300 p-2 w-full"
                      placeholder="Title"
                    />
                    <textarea
                      name="text"
                      value={editedPost.text}
                      onChange={handleInputChange}
                      className="border border-gray-300 p-2 mt-2 w-full"
                      placeholder="Text"
                    />
                    <button
                      type="submit"
                      className="mt-2 bg-green-500  py-2 px-4 rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="mt-2 ml-2 bg-gray-500  py-2 px-4 rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;

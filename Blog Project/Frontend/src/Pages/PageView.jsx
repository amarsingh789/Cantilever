import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import Footer from "../componenets/Footer";
import axiosInstance from "../utils/axiosInstance";

const PageView = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(UserDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axiosInstance.get(`/posts/get/${id}`);
        setPost(response.data.post);
        setLoading(false);
      } catch (err) {
        console.log("Error fetching post:", err);
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmDelete) return;
    try {
      // const token = localStorage.getItem("token");
      const response = await axiosInstance.delete(`/posts/delete/${id}`, {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      });
      if (response.status === 200) {
        alert("Blog Deleted Successfully");
        navigate("/home");
      }
    } catch (err) {
      console.log("Delete Error:", err);
      alert("Failed to delete the blog");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-lg font-semibold text-gray-500">
        Loading blog...
      </div>
    );
  if (!post)
    return (
      <div className="flex justify-center items-center min-h-screen text-lg font-semibold text-red-500">
        Blog not found
      </div>
    );
  // const isAuthor = user?._id === post?.author?._id;
  const isAuthor =
    user && post && user._id.toString() === post.author._id.toString();
  console.log("Logged In User ID:", user?._id);
  console.log("Post Author ID:", post?.author?._id);
  console.log("Is Author match?", isAuthor);
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mb-15">
        <nav className="p-5 max-w-4xl mx-auto flex justify-between items-center">
          <Link
            to="/home"
            className="flex items-center gap-2 text-gray-600 hover:text-black transition"
          >
            Back to home
          </Link>
          {/* Btn */}
          {isAuthor && (
            <div className="flex gap-3">
              <Link
                to={`/edit/${post._id}`}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md text-sm font-medium hover:bg-gray-300 transition"
              >
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-900 transition"
              >
                Delete
              </button>
            </div>
          )}
        </nav>
        <article className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden mb-5">
          <div className="h-[400px] w-full relative">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-8">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 inline-block">
                {post.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight capitalize">
                {post.title}
              </h1>
            </div>
          </div>
          {/* Author information */}
          <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-lg">
                {post.author?.fullname?.firstname?.[0]?.toUpperCase()}
              </div>
              <div>
                <p className="font-bold text-gray-900 capitalize">
                  {post.author?.fullname?.firstname}{" "}
                  {post.author?.fullname?.lastname}
                </p>
                <p className="text-xs text-gray-500">Author</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Published on{" "}
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              })}
            </div>
          </div>
          {/* Post Content */}
          <div className="px-8 py-10">
            <p className="text-lg text-gray-800 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </p>
          </div>
        </article>
      </div>
      <Footer />
    </div>
  );
};

export default PageView;

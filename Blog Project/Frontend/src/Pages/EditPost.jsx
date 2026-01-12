import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditPage = () => {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Technology");
  const [coverImage, setCoverImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const categories = [
    "Technology",
    "Health",
    "Lifestyle",
    "Education",
    "Entertainment",
    "Business",
    "Travel",
    "Food",
    "Sports",
    "Finance",
  ];

  useEffect(() => {
    const fetchPost = async () => {
      try {
        console.log("Fetching post data for ID:", id)
        const response = await axios.get(`/posts/get/${id}`);
        const post = response.data.post;

        setTitle(post.title);
        setCategory(post.category);
        setContent(post.content);
        setPreviewImage(post.coverImage);
        setLoading(false);
      } catch (err) {
        console.log("Error fetching post:", err);
        alert("Could not load post data");
        navigate("/home");
      }
    };
    fetchPost();
  }, [id]);
  const handleSumbit = async (e) => {
    e.preventDefault();
    // image upload logic
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("content", content);

    if (coverImage) {
      console.log("New Image Selected:", coverImage.name)
      formData.append("coverImage", coverImage);
    }else {
            console.log("No new image, keeping old one.");
        }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`/posts/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Backend Response:", response);
      if (response.status === 200) {
        alert("Post Updated Successfully");
        navigate(`/post/${id}`);
      }
    } catch (err) {
      console.error("Update Failed Error:", err);
      alert(err.response?.data?.message || "Failed to Update post");
    }
  };
  if (loading) return <div className="text-center mt-10">Loading data...</div>;
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Edit Your Post
          </h2>
        </div>
        <form action="" className="mt-8 space-y-6" onSubmit={handleSumbit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Post Title
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-black focus:border-black"
                required
              />
            </div>
            {/* Category     */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Post Category
              </label>
              <select
                name="category"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-black focus:border-black"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            {/* Cover Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Cover Image
              </label>
              {previewImage && !coverImage && (
                <div className="mb-2">
                  <img
                    src={previewImage}
                    alt="Current"
                    className="h-32 w-full object-cover rounded-md"
                  />
                  <p className="text-sm text-gray-500 mt-1">Current Image</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setCoverImage(e.target.files[0])}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-black focus:border-black"
              />
              <p className="text-xs text-gray-500 mt-1">
                Leave empty to keep current image
              </p>
            </div>
            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Post Content
              </label>
              <textarea
                rows={6}
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-black focus:border-black"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black "
            >
              Update Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPage;

import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const isLoggedIn = !!localStorage.getItem("token");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/posts/all");
        setPosts(response.data.posts);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <>
      <div className="relative min-h-screen bg-cover bg-center bg-no-repeat bg-[url(https://images.unsplash.com/photo-1765873360351-9b8e1ac646de?q=80&w=1175&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70 ">
          {/* Content layer */}
          <div className="relative z-10 flex min-h-screen flex-col">
            {/* navbar */}
            <div className="flex justify-between items-center px-6 py-5 text-black">
              <div className="nav-box-01 text-2xl font-semibold text-white">
                <Link to="/home">MindStream</Link>
              </div>
              <div className="nav-box-02 hidden md:flex gap-8 text-[18px] font-medium text-white">
                <Link to="/home" className="cursor-pointer hover:opacity-80">
                  Home
                </Link>
                <Link className="cursor-pointer hover:opacity-80">
                  Contact Us
                </Link>
                <Link className="cursor-pointer hover:opacity-80">
                  Features
                </Link>
                <Link className="cursor-pointer hover:opacity-80">
                  About Us
                </Link>
              </div>

              <div className="nav-box-03 flex items-center gap-8 ">
                {!isLoggedIn ? (
                  <>
                    <Link
                      to="/login"
                      className="hidden md:block px-4 py-2 rounded-md text-[18px] transition hover:bg-white hover:text-black duration-300 font-medium text-white"
                    >
                      Log In
                    </Link>
                    <Link
                      to="/signup"
                      className="px-4 py-2 bg-white text-black rounded-md text-[18px] font-semibold hover:opacity-90 transition"
                    >
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                    to="/user/logout"
                    className="px-4 py-2 bg-black text-white rounded-md text-[18px] font-semibold hover:opacity-90 transition"
                  >
                    Logout
                  </Link>
                  <Link to='/createpost' className="px-4 py-2 bg-white text-black rounded-md text-[18px] font-semibold hover:opacity-90 transition">
                    Write
                  </Link>
                  </>
                  
                )}
              </div>
            </div>
            {/* hero section */}
            <section className="flex-1 flex items-end px-6 pb-10 md:px-12 lg:px-20">
              <div className="max-w-xl text-white">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                  Exploring the Wonders of Hiking
                </h1>
                <p className="text-white/80 text-sm md:text-base">
                  An iconic landmarks, this post unveils the secrets that make
                  this destination a traveler's paradise.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Blog Section */}
      <section className="bg-white px-6 py-16 md:px-12 lg:px-20">
        {/* heading Section */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">Blog</h1>
          <p className="text-gray-600 max-w-xl">
            Here, we share travel tips, destination guides, and stories that
            inspire your next adventure.
          </p>
        </div>
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div
                  key={post._id}
                  className="group cursor-pointer flex flex-col gap-3"
                >
                  {/* Image Card */}
                  <div className="h-64 w-full overflow-hidden rounded-xl bg-gray-200 relative">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-wider">
                      {post.category}
                    </div>
                  </div>
                  {/* Content */}
                  <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-bold leading-snug group-hover:underline decoration-2 underline-offset-4">
                      {post.title}
                    </h2>
                    {/* Author info */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold">
                        {post.author?.fullname?.firstname?.[0]?.toUpperCase() || "U"}
                      </div>
                      <div className="text-xs text-gray-500">
                        <p className="font-semibold text-gray-900 capitalize">
                          {post.author?.fullname?.firstname}{" "}
                          {post.author?.fullname?.lastname}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Not posts Found</p>
            )}
          </div>
        )}
      </section>
    </>
  );
};

export default Home;

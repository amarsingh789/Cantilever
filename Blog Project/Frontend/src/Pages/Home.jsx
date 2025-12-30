import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import Skeleton from "../componenets/Skeleton";
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack';
import {CircleArrowRight} from 'lucide-react'


// Swiper js
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';
import { Autoplay, EffectFade } from 'swiper/modules';
import Footer from "../componenets/Footer";

const Home = () => {
  const {user} = useContext(UserDataContext)
  const isLoggedIn = !!localStorage.getItem("token");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination 
  const [currentPage, setCurrentPage] = useState(1)
  const postPerPage = 6

  // Hero Slider Image
  const heroSlides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1765873360351-9b8e1ac646de?q=80&w=1175&auto=format&fit=crop",
      title: "Exploring the Wonders of Hiking",
      desc: "An iconic landmark, this post unveils the secrets that make this destination a traveler's paradise."
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=1170&auto=format&fit=crop",
      title: "Experience the Night Camping",
      desc: "Sleep under the stars and disconnect from the world. Discover the best camping spots near you."
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=1170&auto=format&fit=crop",
      title: "Adventure in the Wilderness",
      desc: "Embrace the wild. Learn survival skills and explore the untouched beauty of nature."
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=1170&auto=format&fit=crop",
      title: "Conquer the Tallest Mountains",
      desc: "Push your limits. A guide to mountaineering for beginners and experts alike."
    }  
  ];

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

  // PAGINATION LOGIC
  const indexOfLastPost  = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPage = Math.ceil(posts.length/postPerPage);

  // Page Change Handler for MUI
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    // Optional: Click karne par scroll up ho jaye
    document.getElementById('blog-section')?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <>
      <div className="relative min-h-screen">
        {/* BACKGROUND SWIPER SLIDER  */}
        <div className="absolute inset-0 z-0">
            <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            speed={1000}
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }} // Thoda slow kiya (5 sec)
            className="h-full w-full"
        >
            {heroSlides.map((slide) => ( // 'heroSlides' use kiya
                <SwiperSlide key={slide.id}>
                    <div className="relative h-full w-full">
                        
                        {/* Background Image */}
                        <div 
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${slide.image})` }}
                        />
                        
                        {/* Black Gradient Overlay (Slide ke andar) */}
                        <div className="absolute inset-0 bg-black/40" />

                        {/* Slide Specific Text Content */}
                        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-24 md:px-12 lg:px-20">
                             <div className="max-w-2xl text-white">
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 drop-shadow-lg animate-fade-in-up">
                                    {slide.title} {/* Title change hoga */}
                                </h1>
                                <p className="text-white/90 text-sm md:text-base drop-shadow-md">
                                    {slide.desc} {/* Desc change hoga */}
                                </p>
                             </div>
                        </div>

                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
        </div>
        {/* <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70"> */}
          {/* Content layer */}
          <div className="relative z-10 flex min-h-screen flex-col">
            {/* navbar */}
            {/* <div className="flex justify-between items-center px-6 py-5 text-black"> */}
            <div className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-5 text-white bg-black/40 backdrop-blur-md shadow-md transition-all duration-300 border-b border-white/10">
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
                    {/* <Link
                    to="/user/logout"
                    className="px-4 py-2 bg-black text-white rounded-md text-[18px] font-semibold hover:opacity-90 transition"
                  >
                    Logout
                  </Link>
                  <Link to='/createpost' className="px-4 py-2 bg-white text-black rounded-md text-[18px] font-semibold hover:opacity-90 transition">
                    Write
                  </Link> */}
                  <Link to='/createpost' className="hidden md:block px-4 py-2 bg-white text-black rounded-md text-[18px] font-semibold
                   hover:opacity-90 transition">Write</Link>
                   <Link to='/profile' className="flex items-center gap-2 bg-white/20 backdrop-blur-md py-1 px-2 pr-4 rounded-full hover:bg-white/30 transition text-white border border-white/20">
                      <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-sm">
                        {user?.fullname?.firstname?.[0]?.toUpperCase()}
                      </div>
                      <span className="font-medium text-sm capitalize hidden sm:block">
                        {user?.fullname?.firstname}
                      </span>
                   </Link>
                   <Link to='/user/logout' className="px-4 py-2 bg-black text-white rounded-md text-[16px] font-semibold hover:bg-gray-800 transition border border-white/20">
                      Logout
                   </Link>
                  </>
                  
                )}
              </div>
            </div>
            {/* hero section */}
            {/* <section className="flex-1 flex items-end px-6 pb-10 md:px-12 lg:px-20">
              <div className="max-w-xl text-white">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                  Exploring the Wonders of Hiking
                </h1>
                <p className="text-white/80 text-sm md:text-base">
                  An iconic landmarks, this post unveils the secrets that make
                  this destination a traveler's paradise.
                </p>
              </div>
            </section> */}
          </div>
        </div>
      {/* </div> */}

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
          // Skeleton grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => <Skeleton key={n} />)}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentPost.length > 0 ? (
              currentPost.map((post) => (
                <Link to={`/post/${post._id}`}
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
                </Link>
              ))
            ) : (
              <p>Not posts Found</p>
            )}
          </div>
          {/* --- MUI PAGINATION UI --- */}
            {posts.length > postPerPage && (
                <div className="flex justify-center mt-12">
                    <Stack spacing={2}>
                        <Pagination 
                            count={totalPage} 
                            page={currentPage} 
                            onChange={handlePageChange} 
                            variant="outlined" 
                            shape="rounded" 
                            size="large"
                            sx={{
                                '& .MuiPaginationItem-root': {
                                    color: 'black',
                                    '&.Mui-selected': {
                                        backgroundColor: 'black',
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: '#333',
                                        }
                                    }
                                }
                            }}
                        />
                    </Stack>
                </div>
            )}
          </>
        )}
      </section>
      {/* Bento Grid Section */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-gray-50">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[600px]">
          {/* Left box */}
          <div className="lg:col-span-1 flex flex-col gap-4 h-full">
            {/* Dark Card */}
            <div className="flex-1 bg-[#1c1c1c] rounded-xl p-8 flex flex-col justify-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 transition-all duration-500 group-hover:bg-white/10"></div>
                <div className="relative z-10">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mb-6">
                    <span className="text-white text-xl"><i class="ri-global-line"></i></span>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
                    Explore more to get your comport zone
                  </h2>
                  <p className="text-gray-400 mb-8 text-sm">Book your perfect stay with us</p>
                  <button className="bg-white text-black px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-gray-200 transition">
                    Booking Now
                    <span className="text-lg"><CircleArrowRight strokeWidth={1.75} /></span>
                  </button>
                </div>
            </div>
            <div className="h-64 rounded-xl overflow-hidden relative group">
              <img
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
               src="https://images.unsplash.com/photo-1544220830-7da42df1ff8d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="travel" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition "></div>
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-sm opacity-80">Article Available</p>
                <h3 className="text-3xl font-bold">78</h3>
              </div>
            </div>
          </div>
          {/* Big image */}
          <div className="lg:col-span-2 rounded-xl overflow-hidden relative group min-h-[400px]">
            <img
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1173&auto=format&fit=crop" alt="" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-10 left-10 max-w-lg text-3xl md:text-5xl font-bold text-white leading-tight">
              <h2>Beyond accommodation, creating memories of a lifetime</h2>
            </div>
          </div>
        </div>
      </section>
      {/* Footer Section */}
      <Footer/>
    </>
  );
};

export default Home;

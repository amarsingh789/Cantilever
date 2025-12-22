import { Link } from "react-router-dom";

const Home = () => {
  return (
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
                <Link to="/home" className="cursor-pointer hover:opacity-80">Home</Link>
                <Link className="cursor-pointer hover:opacity-80">Contact Us</Link>
                <Link className="cursor-pointer hover:opacity-80">Features</Link>
                <Link className="cursor-pointer hover:opacity-80">About Us</Link>
            </div>
            
            <div className="nav-box-03 flex items-center gap-8 ">
              <Link to="/login" className="hidden md:block px-4 py-2 rounded-md text-[18px] transition hover:bg-white hover:text-black duration-300 font-medium text-white">Log In</Link>
              <Link to='/signup' className="px-4 py-2 bg-white text-black rounded-md text-[18px] font-semibold hover:opacity-90 transition">Sign Up</Link>
            </div>
          </div>
          {/* hero section */}
          <section className="flex-1 flex items-end px-6 pb-10 md:px-12 lg:px-20">
            <div className="max-w-xl text-white">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">Exploring the Wonders of Hiking</h1>
            <p className="text-white/80 text-sm md:text-base">An iconic landmarks, this post unveils the secrets that make this destination a traveler's paradise.</p>
          </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;

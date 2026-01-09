import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import {
  Search,
  CircleCheckBig,
  FolderGit,
  SquarePlus,
  Funnel,
  Settings2,
  Ellipsis,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Rocket } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import {
//   Search,
//   CircleCheckBig,
//   FolderGit,
// } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users/logout`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const users = [
    { name: "Amar", img: "https://i.pravatar.cc/150?img=1" },
    { name: "Rahul", img: "https://i.pravatar.cc/150?img=2" },
    { name: "Neha", img: "https://i.pravatar.cc/150?img=3" },
    { name: "Karan", img: "https://i.pravatar.cc/150?img=4" },
  ];
  return (
    <div>
      <nav className="flex items-center justify-between px-6 py-4 bg-white text-slate-900 border-b border-slate-200">
        {/* LEFT : BRAND */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-sm">
            <Rocket className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-lg font-bold tracking-wider">TaskPilot</h1>
        </div>

        {/* CENTER : SEARCH */}
        <div className="flex items-center bg-slate-1  00 rounded-lg px-2 border border-slate-300 focus-within:border-purple-500/60 focus-within:ring-2 focus-within:ring-purple-500/20 transition">
          <Search size={16} className="text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search tasks"
            className="bg-transparent text-sm text-slate-700 px-2 py-2 w-56 placeholder:text-slate-400 focus:outline-none"
          />
        </div>

        {/* RIGHT : NAV LINKS + AVATAR */}
        <div className="flex items-center gap-6">
          {/* Tasks */}
          <button className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition">
            <CircleCheckBig size={18} />
            Tasks
          </button>

          {/* Projects */}
          <button className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition">
            <FolderGit size={18} />
            Projects
          </button>

          {/* AVATAR DROPDOWN */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="focus:outline-none">
                <Avatar className="h-9 w-9 cursor-pointer ring-2 ring-transparent hover:ring-purple-500 transition">
                  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                  <AvatarFallback>AJ</AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuLabel className="text-sm">
                My Account
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem className="flex gap-2 cursor-pointer">
                <User size={16} />
                View Profile
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="flex gap-2 text-red-500 cursor-pointer focus:text-red-500"
                onClick={handleLogout}
              >
                <LogOut size={16} />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>

      <section>
        <div className="px-6 py-2 items-center">
          <div className="box-01 flex justify-between mb-5">
            <div className="title text-3xl font-bold ">Tasks</div>
            <div className="flex -space-x-3">
              {users.slice(0, 3).map((user, index) => (
                <Avatar key={index} className="h-10 w-10 border-2 border-white">
                  <AvatarImage src={user.img} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
              ))}

              <Avatar className="h-10 w-10 border-2 border-white bg-muted">
                <AvatarFallback>+1</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className="box-02 flex justify-between mb-5">
            <div className="part-01 flex gap-6 items-center text-sm font-medium ">
              <h3 className="hover:bg-purple-400 px-3 py-1 rounded-lg hover:text-white active:bg-purple-400 transition">
                Overview
              </h3>
              <h3 className="hover:bg-purple-400 px-3 py-1 rounded-lg hover:text-white active:bg-purple-400 transition">
                Board
              </h3>
              <h3 className="hover:bg-purple-400 px-3 py-1 rounded-lg hover:text-white active:bg-purple-400 transition">
                Timeline
              </h3>
              <h3 className="hover:bg-purple-400 px-3 py-1 rounded-lg hover:text-white active:bg-purple-400 transition">
                Activites
              </h3>
              <h3 className="hover:bg-purple-400 px-3 py-1 rounded-lg hover:text-white active:bg-purple-400 transition">
                Files
              </h3>
            </div>
            <div className="part-02 flex gap-8 font-medium text-sm">
              <button className="px-3 py-1.5 bg-slate-100 rounded-md text-slate-500 flex gap-2 items-center hover:bg-slate-200 transition">
                {" "}
                <Settings2 size={20} strokeWidth={1.5} />
                Customise
              </button>
              <button className="px-3 py-1.5 bg-slate-100 rounded-md text-slate-500 flex gap-2 items-center hover:bg-slate-200 transition">
                {" "}
                <Funnel size={20} strokeWidth={1.5} />
                Filter
              </button>
              <button className="bg-[#6b5fed] px-3 py-2 rounded-lg text-white flex gap-2 items-center">
                {" "}
                <SquarePlus size={20} strokeWidth={1.5} />
                Add Section
              </button>
            </div>
          </div>
        </div>
      </section>
      <section>
        {/* <div class="h-px bg-gradient-to-r from-transparent via-black/20 to-transparent mb-8"></div> */}
        <div className="flex justify-between px-6 py-5 border shadow-md items-center">
          <div className="flex gap-3 items-center">
            <button className="bg-red-400 text-white px-4 py-2 rounded-full font-medium">
              Not Started
            </button>
            <span className="bg-slate-400 text-white px-2 py-1 rounded-full text-xs">
              1
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-4 items-center">
              <Ellipsis
                size={20}
                strokeWidth={1.2}
                className="text-slate-400 hover:text-neutral-700 transition-all duration-300"
              />
              <SquarePlus
                size={22}
                strokeWidth={1.3}
                className="text-slate-400 hover:text-neutral-700 transition-all duration-300"
              />
            </div>
            <button className="bg-yellow-400 text-white px-4 py-2 rounded-full font-medium">
              In progress
            </button>
            <span className="bg-slate-400 text-white px-2 py-1 rounded-full text-xs">
              7
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-4 items-center">
              <Ellipsis
                size={20}
                strokeWidth={1.2}
                className="text-slate-400 hover:text-neutral-700 transition-all duration-300"
              />
              <SquarePlus
                size={22}
                strokeWidth={1.3}
                className="text-slate-400 hover:text-neutral-700 transition-all duration-300"
              />
            </div>
            <button className="bg-green-400 text-white px-4 py-2 rounded-full font-medium">
              Completed
            </button>
            <span className="bg-slate-400 text-white px-2 py-1 rounded-full text-xs">
              2
            </span>
          </div>
          <div className="flex gap-4 items-center">
            <Ellipsis
              size={20}
              strokeWidth={1.2}
              className="text-slate-400 hover:text-neutral-700 transition-all duration-300"
            />
            <SquarePlus
              size={22}
              strokeWidth={1.3}
              className="text-slate-400 hover:text-neutral-700 transition-all duration-300"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

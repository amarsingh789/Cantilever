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

const Home = () => {
  const users = [
    { name: "Amar", img: "https://i.pravatar.cc/150?img=1" },
    { name: "Rahul", img: "https://i.pravatar.cc/150?img=2" },
    { name: "Neha", img: "https://i.pravatar.cc/150?img=3" },
    { name: "Karan", img: "https://i.pravatar.cc/150?img=4" },
  ];
  return (
    <div>
      <navbar>
        <div className="flex items-center justify-between px-6 py-5 bg-black text-white">
          <div className="text-2xl font-semibold text-white">
            <a href="">TaskPilot</a>
          </div>
          <div className="flex items-center">
            <div>
              <input
                type="text"
                className="bg-[#1c1c1c] text-white px-5 py-2 rounded-s-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
              />
            </div>
            <div className="bg-[#1c1c1c] text-white px-5 py-2 rounded-e-lg">
              <Search />
            </div>
          </div>
          <div className="flex gap-8 items-center">
            <div className="flex gap-2 items-center">
              <CircleCheckBig size={26} />
              <a href="">Task</a>
            </div>
            <div className="flex gap-2 items-center">
              <FolderGit size={28} strokeWidth={1.5} />
              <a href="">Projects</a>
            </div>
          </div>
          <div>
            <div className="">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback>AJ</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </navbar>
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
              <h3 className="hover:bg-purple-400 px-3 py-1 rounded-lg hover:text-white active:bg-purple-400">
                Overview
              </h3>
              <h3 className="hover:bg-purple-400 px-3 py-1 rounded-lg hover:text-white active:bg-purple-400">
                Board
              </h3>
              <h3 className="hover:bg-purple-400 px-3 py-1 rounded-lg hover:text-white active:bg-purple-400">
                Timeline
              </h3>
              <h3 className="hover:bg-purple-400 px-3 py-1 rounded-lg hover:text-white active:bg-purple-400">
                Activites
              </h3>
              <h3 className="hover:bg-purple-400 px-3 py-1 rounded-lg hover:text-white active:bg-purple-400">
                Files
              </h3>
            </div>
            <div className="part-02 flex gap-8 font-medium text-sm">
              <button className="px-3 py-1 bg-slate-200 rounded-lg text-neutral-500 flex gap-2 items-center">
                {" "}
                <Settings2 size={20} strokeWidth={1.5} />
                Customise
              </button>
              <button className="px-3 py-1 bg-slate-200 rounded-lg text-neutral-500 flex gap-2 items-center">
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
        <div className="flex justify-between px-6 py-5 border border-t-2 items-center">
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

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Search,
  CircleCheckBig,
  FolderGit,
  SquarePlus,
  Funnel,
  Settings2,
  Ellipsis,
  Menu,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { User, LogOut, Rocket } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CreateTask from "../components/CreateTask";
import TaskCard from "../components/TaskCard";
import EditTask from "../components/EditTask";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Footer from "@/components/Footer";

const Home = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  const [filterPriority, setFilterPriority] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Drag and drop
  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) return;

    const newStatus = destination.droppableId;

    // ✅ 1. OPTIMISTIC UI UPDATE
    setTasks((prev) =>
      prev.map((task) =>
        task._id === draggableId ? { ...task, status: newStatus } : task
      )
    );

    // ✅ 2. BACKEND UPDATE
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/tasks/update/${draggableId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Task moved");
    } catch (err) {
      toast.error("Failed to update task");
      console.error("Drag update failed", err);
      fetchTasks(); // rollback if error
    }
  };

  // Fetch tasks function
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/tasks/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks(response.data.tasks || []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching task", err);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  // logout
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
  // Delete
  const confirmDelete = async () => {
    if (!deleteTaskId) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/tasks/delete/${deleteTaskId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Task Deleted");
      setDeleteTaskId(null);
      fetchTasks();
    } catch (err) {
      toast.error("Delete failed");
      console.error("Delete failed", err);
    }
  };
  const handleEdit = (task) => {
    // console.log("Edit task:", task);
    setSelectedTask(task);
    setOpenEdit(true);
    // next step: open edit modal
  };
  // Search Logic
  // const filterTasks = (tasks) => {
  //   if (!searchQuery.trim()) return tasks;
  //   return tasks.filter(
  //     (task) =>
  //       task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       task.description?.toLowerCase().includes(searchQuery.toLowerCase())
  //   );
  // };

  const processedTask = () => {
    if (!tasks || tasks.length === 0) return [];
    let data = [...tasks];
    // Search
    if (searchQuery.trim()) {
      data = data.filter(
        (t) =>
          t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    // Filter
    if (filterPriority !== "all") {
      data = data.filter((t) => t.priority === filterPriority);
    }
    // Sort
    if (sortBy === "newest") {
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    if (sortBy === "oldest") {
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    if (sortBy === "priority") {
      const order = { high: 1, medium: 2, low: 3 };
      data.sort((a, b) => order[a.priority] - order[b.priority]);
    }
    if (sortBy === "az") {
      data.sort((a, b) => a.title.localeCompare(b.title));
    }
    return data;
  };
  // Categorize task
  const filteredTasks = processedTask();
  const todoTasks = filteredTasks.filter((t) => t.status === "todo");
  const inProgressTasks = filteredTasks.filter(
    (t) => t.status === "in-progress"
  );
  const completedTasks = filteredTasks.filter((t) => t.status === "completed");
  const users = [
    { name: "Amar", img: "https://i.pravatar.cc/150?img=1" },
    { name: "Rahul", img: "https://i.pravatar.cc/150?img=2" },
    { name: "Neha", img: "https://i.pravatar.cc/150?img=3" },
    { name: "Karan", img: "https://i.pravatar.cc/150?img=4" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <nav className="fixed top-0 left-0 w-full z-50 bg-white text-slate-900 border-b border-slate-200">
        {/* TOP ROW: Brand, Desktop Search, Avatar */}
        <div className="flex items-center justify-between px-4 md:px-6 py-4">
          {/* LEFT : BRAND & MENU TOGGLE */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* ✅ Menu Button Click Handler */}
            <button
              className="md:hidden p-1 hover:bg-slate-100 rounded-md transition"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu size={20} className="text-slate-600" />
            </button>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-sm cursor-pointer">
                <Rocket className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
              <h1 className="text-lg font-bold tracking-wider hidden sm:block">
                <Link to="/home">TaskPilot</Link>
              </h1>
            </div>
          </div>

          {/* CENTER : DESKTOP SEARCH (Hidden on Mobile) */}
          <div className="hidden md:flex items-center bg-slate-100 rounded-lg px-2 border border-slate-300 focus-within:border-purple-500/60 focus-within:ring-2 focus-within:ring-purple-500/20 transition mx-4">
            <Search size={16} className="text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm text-slate-700 px-2 py-2 w-40 lg:w-56 placeholder:text-slate-400 focus:outline-none"
            />
          </div>

          {/* RIGHT : NAV LINKS + AVATAR */}
          <div className="flex items-center gap-3 md:gap-6">
            <button className="hidden lg:flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition">
              <CircleCheckBig size={18} />
              Tasks
            </button>
            <button className="hidden lg:flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition">
              <FolderGit size={18} />
              Projects
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="focus:outline-none">
                  <Avatar className="md:h-9 md:w-9 h-8 w-8 cursor-pointer ring-2 ring-transparent hover:ring-purple-500 transition">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="User"
                    />
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
                  <Link to="/profile">View Profile</Link>
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
        </div>

        {/* ✅ MOBILE MENU (Visible only when isMobileMenuOpen is true) */}
        {isMobileMenuOpen && (
          <div className="md:hidden px-4 pb-4 border-t border-slate-100 bg-white">
            <div className="flex flex-col gap-4 mt-4">
              {/* Mobile Search Bar */}
              <div className="flex items-center bg-slate-100 rounded-lg px-3 border border-slate-300 focus-within:border-purple-500/60 focus-within:ring-2 focus-within:ring-purple-500/20 transition">
                <Search size={18} className="text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-sm text-slate-700 px-2 py-3 w-full placeholder:text-slate-400 focus:outline-none"
                />
              </div>

              {/* Mobile Links (Jo desktop par hidden the) */}
              <div className="flex flex-col gap-2">
                <button className="flex items-center gap-3 p-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition">
                  <CircleCheckBig size={18} />
                  Tasks
                </button>
                <button className="flex items-center gap-3 p-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition">
                  <FolderGit size={18} />
                  Projects
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      <div className="pt-20">
        <section>
          <div className="px-4 md:px-6 py-4">
            <div className="box-01 flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-4">
              <div className="title text-2xl md:text-3xl font-bold ">Tasks</div>
              <div className="flex -space-x-3 self-start sm:self-auto">
                {users.slice(0, 3).map((user, index) => (
                  <Avatar
                    key={index}
                    className="h-9 w-9 md:h-10 md:w-10 border-2 border-white"
                  >
                    <AvatarImage src={user.img} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                ))}

                <Avatar className="h-9 w-9 md:h-10 md:w-10 border-2 border-white bg-muted">
                  <AvatarFallback>+1</AvatarFallback>
                </Avatar>
              </div>
            </div>
            <div className="box-02 flex flex-col xl:flex-row justify-between mb-5 gap-4">
              <div
                className="part-01 w-full xl:w-auto overflow-x-auto pb-2 xl:pb-0 hide-scrollbar"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                <div className="flex gap-2 md:gap-6 items-center text-sm font-medium whitespace-nowrap min-w-max">
                  <h3 className="hover:bg-purple-400 px-3 py-1 rounded-lg hover:text-white active:bg-purple-400 transition cursor-pointer">
                    Overview
                  </h3>
                  <h3 className="hover:bg-purple-400 px-3 py-1 rounded-lg hover:text-white active:bg-purple-400 transition cursor-pointer">
                    Board
                  </h3>
                  <h3 className="hover:bg-purple-400 px-3 py-1 rounded-lg hover:text-white active:bg-purple-400 transition cursor-pointer">
                    Timeline
                  </h3>
                  <h3 className="hover:bg-purple-400 px-3 py-1 rounded-lg hover:text-white active:bg-purple-400 transition cursor-pointer">
                    Activites
                  </h3>
                  <h3 className="hover:bg-purple-400 px-3 py-1 rounded-lg hover:text-white active:bg-purple-400 transition cursor-pointer">
                    Files
                  </h3>
                </div>
              </div>
              <div className="part-02 grid grid-cols-2 sm:flex sm:flex-wrap gap-2 md:gap-4 font-medium text-sm w-full xl:w-auto">
                {/* <button className="px-3 py-1.5 bg-slate-100 rounded-md text-slate-500 flex gap-2 items-center hover:bg-slate-200 transition">
                {" "}
                <Settings2 size={20} strokeWidth={1.5} />
                Customise
              </button> */}

                {/* <button className="px-3 py-1.5 bg-slate-100 rounded-md text-slate-500 flex gap-2 items-center hover:bg-slate-200 transition">
                {" "}
                <Funnel size={20} strokeWidth={1.5} />
                Filter
              </button> */}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="btn px-3 py-2 bg-slate-100 rounded-md text-slate-500 flex justify-center gap-2 items-center hover:bg-slate-200 transition w-full sm:w-auto">
                      <Settings2 size={16} />{" "}
                      <span className="hidden sm:inline">Customise</span>{" "}
                      <span className="sm:hidden">Sort</span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setSortBy("newest")}>
                      Newest
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("oldest")}>
                      Oldest
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("priority")}>
                      Priority
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("az")}>
                      A → Z
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="btn px-3 py-2 bg-slate-100 rounded-md text-slate-500 flex justify-center gap-2 items-center hover:bg-slate-200 transition w-full sm:w-auto">
                      <Funnel size={16} /> Filter
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Priority</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {["all", "high", "medium", "low"].map((p) => (
                      <DropdownMenuItem
                        key={p}
                        onClick={() => setFilterPriority(p)}
                      >
                        {p}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <div className="col-span-2 sm:col-span-1">
                  <CreateTask onTaskCreated={fetchTasks} />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* --- KANBAN BOARD SECTION --- */}
        <main className="p-4 md:p-6 overflow-x-auto">
          {loading ? (
            <p className="text-slate-500">Loading tasks...</p>
          ) : (
            <DragDropContext onDragEnd={onDragEnd}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* TODO */}
                <KanbanColumn
                  title="Not Started"
                  color="bg-red-400"
                  status="todo"
                  tasks={todoTasks}
                  onEdit={handleEdit}
                  onDelete={setDeleteTaskId}
                />

                {/* IN PROGRESS */}
                <KanbanColumn
                  title="In Progress"
                  color="bg-yellow-400"
                  status="in-progress"
                  tasks={inProgressTasks}
                  onEdit={handleEdit}
                  onDelete={setDeleteTaskId}
                />

                {/* COMPLETED */}
                <KanbanColumn
                  title="Completed"
                  color="bg-green-500"
                  status="completed"
                  tasks={completedTasks}
                  onEdit={handleEdit}
                  onDelete={setDeleteTaskId}
                />
              </div>
            </DragDropContext>
          )}
        </main>
        <Footer />
      </div>
      <EditTask
        open={openEdit}
        setOpen={setOpenEdit}
        task={selectedTask}
        onTaskUpdated={fetchTasks}
      />
      <AlertDialog
        open={!!deleteTaskId}
        onOpenChange={() => setDeleteTaskId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Task?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to permanently delete this file?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteTaskId(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
/* ---------- Column Component ---------- */
const KanbanColumn = ({ title, color, status, tasks, onEdit, onDelete }) => (
  <Droppable droppableId={status}>
    {(provided) => (
      <div
        ref={provided.innerRef}
        {...provided.droppableProps}
        className="bg-slate-100 rounded-xl p-4 min-h-[70vh]"
      >
        {/* Header */}
        <div className="flex gap-2 mb-4">
          <span
            className={`px-4 py-1 rounded-full text-white text-sm ${color}`}
          >
            {title}
          </span>
          <span className="px-2 py-1 bg-slate-300 text-white text-xs rounded-full">
            {tasks.length}
          </span>
        </div>

        {/* Cards */}
        <div className="space-y-4">
          {tasks.map((task, index) => (
            <Draggable key={task._id} draggableId={task._id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <TaskCard
                    task={task}
                    onEdit={onEdit}
                    onDelete={() => onDelete(task._id)}
                  />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      </div>
    )}
  </Droppable>
);

export default Home;

import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  LogOut,
  Mail,
  User,
  CheckCircle,
  Clock,
  ArrowLeft,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Footer from "@/components/Footer";

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
  });

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data);
    } catch (err) {
      toast.error("Failed to load profile");
      console.error("Failed to load profile", err);
    }
  };

  // Fetch Stats
  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const resposne = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/tasks/all`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const tasks = resposne.data.tasks || [];
      setStats({
        total: tasks.length,
        completed: tasks.filter((t) => t.status === "completed").length,
        inProgress: tasks.filter((t) => t.status === "in-progress").length,
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchStats();
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

  if (!user) {
    return <p className="p-6">Loading profile...</p>;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="flex-grow p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          {/* BACK BUTTON */}
          <div className="mb-4">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)} // Go back to previous page
              className="text-slate-600 hover:text-slate-900 hover:bg-slate-200 pl-0 px-3"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Dashboard
            </Button>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-sm border p-4 md:p-6">
            
            {/* ===== HEADER ===== */}
            <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
              
              {/* Avatar */}
              <Avatar className="h-24 w-24 ring-4 ring-indigo-200 shrink-0">
                <AvatarImage src={user.avatar || "https://i.pravatar.cc/150"} />
                <AvatarFallback>
                  {user.fullname?.firstname?.charAt(0)}
                </AvatarFallback>
              </Avatar>

              {/* User Info */}
              <div className="flex-1 w-full md:w-auto">
                <h2 className="text-2xl font-bold text-slate-800">
                  {user.fullname?.firstname} {user.fullname?.lastname}
                </h2>
                <p className="flex items-center justify-center md:justify-start gap-2 text-slate-500 mt-1">
                  <Mail size={16} /> {user.email}
                </p>
                <p className="text-sm text-slate-400 mt-1">
                  Role: <span className="font-medium">User</span>
                </p>
              </div>

              <Button 
                variant="destructive" 
                onClick={handleLogout}
                className="w-full md:w-auto mt-4 md:mt-0"
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <StatCard
                icon={<User className="text-indigo-500" />}
                label="Total Tasks"
                value={stats.total}
              />
              <StatCard
                icon={<CheckCircle className="text-green-500" />}
                label="Completed"
                value={stats.completed}
              />
              <StatCard
                icon={<Clock className="text-yellow-500" />}
                label="In Progress"
                value={stats.inProgress}
              />
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              
              <Button 
                className="bg-indigo-600 w-full sm:w-auto cursor-not-allowed opacity-50 hover:bg-indigo-600"
                onClick={(e) => e.preventDefault()} // Click kaam nahi karega
              >
                Edit Profile
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full sm:w-auto cursor-not-allowed opacity-50 hover:bg-transparent"
                onClick={(e) => e.preventDefault()} // Click kaam nahi karega
              >
                Change Password
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// StatCard Component
const StatCard = ({ icon, label, value }) => (
  <div className="bg-slate-50 border rounded-xl p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
    <div className="p-3 bg-white rounded-lg shadow-sm">{icon}</div>
    <div>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-2xl font-bold text-slate-800">{value}</p>
    </div>
  </div>
);

export default UserProfile;
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  SquarePlus, 
  Loader2, 
  Folder, 
  Tag, 
  AlignLeft, 
  Activity, 
  Image as ImageIcon,
  X
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";


const EditTask = ({open, setOpen, task, onTaskUpdated}) => {
  const [loading, setLoading] = useState(false);

  // Form States
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [status, setStatus] = useState("todo");

  useEffect(()=>{
    if(task){
        setTitle(task.title || "");
        setDescription(task.description || "")
        setPriority(task.priority || "medium")
        setStatus(task.status || "todo")
    }
  }, [task])
  const handleSumbit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
       const response = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/tasks/update/${task._id}`,
        { title, description, priority, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        toast.success("Task updated");
        onTaskUpdated();
        setOpen(false);
      }
    } catch (err) {
        toast.error("Update failed");
      console.error("Failed to updated", err);
    } finally {
      setLoading(false);
    }
  };

  return (
     <Dialog open={open} onOpenChange={setOpen}>
          {/* Modal Content - styled like the image */}
          <DialogContent className="sm:max-w-[500px] bg-white p-0 overflow-hidden border-none shadow-2xl rounded-2xl">
            
            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-50 flex justify-between items-center">
              <DialogTitle className="text-2xl font-bold text-slate-800">
                Edit Task
              </DialogTitle>
              {/* Default Close button is hidden by Shadcn usually, we rely on default or custom one */}
            </div>
    
            <form onSubmit={handleSumbit} className="px-6 py-6 space-y-6">
              
              {/* Row 1: Title (Mapped to Project) */}
              <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                <div className="flex items-center gap-2 text-slate-400">
                  <Folder size={18} />
                  <span className="font-medium text-sm"> Title</span>
                </div>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="border-none shadow-none text-slate-800 font-semibold placeholder:font-normal px-0 focus-visible:ring-0 h-auto py-1 text-base"
                />
              </div>
    
              {/* Row 2: Priority (Mapped to Tags) */}
              <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                <div className="flex items-center gap-2 text-slate-400">
                  <Tag size={18} />
                  <span className="font-medium text-sm">Priority</span>
                </div>
                <div className="flex gap-2">
                  {['low', 'medium', 'high'].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPriority(p)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize transition-all border ${
                        priority === p 
                          ? 'bg-slate-800 text-white border-slate-800' 
                          : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
    
              {/* Row 3: Status (Mapped to Status Dots) */}
              <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                <div className="flex items-center gap-2 text-slate-400">
                  <Activity size={18} />
                  <span className="font-medium text-sm">Status</span>
                </div>
                <div className="flex gap-3 items-center" onChange={(e)=>setStatus(e.target.value)}>
                   {/* Todo (Grey) */}
                   <button type="button" onClick={() => setStatus('todo')} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${status === 'todo' ? 'border-slate-400' : 'border-transparent'}`}>
                      <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                   </button>
                   {/* In Progress (Yellow/Orange) */}
                   <button type="button" onClick={() => setStatus('in-progress')} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${status === 'in-progress' ? 'border-yellow-400' : 'border-transparent'}`}>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                   </button>
                   {/* Completed (Green) */}
                   <button type="button" onClick={() => setStatus('completed')} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${status === 'completed' ? 'border-green-500' : 'border-transparent'}`}>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                   </button>
                   <span className="text-xs text-slate-400 ml-2 capitalize font-medium">
                     {status.replace('-', ' ')}
                   </span>
                </div>
              </div>
    
              {/* Row 4: Description (Mapped to Links/Assign) */}
              <div className="grid grid-cols-[120px_1fr] items-start gap-4">
                <div className="flex items-center gap-2 text-slate-400 mt-2">
                  <AlignLeft size={18} />
                  <span className="font-medium text-sm">Desc</span>
                </div>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full resize-none border-none shadow-none text-slate-600 focus:ring-0 p-0 text-sm placeholder:text-slate-300 focus:outline-none"
                />
              </div>
    
              {/* Footer Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-[#6b5fed] hover:bg-[#5a4edc] text-white rounded-xl text-base font-semibold shadow-lg shadow-indigo-200"
              >
                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Update Task"}
              </Button>
    
            </form>
          </DialogContent>
        </Dialog>
  );
};

export default EditTask;

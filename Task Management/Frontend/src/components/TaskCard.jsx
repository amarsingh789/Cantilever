import React from "react";
import {
  Clock,
  MessageCircle,
  Paperclip,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";
import toast from 'react-hot-toast';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TaskCard = ({ task, onEdit, onDelete }) => {
  const priorityColors = {
    low: "bg-blue-100 text-blue-700",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-red-100 text-red-700",
  };

  const statusProgress = {
    todo: 10,
    "in-progress": 50,
    completed: 100,
  };

  const progress = statusProgress[task.status] ?? 0;

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border hover:shadow-md transition">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-slate-800 text-sm pr-2">
          {task.title}
        </h3>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="text-slate-400 hover:text-slate-700">
              <MoreVertical size={16} />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-36">
            <DropdownMenuItem
              onClick={() => onEdit(task)}
              className="flex gap-2 cursor-pointer"
            >
              <Pencil size={14} /> Edit
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => onDelete(task._id)}
              className="flex gap-2 text-red-500 cursor-pointer focus:text-red-500"
            >
              <Trash2 size={14} /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Priority */}
      <span
        className={`inline-block mb-3 px-2 py-0.5 rounded-full text-xs font-medium ${
          priorityColors[task.priority] || priorityColors.medium
        }`}
      >
        {task.priority}
      </span>

      {/* Description */}
      <p className="text-slate-500 text-sm mb-4 line-clamp-2">
        {task.description || "No description"}
      </p>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-slate-600 mb-1">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} className="h-1.5" />
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center pt-3 border-t text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <Clock size={14} />
          {formatDate(task.createdAt)}
          <MessageCircle size={14} />0
          <Paperclip size={14} />0
        </div>

        <Avatar className="h-7 w-7 border">
          <AvatarImage
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${task.user}`}
          />
          <AvatarFallback>{task.title?.[0]}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default TaskCard;

// // import React from "react";
// // import {
// //   Clock,
// //   MessageCircle,
// //   Paperclip,
// //   Tag,
// // } from "lucide-react";
// // import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// // import { Progress } from "@/components/ui/progress";

// // const TaskCard = ({ task }) => {
// //   /* ---------- Priority Colors ---------- */
// //   const priorityColors = {
// //     low: "bg-blue-100 text-blue-700 border-blue-200",
// //     medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
// //     high: "bg-red-100 text-red-700 border-red-200",
// //   };

// //   /* ---------- Status → Progress ---------- */
// //   const statusProgress = {
// //     todo: 10,
// //     "in-progress": 50,
// //     completed: 100,
// //   };

// //   const progress = statusProgress[task.status] ?? 0;

// //   /* ---------- Date Formatter ---------- */
// //   const formatDate = (date) =>
// //     new Date(date).toLocaleDateString("en-US", {
// //       month: "short",
// //       day: "numeric",
// //     });

// //   return (
// //     <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all duration-300 cursor-pointer group">
      
// //       {/* ---------- Header ---------- */}
// //       <div className="flex items-start justify-between mb-3">
// //         <h3 className="text-slate-800 font-semibold text-base leading-snug pr-2 group-hover:text-[#6b5fed] transition-colors">
// //           {task.title}
// //         </h3>

// //         <span
// //           className={`px-2.5 py-1 rounded-full text-xs font-medium border capitalize shrink-0 ${
// //             priorityColors[task.priority] || priorityColors.medium
// //           }`}
// //         >
// //           {task.priority || "Medium"}
// //         </span>
// //       </div>

// //       {/* ---------- Description ---------- */}
// //       <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">
// //         {task.description || "No description provided"}
// //       </p>

// //       {/* ---------- Tags ---------- */}
// //       {task.tags?.length > 0 && (
// //         <div className="flex flex-wrap gap-2 mb-4">
// //           {task.tags.map((tag, index) => (
// //             <span
// //               key={index}
// //               className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 rounded-md text-xs text-slate-600 font-medium"
// //             >
// //               <Tag size={12} />
// //               {tag}
// //             </span>
// //           ))}
// //         </div>
// //       )}

// //       {/* ---------- Progress ---------- */}
// //       <div className="mb-4">
// //         <div className="flex items-center justify-between mb-1.5">
// //           <span className="text-xs font-medium text-slate-500">
// //             Task Progress
// //           </span>
// //           <span className="text-xs font-semibold text-slate-700">
// //             {progress}%
// //           </span>
// //         </div>

// //         <Progress value={progress} className="h-1.5" />
// //       </div>

// //       {/* ---------- Footer ---------- */}
// //       <div className="flex items-center justify-between pt-3 border-t border-slate-50">
        
// //         {/* Left */}
// //         <div className="flex items-center gap-4">
// //           <div className="flex items-center gap-1.5 text-slate-400">
// //             <Clock size={14} />
// //             <span className="text-xs font-medium">
// //               {formatDate(task.createdAt)}
// //             </span>
// //           </div>

// //           <div className="flex items-center gap-3 text-slate-400">
// //             <div className="flex items-center gap-1">
// //               <MessageCircle size={14} />
// //               <span className="text-xs font-medium">
// //                 {task.commentsCount || 0}
// //               </span>
// //             </div>

// //             <div className="flex items-center gap-1">
// //               <Paperclip size={14} />
// //               <span className="text-xs font-medium">
// //                 {task.attachmentsCount || 0}
// //               </span>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Right */}
// //         <div className="flex -space-x-2">
// //           {(task.assignees || []).slice(0, 3).map((user, index) => (
// //             <Avatar
// //               key={index}
// //               className="h-7 w-7 border-2 border-white ring-1 ring-slate-100"
// //             >
// //               <AvatarImage src={user.avatar} />
// //               <AvatarFallback className="text-xs">
// //                 {user.name?.[0]}
// //               </AvatarFallback>
// //             </Avatar>
// //           ))}

// //           {task.assignees?.length > 3 && (
// //             <div className="h-7 w-7 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center">
// //               <span className="text-[10px] font-semibold text-slate-600">
// //                 +{task.assignees.length - 3}
// //               </span>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default TaskCard;


// import React from "react";
// import {
//   Clock,
//   MessageCircle,
//   Paperclip,
//   Tag,
// } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Progress } from "@/components/ui/progress";

// const TaskCard = ({ task }) => {
//   /* ---------- Priority Colors ---------- */
//   const priorityColors = {
//     low: "bg-blue-100 text-blue-700 border-blue-200",
//     medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
//     high: "bg-red-100 text-red-700 border-red-200",
//   };

//   /* ---------- Status → Progress ---------- */
//   const statusProgress = {
//     todo: 10,
//     "in-progress": 50,
//     completed: 100,
//   };

//   const progress = statusProgress[task.status] ?? 0;

//   /* ---------- Date Formatter ---------- */
//   const formatDate = (date) =>
//     new Date(date).toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//     });

//   return (
//     <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-all cursor-pointer">
      
//       {/* Header */}
//       <div className="flex items-start justify-between mb-3">
//         <h3 className="text-slate-800 font-semibold text-base pr-2">
//           {task.title}
//         </h3>

//         <span
//           className={`px-2.5 py-1 rounded-full text-xs font-medium border capitalize ${
//             priorityColors[task.priority] || priorityColors.medium
//           }`}
//         >
//           {task.priority}
//         </span>
//       </div>

//       {/* Description */}
//       <p className="text-slate-500 text-sm mb-4 line-clamp-2">
//         {task.description || "No description"}
//       </p>

//       {/* Progress */}
//       <div className="mb-4">
//         <div className="flex justify-between mb-1 text-xs text-slate-600">
//           <span>Task Progress</span>
//           <span>{progress}%</span>
//         </div>
//         <Progress value={progress} className="h-1.5" />
//       </div>

//       {/* Footer */}
//       <div className="flex justify-between items-center pt-3 border-t">
        
//         {/* Left */}
//         <div className="flex items-center gap-4 text-slate-400 text-xs">
//           <div className="flex items-center gap-1">
//             <Clock size={14} />
//             {formatDate(task.createdAt)}
//           </div>

//           <div className="flex items-center gap-1">
//             <MessageCircle size={14} /> 0
//           </div>

//           <div className="flex items-center gap-1">
//             <Paperclip size={14} /> 0
//           </div>
//         </div>

//         {/* Right Avatar (AUTO GENERATED) */}
//         <Avatar className="h-7 w-7 border-2 border-white ring-1 ring-slate-200">
//           <AvatarImage
//             src={`https://api.dicebear.com/7.x/initials/svg?seed=${task.user}`}
//           />
//           <AvatarFallback className="text-xs">
//             {task.title?.[0]}
//           </AvatarFallback>
//         </Avatar>
//       </div>
//     </div>
//   );
// };

// export default TaskCard;



import React from "react";
import {
  Clock,
  MessageCircle,
  Paperclip,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";
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

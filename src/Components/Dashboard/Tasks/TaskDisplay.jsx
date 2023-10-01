// components/TaskDisplay.js
import React from "react";

const TaskDisplay = ({ task, handleEditTask }) => {
  return (
    <div className="flex flex-row">
      <div
        className={`flex flex-row items-center ${
          task.isCompleted ? "text-green-300" : ""
        }`}
        onClick={() => handleEditTask(task._id)}
      >
        {task.message}
        <span className="ml-2 text-gray-400">
          {task.reminderDateTime &&
            new Date(task.reminderDateTime).toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default TaskDisplay;

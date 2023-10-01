const TaskDeletionButton = ({ task, deleteTask }) => {
  return (
    <button
      onClick={() => deleteTask(task._id)}
      className="flex flex-grow justify-end px-2 rounded-full py-1 text-xs mr-2 w-fit h-fit font-bold text-gray-500 hover:scale-105"
    >
      ❌
    </button>
  );
};

export default TaskDeletionButton;

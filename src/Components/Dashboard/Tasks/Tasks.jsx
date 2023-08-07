import { useEffect, useState } from "react";

const Tasks = ({ contact, setDisplayContactTask }) => {
  const [tasksButton, setTasksButtonIsClicked] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const response = await fetch(
        `http://localhost:8000/api/v1/tasks/${contact._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setTasks(data.tasks)
      }
    };

    getTasks();
  }, [contact]);

  const handleClickTasksOn = () => {
    setDisplayContactTask(false);
    setTasksButtonIsClicked(true);
  };

  const handleClickTasksOff = () => {
    setDisplayContactTask(true);
    setTasksButtonIsClicked(false);
  };

  return (
    <>
      {tasksButton ? (
        <div className="p-s3">
          <button
            className="mb-2 py-2 px-2 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-400 via-orange-500 h-fit text-md font-semibold transform hover:scale-105 ease-out duration-150"
            onClick={handleClickTasksOff}
          >
            Back to Contact
          </button>
          {tasks.map((task)=> {
            <div key={task._id} className="p-4 mt-2 min-w-full">
            </div>
          })}
        </div>
      ) : (
        <button
          className="w-1/3 bg-opacity-60 mr-4 mb-2 py-2 px-2 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-400 via-orange-500 h-fit text-md font-semibold transform hover:scale-105 ease-out duration-150"
          onClick={handleClickTasksOn}
        >
          Tasks
        </button>
      )}
    </>
  );
};

export default Tasks;

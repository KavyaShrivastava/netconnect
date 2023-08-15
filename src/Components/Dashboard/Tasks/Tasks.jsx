import { useEffect, useState } from "react";
import CreateTasks from "./CreateTasks";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import dayjs from "dayjs";
import "./task.css"

const Tasks = ({ contact, setDisplayContactTask }) => {
  const [tasksButton, setTasksButtonIsClicked] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [showCreateTaskForm, setShowCreateTaskForm] = useState(false)
  const [editTaskId, setEditTaskId] = useState(null);


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

  const handleTaskCompletionToggle = async(taskId) => {
    const updatedTasks = tasks.map((task) =>
        task._id === taskId ? { ...task, isCompleted: !task.isCompleted } : task);
    setTasks(updatedTasks);

    const updatedTask = updatedTasks.find(task => task._id === taskId);

    try {
        const response = await fetch(
          `http://localhost:8000/api/v1/tasks/${taskId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify(updatedTask),
          }
        );
    
        if (!response.ok) {

          // Handle error if the request fails
          // You might want to revert the task's state in case of an error
          setTasks(tasks);
        }
      } catch (error) {
        // Handle error if the request fails
        // You might want to revert the task's state in case of an error
        setTasks(tasks);
      }

  };
  const handleTaskCreation = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setShowCreateTaskForm(false); // Close the create task form
  };

  const reversedTasks = [...tasks].reverse();


  const handleEditTask = (taskId) => {
    setEditTaskId(taskId);
  };
  
  const handleTaskMessageChange = (taskId, newMessage) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, message: newMessage } : task
      )
    );
  };
  
  const handleTaskReminderChange = (taskId, newReminderDate) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId
          ? { ...task, reminderDateTime: newReminderDate.toISOString() }
          : task
      )
    );
  };
  
  const handleSaveTask = async(taskId) => {
    const updatedTasks = tasks.map((task) =>
      task);
    setTasks(updatedTasks);

    const updatedTask = updatedTasks.find(task => task._id === taskId);

    try {
        const response = await fetch(
          `http://localhost:8000/api/v1/tasks/${taskId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify(updatedTask),
          }
        );
    
        if (!response.ok) {

          // Handle error if the request fails
          // You might want to revert the task's state in case of an error
          setTasks(tasks);
        }
      } catch (error) {
        // Handle error if the request fails
        // You might want to revert the task's state in case of an error
        setTasks(tasks);
      }
    // Update the task on the server here if needed
    setEditTaskId(null); // Exit edit mode
  };

  

  return (
    <>
      {tasksButton ? (
        <div className="">
        <div className="flex flex-row justify-between">
          <button
            className="mb-2 px-2 rounded-2xl h-fit text-md font-semibold transform hover:scale-105 ease-out duration-150"
            onClick={handleClickTasksOff}
          >
            Back to Contact
          </button>
          </div>
          {reversedTasks.map((task) => (
            <div
                key={task._id}
                className={`flex flex-row min-w-full mb-3 ${
                editTaskId === task._id ? "cursor-auto" : "cursor-pointer"
                }`}
            >
          {editTaskId === task._id ? (
            <div>
              <input
                type="text"
                value={task.message}
                onChange={(e) => handleTaskMessageChange(task._id, e.target.value)}
                className="p-3 rounded-md bg-transparent text-white border border-black shadow-md shadow-amber-200 mb-2"
                // Add your styling and attributes for the input
              />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileDateTimePicker
            value={dayjs(task.reminderDateTime)}
            onChange={(newDate) =>
              handleTaskReminderChange(task._id, newDate)
            }
            className="border rounded p-2 text-white custom-datetime-picker-text .MuiInputBase-input"
            // Add your styling and attributes for the DateTimePicker
          />
        </LocalizationProvider>
        <button onClick={() => handleSaveTask(task._id)} className="flex flex-col justify-center mt-3 p-3 rounded-xl hover:bg-white hover:text-black">Save</button>
      </div>
    ) : (
      <div className="flex flex-row">
      <button
      onClick={() => handleTaskCompletionToggle(task._id)}
      className= {`${task.isCompleted ? "text-lime-400 px-2" : "text-transparent px-1 text-xs"} border border-white rounded-full py-1 text-xs mr-2`}
      >
        {task.isCompleted ? "✓" : "XX"}
        </button>
      <div className="flex flex-row items-center"
      onClick={()=> handleEditTask(task._id)}>
            {task.message}
            <span className="ml-2 text-gray-400">
            {task.reminderDateTime &&
                new Date(task.reminderDateTime).toLocaleString()}
                </span>
            </div>
          </div>
            )}
        </div>
        ))}
        <CreateTasks contact={contact} handleTaskCreation={handleTaskCreation} showCreateTaskForm={showCreateTaskForm} setShowCreateTaskForm={setShowCreateTaskForm}/>
        </div>
      ) : (
        <button
          className="transform hover:-translate-y-1 transition-transform duration-300 text-black font-semibold text-xl bg-contain bg-no-repeat bg-center w-36 h-24" 
          style={
            {backgroundImage: "url('/tasks.png')",
            backgroundSize: "130%"
        }}
          onClick={handleClickTasksOn}
        >
          Tasks
        </button>
      )}
    </>
  );
};

export default Tasks;

import { useEffect, useState } from "react";
import CreateTasks from "./CreateTasks";
import "./task.css"
import TaskEdit from "./TaskEdit";
import TaskDisplay from "./TaskDisplay";
import TaskCompletionButton from "./TaskCompletionButton";
import TasksButton from "./TasksButton";
import { getTasks, updateTaskOnServer } from "../../../api/tasksApi";
import BackToContact from "./BackToContact";
import useTasks from "../../../hooks/useTasks";
import TaskDeletionButton from "./DeleteTasks";

const Tasks = ({ contact, setDisplayContactTask }) => {
  const {
    tasks,
    setTasks,
    editTaskId,
    handleEditTask,
    handleTaskMessageChange,
    handleTaskReminderChange,
    updateTaskOnServerAndExitEdit,
    handleDeleteTask,
  } = useTasks(contact);

  const [tasksButton, setTasksButtonIsClicked] = useState(false);
  const [showCreateTaskForm, setShowCreateTaskForm] = useState(false)

useEffect(() => {
  const fetchTasks = async () => {
    try {
        const fetchedTasks = await getTasks(contact._id);
        setTasks(fetchedTasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, [contact])

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
      await updateTaskOnServer(updatedTask);
    } catch (error) {
      setTasks(tasks);
    }
  };

  const handleTaskCreation = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setShowCreateTaskForm(false); // Close the create task form
  };

  const reversedTasks = [...tasks].reverse();

  return (
    <>
       {tasksButton ? (
        <div className="">
        <BackToContact handleClickTasksOff={handleClickTasksOff}/>
          {reversedTasks.map((task) => (
            <div
                key={task._id}
                className={`flex flex-row min-w-full mb-3 ${
                editTaskId === task._id ? "cursor-auto" : "cursor-pointer"
                }`}>
            <TaskCompletionButton task = {task} handleTaskCompletionToggle={handleTaskCompletionToggle}/>            
          {editTaskId === task._id ? 
          (
            <TaskEdit
            task={task}
            handleTaskMessageChange={handleTaskMessageChange}
            handleTaskReminderChange={handleTaskReminderChange}
            handleSaveTask={updateTaskOnServerAndExitEdit}
          />//edit mode
          ) : 
          (
            <div className="flex flex-row justify-between items-center">
              <TaskDisplay task = {task} handleEditTask={handleEditTask}/>
              <div className="flex items-center">
                <TaskDeletionButton task = {task} deleteTask={handleDeleteTask}/>
              </div>
            </div>

          )}
        </div>
        ))}
            <CreateTasks contact={contact} handleTaskCreation={handleTaskCreation} showCreateTaskForm={showCreateTaskForm} setShowCreateTaskForm={setShowCreateTaskForm}/>
        </div>
      ) : (
        <TasksButton handleClickTasksOn={handleClickTasksOn} />
      )} 
    </>
  );
};

export default Tasks;

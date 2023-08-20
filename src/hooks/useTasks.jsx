import { useEffect, useState } from "react";
import { getTasks, updateTaskOnServer, deleteTask } from "../../src/api/tasksApi";

const useTasks = (contact) => {
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);

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
  }, [contact]);

  const handleEditTask = (taskId) => {
    setEditTaskId(taskId);
  };

  const handleTaskMessage = (taskId, newMessage) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, message: newMessage } : task
      )
    );
  };

  const handleTaskReminder = (taskId, newReminderDate) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId
          ? { ...task, reminderDateTime: newReminderDate.toISOString() }
          : task
      )
    );
  };

  const updateTaskOnServerAndExitEdit = async (taskId) => {
    const updatedTask = tasks.find((task) => task._id === taskId);

    try {
      await updateTaskOnServer(updatedTask);
      setEditTaskId(null); // Exit edit mode
    } catch (error) {
      setTasks(tasks);
    }
  };

  const handleDeleteTask = async(taskId) => {
    try{
      await deleteTask(taskId)
      setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));


    }
    catch(error){
      setTasks(tasks)
    }
  }

  return {
    tasks,
    setTasks,
    editTaskId,
    handleEditTask,
    handleTaskMessage,
    handleTaskReminder,
    updateTaskOnServerAndExitEdit,
    handleDeleteTask
  };
};

export default useTasks;

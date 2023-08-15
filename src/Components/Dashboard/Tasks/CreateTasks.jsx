import { FiPlus } from "react-icons/fi";
import { useState } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import './task.css'
const CreateTasks = ({ contact, handleTaskCreation, showCreateTaskForm, setShowCreateTaskForm }) => {

    const [message, setMessage] = useState("");
    const [reminderDateTime, setReminderDateTime] = useState(dayjs(new Date()));
    

    const handleSelectDate = (date) => {
        setReminderDateTime(date);
    }
    
    const handleInputChange = (e) =>{
        setMessage(e.target.value);
    }

    const handleOnClickCreateTask = async() => {
        setShowCreateTaskForm(true);
    }

    const handleCancel = () => {
        setShowCreateTaskForm(false);
    }

    const handleCreateTask = async() => {
        if (!message) {
            alert("Please add a message");
            return;
        }

        const utcReminderDateTime = reminderDateTime.toISOString(); // Convert to UTC

        const newTask = {
            message,
            reminderDateTime: utcReminderDateTime, 
            contact: contact?._id
        }

        const response = await fetch("http://localhost:8000/api/v1/tasks/create",{
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify(newTask)
        });


            if (response.ok) {
                const newTask = await response.json(); // Assuming the API returns the new task
                handleTaskCreation(newTask.task);
                setMessage(""); 
                setReminderDateTime(new Date());
                setShowCreateTaskForm(false); // Close the form after successful creation
            }// Close the form after successful creation
    }

    return(
        <>
        {!showCreateTaskForm && (
            <button className="mt-3 self-end mb-2 p-3 text-sm rounded-full border border-white mr-2 hover:scale-105 hover:transform hover:ease-in duration-200" onClick={handleOnClickCreateTask}>
            Add a New Task
            </button>
        )}
        {showCreateTaskForm && (
            <div>
                <label htmlFor="message" className="block text-white font-bold mb-2">Description</label>
                <input
                    type="text"
                    id="message"
                    value={message}
                    onChange={handleInputChange}
                    className="bg-transparent border border-white rounded-xl w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline h-full mb-4"
                />
                <div className="flex flex-row  justify-between">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileDateTimePicker 
                        label="Pick a Date and Time to Remind Yourself"
                        value={dayjs(reminderDateTime)} // Pass the selected date and time
                        onChange={handleSelectDate}
                        className="custom-datetime-picker-text .MuiInputBase-input"
                        // Update the state when the user selects a date and time
                    />
                </LocalizationProvider>
                <button className="border border-white rounded-lg p-3 hover:bg-white hover:text-black" onClick={handleCreateTask}>Save</button>
                <button className="border border-white rounded-lg p-3 hover:bg-white hover:text-black" onClick={handleCancel}>Cancel</button>

                </div>
            </div>
        )}
        </>
    )
}

export default CreateTasks;

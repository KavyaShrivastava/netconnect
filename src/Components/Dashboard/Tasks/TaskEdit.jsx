import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import dayjs from "dayjs";

const TaskEdit = ({task, handleTaskMessageChange, handleTaskReminderChange, handleSaveTask}) =>{
    return (
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
    )
}

export default TaskEdit
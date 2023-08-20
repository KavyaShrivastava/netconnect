const TaskCompletionButton = ({task, handleTaskCompletionToggle}) => {
    return(
        <button
        onClick={() => handleTaskCompletionToggle(task._id)}
        className= {`${task.isCompleted ? "text-lime-400" : "text-transparent"} px-2 border border-white rounded-full py-1 text-xs mr-2 w-fit h-fit`}
      >
       ✓
      </button>
    )

}

export default TaskCompletionButton
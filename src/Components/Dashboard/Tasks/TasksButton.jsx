const TasksButton = ({handleClickTasksOn}) => {
    return (
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
    )
}

export default TasksButton
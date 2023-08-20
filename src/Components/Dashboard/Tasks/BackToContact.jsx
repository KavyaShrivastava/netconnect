const BackToContact = ({handleClickTasksOff}) => {
    return (
        <button
            className="mt-3 self-end mb-2 p-3 text-sm rounded-full border border-white mr-2 hover:scale-105 hover:transform hover:ease-in duration-200"
            onClick={handleClickTasksOff}
          >
            Back to Contact
          </button>
    )
}

export default BackToContact
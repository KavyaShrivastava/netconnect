const API_URL = "http://localhost:8000/api/v1/tasks";

export async function getTasks(contactId) {
  const response = await fetch(`${API_URL}/${contactId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  if (response.ok) {
    const data = await response.json();
    return data.tasks;
  } else {
    throw new Error("Failed to fetch tasks");
  }
}

export async function updateTaskOnServer(task) {
  const response = await fetch(`${API_URL}/${task._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error("Failed to update task");
  }
}

export async function deleteTask(taskId){
  console.log(taskId)
  const response = await fetch(`${API_URL}/delete`,{
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify({ taskId })
  })
  console.log(JSON.stringify({ taskId }))
  if (!response.ok) {
    throw new Error("Failed to delete task");
  }
}


export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}


const BASE_URL = "http://localhost:5000/api/todos";
export const getTodoList = async () => {
  const response = await fetch(`${BASE_URL}`);
  return await response.json();
}


export const createTodo = async (todo: Todo) => {
  const response = await fetch(`${BASE_URL}`, {
    method: "POST",
    body: JSON.stringify(todo),
    headers: {
      "Content-type": "application/json"
    }
  });
  return await response.json();
}

export const updateTodoDetails = async (todo: Todo) => {
  try {
    const response = await fetch(`${BASE_URL}/${todo.id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: todo.title,
        completed: todo.completed
      }),
      headers: {
        "Content-type": "application/json"
      }
    });
    const json = await response.json();
    if (response.ok) {
      return json;
    } else {
      throw new Error(json.message || "Failed to update todo");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}


export const deleteTodoDetails = async (todo: Todo) => {
  const response = await fetch(`${BASE_URL}/${todo.id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json"
    }
  });
  return await response.json();
}

export const addToDoDetails = async (text: string) => {
  const response = await fetch(`${BASE_URL}`, {
    method: "POST",
    body: JSON.stringify({ title: text, completed: false}),
    headers: {
      "Content-type": "application/json"
    }
  });
  return await response.json();
}


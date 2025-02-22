const API_BASE_URL = "http://localhost:8000/api/todos"; 

const fetchApi = async (path: string, options?: RequestInit) => {
  const response = await fetch(`${API_BASE_URL}/${path}`, options);
  return response.json();
};

export const getTodos = () => fetchApi("getAllTodo");

export const createTodo = (task: string, description: string) => 
  fetchApi("createTodo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task, description }),
  });

export const updateTodo = (id: number, task: string, description: string, completed: boolean) => 
  fetchApi(`updateTodo/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task, description, completed }),
  });

  export const toggleTodo = (id: number) => 
    fetchApi(`toggleTodo/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: true }),
    });
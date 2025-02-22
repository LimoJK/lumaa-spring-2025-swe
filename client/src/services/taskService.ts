const API_URL = 'http://localhost:5000/api/tasks'; 

interface Task {
  id: number;
  description: string;
  completed: boolean;
  created_at: string;
  user_id: number;
}

export const fetchTasks = async (token: string): Promise<Task[]> => {
  try {
    const response = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
};

export const addTask = async (token: string, description: string) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ description }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error adding task:', error);
    return null;
  }
};

export const deleteTask = async (token: string, taskId: number) => {
  try {
    const response = await fetch(`${API_URL}/${taskId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return { success: response.ok, message: data.message || 'Task deleted successfully' };
  } catch (error) {
    console.error('Error deleting task:', error);
    return false;
  }
};

export const updateTask = async (token: string, taskId: number, description: string) => {
  try {
    const response = await fetch(`${API_URL}/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ description: description ?? undefined }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error updating task:', error);
    return null;
  }
};

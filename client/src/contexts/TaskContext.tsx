import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import axios from 'axios';

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
  tags: string[];
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => Promise<void>;
  updateTask: (id: string, task: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  completeTask: (id: string) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

function getAuthHeaders() {
  const token = localStorage.getItem('taskmate_token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/tasks`, getAuthHeaders());
        setTasks(res.data);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  const addTask = async (task: Omit<Task, 'id' | 'createdAt'>) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/tasks`, task, getAuthHeaders());
      setTasks((prev) => [...prev, res.data]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const updateTask = async (id: string, updatedTask: Partial<Task>) => {
    try {
      const res = await axios.put(`${API_BASE_URL}/tasks/${id}`, updatedTask, getAuthHeaders());
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? res.data : task))
      );
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/tasks/${id}`, getAuthHeaders());
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const completeTask = async (id: string) => {
    try {
      const task = tasks.find((t) => t.id === id);
      if (!task) return;

      const res = await axios.put(
        `${API_BASE_URL}/tasks/${id}`,
        { completed: !task.completed },
        getAuthHeaders()
      );

      setTasks((prev) =>
        prev.map((t) => (t.id === id ? res.data : t))
      );
    } catch (error) {
      console.error('Error toggling completion:', error);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        completeTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}

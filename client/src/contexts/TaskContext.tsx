import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { format } from 'date-fns';

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
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  completeTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Mock initial tasks
const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Complete project proposal',
    description: 'Finish the draft and send it to the team for review',
    completed: false,
    createdAt: '2023-06-15T10:00:00Z',
    dueDate: format(new Date().setDate(new Date().getDate() + 2), 'yyyy-MM-dd'),
    priority: 'high',
    tags: ['work', 'project']
  },
  {
    id: '2',
    title: 'Buy groceries',
    description: 'Milk, eggs, bread, and vegetables',
    completed: true,
    createdAt: '2023-06-14T15:30:00Z',
    dueDate: format(new Date(), 'yyyy-MM-dd'),
    priority: 'medium',
    tags: ['personal', 'shopping']
  },
  {
    id: '3',
    title: 'Schedule dentist appointment',
    completed: false,
    createdAt: '2023-06-13T09:15:00Z',
    dueDate: format(new Date().setDate(new Date().getDate() + 5), 'yyyy-MM-dd'),
    priority: 'low',
    tags: ['personal', 'health']
  },
  {
    id: '4',
    title: 'Prepare presentation for meeting',
    description: 'Include key metrics and project updates',
    completed: false,
    createdAt: '2023-06-12T14:00:00Z',
    dueDate: format(new Date().setDate(new Date().getDate() + 1), 'yyyy-MM-dd'),
    priority: 'high',
    tags: ['work', 'meeting']
  },
  {
    id: '5',
    title: 'Review code pull request',
    completed: false,
    createdAt: '2023-06-12T11:30:00Z',
    dueDate: format(new Date(), 'yyyy-MM-dd'),
    priority: 'medium',
    tags: ['work', 'coding']
  }
];

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('taskmate_tasks');
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('taskmate_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const updateTask = (id: string, updatedTask: Partial<Task>) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, ...updatedTask } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const completeTask = (id: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        completeTask
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
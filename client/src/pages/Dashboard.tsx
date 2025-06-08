import { useTasks, Task } from '../contexts/TaskContext';
import { useAuth } from '../contexts/AuthContext';
import { format, isPast, isToday } from 'date-fns';
import { CheckCircle, Clock, ListTodo, BarChart3, AlertCircle } from 'lucide-react';
import TaskCard from '../components/tasks/TaskCard';

const Dashboard = () => {
  const { tasks } = useTasks();
  const { user } = useAuth();
  
  // Get current date and time
  const now = new Date();
  const currentTime = format(now, 'EEEE, MMMM d');
  
  // Filter tasks
  const todayTasks = tasks.filter(task => 
    task.dueDate && isToday(new Date(task.dueDate)) && !task.completed
  );
  
  const overdueTasks = tasks.filter(task => 
    task.dueDate && isPast(new Date(task.dueDate)) && !isToday(new Date(task.dueDate)) && !task.completed
  );
  
  const highPriorityTasks = tasks.filter(task => 
    task.priority === 'high' && !task.completed
  );
  
  const recentlyCompletedTasks = tasks
    .filter(task => task.completed)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);
  
  // Calculate task stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  // Greeting based on time of day
  const getGreeting = () => {
    const hour = now.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };
  
  const getNextFocusTasks = (): Task[] => {
    // Priority: 1. Overdue 2. Today's tasks 3. High priority
    if (overdueTasks.length > 0) return overdueTasks.slice(0, 2);
    if (todayTasks.length > 0) return todayTasks.slice(0, 2);
    if (highPriorityTasks.length > 0) return highPriorityTasks.slice(0, 2);
    return tasks.filter(t => !t.completed).slice(0, 2);
  };
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
          {getGreeting()}, {user?.name}
        </h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          {currentTime} • Here's an overview of your tasks
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Task stats */}
        <div className="card bg-gradient-to-br from-primary-500 to-primary-700 text-white">
          <div className="flex justify-between">
            <h3 className="font-medium">Task Progress</h3>
            <span className="text-white/80">{completedTasks}/{totalTasks} completed</span>
          </div>
          
          <div className="mt-2 h-2.5 w-full rounded-full bg-white/20">
            <div 
              className="h-2.5 rounded-full bg-white" 
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-white/80">Progress</span>
            <span className="text-lg font-semibold">{completionRate}%</span>
          </div>
        </div>
        
        {/* Today's tasks */}
        <div className="card">
          <div className="mb-3 flex items-center text-gray-800 dark:text-gray-200">
            <Clock size={18} className="mr-2 text-primary-600 dark:text-primary-400" />
            <h3 className="font-medium">Today's Tasks</h3>
          </div>
          
          <div className="space-y-2">
            {todayTasks.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No tasks scheduled for today.
              </p>
            ) : (
              todayTasks.slice(0, 3).map(task => (
                <div key={task.id} className="flex items-center justify-between rounded-md border border-gray-200 px-3 py-2 dark:border-gray-700">
                  <span className="text-sm">{task.title}</span>
                  <span className="badge bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                    {task.priority}
                  </span>
                </div>
              ))
            )}
          </div>
          
          {todayTasks.length > 3 && (
            <div className="mt-3 text-right">
              <button className="text-xs text-primary-600 dark:text-primary-400">
                +{todayTasks.length - 3} more
              </button>
            </div>
          )}
        </div>
        
        {/* Overdue tasks */}
        <div className="card">
          <div className="mb-3 flex items-center text-gray-800 dark:text-gray-200">
            <AlertCircle size={18} className="mr-2 text-accent-500" />
            <h3 className="font-medium">Overdue Tasks</h3>
          </div>
          
          <div className="space-y-2">
            {overdueTasks.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No overdue tasks. Great job!
              </p>
            ) : (
              overdueTasks.slice(0, 3).map(task => (
                <div key={task.id} className="flex items-center justify-between rounded-md border border-gray-200 px-3 py-2 dark:border-gray-700">
                  <span className="text-sm">{task.title}</span>
                  <span className="badge bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                    Overdue
                  </span>
                </div>
              ))
            )}
          </div>
          
          {overdueTasks.length > 3 && (
            <div className="mt-3 text-right">
              <button className="text-xs text-primary-600 dark:text-primary-400">
                +{overdueTasks.length - 3} more
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
          Focus on These
        </h2>
        
        <div className="grid gap-4 md:grid-cols-2">
          {getNextFocusTasks().length > 0 ? (
            getNextFocusTasks().map(task => (
              <TaskCard key={task.id} task={task} />
            ))
          ) : (
            <div className="card flex items-center justify-center text-center p-8">
              <div>
                <CheckCircle size={40} className="mx-auto mb-2 text-secondary-500" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  All caught up!
                </h3>
                <p className="mt-1 text-gray-500 dark:text-gray-400">
                  You've completed all your urgent tasks.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Recently Completed
            </h2>
            <button className="text-sm text-primary-600 dark:text-primary-400">
              View all
            </button>
          </div>
          
          <div className="space-y-3">
            {recentlyCompletedTasks.length > 0 ? (
              recentlyCompletedTasks.map(task => (
                <div key={task.id} className="flex items-center space-x-2 rounded-md border border-gray-200 px-3 py-2 dark:border-gray-700">
                  <CheckCircle size={16} className="text-secondary-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400 line-through">
                    {task.title}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No tasks completed yet.
              </p>
            )}
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Quick Actions
            </h2>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <button className="card flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
              <ListTodo size={24} className="mb-2 text-primary-600 dark:text-primary-400" />
              <span className="text-sm">All Tasks</span>
            </button>
            
            <button className="card flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
              <BarChart3 size={24} className="mb-2 text-primary-600 dark:text-primary-400" />
              <span className="text-sm">Analytics</span>
            </button>
            
            <button className="card flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
              <Clock size={24} className="mb-2 text-accent-500" />
              <span className="text-sm">Today</span>
            </button>
            
            <button className="card flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
              <AlertCircle size={24} className="mb-2 text-red-500" />
              <span className="text-sm">High Priority</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
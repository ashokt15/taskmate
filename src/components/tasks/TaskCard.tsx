import { CheckCircle, Circle, Clock, AlertCircle, Tag, Pencil, Trash2, MoreVertical } from 'lucide-react';
import { useTasks, Task } from '../../contexts/TaskContext';
import { useState, useRef, useEffect } from 'react';
import { format, isToday, isTomorrow, parseISO } from 'date-fns';

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const { completeTask, deleteTask } = useTasks();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Format due date for display
  const formatDueDate = (dateString: string | undefined) => {
    if (!dateString) return null;
    
    const date = parseISO(dateString);
    
    if (isToday(date)) {
      return 'Today';
    } else if (isTomorrow(date)) {
      return 'Tomorrow';
    } else {
      return format(date, 'MMM d');
    }
  };
  
  // Priority color mapping
  const priorityColorMap = {
    low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    medium: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
    high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  };
  
  // Priority icon mapping
  const PriorityIcon = () => {
    switch (task.priority) {
      case 'high':
        return <AlertCircle size={14} className="text-red-600 dark:text-red-400" />;
      case 'medium':
        return <Clock size={14} className="text-amber-600 dark:text-amber-400" />;
      case 'low':
        return <Clock size={14} className="text-green-600 dark:text-green-400" />;
      default:
        return null;
    }
  };
  
  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <div className={`card transition-all duration-200 ${task.completed ? 'opacity-75' : ''}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <button
            onClick={() => completeTask(task.id)}
            className="flex-shrink-0 mt-0.5 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
          >
            {task.completed ? (
              <CheckCircle className="h-5 w-5 text-secondary-500" />
            ) : (
              <Circle className="h-5 w-5 text-gray-400" />
            )}
          </button>
          
          <div className="flex-1">
            <h3 className={`text-base font-medium ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-gray-100'}`}>
              {task.title}
            </h3>
            
            {task.description && (
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {task.description}
              </p>
            )}
            
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
              {task.dueDate && (
                <span className="badge bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 flex items-center">
                  <Clock size={12} className="mr-1" />
                  {formatDueDate(task.dueDate)}
                </span>
              )}
              
              <span className={`badge flex items-center ${priorityColorMap[task.priority]}`}>
                <PriorityIcon />
                <span className="ml-1 capitalize">{task.priority}</span>
              </span>
              
              {task.tags.map(tag => (
                <span 
                  key={tag} 
                  className="badge bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300 flex items-center"
                >
                  <Tag size={12} className="mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Task options"
          >
            <MoreVertical size={18} />
          </button>
          
          {menuOpen && (
            <div className="absolute right-0 z-10 mt-1 w-36 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-800 dark:ring-gray-700">
              <button
                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                onClick={() => {
                  setMenuOpen(false);
                  // Edit logic would go here
                }}
              >
                <Pencil size={14} className="mr-2" />
                Edit
              </button>
              <button
                className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-700"
                onClick={() => {
                  setMenuOpen(false);
                  deleteTask(task.id);
                }}
              >
                <Trash2 size={14} className="mr-2" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
import { useState, useMemo } from 'react';
import { useTasks } from '../contexts/TaskContext';
import TaskCard from '../components/tasks/TaskCard';
import { Filter, SortDesc, Search, Plus } from 'lucide-react';

const Tasks = () => {
  const { tasks } = useTasks();
  
  // Filters
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'' | 'low' | 'medium' | 'high'>('');
  const [tagFilter, setTagFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Sort
  const [sortBy, setSortBy] = useState<'createdAt' | 'dueDate' | 'priority'>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  // UI state
  const [showFilters, setShowFilters] = useState(false);
  
  // Get unique tags from all tasks for filter dropdown
  const uniqueTags = useMemo(() => {
    const tags = new Set<string>();
    tasks.forEach(task => {
      task.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  }, [tasks]);
  
  // Apply filters and sort
  const filteredTasks = useMemo(() => {
    let result = [...tasks];
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(task => 
        statusFilter === 'completed' ? task.completed : !task.completed
      );
    }
    
    // Apply priority filter
    if (priorityFilter) {
      result = result.filter(task => task.priority === priorityFilter);
    }
    
    // Apply tag filter
    if (tagFilter) {
      result = result.filter(task => task.tags.includes(tagFilter));
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(task => 
        task.title.toLowerCase().includes(query) || 
        (task.description && task.description.toLowerCase().includes(query))
      );
    }
    
    // Apply sorting
    result.sort((a, b) => {
      if (sortBy === 'createdAt') {
        return sortDirection === 'asc'
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      
      if (sortBy === 'dueDate') {
        // Handle null/undefined due dates
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return sortDirection === 'asc' ? -1 : 1;
        if (!b.dueDate) return sortDirection === 'asc' ? 1 : -1;
        
        return sortDirection === 'asc'
          ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
          : new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
      }
      
      if (sortBy === 'priority') {
        const priorityValues = { high: 3, medium: 2, low: 1 };
        return sortDirection === 'asc'
          ? priorityValues[a.priority] - priorityValues[b.priority]
          : priorityValues[b.priority] - priorityValues[a.priority];
      }
      
      return 0;
    });
    
    return result;
  }, [tasks, statusFilter, priorityFilter, tagFilter, searchQuery, sortBy, sortDirection]);
  
  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
          My Tasks
        </h1>
        
        <div className="mt-4 flex space-x-2 sm:mt-0">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn btn-outline flex items-center"
          >
            <Filter size={16} className="mr-2" />
            Filters
          </button>
          
          <button
            className="btn btn-primary flex items-center"
          >
            <Plus size={16} className="mr-2" />
            New Task
          </button>
        </div>
      </div>
      
      <div className={`mb-6 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 transition-all duration-300 ${
        showFilters ? 'opacity-100' : 'hidden opacity-0'
      }`}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <label htmlFor="statusFilter" className="block text-sm font-medium mb-1">
              Status
            </label>
            <select
              id="statusFilter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'completed' | 'pending')}
              className="input w-full"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="priorityFilter" className="block text-sm font-medium mb-1">
              Priority
            </label>
            <select
              id="priorityFilter"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value as '' | 'low' | 'medium' | 'high')}
              className="input w-full"
            >
              <option value="">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="tagFilter" className="block text-sm font-medium mb-1">
              Tag
            </label>
            <select
              id="tagFilter"
              value={tagFilter}
              onChange={(e) => setTagFilter(e.target.value)}
              className="input w-full"
            >
              <option value="">All Tags</option>
              {uniqueTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="sortBy" className="block text-sm font-medium mb-1">
              Sort By
            </label>
            <div className="flex items-center space-x-2">
              <select
                id="sortBy"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'createdAt' | 'dueDate' | 'priority')}
                className="input w-full"
              >
                <option value="createdAt">Date Created</option>
                <option value="dueDate">Due Date</option>
                <option value="priority">Priority</option>
              </select>
              
              <button
                onClick={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
                className="btn btn-outline p-2"
                aria-label="Toggle sort direction"
              >
                <SortDesc 
                  size={16} 
                  className={`transform transition-transform ${sortDirection === 'asc' ? 'rotate-180' : ''}`} 
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-6 relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input w-full pl-10"
          />
        </div>
      </div>
      
      <div className="space-y-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))
        ) : (
          <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center dark:border-gray-700 dark:bg-gray-800">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              No tasks found
            </h3>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              {searchQuery || statusFilter !== 'all' || priorityFilter || tagFilter
                ? "Try adjusting your filters to find what you're looking for."
                : "You don't have any tasks yet. Create your first task to get started."}
            </p>
            {!searchQuery && statusFilter === 'all' && !priorityFilter && !tagFilter && (
              <button className="btn btn-primary mt-4">
                <Plus size={16} className="mr-2" />
                Add New Task
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
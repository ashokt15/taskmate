import { useMemo } from 'react';
import { useTasks } from '../contexts/TaskContext';
import { parseISO, format, startOfWeek, addWeeks, differenceInDays } from 'date-fns';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  ArcElement,
  Title, 
  Tooltip, 
  Legend,
  Chart
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Clock, CalendarCheck, PieChart, Tag, CheckSquare } from 'lucide-react';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Set default chart colors
Chart.defaults.color = '#64748b';
Chart.defaults.borderColor = '#e2e8f0';

const Analytics = () => {
  const { tasks } = useTasks();
  
  // Data for task completion over time (last 4 weeks)
  const completionOverTimeData = useMemo(() => {
    // Calculate the start date (4 weeks ago)
    const endDate = new Date();
    const startDate = startOfWeek(addWeeks(endDate, -3));
    
    // Create an array of week labels
    const weeks = [];
    for (let i = 0; i < 4; i++) {
      const weekStart = addWeeks(startDate, i);
      weeks.push(format(weekStart, 'MMM d'));
    }
    
    // Count completed tasks per week
    const completedPerWeek = new Array(4).fill(0);
    
    tasks.forEach(task => {
      if (task.completed) {
        const completedDate = task.createdAt; // Using createdAt as a proxy for completion date
        const taskDate = parseISO(completedDate);
        
        if (taskDate >= startDate && taskDate <= endDate) {
          const weekIndex = Math.min(
            Math.floor(differenceInDays(taskDate, startDate) / 7),
            3
          );
          if (weekIndex >= 0) {
            completedPerWeek[weekIndex]++;
          }
        }
      }
    });
    
    return {
      labels: weeks,
      datasets: [
        {
          label: 'Tasks Completed',
          data: completedPerWeek,
          borderColor: '#6366f1',
          backgroundColor: 'rgba(99, 102, 241, 0.2)',
          tension: 0.3,
        },
      ],
    };
  }, [tasks]);
  
  // Data for tasks by priority
  const tasksByPriorityData = useMemo(() => {
    const priorities = {
      low: 0,
      medium: 0,
      high: 0,
    };
    
    tasks.forEach(task => {
      priorities[task.priority]++;
    });
    
    return {
      labels: ['Low', 'Medium', 'High'],
      datasets: [
        {
          label: 'Tasks by Priority',
          data: [priorities.low, priorities.medium, priorities.high],
          backgroundColor: [
            'rgba(16, 185, 129, 0.7)', // green (low)
            'rgba(245, 158, 11, 0.7)', // amber (medium)
            'rgba(239, 68, 68, 0.7)', // red (high)
          ],
          borderWidth: 1,
        },
      ],
    };
  }, [tasks]);
  
  // Data for task distribution by tags
  const tasksByTagData = useMemo(() => {
    const tagCounts: Record<string, number> = {};
    
    tasks.forEach(task => {
      task.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });
    
    // Sort tags by count (descending) and take top 5
    const topTags = Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
    
    return {
      labels: topTags.map(([tag]) => tag),
      datasets: [
        {
          label: 'Tasks by Tag',
          data: topTags.map(([, count]) => count),
          backgroundColor: [
            'rgba(99, 102, 241, 0.7)',
            'rgba(16, 185, 129, 0.7)',
            'rgba(245, 158, 11, 0.7)',
            'rgba(239, 68, 68, 0.7)',
            'rgba(124, 58, 237, 0.7)',
          ],
          borderWidth: 1,
        },
      ],
    };
  }, [tasks]);
  
  // Calculate metrics
  const metrics = useMemo(() => {
    const completedTasks = tasks.filter(task => task.completed);
    const pendingTasks = tasks.filter(task => !task.completed);
    const totalTasks = tasks.length;
    
    const completionRate = totalTasks > 0 
      ? Math.round((completedTasks.length / totalTasks) * 100)
      : 0;
    
    // Count tasks by priority
    const highPriorityCount = tasks.filter(task => task.priority === 'high').length;
    const highPriorityPercentage = totalTasks > 0
      ? Math.round((highPriorityCount / totalTasks) * 100)
      : 0;
    
    return {
      total: totalTasks,
      completed: completedTasks.length,
      pending: pendingTasks.length,
      completionRate,
      highPriorityPercentage,
    };
  }, [tasks]);
  
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
        Analytics
      </h1>
      
      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Tasks</p>
              <h3 className="text-2xl font-bold">{metrics.total}</h3>
            </div>
            <div className="rounded-full bg-primary-100 p-3 text-primary-600 dark:bg-primary-900 dark:text-primary-400">
              <CheckSquare size={20} />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Completed</p>
              <h3 className="text-2xl font-bold">{metrics.completed}</h3>
            </div>
            <div className="rounded-full bg-green-100 p-3 text-green-600 dark:bg-green-900 dark:text-green-400">
              <CalendarCheck size={20} />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Completion Rate</p>
              <h3 className="text-2xl font-bold">{metrics.completionRate}%</h3>
            </div>
            <div className="rounded-full bg-accent-100 p-3 text-accent-600 dark:bg-accent-900 dark:text-accent-400">
              <PieChart size={20} />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">High Priority</p>
              <h3 className="text-2xl font-bold">{metrics.highPriorityPercentage}%</h3>
            </div>
            <div className="rounded-full bg-red-100 p-3 text-red-600 dark:bg-red-900 dark:text-red-400">
              <Clock size={20} />
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-6 grid gap-6 md:grid-cols-2">
        <div className="card">
          <h3 className="mb-4 flex items-center text-lg font-medium text-gray-900 dark:text-white">
            <CalendarCheck size={18} className="mr-2 text-primary-600 dark:text-primary-400" />
            Task Completion Trend
          </h3>
          <div className="h-64">
            <Line 
              data={completionOverTimeData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      display: true,
                      color: 'rgba(226, 232, 240, 0.5)',
                    },
                    ticks: {
                      precision: 0,
                    },
                  },
                  x: {
                    grid: {
                      display: false,
                    },
                  },
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
            />
          </div>
        </div>
        
        <div className="card">
          <h3 className="mb-4 flex items-center text-lg font-medium text-gray-900 dark:text-white">
            <Tag size={18} className="mr-2 text-primary-600 dark:text-primary-400" />
            Tasks by Tags
          </h3>
          <div className="h-64">
            <Bar 
              data={tasksByTagData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      display: true,
                      color: 'rgba(226, 232, 240, 0.5)',
                    },
                    ticks: {
                      precision: 0,
                    },
                  },
                  x: {
                    grid: {
                      display: false,
                    },
                  },
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="card md:col-span-2">
          <h3 className="mb-4 flex items-center text-lg font-medium text-gray-900 dark:text-white">
            <Clock size={18} className="mr-2 text-primary-600 dark:text-primary-400" />
            Tasks by Priority
          </h3>
          <div className="h-64">
            <Bar 
              data={tasksByPriorityData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      display: true,
                      color: 'rgba(226, 232, 240, 0.5)',
                    },
                    ticks: {
                      precision: 0,
                    },
                  },
                  x: {
                    grid: {
                      display: false,
                    },
                  },
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
            />
          </div>
        </div>
        
        <div className="card">
          <h3 className="mb-4 flex items-center text-lg font-medium text-gray-900 dark:text-white">
            <PieChart size={18} className="mr-2 text-primary-600 dark:text-primary-400" />
            Completion Status
          </h3>
          <div className="flex h-64 items-center justify-center">
            <Pie 
              data={{
                labels: ['Completed', 'Pending'],
                datasets: [
                  {
                    data: [metrics.completed, metrics.pending],
                    backgroundColor: [
                      'rgba(16, 185, 129, 0.7)', // green (completed)
                      'rgba(245, 158, 11, 0.7)', // amber (pending)
                    ],
                    borderColor: [
                      'rgba(16, 185, 129, 1)',
                      'rgba(245, 158, 11, 1)',
                    ],
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
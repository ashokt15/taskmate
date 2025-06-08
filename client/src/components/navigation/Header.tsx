import { useNavigate } from 'react-router-dom';
import { 
  Menu, 
  Bell, 
  PlusCircle, 
  Moon, 
  Sun, 
  Search
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

interface HeaderProps {
  onSidebarOpen: () => void;
  onQuickTaskOpen: () => void;
}

const Header = ({ onSidebarOpen, onQuickTaskOpen }: HeaderProps) => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  
  return (
    <header className="z-10 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 dark:border-gray-700 dark:bg-gray-800 md:px-6">
      <div className="flex items-center">
        <button
          onClick={onSidebarOpen}
          className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu size={20} />
        </button>
        
        <div className="ml-2 lg:ml-0 relative hidden md:flex items-center">
          <Search size={18} className="absolute left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            className="pl-10 input w-64"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <button
          onClick={onQuickTaskOpen}
          className="btn btn-primary"
        >
          <PlusCircle size={18} className="mr-2" />
          <span className="hidden md:inline">New Task</span>
        </button>
        
        <button
          onClick={toggleTheme}
          className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <button className="relative rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Notifications">
          <Bell size={20} />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-accent-500"></span>
        </button>
        
        <button 
          onClick={() => navigate('/profile')}
          className="flex items-center"
        >
          <img
            src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=random`}
            alt={user?.name || 'User'}
            className="h-8 w-8 rounded-full object-cover"
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
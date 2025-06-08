import { NavLink } from 'react-router-dom';
import { 
  X, 
  LayoutDashboard, 
  CheckSquare, 
  BarChart3,
  User,
  Settings, 
  ClipboardList,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { logout } = useAuth();
  
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        ></div>
      )}
      
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 transform bg-white dark:bg-gray-800 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col overflow-y-auto">
          {/* Sidebar header */}
          <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <ClipboardList className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              <span className="text-lg font-semibold">Taskmate</span>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Navigation links */}
          <nav className="flex-1 px-3 py-4">
            <div className="space-y-1">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-100 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50'
                  }`
                }
              >
                <LayoutDashboard size={18} className="mr-3" />
                Dashboard
              </NavLink>
              
              <NavLink
                to="/tasks"
                className={({ isActive }) =>
                  `flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-100 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50'
                  }`
                }
              >
                <CheckSquare size={18} className="mr-3" />
                My Tasks
              </NavLink>
              
              <NavLink
                to="/analytics"
                className={({ isActive }) =>
                  `flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-100 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50'
                  }`
                }
              >
                <BarChart3 size={18} className="mr-3" />
                Analytics
              </NavLink>
            </div>
            
            <div className="mt-8">
              <p className="px-3 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                User
              </p>
              <div className="mt-2 space-y-1">
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary-100 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50'
                    }`
                  }
                >
                  <User size={18} className="mr-3" />
                  Profile
                </NavLink>
                
                <NavLink
                  to="/settings"
                  className={({ isActive }) =>
                    `flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary-100 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50'
                    }`
                  }
                >
                  <Settings size={18} className="mr-3" />
                  Settings
                </NavLink>
              </div>
            </div>
          </nav>
          
          {/* Sidebar footer */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            <button
              onClick={logout}
              className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50"
            >
              <LogOut size={18} className="mr-3" />
              Log out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
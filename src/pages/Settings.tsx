import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon, Calendar, Bell, Globe, PanelLeft } from 'lucide-react';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
        Settings
      </h1>
      
      <div className="space-y-6">
        {/* Appearance */}
        <div className="card">
          <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
            Appearance
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {theme === 'dark' ? (
                  <Moon size={20} className="text-accent-500" />
                ) : (
                  <Sun size={20} className="text-accent-500" />
                )}
                <div>
                  <p className="font-medium">Theme</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Switch between light and dark mode
                  </p>
                </div>
              </div>
              
              <label className="relative inline-flex cursor-pointer items-center">
                <input 
                  type="checkbox" 
                  className="peer sr-only" 
                  checked={theme === 'dark'} 
                  onChange={toggleTheme} 
                />
                <div className="h-6 w-11 rounded-full bg-gray-300 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary-600 peer-checked:after:translate-x-full dark:bg-gray-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <PanelLeft size={20} className="text-primary-600 dark:text-primary-400" />
                <div>
                  <p className="font-medium">Compact Mode</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Reduce spacing in task lists
                  </p>
                </div>
              </div>
              
              <label className="relative inline-flex cursor-pointer items-center">
                <input type="checkbox" className="peer sr-only" />
                <div className="h-6 w-11 rounded-full bg-gray-300 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary-600 peer-checked:after:translate-x-full dark:bg-gray-600"></div>
              </label>
            </div>
          </div>
        </div>
        
        {/* Date & Time */}
        <div className="card">
          <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
            Date & Time
          </h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="dateFormat" className="flex items-center space-x-3">
                <Calendar size={20} className="text-primary-600 dark:text-primary-400" />
                <div>
                  <p className="font-medium">Date Format</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Choose how dates are displayed
                  </p>
                </div>
              </label>
              
              <select
                id="dateFormat"
                className="input mt-2 w-full"
                defaultValue="MMM d, yyyy"
              >
                <option value="MM/dd/yyyy">MM/DD/YYYY (e.g., 06/15/2023)</option>
                <option value="dd/MM/yyyy">DD/MM/YYYY (e.g., 15/06/2023)</option>
                <option value="yyyy-MM-dd">YYYY-MM-DD (e.g., 2023-06-15)</option>
                <option value="MMM d, yyyy">MMM D, YYYY (e.g., Jun 15, 2023)</option>
                <option value="MMMM d, yyyy">MMMM D, YYYY (e.g., June 15, 2023)</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="firstDayOfWeek" className="flex items-center space-x-3">
                <Calendar size={20} className="text-primary-600 dark:text-primary-400" />
                <div>
                  <p className="font-medium">First Day of Week</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Set which day the week starts on
                  </p>
                </div>
              </label>
              
              <select
                id="firstDayOfWeek"
                className="input mt-2 w-full"
                defaultValue="1"
              >
                <option value="0">Sunday</option>
                <option value="1">Monday</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Notifications */}
        <div className="card">
          <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
            Notifications
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell size={20} className="text-primary-600 dark:text-primary-400" />
                <div>
                  <p className="font-medium">Due Date Reminders</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Get notified before tasks are due
                  </p>
                </div>
              </div>
              
              <label className="relative inline-flex cursor-pointer items-center">
                <input type="checkbox" className="peer sr-only" defaultChecked />
                <div className="h-6 w-11 rounded-full bg-gray-300 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary-600 peer-checked:after:translate-x-full dark:bg-gray-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell size={20} className="text-primary-600 dark:text-primary-400" />
                <div>
                  <p className="font-medium">Weekly Summary</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Receive a weekly task progress report
                  </p>
                </div>
              </div>
              
              <label className="relative inline-flex cursor-pointer items-center">
                <input type="checkbox" className="peer sr-only" />
                <div className="h-6 w-11 rounded-full bg-gray-300 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary-600 peer-checked:after:translate-x-full dark:bg-gray-600"></div>
              </label>
            </div>
            
            <div>
              <label htmlFor="reminderTime" className="flex items-center space-x-3">
                <Bell size={20} className="text-primary-600 dark:text-primary-400" />
                <div>
                  <p className="font-medium">Reminder Time</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    When to send due date reminders
                  </p>
                </div>
              </label>
              
              <select
                id="reminderTime"
                className="input mt-2 w-full"
                defaultValue="1"
              >
                <option value="0">At the due time</option>
                <option value="1">1 hour before</option>
                <option value="3">3 hours before</option>
                <option value="24">1 day before</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Regional */}
        <div className="card">
          <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
            Regional
          </h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="language" className="flex items-center space-x-3">
                <Globe size={20} className="text-primary-600 dark:text-primary-400" />
                <div>
                  <p className="font-medium">Language</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Select your preferred language
                  </p>
                </div>
              </label>
              
              <select
                id="language"
                className="input mt-2 w-full"
                defaultValue="en"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="zh">中文</option>
                <option value="ja">日本語</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Advanced */}
        <div className="card">
          <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
            Advanced
          </h2>
          
          <div className="space-y-4">
            <div>
              <button className="btn btn-outline text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950">
                Clear All Data
              </button>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                This will permanently delete all your tasks and settings
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
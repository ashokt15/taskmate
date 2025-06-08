import { ClipboardList } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <ClipboardList size={48} className="text-primary-600 dark:text-primary-400" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-primary-600 dark:border-primary-400"></div>
          </div>
        </div>
        <h1 className="text-2xl font-medium text-gray-800 dark:text-gray-200">
          Loading Taskmate
        </h1>
      </div>
    </div>
  );
};

export default LoadingScreen;
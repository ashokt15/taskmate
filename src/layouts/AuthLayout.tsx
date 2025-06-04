import { Outlet } from 'react-router-dom';
import { ClipboardList } from 'lucide-react';

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Left side - Branding/Info */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary-600 dark:bg-primary-800 flex-col justify-center items-center p-12 text-white">
        <div className="max-w-md space-y-8">
          <div className="flex items-center space-x-2">
            <ClipboardList size={40} />
            <h1 className="text-4xl font-bold">Taskmate</h1>
          </div>
          <h2 className="text-2xl font-medium">Organize your tasks, simplify your life</h2>
          <p className="text-lg opacity-90">
            Taskmate helps you manage your tasks efficiently with a beautiful, intuitive interface.
            Stay organized, focused, and productive.
          </p>
          <div className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-xl">✓</span>
                </div>
                <p className="text-lg">Simple and intuitive task management</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-xl">✓</span>
                </div>
                <p className="text-lg">Stay organized with tags and priorities</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-xl">✓</span>
                </div>
                <p className="text-lg">Track your productivity with analytics</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Auth Forms */}
      <div className="w-full lg:w-1/2 flex justify-center items-center p-6 md:p-12">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
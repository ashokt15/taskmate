import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/navigation/Sidebar';
import Header from '../components/navigation/Header';
import QuickTaskModal from '../components/tasks/QuickTaskModal';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [quickTaskOpen, setQuickTaskOpen] = useState(false);
  
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar for desktop */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header 
          onSidebarOpen={() => setSidebarOpen(true)}
          onQuickTaskOpen={() => setQuickTaskOpen(true)}
        />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>

      {/* Quick Task Modal */}
      <QuickTaskModal 
        isOpen={quickTaskOpen} 
        onClose={() => setQuickTaskOpen(false)} 
      />
    </div>
  );
};

export default MainLayout;
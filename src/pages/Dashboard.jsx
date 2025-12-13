import Sidebar from '@/components/Sidebar'
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
     <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
            {/* Mobile Header */}
            <div className="md:hidden flex items-center p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
                    <Menu className="h-6 w-6" />
                </Button>
                <h1 className="ml-4 text-xl font-bold">Dashboard</h1>
            </div>

            {/* Sidebar (Desktop: Persistent, Mobile: Overlay) */}
            <div className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-200 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                md:translate-x-0 md:block
            `}>
                <Sidebar onClose={() => setSidebarOpen(false)} />
            </div>

            {/* Overlay Backdrop for Mobile */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-black/50 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content Area */}
            <div className='flex-1 md:ml-64 p-4 md:p-8 min-h-screen transition-all'>
                <Outlet />
            </div>
        </div>
  )
}

export default Dashboard

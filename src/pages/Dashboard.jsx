import Sidebar from '@/components/Sidebar'
import { Menu, X } from 'lucide-react'
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
     <div className='min-h-screen pt-20 flex relative bg-gray-50'>
             {/* Mobile Sidebar Toggle - Visible only on mobile */}
            <button 
                className="md:hidden fixed top-24 left-4 z-40 p-2 bg-pink-600 text-white rounded-md shadow-lg"
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Overlay for mobile sidebar */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            
            <div className='flex-1 md:ml-[300px] p-4 min-h-[calc(100vh-80px)]'>
                <Outlet />
            </div>
        </div>
  )
}

export default Dashboard

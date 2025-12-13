import Sidebar from '@/components/Sidebar'
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className='min-h-screen bg-gray-50/30'>
      {/* Mobile Header */}
      <div className='md:hidden flex items-center justify-between p-4 bg-pink-50 border-b border-pink-100 sticky top-0 z-20'>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)} className="hover:bg-pink-100">
             <Menu className="h-6 w-6 text-gray-800" />
          </Button>
          <span className="font-bold text-lg text-gray-800">Dashboard</span>
        </div>
      </div>

      {/* Desktop Sidebar - Fixed */}
      <Sidebar className="hidden md:block fixed left-0 top-0 bottom-0" />

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar - Drawer */}
      <div className={`fixed inset-y-0 left-0 z-40 w-[300px] bg-white transition-transform duration-300 md:hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
         {/* Close Button inside Sidebar area */}
         <div className="absolute top-4 right-4 z-50">
            <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)} className="hover:bg-pink-100/50">
                <X className="h-5 w-5 text-gray-600" />
            </Button>
         </div>
         {/* Render Sidebar content */}
         <Sidebar className="h-full border-r border-pink-200 w-full pt-16" onLinkClick={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main Content Area */}
      <div className='flex-1 md:ml-[300px]'>
          <Outlet />
      </div>
    </div>
  )
}


export default Dashboard

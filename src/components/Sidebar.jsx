import { LayoutDashboard, PackagePlus, PackageSearch, Users, X } from 'lucide-react'
import { FaRegEdit } from 'react-icons/fa';
import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from './ui/button';

const Sidebar = ({ className, onClose }) => {
  const navItems = [
    { to: '/dashboard/sales', icon: <LayoutDashboard />, label: 'Dashboard' },
    { to: '/dashboard/add-product', icon: <PackagePlus />, label: 'Add Product' },
    { to: '/dashboard/products', icon: <PackageSearch />, label: 'Products' },
    { to: '/dashboard/users', icon: <Users />, label: 'Users' },
    { to: '/dashboard/orders', icon: <FaRegEdit />, label: 'Orders' },
  ];

  return (
    <div className={`flex flex-col h-full bg-pink-50 dark:bg-gray-800 border-r border-pink-200 ${className}`}>
        {/* Mobile Close Button */}
        <div className="md:hidden flex justify-end p-4">
            <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
            </Button>
        </div>

      <div className='flex-1 py-6 px-4 space-y-2 overflow-y-auto'>
        {navItems.map((item) => (
            <NavLink 
                key={item.to}
                to={item.to} 
                onClick={onClose}
                className={({ isActive }) => `
                    flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all
                    ${isActive 
                        ? "bg-pink-600 dark:bg-gray-900 text-white shadow-md" 
                        : "hover:bg-pink-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                    }
                `}
            >
            {item.icon}
            <span>{item.label}</span>
            </NavLink>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
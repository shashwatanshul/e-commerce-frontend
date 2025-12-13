import { ChartColumnBig, FolderPlus, LayoutDashboard, PackagePlus, PackageSearch, SquareUser, Users } from 'lucide-react'
import { LiaCommentSolid } from "react-icons/lia";
import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaEdit, FaRegEdit } from 'react-icons/fa';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <div 
      className={`fixed left-0 border-r dark:bg-gray-800 bg-pink-50 border-pink-200 transition-transform duration-300 ease-in-out w-[280px] md:w-[300px] 
      top-0 h-full z-50 pt-20 p-6 
      md:top-[72px] md:h-[calc(100vh-72px)] md:z-10 md:pt-6 md:translate-x-0 
      ${isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}`}
    >
      <div className='flex flex-col gap-2'>
        <NavLink onClick={onClose} to='/dashboard/sales' className={({ isActive }) => `text-lg font-bold px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${isActive ? "bg-pink-600 text-white shadow-md" : "hover:bg-pink-100 text-gray-700"}`}>
          <LayoutDashboard size={22}/>
          <span>Dashboard</span>
        </NavLink>
        <NavLink onClick={onClose} to='/dashboard/add-product' className={({ isActive }) => `text-lg font-bold px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${isActive ? "bg-pink-600 text-white shadow-md" : "hover:bg-pink-100 text-gray-700"}`}>
          <PackagePlus size={22}/>
          <span>Add Product</span>
        </NavLink>
        <NavLink onClick={onClose} to='/dashboard/products' className={({ isActive }) => `text-lg font-bold px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${isActive ? "bg-pink-600 text-white shadow-md" : "hover:bg-pink-100 text-gray-700"}`}>
          <PackageSearch size={22}/>
          <span>Products</span>
        </NavLink>
        <NavLink onClick={onClose} to='/dashboard/users' className={({ isActive }) => `text-lg font-bold px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${isActive ? "bg-pink-600 text-white shadow-md" : "hover:bg-pink-100 text-gray-700"}`}>
          <Users size={22}/>
          <span>Users</span>
        </NavLink>
        <NavLink onClick={onClose} to='/dashboard/orders' className={({ isActive }) => `text-lg font-bold px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${isActive ? "bg-pink-600 text-white shadow-md" : "hover:bg-pink-100 text-gray-700"}`}>
          <FaRegEdit size={22}/>
          <span>Orders</span>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
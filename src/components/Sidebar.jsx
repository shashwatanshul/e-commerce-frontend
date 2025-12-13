import { ChartColumnBig, FolderPlus, LayoutDashboard, PackagePlus, PackageSearch, SquareUser, Users } from 'lucide-react'
import { LiaCommentSolid } from "react-icons/lia";
import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaEdit, FaRegEdit } from 'react-icons/fa';

const Sidebar = ({ className = "", onLinkClick }) => {
  return (
    <div className={`border-r dark:bg-gray-800 bg-pink-50 border-pink-200 z-10 w-[300px] p-4 md:p-10 space-y-2 h-screen ${className}`}>
      <div className='text-center pt-10 px-3 space-y-2'>
        <NavLink onClick={onLinkClick} to='/dashboard/sales' className={({ isActive }) => `text-xl  ${isActive ? "bg-pink-600 dark:bg-gray-900 text-gray-200" : "bg-transparent"} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`}>
          <LayoutDashboard/>
          <span>Dashboard</span>
        </NavLink>
        <NavLink onClick={onLinkClick} to='/dashboard/add-product' className={({ isActive }) => `text-xl  ${isActive ? "bg-pink-600 dark:bg-gray-900 text-gray-200" : "bg-transparent"} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`}>
          <PackagePlus/>
          <span>Add Product</span>
        </NavLink>
        <NavLink onClick={onLinkClick} to='/dashboard/products' className={({ isActive }) => `text-xl  ${isActive ? "bg-pink-600 dark:bg-gray-900 text-gray-200" : "bg-transparent"} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`}>
          <PackageSearch/>
          <span>Products</span>
        </NavLink>
        <NavLink onClick={onLinkClick} to='/dashboard/users' className={({ isActive }) => `text-xl  ${isActive ? "bg-pink-600 dark:bg-gray-900 text-gray-200" : "bg-transparent"} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`}>
          <Users/>
          <span>Users</span>
        </NavLink>
        <NavLink onClick={onLinkClick} to='/dashboard/orders' className={({ isActive }) => `text-xl  ${isActive ? "bg-pink-600 dark:bg-gray-900 text-gray-200" : "bg-transparent"} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`}>
          <FaRegEdit/>
          <span>Orders</span>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
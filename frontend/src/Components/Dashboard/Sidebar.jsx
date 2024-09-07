import React from 'react'
import {navLinks} from '../../Data/NavLinksData';
import { Link, matchPath, useLocation } from 'react-router-dom';
import * as Icons from 'react-icons/md'

export const Sidebar = () => {

  const location=useLocation();
  const path=location.pathname;

  const matchRoute=(route)=>{
    const locationPath=matchPath({path:route},path)
    return locationPath;
  }

  return (
    <div className='flex flex-col bg-blue-500 w-48 h-screen transition-transform duration-300 ease-in-out -z-0 md:z-0 inset-1 fixed top-14 left-0'>
      <div className='flex flex-col gap-2 mt-3'>
        {
           navLinks.map((link,index)=>{
            const Icon=Icons[link.icon];
             return (
              <Link to={link.path} key={index} className={`flex gap-3 items-center mt-3 justify-start ${matchRoute(link.path) ? "bg-blue-200" : "bg-blue-500"} p-2 cursor-pointer`}>
                <Icon size={25} className='ml-5 '/>
                <p  className={`text-lg font-semibold `}>{link.name}</p>
              </Link>
             )
})
        }
      </div>
    </div>
  )
}

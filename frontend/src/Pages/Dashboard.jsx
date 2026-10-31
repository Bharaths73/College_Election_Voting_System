import React, { useEffect, useState } from 'react'
import { Sidebar } from '../Components/Dashboard/Sidebar'
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Common/Navbar'
import { useSelector } from 'react-redux'

export default function Dashboard() {
  const display=useSelector(state=>state.sidebar.display)

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    // Add event listener to handle window resize
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
      <div className='dashboard-layout md:flex gap-5 w-[100vw] static'>
        {
          display &&
          (
            <Sidebar/>
          )
        }
        <div className={`dashboard-content ${display && windowWidth > 800 ? 'dashboard-sidebar-open md:ml-[220px] w-[calc(100%-220px)]' : display ? 'dashboard-sidebar-mobile-open' : 'dashboard-sidebar-closed w-full'} h-[100vh] mt-5 absolute top-16 -z-10`}>
          <Outlet/>
      </div>
      </div> 
  )
}

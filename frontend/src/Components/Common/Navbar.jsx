import React, { useEffect, useState } from 'react';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";
import bmsccm_logo from '../../assets/bmsccm_logo.png';
import profile from '../../assets/profile.jpg';
import ProfileDropDown from '../Core/Navbar/ProfileDropDown';
import { Sidebar } from '../Dashboard/Sidebar';
import {useSelector,useDispatch} from 'react-redux';
import { setDisplaySidebar } from '../../Redux/Slices/SidebarSlice';

export default function Navbar() {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const[profileDisplay,setProfileDisplay]=useState(false);
  const displaySidebar=useSelector(state=>state.sidebar);
  const dispatch=useDispatch();

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
       <div className='w-full flex flex-col bg-blue-500 fixed'>
      <div className='w-full flex flex-row justify-between items-center h-14 py-8 ml-5'>
        <div className='flex items-center gap-7'>
          <RxHamburgerMenu className='text-4xl font-bold cursor-pointer transition-all' onClick={()=>dispatch(setDisplaySidebar())}/>
          <div className='flex gap-2 items-center' >
            <img src={bmsccm_logo} className='sm:w-14 sm:h-14 w-12 h-12'/>
            {
              windowWidth > 850 ? (
                <p className='sm:text-xl font-medium text-xs text-white'>BMS College of Commerce and Management</p>
              ) : (
                <p className='sm:text-xl font-medium text-lg text-white'>BMSCCM</p>
              )
            }
          </div>
        </div>

        <div className='flex sm:px-16 px-10 items-center gap-2 relative group-last:'>
          <img src={profile} className='sm:w-[2.7em] sm:h-[2.8em] w-[2.5em] h-[2.5em] border-blue-500 rounded-full'/>
          <div className='flex items-center gap-1'>
            {
              windowWidth > 850 && (<p className='sm:text-lg text-base'>Bharath</p>)
            }
            <IoIosArrowDown className='text-2xl  font-bold cursor-pointer' onClick={()=>setProfileDisplay(!profileDisplay)}/>
          </div>

          
        </div>
      </div>
      <ProfileDropDown profileDisplay={profileDisplay}/>
    </div>
    
  )
}

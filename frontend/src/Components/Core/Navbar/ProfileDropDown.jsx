import React from 'react'
import profile from '../../../assets/profile.jpg';
import { GrLogout } from "react-icons/gr";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../Services/Operations/Auth';

export default function ProfileDropDown({profileDisplay}) {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {user,role}=useSelector(state=>state.authentication)

  function logoutHandler(){
    dispatch(logout(navigate))
  }
  
  return (
    <div>
        {
            profileDisplay && 
            (
              <div className='bg-white float-end top-[100%] right-2 absolute p-4 z-40 flex-col border-2 border-gray-400  rounded-md '>
            <div></div>

            <div className='flex gap-5 items-center'>
            <div>
              <img src={user.profilePicUrl} className='w-20 h-20 border-white rounded-full'/>
            </div>

            <div className='flex flex-col gap-y-1 text-xs'>
              <p className=' font-bold text-base'>{user.firstName+" "}{user.lastName}</p>
              {
                role!=="ROLE_ADMIN" ? (
                   <div className='flex flex-col gap-y-1'>
                     <p className=' font-bold'>{user.registerNumber}</p>
                     <p className=' font-bold text-wrap'>{user.department}</p>
                   </div>
                ) : (
                  <p className=' font-bold'>Admin</p>
                )
              }
            </div>
            </div>

            <hr className='mt-5 mb-2'/>         
              <button onClick={logoutHandler} className='flex gap-2 items-center cursor-pointer'>
                <GrLogout className='text-xl'/>
                Logout
              </button>
            </div>
            )
          }
    </div>
  )
}

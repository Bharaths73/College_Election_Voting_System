import React from 'react'
import profile from '../../../assets/profile.jpg';
import { GrLogout } from "react-icons/gr";

export default function ProfileDropDown({profileDisplay}) {
  return (
    <div>
        {
            profileDisplay && 
            (
              <div className='bg-white float-end top-[100%] right-2 absolute p-4 z-40 flex-col border-2 border-gray-400  rounded-md '>
            <div></div>

            <div className='flex gap-5 items-center'>
            <div>
              <img src={profile} className='w-20 h-20 border-white rounded-full'/>
            </div>

            <div className='flex flex-col gap-y-1 text-xs'>
              <p className=' font-bold text-base'>Bharath S</p>
              <p className=' font-bold'>PES1PG22CA044</p>
              <p className=' font-bold text-wrap'>Master of Computer Applications</p>
            </div>
            </div>

            <hr className='mt-5 mb-2'/>
            <div className='flex gap-2 items-center'>
              <GrLogout className='text-xl'/>
              <button>Logout</button>
            </div>
            </div>
            )
          }
    </div>
  )
}

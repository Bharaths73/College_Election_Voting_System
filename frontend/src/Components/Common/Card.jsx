import React from 'react';
import { MdDeleteForever,MdModeEditOutline } from "react-icons/md";

export default function Card({voter}) {
  return (
    <div className='bg-slate-300 p-3 rounded-lg shadow-lg'>
        <div className='flex flex-row items-center'>
            <img src={voter.profilePicUrl} className='w-22 h-28 border-slate-400 rounded-lg object-cover'/>
            <div className='flex flex-col gap-1 ml-5 w-full'>
                <div className='flex gap-2 text-sm font-semibold'>
                    <p className='text-wrap break-all'>{voter.firstName}</p>
                    <p className='text-wrap break-all'>{voter.lastName}</p>
                </div>
                <p className='text-xs break-all'>{voter.mobileNumber}</p>
                <p className='text-xs break-all'>{voter.email}</p>
                <p className='text-xs break-all'>{voter.Department}</p>
                <p className='text-xs break-all'>{voter.registerNumber}</p>
            </div>

            
        </div>

        <div className='flex gap-y-7 py-1.5 mt-2  bg-slate-600 rounded-md px-1 mr-0.5'>
                <button className='h-full w-full flex-1'>
                    <MdDeleteForever className='text-3xl text-red-600 w-full '/>
                </button>
                <button className='h-full w-full flex-1'>
                   <MdModeEditOutline className='text-3xl text-yellow-400 w-full'/>
                </button>
           </div>

    </div>
  )
}

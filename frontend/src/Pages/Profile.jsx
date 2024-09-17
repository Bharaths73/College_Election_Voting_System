import React, { Fragment, lazy } from 'react'
import { useSelector } from 'react-redux'

export default function Profile() {
  const {user,role}=useSelector(state=>state.authentication)
  return (
    <div>
      <div className='ml-5 mr-5 pb-10'>
        <h1 className='text-slate-700 font-semibold text-3xl font-mono mt-4 mb-4'>Profile</h1>
        <div className='mt-10 bg-blue-200 py-7 px-7 rounded-lg shadow-lg'>
           <div className='flex flex-row gap-8 items-center'>
              <img src={user.profilePicUrl} width={100} height={100} className='rounded-lg' loading="lazy"/>
              <div className='flex flex-col gap-1'>
                <div className='flex flex-row gap-3 text-black font-semibold text-xl'>
                  <p className='break-all'>{user.firstName}</p>
                  <p className='break-all'>{user.lastName}</p>
                </div>
                <p className='text-slate-600 font-mono font-semibold text-lg break-all'>{user.registerNumber}</p>
                <p className='text-slate-600 font-semibold text-sm break-all'>{user.department}</p>
              </div>
           </div>
        </div>

        <div className='mt-10 bg-blue-200 pt-7 pb-10 px-10 rounded-lg shadow-lg'>
        <p className='text-slate-950 font-semibold text-xl italic mt-4 mb-5 underline'>Personal Details</p>

           <div className='grid sm:grid-cols-2 grids-cols-1 gap-7 mt-6'>
              <div className='flex flex-col gap-0.5'>
                <p className='text-lg font-semibold text-slate-600'>First Name</p>
                <p className='text-slate-500 break-all text-base'>{user.firstName}</p>
              </div>

              <div className='flex flex-col gap-0.5'>
                <p className='text-lg font-semibold text-slate-600'>Last Name</p>
                <p className='text-slate-500 break-all text-base'>{user.lastName}</p>
              </div>

              {
                 role!=="ROLE_ADMIN" && 
                 (

                    <div className='flex flex-col gap-0.5'>
                      <p className='text-lg font-semibold text-slate-600'>Register Number</p>
                      <p className='text-slate-500 break-all text-base'>{user.registerNumber}</p>
                    </div> 

                 )
              }

              {
                role!=="ROLE_ADMIN" && 
                (<div className='flex flex-col gap-0.5'>
                  <p className='text-lg font-semibold text-slate-600'>Department</p>
                  <p className='text-slate-500 break-all text-base'>{user.department}</p>
                </div>)
              }

              <div className='flex flex-col gap-0.5'>
                <p className='text-lg font-semibold text-slate-600'>Mobile Number</p>
                <p className='text-slate-500 break-all text-base'>{user.mobileNumber}</p>
              </div>

              <div className='flex flex-col gap-0.5'>
                <p className='text-lg font-semibold text-slate-600'>Email</p>
                <p className='text-slate-500 break-all text-base'>{user.email}</p>
              </div>

              
           </div>
        </div>


      </div>
    </div>
  )
}

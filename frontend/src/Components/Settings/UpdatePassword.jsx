import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { updatePassword } from '../../Services/Operations/Voters'

export default function UpdatePassword() {

    const{register,setValue,getValues,formState:{errors},handleSubmit}=useForm()
    const[loading,setLoading]=useState()
    const {token}=useSelector((state)=>state.authentication)

    const submitHandler=async(data)=>{
        if(data.newPassword!==data.confirmPassword){
            toast.error("Password and confirm password is not matching")
            return
        }
        else{
            setLoading(true)
            const formData=new FormData()
            formData.append('oldPassword',data.oldPassword)
            formData.append('newPassword',data.newPassword)
            await updatePassword(formData,token)
            setLoading(false)
        }
    }

  return (
    <div className='flex flex-col bg-blue-200 rounded-md px-8 py-5'>
          <form onSubmit={handleSubmit(submitHandler)}>
            <p className='font-semibold text-xl'>Update Password</p>
            <div className='flex gap-x-4 mt-5 lg:flex-row flex-col lg:gap-y-0 gap-y-3'>
            <div className='flex flex-col gap-y-1 flex-1'>
            <label>Old Password</label>
            <input type='password' placeholder='Enter Old Password' id='oldPassword' name='oldPassword' {...register('oldPassword',{required:true})} className='w-full py-2 text-black px-2 rounded-md'/>
            {
              errors.oldPassword && (
                <span>Old password is required</span>
              )
            }
            </div>

            <div className='flex flex-col gap-y-1 flex-1'>
            <label>New Password</label>
            <input type='password' placeholder='Enter New Password' id='newPassword' name='newPassword' {...register('newPassword',{required:true})} className='w-full py-2 text-black px-2 rounded-md'/>
            {
              errors.newPassword && (
                <span>New password is required</span>
              )
            }
            </div>

            <div className='flex flex-col gap-y-1 flex-1'>
            <label>Confirm Password</label>
            <input type='password' placeholder='Confirm Password' id='confirmPassword' name='confirmPassword' {...register('confirmPassword',{required:true})} className='w-full py-2 text-black px-2 rounded-md'/>
            {
              errors.confirmPassword && (
                <span>Confirm password is required</span>
              )
            }
            </div>
            </div>
            <div className='flex items-center justify-end mt-7'>
              <button className='text-white bg-blue-500 px-4 py-2 rounded-md'>Save</button>
            </div>
          </form>
        </div>
  )
}

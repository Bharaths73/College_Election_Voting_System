
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  useNavigate } from 'react-router-dom'
import { MdOutlineFileUpload } from "react-icons/md";
import { useForm,Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
import UpdatePassword from '../Components/Settings/UpdatePassword';
import { Department } from '../Data/Department';
import { updateUser, uploadFileToBackend } from '../Services/Operations/Voters';

export default function Settings() {
  const {token,role}=useSelector((state)=>state.authentication)
  const {user}=useSelector((state)=>state.authentication)
  const {register,setValue,getValues,handleSubmit,formState:{errors},control}=useForm()
  const dispatch=useDispatch();

    const navigate=useNavigate()
    const[loading,setLoading]=useState(false)

    const [tempFile,setTempFile]=useState(user?.profilePicUrl);
    const [updateFile,setUpdateFile]=useState(null)

    function tempFileHandler(e){
      const file = e.target.files[0]
      if(file){
        previewFile(file)
        setUpdateFile(file)
      }
    }

    const previewFile = (file) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setTempFile(reader.result)
      }
    }

    const uploadFile=()=>{
      try{
        setLoading(true)
        const formData = new FormData()
        formData.append("file",updateFile)
        dispatch(uploadFileToBackend(formData,token,user?.proficePicId))
      }
      catch(err){
        console.log("Failed to update profile picture");
      }
      setLoading(false)
    }

    const isFormEdited=()=>{
      const currentValue=getValues()

      if(currentValue.firstName!==user?.firstName || currentValue.lastName!==user?.lastName||currentValue.mobileNumber!=user?.mobileNumber||currentValue.department!==user.department){
        return true
      }
      else{
        return false
      }
    }

    const onSubmitHandler=async(data)=>{
      const currentValue=getValues()
      console.log("values are ",currentValue);
      if(isFormEdited()){
        const formData=new FormData()
        const profile={}
        if(currentValue.registerNumber!==user?.registerNumber){
          profile['registerNumber']=currentValue.registerNumber;
        }
        if(currentValue.firstName!==user?.firstName){
          profile['firstName']=currentValue.firstName;
        }
        if(currentValue.lastName!==user?.lastName){
          profile['lastName']=currentValue.lastName;
        }
        if(currentValue.mobileNumber!==user.mobileNumber){
          profile['mobileNumber']=currentValue.mobileNumber;
        }
        if(currentValue.email!==user?.email){
          profile['email']=currentValue.email;
        }
        if(currentValue.department!==user.department){
          profile['department']=currentValue.department;
        }
        setLoading(true)
        formData.append('profile',new Blob([JSON.stringify(profile)], { type: "application/json" }))
        dispatch(updateUser(formData,token))
        
        setLoading(false)
      }
      else{
        toast.error("No information changed")
        return
      }
    }
const currentValue=getValues()
    useEffect(()=>{
      setValue('firstName',user?.firstName)
      setValue('lastName',user?.lastName)
      setValue('registerNumber',user?.registerNumber)
      setValue('email',user?.email)
      setValue('mobileNumber',user?.mobileNumber)
      setValue('department',user?.department)
    },[])

  return (
    <div className='ml-5 mr-5 pb-10'>
      <div className='text-black flex flex-col mx-auto gap-10'>
        <h1 className='font-semibold text-2xl'>Edit Profile</h1>

        <div className='flex bg-blue-200 rounded-md justify-between px-8'>
            <div className='flex items-center gap-x-5  py-8'>
                <img src={`${tempFile}`} alt={`${user?.firstName}`} className='aspect-square w-[78px] rounded-full'/>
                <div className='flex flex-col gap-y-2'>
                    <p className='f text-lg'>Change Profile Picture</p>
                   <div className='flex items-center gap-3 flex-row'>
                    <label htmlFor='profilePic' className='bg-blue-500 md:py-2 py-1.5 md:px-4 px-3 text-white rounded-md cursor-pointer md:text-lg text-sm'>Select</label>
                     <input type='file' name='profilePic' id='profilePic' className='hidden' onChange={(e)=>{tempFileHandler(e)}}/>
                     <button onClick={()=>{uploadFile()}} className=' border border-black md:py-2 py-1 md:px-4 px-1 rounded-md flex gap-2 items-center text-black md:text-lg text-sm' >{loading? "Uploading..." : 'upload'} {<MdOutlineFileUpload className='md:text-lg text-sm'/>}</button>
                   </div>
                </div>
            </div>
        </div>

        <div className='flex flex-col bg-blue-200 rounded-md px-8 py-5'>
        <form onSubmit={handleSubmit(onSubmitHandler)} >
          <p className='font-semibold text-xl'>Profile Information</p>
          <div className='flex gap-x-10 mt-5 items-center md:flex-row flex-col max-w-full md:gap-y-0 gap-y-3'>
            <div className='flex flex-col gap-y-1 flex-1 w-full'>
            <label>First Name</label>
            <input type='text' placeholder='Enter First Name' id='firstName' {...register('firstName')} className='w-full py-2 text-black px-2 rounded-md'/>
            </div>

            <div className='flex flex-col gap-y-1 flex-1 w-full'>
            <label>Last Name</label>
            <input type='text' placeholder='Enter Last Name' id='lastName' {...register('lastName')} className='w-full py-2 text-black px-2 rounded-md' />
            </div>
          </div>

          <div className='flex gap-x-10 mt-5 items-center md:flex-row flex-col w-full md:gap-y-0 gap-y-3'>
            {
               role==='ROLE_VOTER' && (
                <div className='flex flex-col gap-y-1 flex-1 w-full'>
              <label>Register Number</label>
              <input type='text' id='registerNumber' {...register('registerNumber')} className='w-full py-2 text-black px-2 rounded-md cursor-none' disabled/>
            </div>
               )
            }

            <div className='flex flex-col gap-y-1 flex-1 w-full'>
              <label>Email</label>
              <input type='email' id='email' {...register('email')} className='w-full py-2 text-black px-2 rounded-md' disabled/>
            </div>
          </div>

          <div className='flex gap-x-10 mt-5 items-start md:flex-row flex-col w-full md:gap-y-0 gap-y-3'>
            <div className='flex flex-col gap-y-1 flex-1 w-full'>
              <label>Mobile Number</label>
              <input type='text' placeholder='Enter Your Mobile Number' id='mobileNumber' {...register('mobileNumber',{required:true,valueAsNumber:true})} className='w-full py-2 text-black px-2 rounded-md'/>
              {
                errors.mobileNumber && (
                  <span className='text-pink-400'>Mobile number is required</span>
                )
              }
            </div>

            {
              role==="ROLE_VOTER" && (
                <div className='flex flex-col gap-y-1 flex-1 w-full'>
                <label>Department</label>
                  <select className='w-full py-2 px-3 rounded-md' defaultValue="MCA"  {...register("department",{required:true})}>
                                <option selected disabled>Select</option>
                                {
                                    Department.map((dept,index)=>(
                                        <option value={dept.name} key={index}>{dept.name}</option>
                                    ))
                                }
                  </select>
                </div>
              )
            }
          </div>

          <div className='flex items-center justify-end mt-7'>
          <button className='text-white bg-blue-500 px-4 py-2 rounded-md'>Save</button>
          </div>
        </form>
        </div>

       <UpdatePassword/>
    </div>
    </div>
  )
}

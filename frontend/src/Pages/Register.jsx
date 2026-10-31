import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Department } from '../Data/Department';
import { useForm } from 'react-hook-form'
import { registerUser, sendOtp } from '../Services/Operations/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { setRegisterData } from '../Redux/Slices/AuthSlice';
import toast from 'react-hot-toast';

export default function Register() {
  const signUp=useSelector(state=>state.authentication.registerData)
  const location = useLocation();
  const pathSegments = location.pathname.split('/');
  const adminSegment = pathSegments.includes("admin");
  const navigate=useNavigate()
  const[profilePic,setProfilePic]=useState(null)
  const dispatch=useDispatch()
  const {register,handleSubmit,setValue,getValues,formState:{errors}}=useForm()

  

async function submitHandler(data){

    if(data.password!==data.confirmPassword){
        toast.error("Password and Confirm Password is Not Matching")
        return
    }
    const details={
        firstName:data.firstName,
        lastName:data.lastName,
        password:data.password,
        mobileNumber:data.mobileNumber,
        email:data.email,
        role:adminSegment ? "ADMIN" : "VOTER",
        profile:{
            department:adminSegment ? null : data.department,
            registerNumber:adminSegment ? null : data.registerNumber
        }
    }
    dispatch(setRegisterData(details))
    let result;
    if(adminSegment){
        result=await sendOtp(data,navigate,true);
    }
    else{
        result=await sendOtp(data,navigate,false);
    }
    if(result){

    }
}

function imageHandler(e){
    setProfilePic(e.target.files[0])
}

  return (
    <div className='auth-page auth-page-register w-full flex items-center justify-center h-[100vh]'>
        <form className='auth-card auth-card-register flex flex-col md:gap-7 gap-4 max-h-max max-w-max bg-gray-100 py-3 pb-6 px-5 border-2 border-gray-400 rounded-xl shadow-xl mt-5' onSubmit={handleSubmit(submitHandler)}>
            <div className='auth-heading'>
              <span className='auth-eyebrow'>BMS College of Commerce & Management</span>
              <h1 className='font-semibold md:text-4xl text-2xl mx-auto text-gray-700 mb-2'>Create your account</h1>
              <p>Join your campus election community.</p>
            </div>
            <div className='flex md:flex-row flex-col gap-4'>
                <div className='register-field'>
                    <input type='text' placeholder='Enter Your First Name' name='firstName' id='firstName' className='lg:w-96 md:w-60 w-72 md:py-2 py-1 px-3 border-2 border-gray-400 rounded-md' {...register("firstName",{required:true})}/>
                    {errors.firstName && <span className='register-field-error'>First Name is required</span>}
                </div>

                <div className='register-field'>
                    <input type='text' placeholder='Enter Your Last Name' name='lastName' id='lastName' className='lg:w-96 md:w-60 w-72 md:py-2 py-1 px-3 border-2 border-gray-400 rounded-md' {...register("lastName",{required:true})}/>
                    {errors.lastName && <span className='register-field-error'>Last Name is required</span>}
                </div>
            </div>


            <div className='flex gap-4 md:flex-row flex-col'>
                <div className='register-field'>
                    <input type='text' placeholder='Enter Your Email' name='email' id='email'  className='lg:w-96 md:w-60 w-72 md:py-2 py-1 px-3 border-2 border-gray-400 rounded-md' {...register("email",{required:true})}/>
                    {errors.email && <span className='register-field-error'>Email is required</span>}
                </div>

                {!adminSegment && (
                    <div className='register-field'>
                        <input type='text' placeholder='Enter Your Register Number' name='registerNumber' id='registerNumber' className='lg:w-96 md:w-60 w-72 md:py-2 py-1 px-3 border-2 border-gray-400 rounded-md' {...register("registerNumber",{required:true})}/>
                        {errors.registerNumber && <span className='register-field-error'>Register Number is required</span>}
                    </div>
                )}
            </div>


            <div className='flex gap-4 md:flex-row flex-col'>
                <div className='register-field'>
                    <input type='text' placeholder='Enter Password' name='password' id='password' className='lg:w-96 md:w-60 w-72 md:py-2 py-1 px-3 border-2 border-gray-400 rounded-md' {...register("password",{required:true})}/>
                    {errors.password && <span className='register-field-error'>Password is required</span>}
                </div>

                <div className='register-field'>
                    <input type='text' placeholder='Enter Password Again' name='confirmPassword' id='confirmPassword' className='lg:w-96 md:w-60 w-72 md:py-2 py-1 px-3 border-2 border-gray-400 rounded-md' {...register("confirmPassword",{required:true})}/>
                    {errors.confirmPassword && <span className='register-field-error'>Confirm Password is required</span>}
                </div>
            </div>

            <div className='flex gap-4 md:flex-row flex-col'>
                <div className='register-field'>
                    <input type='tel' minLength={10} maxLength={10} pattern='[0-9]{10}' placeholder='Enter Your Mobile Number' name='mobile' id='mobile' className='lg:w-96 md:w-60 w-72 md:py-2 py-1 px-3 border-2 border-gray-400 rounded-md' {...register("mobileNumber",{required:true})}/>
                    {errors.mobileNumber && <span className='register-field-error'>Mobile Number is required</span>}
                </div>

                {!adminSegment && (
                    <div className='register-field'>
                        <select className='lg:w-96 md:w-60 w-72 md:py-2 py-1 px-3 border-2 border-gray-400 rounded-md' defaultValue="MCA"  {...register("department",{required:true})}>
                            <option disabled>Select</option>
                            {
                                Department.map((dept,index)=>(
                                    <option value={dept.name} key={index}>{dept.name}</option>
                                ))
                            }
                        </select>
                        {errors.department && <span className='register-field-error'>Department is required</span>}
                    </div>
                )}
            </div>

            {/* <div className='flex gap-4 md:flex-row flex-col md:items-center'>
                <p className='text-sm font-semibold'>Upload Your Photo</p>
                <input type='file' accept='image/*' onChange={imageHandler}/>
            </div> */}

            <button className='auth-submit bg-blue-500 px-2 md:py-2 py-1 rounded-md hover:bg-blue-400 text-white text-lg mt-2'>
                Register
            </button>

            <div className='auth-switch flex gap-1'>
               <p>Existing User?</p>
               <Link to={`${adminSegment ? '/admin/login' : '/'}`} className='text-blue-600 hover:text-red-400'>Login here</Link>
            </div>
        </form>
    </div>
  )
}

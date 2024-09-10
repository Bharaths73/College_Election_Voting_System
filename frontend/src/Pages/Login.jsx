import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { login } from '../Services/Operations/Auth';
import {useDispatch, useSelector} from 'react-redux';

export default function Login() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/');
  const adminSegment = pathSegments.includes("admin");
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const role=useSelector(state=>state.authentication.role)
  const [loginData,setLoginData]=useState({
       identity:"",
       password:""
  })
  console.log("role is ",role);
  

  function changeHandler(e){
      setLoginData((prev)=>(
        {
            ...prev,
            [e.target.name]:e.target.value
        }
      ))
  }

  const loginAuth=async(e)=>{
    e.preventDefault();
    let result;
    if(adminSegment){
        result=await login(loginData,dispatch,navigate,true)
    }
    else{
        result=await login(loginData,dispatch,navigate,false)
    }
  }

  return (
    <div className='w-full flex items-center justify-center h-[100vh]'>
        <form className='flex flex-col gap-7 max-h-max max-w-max bg-gray-100 py-5 pb-10 px-5 border-2 border-gray-400 rounded-xl mb-32 shadow-xl' onSubmit={loginAuth}>
            <h1 className='font-semibold text-4xl mx-auto text-gray-700'>Login</h1>
            <div className='flex flex-col gap-1'>
                {/* <label htmlFor='registerNo' className='text-black text-2xl font-semibold'>Register Number</label> */}
                <input type='text' placeholder="Enter Your Email" value={loginData.identity} onChange={changeHandler} name='identity' id='identity' className='sm:w-96 w-72 py-2 px-3 border-2 border-gray-400 rounded-md'/>
            </div>

            <div className='flex flex-col gap-1'>
                {/* <label htmlFor='password' className='text-black text-2xl font-semibold'>Password</label> */}
                <input type='password' placeholder='Enter Your Password' value={loginData.password} onChange={changeHandler} name='password' id='password' className='sm:w-96 py-2 px-3 border-2 border-gray-400 rounded-md'/>
            </div>

            <Link to='/' className='text-blue-500 hover:text-red-400'>forgot password</Link>

            <button className='bg-blue-500 px-2 py-2 rounded-md hover:bg-blue-400 text-white text-lg'>
                Login
            </button>

            <div className='flex gap-1'>
               <p>New User?</p>
               <Link to={`${adminSegment ? '/admin/register' : '/register'}`} className='text-blue-600 hover:text-red-400'>Register here</Link>
            </div>
        </form>
    </div>
  )
}

import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { Department } from '../Data/Department';

export default function Register() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/');
  const adminSegment = pathSegments.includes("admin");

  return (
    <div className='w-full flex items-center justify-center h-[100vh]'>
        <form className='flex flex-col md:gap-7 gap-4 max-h-max max-w-max bg-gray-100 py-3 pb-6 px-5 border-2 border-gray-400 rounded-xl shadow-xl mt-5'>
            <h1 className='font-semibold md:text-4xl text-2xl mx-auto text-gray-700 mb-2'>Register</h1>
            <div className='flex md:flex-row flex-col gap-4'>
                <input type='text' placeholder='Enter Your First Name' name='' id='' value={null} onChange={null} className='lg:w-96 md:w-60 w-72 md:py-2 py-1 px-3 border-2 border-gray-400 rounded-md'/>

                <input type='text' placeholder='Enter Your Last Name' name='' id='' value={null} onChange={null} className='lg:w-96 md:w-60 w-72 md:py-2 py-1 px-3 border-2 border-gray-400 rounded-md'/>
            </div>


            <div className='flex gap-4 md:flex-row flex-col'>
                <input type='text' placeholder='Enter Your Email' name='' id='' value={null} onChange={null} className='lg:w-96 md:w-60 w-72 md:py-2 py-1 px-3 border-2 border-gray-400 rounded-md'/>

                {
                    !adminSegment && (
                        <input type='text' placeholder='Enter Your Register Number' name='' id='' value={null} onChange={null} className='lg:w-96 md:w-60 w-72 md:py-2 py-1 px-3 border-2 border-gray-400 rounded-md'/>
                    )
                }
            </div>


            <div className='flex gap-4 md:flex-row flex-col'>
                <input type='text' placeholder='Enter Password' name='' id='' value={null} onChange={null} className='lg:w-96 md:w-60 w-72 md:py-2 py-1 px-3 border-2 border-gray-400 rounded-md'/>

                <input type='text' placeholder='Enter Password Again' name='' id='' value={null} onChange={null} className='lg:w-96 md:w-60 w-72 md:py-2 py-1 px-3 border-2 border-gray-400 rounded-md'/>
            </div>

            <div className='flex gap-4 md:flex-row flex-col'>
                <input type='tel' minLength={10} maxLength={10} pattern='[0-9]{10}' placeholder='Enter Your Mobile Number' name='' id='' value={null} onChange={null} className='lg:w-96 md:w-60 w-72 md:py-2 py-1 px-3 border-2 border-gray-400 rounded-md'/>

                {
                    !adminSegment && (
                        <select className='lg:w-96 md:w-60 w-72 md:py-2 py-1 px-3 border-2 border-gray-400 rounded-md' required defaultValue="MCA">
                            <option selected disabled>Select</option>
                            {
                                Department.map((dept,index)=>(
                                    <option value={dept.name} key={index}>{dept.name}</option>
                                ))
                            }
                        </select>
                    )
                }
            </div>

            <div className='flex gap-4 md:flex-row flex-col md:items-center'>
                <p className='text-sm font-semibold'>Upload Your Photo</p>
                <input type='file' accept='image/*'/>
            </div>

            <button className='bg-blue-500 px-2 md:py-2 py-1 rounded-md hover:bg-blue-400 text-white text-lg mt-2'>
                Register
            </button>

            <div className='flex gap-1'>
               <p>Existing User?</p>
               <Link to={`${adminSegment ? '/admin/login' : '/'}`} className='text-blue-600 hover:text-red-400'>Login here</Link>
            </div>
        </form>
    </div>
  )
}

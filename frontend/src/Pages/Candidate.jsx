import React from 'react';
import { DummyPositions } from '../Data/DummyPositions';
import CandidateCard from '../Components/Core/Candidate/CandidateCard';

export default function Candidate() {
  const isCandidate=true;
  return (
    <div className='ml-5 mr-5 pb-10'>
      <h1 className='text-slate-700 font-semibold text-3xl font-mono mt-4 mb-4'>Register Yourself as Candidate</h1>
      <div className='flex w-full justify-center mt-20'>
      {
         isCandidate ? (
           <div className=' flex flex-col gap-5 justify-center'>
              <p className='sm:text-4xl text-2xl text-slate-600'>Already Registered as Candidate</p>
              <div className='flex justify-center mt-5'>
                 <CandidateCard/>
              </div>
           </div>
         ) : (
          <form className='flex flex-col gap-7 max-h-max max-w-max bg-gray-100 py-5 pb-10 px-5 border-2 border-gray-400 rounded-xl mb-32 shadow-xl'>
          <input type='text' value='PES1PG22CA044' placeholder='Register Number' disabled onChange={null} name='registerNo' id='registerNo' className='sm:w-96 w-72 py-2 px-3 border-2 border-gray-400 rounded-md'/>
          <input type='password' value={null} placeholder='Password' onChange={null} name='password' id='password' className='sm:w-96 py-2 px-3 border-2 border-gray-400 rounded-md'/>
          <select className='lg:w-96 md:w-60 w-72 md:py-2 py-1 px-3 border-2 border-gray-400 rounded-md' required defaultValue="">
          <option selected disabled>Select</option>
            {
              DummyPositions.map((position,index)=>(
                <option value={position.positionName}>{position.positionName}</option>
              ))
            }
          </select>
  
          <button className='bg-blue-500 px-2 py-2 rounded-md hover:bg-blue-400 text-white text-lg'>
                  Register Candidate
          </button>
        </form>
         )
      }
      </div>
    </div>
  )
}

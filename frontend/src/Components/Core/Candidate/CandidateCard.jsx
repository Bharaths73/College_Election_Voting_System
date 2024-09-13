import React from 'react'
import Profile from '../../../assets/Profile.jpg'

export default function CandidateCard({candidate}) {
  return (
    <div className='flex flex-col gap-5 items-center p-10 rounded-lg bg-blue-300 max-w-max shadow-md shadow-blue-900 border-4 border-slate-500'>
        <img src={Profile} width={150} height={150} className='object-cover rounded-lg'/>
        <div className='flex flex-col gap-2'>
            <div className='flex gap-1'>
                <p className='font-semibold'>Name: </p>
                <p>{candidate.firstName+" "}{candidate.lastName}</p>
            </div>

            <div className='flex gap-1'>
                <p className='font-semibold'>Register Number: </p>
                <p>{candidate.registerNumber}</p>
            </div>

            <div className='flex gap-1'>
                <p className='font-semibold'>Department: </p>
                <p>{candidate.department}</p>
            </div>

            <div className='flex gap-1'>
                <p className='font-semibold'>Position: </p>
                <p>{candidate?.position?.positionName}</p>
            </div>
        </div>
        <button className='bg-red-400 px-3 mt-2 py-2 rounded-md hover:bg-red-600 text-white text-lg'>
            Withdraw
        </button>
    </div>
  )
}

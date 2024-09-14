import React from 'react'
import Profile from '../../../assets/Profile.jpg'
import arrow from '../../../assets/arrow.webp'

export default function VotesCard({collection,identity}) {
  return (
    <div className='flex flex-row items-center border border-slate-400 p-3 rounded-lg bg-slate-300 justify-between gap-x-2'>
        <div className='flex flex-col gap-y-2 items-center border border-slate-400 p-3 rounded-xl bg-orange-100'>
            <img src={Profile} className=' w-16 h-16 rounded-full'/>
            <div className='flex flex-col items-start gap-1 text-xs font-semibold'>
                <p className='break-all'>{collection?.voter?.firstName+" "+collection?.voter?.lastName}</p>
                <p className='break-all'>{collection.voter.profile.registerNumber}</p>
                <p className='break-all'>{collection.voter.profile.department}</p>
            </div>
        </div>

        <img src={arrow} className='w-6 h-6'/>

        <div className='flex flex-col gap-y-2 items-center border border-slate-400 p-3 rounded-xl bg-blue-300'>
            <img src={Profile} className='w-16 h-16 rounded-full'/>
            <div className='flex flex-col items-start gap-1 text-xs font-semibold'>
                <p className='break-all'>{collection.candidate.firstname+" "+collection.candidate.lastName}</p>
                <p className='break-all'>{collection.candidate.registerNumber}</p>
                <p className='break-all'>{collection.candidate.department}</p>
                <p className='break-all'>{collection.candidate.position.positionName}</p>
            </div>
        </div>
    </div>
  )
}

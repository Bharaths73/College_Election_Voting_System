import React, { useState } from 'react'
import Profile from '../../../assets/Profile.jpg'
import { deleteCand } from '../../../Services/Operations/Candidates';
import { useSelector } from 'react-redux';

export default function CandidateCard({candidate,setConfirmationModal,setIsCandidate,active}) {
    const {token,user}=useSelector(state=>state.authentication)

    const deleteCandidate=async(id)=>{
        console.log("candidate id is ",id);
        
        setConfirmationModal(null)
          await deleteCand(token,id);
            setIsCandidate(false)
        }

  return (
    <div className='flex flex-col gap-5 items-center p-10 rounded-lg bg-blue-300 max-w-max shadow-md shadow-blue-900 border-4 border-slate-500'>
        <img src={candidate.profilePic} width={150} height={150} className='object-cover rounded-lg' loading='lazy'/>
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
        {
            !active && (
                <button className='bg-red-400 px-3 mt-2 py-2 rounded-md hover:bg-red-600 text-white text-lg' onClick={()=>setConfirmationModal({
                    text1:"Are You Sure?",
                    text2:`You will be no more a candidate`,
                    btn1name:'Submit',
                    btn2name:"Cancel",
                    btn1Handler:()=>deleteCandidate(candidate?.registerNumber),
                    btn2Handler:()=>setConfirmationModal(null)
                })}>
    Withdraw
</button>
            )
        }
    </div>
  )
}

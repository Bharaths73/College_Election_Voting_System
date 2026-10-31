import React, { useState } from 'react'
import { deleteCand } from '../../../Services/Operations/Candidates';
import { useSelector } from 'react-redux';

export default function CandidateCard({candidate,setConfirmationModal,setIsCandidate,active}) {
    const {token,user}=useSelector(state=>state.authentication)

    const deleteCandidate=async(id)=>{
        setConfirmationModal(null)
          await deleteCand(token,id);
            setIsCandidate(false)
        }

  return (
    <div className='candidate-summary'>
        <div className='candidate-summary-profile'>
            <img src={candidate.profilePic} width={150} height={150} className='object-cover rounded-lg' loading='lazy' alt={`${candidate.firstName} ${candidate.lastName}`}/>
            <div className='candidate-summary-person'>
                <span className='candidate-summary-label'>Candidate</span>
                <h3>{candidate.firstName+" "}{candidate.lastName}</h3>
                <span className='candidate-position-badge'>{candidate?.position?.positionName}</span>
            </div>
        </div>
        <div className='candidate-summary-details'>
            <div>
                <span>Register number</span>
                <strong>{candidate.registerNumber}</strong>
            </div>
            <div>
                <span>Department</span>
                <strong>{candidate.department}</strong>
            </div>
            <div>
                <span>Position</span>
                <strong>{candidate?.position?.positionName}</strong>
            </div>
        </div>
        <div className='candidate-summary-footer'>
            <span><i/> Application registered</span>
        {
            !active && (
                <button className='action-button action-button-danger candidate-withdraw' onClick={()=>setConfirmationModal({
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
    </div>
  )
}

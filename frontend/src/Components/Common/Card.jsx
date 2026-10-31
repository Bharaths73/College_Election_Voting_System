import React from 'react';
import { MdDeleteForever,MdModeEditOutline } from "react-icons/md";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useSelector } from 'react-redux';

export default function Card({collection,identity,edit,deleteFunc,setConfirmationModal,setModal}) {
    const {role}=useSelector(state=>state.authentication)
    const hasVoted=collection?.voted ?? collection?.isVoted
  return (
    <div className='entity-card bg-slate-300 p-3 rounded-lg shadow-lg'>
        {
            identity!=="Positions" ? 
            (
                <div className='entity-card-content flex flex-row items-center'>
            <img src={collection.profilePic} className='w-22 h-28 border-slate-400 rounded-lg object-cover' loading='lazy'/>
            <div className='entity-card-details flex flex-col gap-1 ml-5 w-full'>
                <div className='entity-card-name flex gap-2 text-sm font-semibold'>
                    <p className='entity-card-first-name text-wrap break-all'>{collection.firstName}</p>
                    <p className='entity-card-last-name text-wrap break-all'>{collection.lastName}</p>
                </div>
                {
                    identity==='Voters' && 
                    (
                        <div className='entity-card-contact flex flex-col'>
                            <div className='entity-card-field'>
                                <span className='entity-card-label'>Mobile</span>
                                <p className='text-xs break-all'>{collection.mobileNumber}</p>
                            </div>
                            <div className='entity-card-field'>
                                <span className='entity-card-label'>Email</span>
                                <p className='text-xs break-all'>{collection.email}</p>
                            </div>
                            
                        </div>
                    )
                }
                <div className='entity-card-facts'>
                    <div className='entity-card-field'>
                        <span className='entity-card-label'>Register number</span>
                        <p className='entity-card-register text-xs break-all'>{collection.registerNumber}</p>
                    </div>
                    <div className='entity-card-field'>
                        <span className='entity-card-label'>Department</span>
                        <p className='entity-card-department text-xs break-all'>{collection.department}</p>
                    </div>
                    {
                        identity==='Candidates' && (
                            <>
                                <div className='entity-card-field'>
                                    <span className='entity-card-label'>Position</span>
                                    <p className='entity-card-position text-sm break-all font-semibold'>{collection?.position?.positionName}</p>
                                </div>
                                {
                                    role==="ROLE_ADMIN" && (
                                        <div className='entity-card-field'>
                                            <span className='entity-card-label'>Votes</span>
                                            <p className='entity-card-votes text-lg break-all font-extrabold text-blue-700'>{collection?.votes}</p>
                                        </div>
                                    )
                                }
                            </>
                        )
                    }
                </div>
                {
                    identity==='Voters' &&
                        <div className={`entity-card-vote-status ${hasVoted ? 'is-voted' : 'not-voted'}`} aria-label={`Voting status: ${hasVoted ? 'Voted' : 'Not voted'}`}>
                            {hasVoted ? <FaCheckCircle aria-hidden='true'/> : <FaTimesCircle aria-hidden='true'/>}
                            <span className='entity-card-vote-label'>Voting status</span>
                            <span className='entity-card-vote-value'>{hasVoted ? 'Voted' : 'Not voted'}</span>
                        </div>
                }
            </div>

            
        </div>
            ) : (
                    
                    <div className='position-card-content p-3'>
                        <p className='position-card-name sm:text-2xl text-xl font-semibold'>{collection?.positionName}</p>
                    </div>
            )
        }

        {
            role==="ROLE_ADMIN" && 
            (
                <div className='entity-card-actions flex gap-y-7 py-1.5 mt-2  bg-slate-600 rounded-md px-1 mr-0.5'>
                <button className='h-full w-full flex-1' onClick={()=>setConfirmationModal({
                            text1:"Are You Sure?",
                            text2:`${identity.slice(0,-1)} will be deleted`,
                            btn1name:'Delete',
                            btn2name:"Cancel",
                            btn1Handler:identity==="Candidates" || identity==="Voters" ? (()=>deleteFunc(collection?.registerNumber,setConfirmationModal)):()=>deleteFunc(collection?.id,setConfirmationModal),
                            btn2Handler:()=>setConfirmationModal(null)
                        })}>
                    <MdDeleteForever className='text-3xl text-red-600 w-full '/>
                </button>
                {
                    identity==="Positions" && (
                        <button className='h-full w-full flex-1' onClick={()=>setModal({
                            text:"Edit Position",
                            btn1Text:'Submit',
                            btn2Text:"Cancel",
                            data:collection?.id,
                            btn2Handler:()=>setModal(null)
                        })}>
                         <MdModeEditOutline className='text-3xl text-yellow-400 w-full'/>
                      </button>
                    )
                }
           </div>
            )
        }

    </div>
  )
}

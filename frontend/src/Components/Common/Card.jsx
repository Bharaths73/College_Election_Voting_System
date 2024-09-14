import React from 'react';
import { MdDeleteForever,MdModeEditOutline } from "react-icons/md";
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';

export default function Card({collection,identity,edit,deleteFunc,setConfirmationModal}) {
    const {role}=useSelector(state=>state.authentication)
  return (
    <div className='bg-slate-300 p-3 rounded-lg shadow-lg'>
        {
            identity!=="Positions" ? 
            (
                <div className='flex flex-row items-center'>
            <img src={collection.profilePic} className='w-22 h-28 border-slate-400 rounded-lg object-cover'/>
            <div className='flex flex-col gap-1 ml-5 w-full'>
                <div className='flex gap-2 text-sm font-semibold'>
                    <p className='text-wrap break-all'>{collection.firstName}</p>
                    <p className='text-wrap break-all'>{collection.lastName}</p>
                </div>
                {
                    identity==='Voters' && 
                    (
                        <div>
                            <p className='text-xs break-all'>{collection.mobileNumber}</p>
                            <p className='text-xs break-all'>{collection.email}</p>
                        </div>
                    )
                }
                <p className='text-xs break-all'>{collection.department}</p>
                <p className='text-xs break-all'>{collection.registerNumber}</p>
                {
                    identity==='Candidates' &&
                    (
                        <div>
                            <p className='text-xs break-all'>{collection?.position?.positionName}</p>
                            <p className='text-xs break-all'>{collection?.votes}</p>
                        </div>
                    )
                }

                
            </div>

            
        </div>
            ) : (
                    
                    <div className='p-3'>
                        <p className='sm:text-2xl text-xl font-semibold'>{collection?.positionName}</p>
                    </div>
            )
        }

        {
            role==="ROLE_ADMIN" && 
            (
                <div className='flex gap-y-7 py-1.5 mt-2  bg-slate-600 rounded-md px-1 mr-0.5'>
                <button className='h-full w-full flex-1' onClick={()=>setConfirmationModal({
                            text1:"Are You Sure?",
                            text2:`${identity.slice(0,-1)} will be deleted`,
                            btn1name:'Delete',
                            btn2name:"Cancel",
                            btn1Handler:identity==="Candidates" ? (()=>deleteFunc(collection?.registerNumber,setConfirmationModal)):()=>deleteFunc(collection?.id,setConfirmationModal),
                            btn2Handler:()=>setConfirmationModal(null)
                        })}>
                    <MdDeleteForever className='text-3xl text-red-600 w-full '/>
                </button>
                <button className='h-full w-full flex-1'>
                   <MdModeEditOutline className='text-3xl text-yellow-400 w-full'/>
                </button>
           </div>
            )
        }

    </div>
  )
}

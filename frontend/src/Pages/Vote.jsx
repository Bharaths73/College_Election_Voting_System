import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getAllPositions } from '../Services/Operations/Positions'
import { getAllCandid, getAllCandidates } from '../Services/Operations/Candidates'
import { isVoted, resetVotes, vote } from '../Services/Operations/Votes'
import toast from 'react-hot-toast'
import ConfirmationModal from '../Components/Common/ConfirmationModal'
import { getElectionActiveStatus } from '../Services/Operations/Election'

export default function Vote() {
  const {token,user}=useSelector(state=>state.authentication)
  const {display}=useSelector(state=>state.sidebar)
  const [candidates,setCandidates]=useState([])
  const [positions,setPositions]=useState([])
  const [votes,setVotes]=useState([])//redux
  const [voted,setVoted]=useState([])
  const [confirmationModal,setConfirmationModal]=useState(null)
  const[isActive,setIsActive]=useState(false)
  console.log("votes are ",votes);
  

  const getCandidates=async()=>{
    const result=await getAllCandid(token);
    if(result){
      console.log("candidates result is ",candidates);
      setCandidates(result)
    }
  }

  const getPositions=async()=>{
    const result=await getAllPositions(token)
    if(result){
      console.log("positions result is ",positions);
      setPositions(result)
    }
}

const changeHandler=(position,candidate)=>{
   setVotes((prevVotes)=>{
      const index=prevVotes.findIndex((vote)=>vote.position===position)
      if(index>=0){
          const updatedVotes=[...prevVotes]
          updatedVotes[index].candidate=candidate
          return updatedVotes
      }
      else{
        return [...prevVotes,{position,candidate,voter:user?.registerNumber}]
      }
   })
}

const submitHandler=async()=>{
    setConfirmationModal(null)
    if(votes.length!==positions.length){
       toast.error("You must vote for all positions")
       return
    }
    const result=await vote(token,votes)
    if(result){
      setVoted(result)
    }
}

const alreadyVoted=async()=>{
    const result=await isVoted(token,user)
    if(result.length>0){
      setVoted(result)
      return true;
    }
    return false
}

const getElectionStatus=async()=>{
  const result=await getElectionActiveStatus(token);
  if(result){
    setIsActive(result?.startOrStop)
  }
  return result?.startOrStop
}


useEffect(()=>{
  const fetchData = async () => {
    const result=await getElectionStatus()
    
    if(result){
      const isVoted=await alreadyVoted();
      if(!isVoted){
        await getPositions(); 
        await getCandidates();
      }
    }  
  };
  fetchData();
},[])

  return (
    <div className=''>
        <div className='ml-5 mr-5 pb-10'>
        <h1 className='text-slate-700 font-semibold text-3xl font-mono mt-4 mb-4'>Vote</h1>
        {
          isActive ? (
            <div className='mt-10'>
           {
              voted.length>0 ? (
                <div className='text-2xl flex justify-center'>Thank you for voting</div>
              ) : (
                positions.map((position,index)=>(
                  <div key={index} className='flex flex-col mt-10 lg:ml-14 lg:mr-14 ml-1 mr-1'>
                  <p className='text-xl font-semibold bg-gray-600 py-2 rounded-xl flex justify-center text-white'>{position.positionName}</p>
                <div className='flex flex-col gap-y-7   mt-7'>
                   {
                            candidates.filter((candidate)=>candidate.position.positionName===position.positionName).map((resultCandidate,index)=>(
                           <div className={`flex items-center justify-between bg-slate-300 py-5 sm:px-16 px-7 rounded-xl  ml-1 mr-1 border-4 border-slate-400 ${!display && 'lg:ml-14 lg:mr-14 '} `} key={index}>
                              <div className='flex sm:gap-x-10 gap-x-5 items-center'>
                              <img src={resultCandidate.profilePic} className='sm:w-32 sm:h-32 w-12 h-12 border-2 border-slate-700 rounded-full'/>
                              <div className='flex flex-col gap-y-1'>
                                <p className='sm:text-xl text-base font-semibold'>{resultCandidate.firstName+" "+resultCandidate.lastName}</p>
                                <p className='sm:text-sm text-xs font-semibold text-slate-600'>{resultCandidate.registerNumber}</p>
                                <p className='sm:text-sm text-xs font-semibold text-slate-600'>{resultCandidate.department}</p>
                              </div>
                              </div>
                              <input type='radio' className=' md:size-7 size-5' name={position.positionName} value={resultCandidate.registerNumber} onChange={()=>changeHandler(position,resultCandidate.registerNumber)}/>
                           </div>
                        ))
                          
                        
                   }
                </div>
                </div>
                ))
              )
           }
          {
             voted.length<=0 && positions.length >0 && candidates.length>0 && (
              <div className='flex justify-center'>
              <button className='py-3 bg-green-400 px-10 rounded-lg mt-10 font-semibold hover:bg-green-300 hover:px-7 transition-all duration-500 ease-in-out hover:py-2' onClick={()=>setConfirmationModal({
                            text1:"Are You Sure?",
                            text2:`Your votes will be submitted`,
                            btn1name:'Submit',
                            btn2name:"Cancel",
                            btn1Handler:()=>submitHandler(),
                            btn2Handler:()=>setConfirmationModal(null)
                        })}>Submit</button>
              </div>
             )
          }
        </div>
          ) : (
            <div className='text-2xl flex justify-center'>Election Not Yet Started</div>
          )
        }
        </div>
        {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </div>
  )
}

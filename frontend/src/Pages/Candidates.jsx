import React, { useEffect, useState } from 'react'
import Body from '../Components/Common/Body'
import { useSelector } from 'react-redux';
import { deleteCand, getAllCandidates } from '../Services/Operations/Candidates';


export default function Candidates() {
  const {token}=useSelector(state=>state.authentication)
  const [candidates,setCandidates]=useState([])

  const getCandidates=async()=>{
    const result=await getAllCandidates(token);
    if(result){
      setCandidates(result)
    }
  }

  const deleteCandidate=async(id,setConfirmationModal)=>{
  setConfirmationModal(null)
    await deleteCand(token,id);
    const result=await getAllCandidates(token);
    if(result){
      setCandidates(result)
    }
  }

  useEffect(()=>{
    getCandidates()
},[])

  return (
    <Body collections={candidates} name="Candidates" edit={null} deleteFunc={deleteCandidate}/>
  )
}

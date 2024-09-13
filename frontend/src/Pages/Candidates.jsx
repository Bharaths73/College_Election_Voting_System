import React, { useEffect, useState } from 'react'
import Body from '../Components/Common/Body'
import { useSelector } from 'react-redux';
import { getAllCandidates } from '../Services/Operations/Candidates';


export default function Candidates() {
  const {token}=useSelector(state=>state.authentication)
  const [candidates,setCandidates]=useState([])

  const getCandidates=async()=>{
    const result=await getAllCandidates(token);
    if(result){
      setCandidates(result)
    }
  }

  useEffect(()=>{
    getCandidates()
},[])

  return (
    <Body collections={candidates} name="Candidates"/>
  )
}

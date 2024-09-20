import React, { useEffect, useState } from 'react'
import Body from '../Components/Common/Body'
import { useSelector } from 'react-redux';
import { deleteCand, getAllCandidates, resetCandidates, searchCandidateByRegNo } from '../Services/Operations/Candidates';
import isBlank from '../Utils/isBlank';


export default function Candidates() {
  const {token}=useSelector(state=>state.authentication)
  const [candidates,setCandidates]=useState([])
  const [searchCandidateQuery,setSearchCandidate]=useState("")
  const[page,setPage]=useState(0)

  const getCandidates=async()=>{
    const result=await getAllCandidates(token,page);
    if(result){
      setCandidates((prev)=>{
        const combined = [...prev, ...result]; // Combine previous and new values
        const uniqueCandidates = Array.from(
          new Map(combined.map(candidate => [candidate.registerNumber, candidate])).values()
        );// Ensure uniqueness
        return uniqueCandidates;
      })
    }
  }

  const searchCandidate=async(regNo)=>{
    let result;
    if(isBlank(regNo)){
      console.log("register no is ",regNo);
      result=await getAllCandidates(token,page)
    }
    else{
      result=await searchCandidateByRegNo(token,regNo)
    }
    if(result){
     setCandidates(result)
    }
  }

  const deleteCandidate=async(id,setConfirmationModal)=>{
  setConfirmationModal(null)
    await deleteCand(token,id);
    const result=await getAllCandidates(token,page);
    if(result){
      // setCandidates((prev)=>[...prev,...result])
      setCandidates(result)
    }
  }

  async function handleInfiniteScroll(){
    try {
      if(window.innerHeight+document.documentElement.scrollTop>=document.documentElement.scrollHeight-1){
        console.log("page No is ",page);
        setPage((prev)=>prev+1)
        console.log("page No after increment ",page);
      }
    } catch (error) {
      console.log("scrolling error ",error);
    }
 }

 async function candidatesReset(setConfirmationModal){
  setConfirmationModal(null)
  await resetCandidates(token)
  setCandidates([])
}

 useEffect(()=>{
  window.addEventListener("scroll",handleInfiniteScroll)
  return ()=>window.removeEventListener("scroll",handleInfiniteScroll)
},[])

  useEffect(()=>{
    if(!isBlank(searchCandidateQuery)){
       
    }else{
      getCandidates()
    }
},[page])

  return (
    <Body collections={candidates} name="Candidates" edit={null} deleteFunc={deleteCandidate} reset={candidatesReset} search={setSearchCandidate} searchQuery={searchCandidateQuery} searchFunc={searchCandidate}/>
  )
}

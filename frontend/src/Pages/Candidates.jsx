import React, { useEffect, useRef, useState } from 'react'
import Body from '../Components/Common/Body'
import { useSelector } from 'react-redux';
import { deleteCand, getAllCandidates, resetCandidates, searchCandidateByRegNo } from '../Services/Operations/Candidates';
import isBlank from '../Utils/isBlank';
import hasNextPage from '../Utils/hasNextPage';


export default function Candidates() {
  const {token}=useSelector(state=>state.authentication)
  const [candidates,setCandidates]=useState([])
  const [searchCandidateQuery,setSearchCandidate]=useState("")
  const[page,setPage]=useState(0)
  const [loading,setLoading]=useState(true)
  const hasMorePages=useRef(true)
  const isFetchingPage=useRef(true)

  const getCandidates=async(pageNo=page)=>{
    isFetchingPage.current=true
    setLoading(true)
    try {
      const result=await getAllCandidates(token,pageNo);
      hasMorePages.current=hasNextPage(result)
      if(result){
        setCandidates((prev)=>{
          const combined = [...prev, ...result];
          const uniqueCandidates = Array.from(
            new Map(combined.map(candidate => [candidate.registerNumber, candidate])).values()
          );
          return uniqueCandidates;
        })
      }
    } finally {
      isFetchingPage.current=false
      setLoading(false)
    }
  }

  const searchCandidate=async(regNo)=>{
    isFetchingPage.current=true
    hasMorePages.current=isBlank(regNo)
    setLoading(true)
    try {
      let result;
      if(isBlank(regNo)){
        result=await getAllCandidates(token,page)
      }
      else{
        result=await searchCandidateByRegNo(token,regNo)
      }
      if(result){
       setCandidates(result)
       if(isBlank(regNo)){
        hasMorePages.current=hasNextPage(result)
       }
      }
    } finally {
      isFetchingPage.current=false
      setLoading(false)
    }
  }

  const deleteCandidate=async(id,setConfirmationModal)=>{
  setConfirmationModal(null)
    setLoading(true)
    try {
      await deleteCand(token,id);
      const result=await getAllCandidates(token,page);
      if(result){
        setCandidates(result)
      }
    } finally {
      setLoading(false)
    }
  }

  function handleInfiniteScroll(){
    if(isBlank(searchCandidateQuery) && hasMorePages.current && !isFetchingPage.current && window.innerHeight+document.documentElement.scrollTop>=document.documentElement.scrollHeight-1){
      isFetchingPage.current=true
      setPage((prev)=>prev+1)
    }
 }

 async function candidatesReset(setConfirmationModal){
  setConfirmationModal(null)
  hasMorePages.current=false
  await resetCandidates(token)
  setCandidates([])
}

 useEffect(()=>{
  window.addEventListener("scroll",handleInfiniteScroll)
  return ()=>window.removeEventListener("scroll",handleInfiniteScroll)
},[])

  useEffect(()=>{
    if(!isBlank(searchCandidateQuery)){
      hasMorePages.current=false
    }else{
      getCandidates(page)
    }
},[page])

  return (
    <Body collections={candidates} name="Candidates" edit={null} deleteFunc={deleteCandidate} reset={candidatesReset} search={setSearchCandidate} searchQuery={searchCandidateQuery} searchFunc={searchCandidate} loading={loading}/>
  )
}

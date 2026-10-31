import React, { useEffect, useRef, useState } from 'react'
import Body from '../Components/Common/Body'
import { deleteVoterById, getAllVoters, resetVoters, searchVoterByRegNo } from '../Services/Operations/Voters'
import { useSelector } from 'react-redux'
import isBlank from '../Utils/isBlank'
import hasNextPage from '../Utils/hasNextPage'


export default function Voters() {
  const {token} =useSelector(state=>state.authentication)
  const[page,setPage]=useState(0)
  const [searchQuery,setSearch]=useState("")
  const [voters,setVoters]=useState([])
  const [loading,setLoading]=useState(true)
  const hasMorePages=useRef(true)
  const isFetchingPage=useRef(true)

  const getVoters=async(pageNo=page)=>{
     isFetchingPage.current=true
     setLoading(true)
     try {
       const result=await getAllVoters(token,pageNo)
       hasMorePages.current=hasNextPage(result)
       if(result){
        setVoters((prev)=>{
          const combined=[...prev ,...result]
          const uniqueVoters = Array.from(
            new Map(combined.map(voter => [voter.registerNumber, voter])).values()
          );
          return uniqueVoters;
        })
       }
     } finally {
       isFetchingPage.current=false
       setLoading(false)
     }
  }
  const deleteVoter=async(regNo,setModal)=>{
    setModal(null)
     setLoading(true)
     try {
       await deleteVoterById(token,regNo)
       const result=await getAllVoters(token,page)
       if(result){
         setVoters(result)
       }
     } finally {
       setLoading(false)
     }
  }

  const searchVoter=async(regNo)=>{
   isFetchingPage.current=true
   hasMorePages.current=isBlank(regNo)
   setLoading(true)
   try {
     let result;
     if(isBlank(regNo)){
       result=await getAllVoters(token,page)
     }
     else{
       result=await searchVoterByRegNo(token,regNo)
     }
     if(result){
      setVoters(result)
      if(isBlank(regNo)){
        hasMorePages.current=hasNextPage(result)
      }
     }
   } finally {
     isFetchingPage.current=false
     setLoading(false)
   }
}

 function handleInfiniteScroll(){
    if(isBlank(searchQuery) && hasMorePages.current && !isFetchingPage.current && window.innerHeight+document.documentElement.scrollTop>=document.documentElement.scrollHeight-1){
      isFetchingPage.current=true
      setPage((prev)=>prev+1)
    }
 }
 async function votersReset(setConfirmationModal){
     setConfirmationModal(null)
     hasMorePages.current=false
     await resetVoters(token)
     setVoters([])
 }

 

  useEffect(()=>{
    if(!isBlank(searchQuery)){
      hasMorePages.current=false
    }else{
      getVoters(page)
    }
  },[page])

  useEffect(()=>{
    window.addEventListener("scroll",handleInfiniteScroll)
    return ()=>window.removeEventListener("scroll",handleInfiniteScroll)
  },[])
  
  return (
      <Body collections={voters} name="Voters" edit={null} deleteFunc={deleteVoter} reset={votersReset} search={setSearch} searchQuery={searchQuery} searchFunc={searchVoter} loading={loading}/>
  )
}

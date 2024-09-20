import React, { useEffect, useState } from 'react'
import Body from '../Components/Common/Body'
import { deleteVoterById, getAllVoters, resetVoters, searchVoterByRegNo } from '../Services/Operations/Voters'
import { useSelector } from 'react-redux'
import isBlank from '../Utils/isBlank'


export default function Voters() {
  const {token} =useSelector(state=>state.authentication)
  const[page,setPage]=useState(0)
  const [searchQuery,setSearch]=useState("")
  const [voters,setVoters]=useState([])

  const getVoters=async()=>{
     const result=await getAllVoters(token,page)
     if(result){
      setVoters((prev)=>{
        const combined=[...prev ,...result]
      const uniqueVoters = Array.from(
        new Map(combined.map(voter => [voter.registerNumber, voter])).values()
      );// Ensure uniqueness
      return uniqueVoters;
  })
  }
}

  const deleteVoter=async(regNo,setModal)=>{
    setModal(null)
    await deleteVoterById(token,regNo)
    const result=await getAllVoters(token,page)
    if(result){
    //  setVoters((prev)=>[...prev ,...result])
    setVoters(result)
    }
 }

 const searchVoter=async(regNo)=>{
  let result;
  if(isBlank(regNo)){
    console.log("register no is ",regNo);
    result=await getAllVoters(token,page)
  }
  else{
    result=await searchVoterByRegNo(token,regNo)
  }
  if(result){
   setVoters(result)
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
 async function votersReset(setConfirmationModal){
     setConfirmationModal(null)
     await resetVoters(token)
     setVoters([])
 }

 

  useEffect(()=>{
    if(!isBlank(searchQuery)){
       
    }else{
      getVoters()
    }
  },[page])

  useEffect(()=>{
    window.addEventListener("scroll",handleInfiniteScroll)
    return ()=>window.removeEventListener("scroll",handleInfiniteScroll)
  },[])
  
  return (
      <Body collections={voters} name="Voters" edit={null} deleteFunc={deleteVoter} reset={votersReset} search={setSearch} searchQuery={searchQuery} searchFunc={searchVoter}/>
  )
}

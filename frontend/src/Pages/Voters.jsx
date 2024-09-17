import React, { useEffect, useState } from 'react'
import Body from '../Components/Common/Body'
import { deleteVoterById, getAllVoters, resetVoters } from '../Services/Operations/Voters'
import { useSelector } from 'react-redux'


export default function Voters() {
  const {token} =useSelector(state=>state.authentication)
  const[page,setPage]=useState(0)
  const [voters,setVoters]=useState([])

  const getVoters=async()=>{
     const result=await getAllVoters(token,page)
     if(result){
      setVoters((prev)=>[...prev ,...result])
     }
  }

  const deleteVoter=async(regNo,setModal)=>{
    setModal(null)
    await deleteVoterById(token,regNo)
    const result=await getAllVoters(token,page)
    if(result){
     setVoters((prev)=>[...prev ,...result])
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
    getVoters()
  },[page])

  useEffect(()=>{
    window.addEventListener("scroll",handleInfiniteScroll)
    return ()=>window.removeEventListener("scroll",handleInfiniteScroll)
  },[])
  
  return (
      <Body collections={voters} name="Voters" edit={null} deleteFunc={deleteVoter} reset={votersReset}/>
  )
}

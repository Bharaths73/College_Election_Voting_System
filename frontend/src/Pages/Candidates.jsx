import React, { useEffect, useState } from 'react'
import Body from '../Components/Common/Body'
import { useSelector } from 'react-redux';
import { deleteCand, getAllCandidates } from '../Services/Operations/Candidates';


export default function Candidates() {
  const {token}=useSelector(state=>state.authentication)
  const [candidates,setCandidates]=useState([])
  const[page,setPage]=useState(0)

  const getCandidates=async()=>{
    const result=await getAllCandidates(token,page);
    if(result){
      setCandidates((prev)=>[...prev,...result])
    }
  }

  const deleteCandidate=async(id,setConfirmationModal)=>{
  setConfirmationModal(null)
    await deleteCand(token,id);
    const result=await getAllCandidates(token,page);
    if(result){
      setCandidates((prev)=>[...prev,...result])
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
 useEffect(()=>{
  window.addEventListener("scroll",handleInfiniteScroll)
  return ()=>window.removeEventListener("scroll",handleInfiniteScroll)
},[])

  useEffect(()=>{
    getCandidates()
},[page])

  return (
    <Body collections={candidates} name="Candidates" edit={null} deleteFunc={deleteCandidate}/>
  )
}

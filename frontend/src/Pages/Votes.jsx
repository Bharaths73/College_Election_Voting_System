import React, { useEffect, useState } from 'react'
import Body from '../Components/Common/Body'
import { getAllVotes, resetVotes } from '../Services/Operations/Votes'
import { useSelector } from 'react-redux'

export default function Votes() {
  const [votes,setVotes]=useState([])
  const {token}=useSelector(state=>state.authentication)
  const[page,setPage]=useState(0)

  const getVotes=async()=>{
    const result=await getAllVotes(token,page)
    if(result){
      setVotes((prev)=>[...prev,...result])
    }
  }

  async function votesReset(setConfirmationModal){
    setConfirmationModal(null)
    await resetVotes(token)
    setVotes([])
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
    getVotes()
  },[page])
  return (
    <Body collections={votes} name='Votes' reset={votesReset}/>
  )
}

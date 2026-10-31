import React, { useEffect, useRef, useState } from 'react'
import Body from '../Components/Common/Body'
import { getAllVotes, resetVotes } from '../Services/Operations/Votes'
import { useSelector } from 'react-redux'
import hasNextPage from '../Utils/hasNextPage'

export default function Votes() {
  const [votes,setVotes]=useState([])
  const {token}=useSelector(state=>state.authentication)
  const[page,setPage]=useState(0)
  const [loading,setLoading]=useState(true)
  const hasMorePages=useRef(true)
  const isFetchingPage=useRef(true)

  const getVotes=async(pageNo=page)=>{
    isFetchingPage.current=true
    setLoading(true)
    try {
      const result=await getAllVotes(token,pageNo)
      hasMorePages.current=hasNextPage(result)
      if(result){
        setVotes((prev)=>[...prev,...result])
      }
    } finally {
      isFetchingPage.current=false
      setLoading(false)
    }
  }

  async function votesReset(setConfirmationModal){
    setConfirmationModal(null)
    hasMorePages.current=false
    await resetVotes(token)
    setVotes([])
  }

  function handleInfiniteScroll(){
    if(hasMorePages.current && !isFetchingPage.current && window.innerHeight+document.documentElement.scrollTop>=document.documentElement.scrollHeight-1){
      isFetchingPage.current=true
      setPage((prev)=>prev+1)
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
    <Body collections={votes} name='Votes' reset={votesReset} loading={loading}/>
  )
}

import React, { useEffect, useState } from 'react'
import Body from '../Components/Common/Body'
import { DummyVotes } from '../Data/DummyVotes'
import { getAllVotes } from '../Services/Operations/Votes'
import { useSelector } from 'react-redux'

export default function Votes() {
  const [votes,setVotes]=useState([])
  const {token}=useSelector(state=>state.authentication)

  const getVotes=async()=>{
    const result=await getAllVotes(token)
    if(result){
      setVotes(result)
    }
  }

  useEffect(()=>{
    getVotes()
  },[])
  return (
    <Body collections={votes} name='Votes'/>
  )
}

import React, { useEffect, useState } from 'react'
import Card from '../Components/Common/Card'
import { DummyVoter } from '../Data/DummyVoters'
import Body from '../Components/Common/Body'
import { getAllVoters } from '../Services/Operations/Voters'
import { useSelector } from 'react-redux'


export default function Voters() {
  const {token} =useSelector(state=>state.authentication)
  const [voters,setVoters]=useState([])

  const getVoters=async()=>{
     const result=await getAllVoters(token)
     if(result){
      setVoters(result)
     }
  }

  useEffect(()=>{
    getVoters()
  },[])
  
  return (
      <Body collections={voters} name="Voters"/>
  )
}

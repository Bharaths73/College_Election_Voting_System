import React, { useEffect, useState } from 'react'
import Body from '../Components/Common/Body'
import { useSelector } from 'react-redux'
import { getAllPositions } from '../Services/Operations/Positions';

export default function Positions() {
  const {token}=useSelector(state=>state.authentication);
  const [positions,setPositions]=useState([])

  const getPositions=async()=>{
      const result=await getAllPositions(token)
      if(result){
        setPositions(result)
      }
  }

  useEffect(()=>{
    getPositions()
  },[])
  return (
    <Body collections={positions} name="Positions"/>
  )
}

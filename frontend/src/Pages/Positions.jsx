import React, { useEffect, useState } from 'react'
import Body from '../Components/Common/Body'
import { useSelector } from 'react-redux'
import { AddPos, deletePositionById, getAllPositions } from '../Services/Operations/Positions';
import { Link } from 'react-router-dom';

export default function Positions() {
  const {token}=useSelector(state=>state.authentication);
  const [positions,setPositions]=useState([])

  const getPositions=async()=>{
      const result=await getAllPositions(token)
      if(result){
        setPositions(result)
      }
  }

  const deletePosition=async(id,setConfirmationModal)=>{
    setConfirmationModal(null)
    const result=await deletePositionById(token,id)
    if(result){
      setPositions(result)
    }
}

const AddPosition=async(position,setModal)=>{
  console.log("postion state is ",position);
  setModal(null)
  await AddPos(token,position)
  const result=await getAllPositions(token)
  if(result){
    setPositions(result)
  }
}

  useEffect(()=>{
    getPositions()
  },[])
  return (
         <Body collections={positions} name="Positions" edit={null} deleteFunc={deletePosition} addFunc={AddPosition}/>
  )
}

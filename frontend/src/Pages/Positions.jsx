import React, { useEffect, useState } from 'react'
import Body from '../Components/Common/Body'
import { useSelector } from 'react-redux'
import { AddPos, deletePositionById, editPosition, getAllPositions, resetPositions, searchPositionByName } from '../Services/Operations/Positions';
import { Link } from 'react-router-dom';
import isBlank from '../Utils/isBlank';

export default function Positions() {
  const {token}=useSelector(state=>state.authentication);
  const [positions,setPositions]=useState([])
  const [searchPositionQuery,setSearchPosition]=useState("")

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

const positionReset=async(setConfirmationModal)=>{
  setConfirmationModal(null)
  await resetPositions(token)
  setPositions([])
}

const searchPositions=async(name)=>{
  let result;
  if(isBlank(name)){
    console.log("Positions name ",name);
    result=await getAllPositions(token)
  }
  else{
    result=await searchPositionByName(token,name)
  }
  if(result){
   setPositions(result)
  }
}

const positionEdit=async(position,setModal)=>{
  setModal(null)
  const result=await editPosition(token,position)
  if(result){
    const positions=await getAllPositions(token)
    if(positions){
      setPositions(positions)
    }
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
         <Body collections={positions} name="Positions" edit={positionEdit} deleteFunc={deletePosition} addFunc={AddPosition} reset={positionReset} search={setSearchPosition} searchQuery={searchPositionQuery} searchFunc={searchPositions}/>
  )
}

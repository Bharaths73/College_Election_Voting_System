import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function Public({children}) {
  const token=useSelector(state=>state.authentication.token)

  if(token===null){
    return children
 }
 else{
   return <Navigate to='/dashboard/profile'/>
 }
}

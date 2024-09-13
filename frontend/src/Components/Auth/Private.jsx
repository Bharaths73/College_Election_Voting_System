import React from 'react'
import {useSelector} from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function Private({children}) {
    const token=useSelector(state=>state.authentication.token)
    if(token!==null){
        return children;
    }
    return <Navigate to='/'/>
}

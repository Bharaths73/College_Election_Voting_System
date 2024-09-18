import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function Admin({children}) {
    const {token,role}=useSelector(state=>state.authentication);

    if(token!==null && role!="ROLE_VOTER"){
        return children;
    }
        return <Navigate to="/" />;
}

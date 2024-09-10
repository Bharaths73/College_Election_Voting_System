import { createSlice } from "@reduxjs/toolkit"
import {jwtDecode} from 'jwt-decode';
import toast from "react-hot-toast";

function decodeJwtToken(token){
    if (token) {
        try {
          const decoded = jwtDecode(token);
          return decoded.role
        } catch (error) {
          console.error('Invalid token', error);
          return null;
        }
      }
}

const token=localStorage.getItem("token") ? (JSON.parse(localStorage.getItem("token"))) : null;

const initialState={
    token: token,
    registerData:null,
    role: token!==null ? decodeJwtToken(token) : null
}

console.log(initialState.role);


const AuthSlice=createSlice({
    name:"authentication",
    initialState:initialState,
    reducers:{
        setToken:(state,action)=>{
            state.token=action.payload;
            state.role = decodeJwtToken(action.payload);
        },
        setRegisterData:(state,action)=>{
            state.registerData=action.payload
        },
        setRole:(state,action)=>{
            state.role=action.payload
        }
    }
})

export const {setToken,setRegisterData,setRole}=AuthSlice.actions
export default AuthSlice.reducer;
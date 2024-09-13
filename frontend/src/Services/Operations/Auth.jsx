import { setRole, setToken, setUser } from "../../Redux/Slices/AuthSlice";
import { AuthApi } from "../Api"
import { ApiConnector } from "../ApiConnector"
import {toast,Toaster } from 'react-hot-toast';

export const login=async(data,dispatch,navigate,isAdmin)=>{
    const toastId=toast.loading("Loading....")
    try {
        const response=await ApiConnector("POST",isAdmin ? AuthApi.ADMIN_LOGIN_API : AuthApi.VOTER_LOGIN_API,data,null,null);
        console.log("login response is ",response);
        dispatch(setToken(response.data.data.token))
        dispatch(setUser(response.data.data))
        localStorage.setItem("token",JSON.stringify(response.data.data.token))
        localStorage.setItem("user",JSON.stringify(response.data.data))
        navigate("/dashboard/profile")
        toast.success("Login successfull")
    } catch (error) {
        console.log("login error is ",error);
        // const message=error.response.data.error.message;
    
        toast.error(`Failed to Login`)
    }
    toast.dismiss(toastId)
}

export function logout(navigate) {
    return (dispatch) => {
      dispatch(setToken(null))
      dispatch(setRole(null))
      dispatch(setUser(null))
    //   dispatch(resetCart())
      localStorage.removeItem("token")
    //   localStorage.removeItem("user")
      toast.success("Logged Out")
      navigate("/")
    }
  }
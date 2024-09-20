import { setRegisterData, setRole, setToken, setUser } from "../../Redux/Slices/AuthSlice";
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
        const userImage=response.data?.data?.profilePicUrl ? response.data.data.profilePicUrl : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
        dispatch(setUser({ ...response.data.data, profilePicUrl: userImage }))
        localStorage.setItem("user",JSON.stringify({ ...response.data.data, profilePicUrl: userImage }))
        navigate("/dashboard/profile")
        toast.success("Login successfull")
    } catch (error) {
        console.log("login error is ",error);
        // const message=error.response.data.error.message;
    
        toast.error(`Failed to Login`)
    }
    toast.dismiss(toastId)
}

export const registerUser=async(data,navigate)=>{

  const toastId=toast.loading("Loading....")
  try {
      const response=await ApiConnector("POST",AuthApi.REGISTER_API,data,null,null);
      console.log("register response is ",response);
      navigate("/")
      toast.success("Registration successfull")
  } catch (error) {
      console.log("Registration error is ",error);
      // const message=error.response.data.error.message;
  
      toast.error(`Failed to Register`)
  }
  toast.dismiss(toastId)
}

export const sendOtp=async(data,navigate,isAdmin)=>{
  console.log("data is ",data);
  
  const otpData={};
  otpData.email=data.email;
  otpData.registerNumber=data.registerNumber
  otpData.role=data.role

  console.log(otpData);
  
  const toastId=toast.loading("Loading....")
  try {
      const response=await ApiConnector("POST",isAdmin ? AuthApi.ADMIN_SEND_OTP : AuthApi.SEND_OTP,data,otpData,null,null);
      console.log("otp response is ",response);

      if(response.status===200){
        navigate("/otp")
       toast.success("OTP sent successfully")
      }
  } catch (error) {
      console.log("otp error is ",error);
      // const message=error.response.data.error.message;
  
      toast.error(`Failed to Send OTP`)
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
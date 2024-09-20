import { useEffect, useState } from 'react'
import OTPInput from 'react-otp-input';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { registerUser } from '../Services/Operations/Auth';

export const OTP=()=>{
    const [otp,setOtp]=useState("");
    const {registerData}=useSelector((state)=>state.authentication);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    

    const VerifyDetailsHandler=async(e)=>{
        e.preventDefault();
        const details={
            ...registerData,
            otp
        }
        console.log("user details is ",details);
        
        
        const result=await registerUser(details,navigate,);
        if(result){
            alert("Registered successfully")
        }
    }

    useEffect(()=>{
        if(!registerData){
            navigate("/register")
        }
},[])

    return(
        <div className="w-full flex items-center justify-center h-[100vh]">
            <form  className='flex flex-col gap-7 max-h-max max-w-max bg-gray-100 py-5 pb-10 px-5 border-2 border-gray-400 rounded-xl mb-32 shadow-xl' onSubmit={VerifyDetailsHandler}>
                <h1 className='text-2xl font-semibold mx-auto'>Enter OTP</h1>
                <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderInput={(props)=>(
                    <input
                    {...props}
                    placeholder='-'
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        // backgroundColor:"gray",
                        border:"2px solid",
                        borderColor:"black"
                      }}
                      className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                    />
                )}
                containerStyle={{
                    justifyContent: "space-between",
                    gap: "0 6px",
                  }}
                />
                <button type="submit"
              className="w-full bg-yellow-400 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900">Verify Email</button>
            </form>
        </div>
    )
}
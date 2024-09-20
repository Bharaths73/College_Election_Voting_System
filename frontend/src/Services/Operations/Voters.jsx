import toast from "react-hot-toast";
import { AuthApi, candidateApi, votersApi } from "../Api";
import { ApiConnector } from "../ApiConnector";

export const getAllVoters=async(token,num,limit="15")=>{
    let result=[];
    const toastId=toast.loading("Getting All Voters...")
    try {
        const response=await ApiConnector("GET",votersApi.VOTERS_API+`?pageNo=${String(num)??"0"}&pageSize=${limit??"15"}`,null,{Authorization:`Bearer ${token}`})
        console.log("voters are ",response.data.data);
        if(response){
            result=response.data.data
            
            result.forEach((res)=>{
                console.log("profile pic url ",res.profilePic);
                res.profilePic=res.profilePic ? res.profilePic : `https://api.dicebear.com/5.x/initials/svg?seed=${res.firstName} ${res.lastName}`
                console.log("profile pic url ",res.profilePic);
            })
        }
        toast.success("Fetched All Voters")
    } catch (error) {
        console.log("Failed to fetch voters ",error);
        toast.error("Failed to fetch voters")
    }
    toast.dismiss(toastId)
    return result;
}

export const searchVoterByRegNo=async(token,regNo)=>{
    let result=[];
    const toastId=toast.loading("Getting Voter...")
    try {
        const response=await ApiConnector("GET",votersApi.SEARCH_VOTERS_API+`/${regNo}`,null,{Authorization:`Bearer ${token}`})
        console.log("voters are ",response.data.data);
        if(response){
            response.data.data.profilePic=response.data.data.profilePic ? response.data.data.profilePic : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
            result.push(response.data.data)
        }
        toast.success("Fetched All Voters")
    } catch (error) {
        console.log("Failed to fetch voters ",error);
        toast.error("Failed to fetch voters")
    }
    toast.dismiss(toastId)
    return result;
}

export const deleteVoterById=async(token,regNo)=>{
    const toastId=toast.loading("Deleting voter please wait...")
    try {
        const response=await ApiConnector("DELETE",votersApi.DELETE_VOTERS_API+`/${regNo}`,null,{Authorization:`Bearer ${token}`})
        console.log("delete voter response is ",response.data.data);
        toast.success("Deleted voter successfully")
    } catch (error) {
        console.log("Failed to delete voter ",error);
        toast.error("Failed to delete voter")
    }
    toast.dismiss(toastId)
}

export const resetVoters=async(token)=>{
    const toastId=toast.loading("RESETING......")
    try {
        const response=await ApiConnector("DELETE",votersApi.RESET_VOTERS_API,null,{Authorization:`Bearer ${token}`})
        console.log("Reset voters response is ",response);
        
        if(response.status===200){
            toast.success("Voters successfully deleted")
        }
    } catch (error) {
        console.log("Failed to reset Voters ",error);
        toast.error("Failed to reset Voters ",error.response.data.error)
    }
    finally{
        toast.dismiss(toastId)
    }
}
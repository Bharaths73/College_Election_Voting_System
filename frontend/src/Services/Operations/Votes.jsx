import toast from "react-hot-toast";
import { votesApi } from "../Api";
import { ApiConnector } from "../ApiConnector";

export const getAllVotes=async(token,num,limit="15")=>{
    let result=[];
    const toastId=toast.loading("Getting All Votes...")
    try {
        const response=await ApiConnector("GET",votesApi.VOTES_API+`?pageNo=${String(num)??"0"}&pageSize=${limit??"15"}`,null,{Authorization:`Bearer ${token}`})
        
        if(response){
            result=response.data.data
        }
        toast.success("Fetched all votes")
    } catch (error) {
        toast.error("Failed to fetch all votes ",error.response.data.error)
    }
    finally{
        toast.dismiss(toastId)
    }
    return result
}


export const vote=async(token,votes)=>{
    let result=[];
    const toastId=toast.loading("Submitting...")
    try {
        const response=await ApiConnector("POST",votesApi.VOTE_API,votes,{Authorization:`Bearer ${token}`})
        
        if(response){
            result=response.data.data
        }
        
    } catch (error) {
        toast.error("Failed to vote ",error.response.data.error)
    }
    finally{
        toast.dismiss(toastId)
    }
    return result
}

export const isVoted=async(token,user)=>{
    let result=[];
    const toastId=toast.loading("Checking...")
    try {
        const response=await ApiConnector("POST",votesApi.IS_VOTED_API,user,{Authorization:`Bearer ${token}`})
        
        if(response){
            result=response.data.data
        }
        if(result.length>0){
            toast.success("You have successfully voted")
        }
    } catch (error) {
        toast.error("Failed to check ",error.response.data.error)
    }
    finally{
        toast.dismiss(toastId)
    }
    return result
}

export const resetVotes=async(token)=>{
    const toastId=toast.loading("RESETING......")
    try {
        const response=await ApiConnector("DELETE",votesApi.RESET_VOTES_API,null,{Authorization:`Bearer ${token}`})
        
        if(response.status===200){
            toast.success("Votes successfully deleted")
        }
    } catch (error) {
        toast.error("Failed to reset votes ",error.response.data.error)
    }
    finally{
        toast.dismiss(toastId)
    }
}

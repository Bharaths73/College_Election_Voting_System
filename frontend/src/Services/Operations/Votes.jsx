import toast from "react-hot-toast";
import { votesApi } from "../Api";
import { ApiConnector } from "../ApiConnector";

export const getAllVotes=async(token,num,limit="5")=>{
    let result=[];
    const toastId=toast.loading("Getting All Votes...")
    try {
        const response=await ApiConnector("GET",votesApi.VOTES_API+`?pageNo=${String(num)??"0"}&pageSize=${limit??"5"}`,null,{Authorization:`Bearer ${token}`})
        console.log("votes response is ",response);
        
        if(response){
            result=response.data.data
        }
        toast.success("Fetched all votes")
    } catch (error) {
        console.log("Failed to fetch votes ",error);
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
        console.log("vote response is ",response);
        
        if(response){
            result=response.data.data
        }
        toast.success("You have successfully voted")
    } catch (error) {
        console.log("Failed to vote ",error);
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
        console.log("isvoted response is ",response);
        
        if(response){
            result=response.data.data
        }
        toast.success("You have already voted")
    } catch (error) {
        console.log("Failed to check ",error);
        toast.error("Failed to check ",error.response.data.error)
    }
    finally{
        toast.dismiss(toastId)
    }
    return result
}


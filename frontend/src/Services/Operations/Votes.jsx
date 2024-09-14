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
    toast.dismiss(toastId)
    return result
}
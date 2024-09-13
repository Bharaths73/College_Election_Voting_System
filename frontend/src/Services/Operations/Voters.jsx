import toast from "react-hot-toast";
import { AuthApi, candidateApi, votersApi } from "../Api";
import { ApiConnector } from "../ApiConnector";

export const getAllVoters=async(token)=>{
    let result=[];
    const toastId=toast.loading("Getting All Candidates...")
    try {
        const response=await ApiConnector("GET",votersApi.VOTERS_API,null,{Authorization:`Bearer ${token}`})
        console.log("voters are ",response.data.data);
        if(response){
            result=response.data.data
        }
        toast.success("Fetched All Voters")
    } catch (error) {
        console.log("Failed to fetch voters ",error);
        toast.error("Failed to fetch voters")
    }
    toast.dismiss(toastId)
    return result;
}
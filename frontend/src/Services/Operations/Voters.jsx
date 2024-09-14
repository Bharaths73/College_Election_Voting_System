import toast from "react-hot-toast";
import { AuthApi, candidateApi, votersApi } from "../Api";
import { ApiConnector } from "../ApiConnector";

export const getAllVoters=async(token,num,limit="5")=>{
    let result=[];
    const toastId=toast.loading("Getting All Candidates...")
    try {
        const response=await ApiConnector("GET",votersApi.VOTERS_API+`?pageNo=${String(num)??"0"}&pageSize=${limit??"5"}`,null,{Authorization:`Bearer ${token}`})
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
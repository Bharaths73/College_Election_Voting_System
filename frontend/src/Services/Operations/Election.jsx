import toast from "react-hot-toast";
import { ApiConnector } from "../ApiConnector";
import { electionApi } from "../Api";

export const getElectionActiveStatus=async(token)=>{
    let result;
    const toastId=toast.loading("Getting Election Status...")
    try {
        const response=await ApiConnector("GET",electionApi.ELECTION_STATUS,null,{Authorization:`Bearer ${token}`})
        console.log("Election status ",response.data.data);
        if(response){
            result=response.data.data
        }
        toast.success(`Election status is ${result.startOrStop}`)
    } catch (error) {
        console.log("Failed to fetch status ",error);
        toast.error("Failed to fetch status")
    }
    toast.dismiss(toastId)
    return result;
}

export const updateElectionActiveStatus=async(token,isActive)=>{
    const data={
        startOrStop:!isActive
    }
    let result;
    const toastId=toast.loading("Getting Election Status...")
    try {
        const response=await ApiConnector("POST",electionApi.UPDATE_ELECTION_STATUS,data,{Authorization:`Bearer ${token}`})
        console.log("Election status ",response.data.data);
        if(response){
            result=response.data.data
        }
        toast.success(`Election status is ${result.startOrStop}`)
    } catch (error) {
        console.log("Failed to fetch status ",error);
        toast.error("Failed to fetch status")
    }
    toast.dismiss(toastId)
    return result;
}
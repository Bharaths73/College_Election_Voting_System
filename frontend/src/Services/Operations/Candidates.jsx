import toast from "react-hot-toast";
import { AuthApi, candidateApi } from "../Api";
import { ApiConnector } from "../ApiConnector";

export const getAllCandidates=async(token)=>{
    let result=[];
    const toastId=toast.loading("Getting All Candidates...")
    try {
        const response=await ApiConnector("GET",candidateApi.CANDIDATES_API,null,{Authorization:`Bearer ${token}`})
        console.log("candidates are ",response.data.data);
        if(response){
            result=response.data.data
        }
        toast.success("Fetched All Candidates")
    } catch (error) {
        console.log("Failed to fetch candidates ",error);
        toast.error("Failed to fetch candidates")
    }
    toast.dismiss(toastId)
    return result;
}



export const confirmCandidate=async(token,data)=>{
    let result;
    console.log(data);
    const toastId=toast.loading("Loading...")
    try {
        const response=await ApiConnector("POST",candidateApi.IS_CANDIDATE_API,data,{Authorization:`Bearer ${token}`})
        console.log("Is a candidate ",response.data.data);
        if(response){
            result=response.data.data
        }
    } catch (error) {
        console.log("Failed to check if you are candidate ",error);
        toast.error("Failed to check if you are candidate ",error.response.data.error)
    }
    toast.dismiss(toastId)
    return result;
}


export const regsiterAsCandidates=async(token,data)=>{
    let result;
    const toastId=toast.loading("Regsitering as candidate...")
    try {
        const response=await ApiConnector("POST",candidateApi.CANDIDATE_API,data,{Authorization:`Bearer ${token}`})
        console.log("register candidate response is ",response.data.data);
        if(response){
            result=response.data.data
        }
        toast.success("Candidate registered successfully")
    } catch (error) {
        console.log("Failed to register as candidate try again ",error);
        toast.error("Failed to register as candidate try again ",error.response.data.error)
    }
    toast.dismiss(toastId)
    return result;
}
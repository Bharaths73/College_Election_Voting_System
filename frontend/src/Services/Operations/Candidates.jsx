import toast from "react-hot-toast";
import { AuthApi, candidateApi } from "../Api";
import { ApiConnector } from "../ApiConnector";

export const getAllCandidates=async(token,num,limit="15")=>{
    let result=[];
    const toastId=toast.loading("Getting All Candidates...")
    try {
        const response=await ApiConnector("GET",candidateApi.CANDIDATES_API+`?pageNo=${String(num)??"0"}&pageSize=${limit??"15"}`,null,{Authorization:`Bearer ${token}`})
        if(response){
            result=response.data.data
            result.forEach((res)=>{
                res.profilePic=res.profilePic ? res.profilePic : `https://api.dicebear.com/5.x/initials/svg?seed=${res.firstName} ${res.lastName}`
            })
        }
        toast.success("Fetched All Candidates")
    } catch (error) {
        toast.error("Failed to fetch candidates")
    }
    toast.dismiss(toastId)
    return result;
}

export const searchCandidateByRegNo=async(token,regNo)=>{
    let result=[];
    const toastId=toast.loading("Getting Candidate...")
    try {
        const response=await ApiConnector("GET",candidateApi.SEARCH_CANDIDATE_API+`/${regNo}`,null,{Authorization:`Bearer ${token}`})
        if(response){
            response.data.data.profilePic=response.data.data.profilePic ? response.data.data.profilePic : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
            result.push(response.data.data)

        }
        toast.success("Fetched All Candidates")
    } catch (error) {
        toast.error("Failed to fetch candidate")
    }
    toast.dismiss(toastId)
    return result;
}

export const getAllCandid=async(token)=>{
    let result=[];
    const toastId=toast.loading("Getting All Candidates...")
    try {
        const response=await ApiConnector("GET",candidateApi.CANDID_API,null,{Authorization:`Bearer ${token}`})
        if(response){
            result=response.data.data
            result.forEach((res)=>{
                res.profilePic=res.profilePic ? res.profilePic : `https://api.dicebear.com/5.x/initials/svg?seed=${res.firstName} ${res.lastName}`
            })
        }
        toast.success("Fetched All Candidates")
    } catch (error) {
        toast.error("Failed to fetch candidates")
    }
    toast.dismiss(toastId)
    return result;
}



export const confirmCandidate=async(token,data)=>{
    let result;
    const toastId=toast.loading("Loading...")
    try {
        const response=await ApiConnector("POST",candidateApi.IS_CANDIDATE_API,data,{Authorization:`Bearer ${token}`})
        if(response){
            result=response.data.data
            result.profilePic=result.profilePic ? result.profilePic : `https://api.dicebear.com/5.x/initials/svg?seed=${result.firstName} ${result.lastName}`
        }
    } catch (error) {
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
        if(response){
            result=response.data.data
        }
        toast.success("Candidate registered successfully")
    } catch (error) {
        toast.error("Failed to register as candidate try again ",error.response.data.error)
    }
    toast.dismiss(toastId)
    return result;
}

export const deleteCand=async(token,id)=>{
    const toastId=toast.loading("Deleting candidate...")
    try {
        const response=await ApiConnector("DELETE",candidateApi.DELETE_CANDIDATE_API+`/${id}`,null,{Authorization:`Bearer ${token}`})
        toast.success("Candidate deleted successfully")
    } catch (error) {
        toast.error("Failed to delete candidate try again ")
    }
    toast.dismiss(toastId)
}

export const resetCandidates=async(token)=>{
    const toastId=toast.loading("RESETING......")
    try {
        const response=await ApiConnector("DELETE",candidateApi.RESET_CANDIDATE_API,null,{Authorization:`Bearer ${token}`})
        
        if(response.status===200){
            toast.success("Candidates successfully deleted")
        }
    } catch (error) {
        toast.error("Failed to reset candidates ",error.response.data.error)
    }
    finally{
        toast.dismiss(toastId)
    }
}
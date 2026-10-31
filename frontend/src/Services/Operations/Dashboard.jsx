import toast from "react-hot-toast";
import { dashboardApi } from "../Api";
import { ApiConnector } from "../ApiConnector";

export const getDashboardDetails=async(token)=>{
    let result;
    const toastId=toast.loading("Getting Dashboard Details...")
    try {
        const response=await ApiConnector("GET",dashboardApi.DASHBOARD_API,null,{Authorization:`Bearer ${token}`})
        if(response){
            result=response.data.data
        }
        toast.success("Fetched All Details")
    } catch (error) {
        toast.error("Failed to details")
    }
    toast.dismiss(toastId)
    return result;
}
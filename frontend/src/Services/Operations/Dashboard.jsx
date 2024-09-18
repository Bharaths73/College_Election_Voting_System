import toast from "react-hot-toast";
import { dashboardApi } from "../Api";
import { ApiConnector } from "../ApiConnector";

export const getDashboardDetails=async(token)=>{
    let result;
    const toastId=toast.loading("Getting Dashboard Details...")
    try {
        const response=await ApiConnector("GET",dashboardApi.DASHBOARD_API,null,{Authorization:`Bearer ${token}`})
        console.log("dashboard details are ",response.data.data);
        if(response){
            result=response.data.data
        }
        toast.success("Fetched All Details")
    } catch (error) {
        console.log("Failed to details ",error);
        toast.error("Failed to details")
    }
    toast.dismiss(toastId)
    return result;
}
import toast from "react-hot-toast";
import { ApiConnector } from "../ApiConnector";
import { positionApi } from "../Api";

export const getAllPositions=async(token)=>{
    let result=[];
    const toastId=toast.loading("Getting All Positions...")
    try {
        const response=await ApiConnector("GET",positionApi.POSITIONS_API,null,{Authorization:`Bearer ${token}`})
        console.log("Positions are ",response.data.data);
        
        if(response){
            result=response.data.data;
        }
        toast.success("Fetched all positions")
    } catch (error) {
        console.log("Failed to fetch positions ",error);
        toast.error("Failed to fetch positions") 
    }
    toast.dismiss(toastId)
    return result;
}
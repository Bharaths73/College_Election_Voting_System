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

export const deletePositionById=async(token,id)=>{
    let result=[];
    const toastId=toast.loading("Deleting Position...")
    try {
        const response=await ApiConnector("DELETE",positionApi.DELETE_POSITION_API
            +`/${id}`,null,{Authorization:`Bearer ${token}`})
        console.log("Positions are ",response.data.data);
        
        if(response){
            result=response.data.data;
        }
        toast.success("Deleted position successfully")
    } catch (error) {
        console.log("Failed to delete positions ",error);
        toast.error("Failed to delete positions") 
    }
    toast.dismiss(toastId)
    return result;
}

export const AddPos=async(token,position)=>{
    const toastId=toast.loading("Adding Position...")
    try {
        const response=await ApiConnector("POST",positionApi.POSITION_API,position,{Authorization:`Bearer ${token}`})
        console.log("Add response Position are ",response.data.data);
        toast.success("Position added successfully")
    } catch (error) {
        console.log("Failed to add position ",error);
        toast.error("Failed to add position") 
    }
    toast.dismiss(toastId)
}
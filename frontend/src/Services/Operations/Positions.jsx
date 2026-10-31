import toast from "react-hot-toast";
import { ApiConnector } from "../ApiConnector";
import { positionApi } from "../Api";

export const getAllPositions=async(token)=>{
    let result=[];
    const toastId=toast.loading("Getting All Positions...")
    try {
        const response=await ApiConnector("GET",positionApi.POSITIONS_API,null,{Authorization:`Bearer ${token}`})
        
        if(response){
            result=response.data.data;
        }
        toast.success("Fetched all positions")
    } catch (error) {
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
        
        if(response){
            result=response.data.data;
        }
        toast.success("Deleted position successfully")
    } catch (error) {
        toast.error("Failed to delete positions") 
    }
    toast.dismiss(toastId)
    return result;
}

export const AddPos=async(token,position)=>{
    const toastId=toast.loading("Adding Position...")
    try {
        const response=await ApiConnector("POST",positionApi.POSITION_API,position,{Authorization:`Bearer ${token}`})
        toast.success("Position added successfully")
    } catch (error) {
        toast.error("Failed to add position") 
    }
    toast.dismiss(toastId)
}

export const resetPositions=async(token)=>{
    const toastId=toast.loading("RESETING......")
    try {
        const response=await ApiConnector("DELETE",positionApi.RESET_POSITIONS_API,null,{Authorization:`Bearer ${token}`})
        
        if(response.status===200){
            toast.success("Positions successfully deleted")
        }
    } catch (error) {
        toast.error("Failed to reset positions ",error.response.data.error)
    }
    finally{
        toast.dismiss(toastId)
    }
}

export const editPosition=async(token,position)=>{
    let result
    const toastId=toast.loading("Editing Position...")
    try {
        const response=await ApiConnector("PUT",positionApi.EDIT_POSITION_API,position,{Authorization:`Bearer ${token}`})
        if(response.status===200){
            result=response.data.data
        }
        toast.success("Position edited successfully")
    } catch (error) {
        toast.error("Failed to edit position") 
    }
    toast.dismiss(toastId)
    return result;
}

export const searchPositionByName=async(token,name)=>{
    let result=[];
    
    const toastId=toast.loading("Getting Position...")
    try {
        const response=await ApiConnector("GET",positionApi.SEARCH_POSITION_API+`/${name}`,null,{Authorization:`Bearer ${token}`})
        if(response){
            result.push(response.data.data)

        }
        toast.success("Fetched All Positions")
    } catch (error) {
        toast.error("Failed to fetch position")
    }
    toast.dismiss(toastId)
    return result;
}
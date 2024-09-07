import {createSlice} from '@reduxjs/toolkit';


const initialState={
    display:true
}

export const SidebarSlice=createSlice({
    name:'sidebar',
    initialState,
    reducers:{
        setDisplaySidebar:(state,payload)=>{
            state.display=!state.display
        }
    }
})

export const {setDisplaySidebar}=SidebarSlice.actions;

export default SidebarSlice.reducer;
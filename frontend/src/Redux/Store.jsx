import { configureStore } from "@reduxjs/toolkit";
import SidebarSlice  from "./Slices/SidebarSlice";
import AuthSlice from "./Slices/AuthSlice";

export const store=configureStore({
    reducer:{
        sidebar:SidebarSlice,
        authentication:AuthSlice
    }
})
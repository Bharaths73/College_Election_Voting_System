import { configureStore } from "@reduxjs/toolkit";
import SidebarSlice  from "./Slices/SidebarSlice";

export const store=configureStore({
    reducer:{
        sidebar:SidebarSlice,
    }
})
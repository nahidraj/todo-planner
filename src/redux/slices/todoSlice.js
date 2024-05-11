import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name:"todos",
  initialState:{
    New:[],
    Progress:[],
    Completed:[],
    Canceled:[],
  },
  reducers:{
    setNew:(state,action)=>{
      state.New = action.payload;
    },
    setProgress:(state,action)=>{
      state.Progress = action.payload;
    },
    setCompleted:(state,action)=>{
      state.Completed = action.payload;
    },
    setCanceled:(state,action)=>{
      state.Canceled = action.payload;
    }
  }
})

export const {setNew,setProgress,setCompleted,setCanceled} = todoSlice.actions;
export default todoSlice.reducer;
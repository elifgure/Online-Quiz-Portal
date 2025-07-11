import { createSlice } from "@reduxjs/toolkit";

const activeQuizSlice = createSlice({
    name: "activeQuiz",
    initialState:null,
    reducers:{
        setActiveQuiz:(state, action)=>action.payload,
        clearActiveQuiz:()=>null,
    }
})
export const{setActiveQuiz, clearActiveQuiz} = activeQuizSlice.actions;
export default activeQuizSlice.reducer
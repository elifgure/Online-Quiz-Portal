import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quiz: null,
};
const quizFormSlice = createSlice({
  name: "quizForm",
  initialState,
  reducers: {
    setQuizForEdit: (state, action) => {
      state.quiz = action.payload;
    },
    clearQuizForm: (state) => {
      state.quiz = null;
    },
  },
});
export const { setQuizForEdit, clearQuizForm } = quizFormSlice.actions;
export default quizFormSlice.reducer;

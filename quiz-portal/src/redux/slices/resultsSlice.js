import { getResultsByStudent } from "../../features/Quizzes/resultService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchStudentResults = createAsyncThunk(
  "results/fetchStudentResults",
  async (studentId, { rejectWithValue }) => {
    try {
      const results = await getResultsByStudent(studentId);
      return results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const resultsSlice = createSlice({
  name: "results",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentResults.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudentResults.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchStudentResults.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default resultsSlice.reducer;
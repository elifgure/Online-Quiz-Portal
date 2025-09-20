import { getAllResults, getResultsByStudent, getResultsByTeacher } from "../../features/Quizzes/resultService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// mevcut öğrenci sonuç fonksiyonu
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
// öğretmenin kendi quizlerinin sonuçları
export const fetchTeacherResults = createAsyncThunk(
  "results/fetchTeacherResults",
  async (teacherId, {rejectWithValue})=>{
    try {
      const results = await getResultsByTeacher(teacherId);
      return results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)
// tüm sonuçları yöneten fonksiyon
export const fetchAllResults = createAsyncThunk(
  "results/fetchAllResults",
  async(_, {rejectWithValue}) => {
    try {
      const results = await getAllResults();
      return results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)




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
      })
      // Yeni cases
      .addCase(fetchAllResults.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllResults.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchAllResults.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default resultsSlice.reducer;
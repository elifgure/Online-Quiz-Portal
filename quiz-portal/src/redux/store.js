import {configureStore} from "@reduxjs/toolkit"
import quizFormReducer from "./slices/quizFormSlice.js"

export const store = configureStore({
    reducer:{
        quizForm: quizFormReducer,
    }
})
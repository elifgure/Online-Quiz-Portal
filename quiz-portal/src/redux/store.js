import {configureStore} from "@reduxjs/toolkit"
import quizFormReducer from "./slices/quizFormSlice.js"
import activeQuizReducer from "./slices/activeQuizSlice.js"

export const store = configureStore({
    reducer:{
        quizForm: quizFormReducer,
        activeQuiz:activeQuizReducer,
    }
})
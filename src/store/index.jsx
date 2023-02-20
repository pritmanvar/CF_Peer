import { configureStore } from "@reduxjs/toolkit";
import submissionSlice from "./Submissions-Slice";
import problemSlice from "./Problems-Slice";

const store = configureStore({
    reducer: {
        SubmissionSlice: submissionSlice.reducer,
        ProblemSlice: problemSlice.reducer,
    },
});

export default store;

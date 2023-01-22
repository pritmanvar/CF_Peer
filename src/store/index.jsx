import { configureStore } from "@reduxjs/toolkit";
import submissionSlice from "./Submissions-Slice";

const store = configureStore({
    reducer: { SubmissionSlice: submissionSlice.reducer },
});

export default store;

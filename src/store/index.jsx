import { configureStore } from "@reduxjs/toolkit";
import submissionSlice from "./Submissions-Slice";
import problemSlice from "./Problems-Slice";
import userSlice from "./User-Slice";

const store = configureStore({
    reducer: {
        SubmissionSlice: submissionSlice.reducer,
        ProblemSlice: problemSlice.reducer,
        UserSlice: userSlice.reducer,
    },
});

export default store;

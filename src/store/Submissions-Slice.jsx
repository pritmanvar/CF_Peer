import { createSlice } from "@reduxjs/toolkit";

// Reducer Functions
const updateUserName = (state, action) => {
    state.userName = action.payload;
};
const setDifficulty = (state, action) => {
    state.difficulty = action.payload;
};
const setProblemTags = (state, action) => {
    state.problemTags = action.payload;
};
const setContestID = (state, action) => {
    state.contestID = action.payload;
};
const setLanguage = (state, action) => {
    state.language = action.payload;
};
const setVerdict = (state, action) => {
    state.verdict = action.payload;
};
const setSubmissions = (state, action) => {
    state.submission = action.payload;
};
const addSelectedTag = (state, action) => {
    const temp = [...state.selectedTags, action.payload];
    temp.sort();
    state.selectedTags = temp;
};
const removeSelectedTag = (state, action) => {
    state.selectedTags = state.selectedTags.filter(
        (tg) => action.payload !== tg
    );
};

const initialState = {
    userName: "",
    difficulty: [],
    problemTags: [],
    contestID: [],
    language: [],
    verdict: [],
    submission: [],
    selectedTags: [],
};
const submissionSlice = createSlice({
    name: "submission-states",
    initialState,
    reducers: {
        updateUserName,
        setSubmissions,
        setDifficulty,
        setProblemTags,
        setContestID,
        setLanguage,
        setVerdict,
        addSelectedTag,
        removeSelectedTag,
    },
});

export const submissionActions = submissionSlice.actions;

export default submissionSlice;

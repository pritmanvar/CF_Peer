import { createSlice } from "@reduxjs/toolkit";

// Reducer Functions

// Update User Name
const updateUserName = (state, action) => {
    state.userName = action.payload;
};
// Set Rating Array
const setRating = (state, action) => {
    state.rating = action.payload;
};
// Set Tags Array
const setTags = (state, action) => {
    state.tags = action.payload;
};
// Set Contest ID Array
const setContestID = (state, action) => {
    state.contestID = action.payload;
};
// Set Language Array
const setLanguage = (state, action) => {
    state.language = action.payload;
};
// Set Verdict Array
const setVerdict = (state, action) => {
    state.verdict = action.payload;
};
// Set Submissions Array
const setSubmissions = (state, action) => {
    state.submission = action.payload;
};
// Set Add New Tag In Array for filter
const addSelectedTag = (state, action) => {
    const temp = [
        ...state.selectedTags[action.payload.split(",")[0]],
        action.payload,
    ];
    temp.sort();
    state.selectedTags[action.payload.split(",")[0]] = temp;
};
// Set Remove New Tag In Array for filter
const removeSelectedTag = (state, action) => {
    state.selectedTags[action.payload.split(",")[0]] = state.selectedTags[
        action.payload.split(",")[0]
    ].filter((tg) => action.payload !== tg);
};

// Set API Status
const setApiStatus = (state, action) => {
    state.apiStatus = action.payload;
};
// Set API Responce
const setApiResponce = (state, action) => {
    state.apiResponce = action.payload;
};

const initialState = {
    userName: "",
    rating: [],
    tags: [],
    contestID: [],
    language: [],
    verdict: [],
    submission: [],
    selectedTags: {
        contestId: [],
        rating: [],
        verdict: [],
        tags: [],
        language: [],
    },
    apiStatus: "",
    apiResponce: "",
};
const submissionSlice = createSlice({
    name: "submission-states",
    initialState,
    reducers: {
        updateUserName,
        setSubmissions,
        setRating,
        setTags,
        setContestID,
        setLanguage,
        setVerdict,
        addSelectedTag,
        removeSelectedTag,
        setApiStatus,
        setApiResponce,
    },
});

export const submissionActions = submissionSlice.actions;

export default submissionSlice;

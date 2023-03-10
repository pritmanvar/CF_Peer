import { createSlice } from "@reduxjs/toolkit";

// Reducer Functions

// Update Problem Name
const setProblemCount = (state, action) => {
    state.problemCount = action.payload;
};
const updateProblemName = (state, action) => {
    state.problemName = action.payload;
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
// Set Problems Array
const setProblems = (state, action) => {
    state.problems = action.payload;
};
// Add new problem name to filter
const addSelectedProblems = (state, action) => {
    const temp = [...state.selectedProblems, action.payload];
    state.selectedProblems = temp;
    state.selectedTags = {
        contestId: [],
        rating: [],
        tags: [],
    };
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
    if (action.payload.split(",")[0] === "name") {
        state.selectedProblems = state.selectedProblems.filter(
            (prb) => action.payload !== prb
        );
        return;
    }
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
    problemCount: 0,
    problemName: "",
    rating: [],
    tags: [],
    contestID: [],
    problems: [],
    selectedProblems: [],
    selectedTags: {
        contestId: [],
        rating: [],
        tags: [],
    },
    apiStatus: "",
    apiResponce: "",
};
const problemSlice = createSlice({
    name: "problem-states",
    initialState,
    reducers: {
        setProblemCount,
        updateProblemName,
        setProblems,
        setRating,
        setTags,
        setContestID,
        addSelectedProblems,
        addSelectedTag,
        removeSelectedTag,
        setApiStatus,
        setApiResponce,
    },
});

export const problemActions = problemSlice.actions;

export default problemSlice;

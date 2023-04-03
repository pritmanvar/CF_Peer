import { createSlice } from "@reduxjs/toolkit";

// Reducer Functions

// Update User ID
const updateUserId = (state, action) => {
    state.userId = action.payload;
};
// Update Token
const updateToken = (state, action) => {
    state.token = action.payload;
};
// Update Token
const updateTokenExpirationDate = (state, action) => {
    state.tokenExpirationDate = action.payload;
};

// get User Groups
const setGroups = (state, action) => {
    state.groups = action.payload;
    if (action.payload.length > 0) {
        state.selectedGroup = action.payload[0].name;
    }
};

// set SelectedGroups
const setSelectedGroup = (state, action) => {
    state.selectedGroup = action.payload;
};

const initialState = {
    userId: "",
    token: "",
    tokenExpirationDate: "",
    groups: [],
    selectedGroup: "",
};
const userSlice = createSlice({
    name: "user-states",
    initialState,
    reducers: {
        updateUserId,
        updateToken,
        updateTokenExpirationDate,
        setGroups,
        setSelectedGroup,
    },
});

export const userActions = userSlice.actions;

export default userSlice;

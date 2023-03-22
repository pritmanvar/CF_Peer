import { createSlice } from "@reduxjs/toolkit";

// Reducer Functions

// Update User ID
const updateUserId = (state, action) => {
    console.log("Calling user", action.payload);
    state.userId = action.payload;
    console.log(state.userId);
};
// Update Token
const updateToken = (state, action) => {
    console.log("Calling id");
    state.token = action.payload;
};
// Update Token
const updateTokenExpirationDate = (state, action) => {
    console.log("Calling time");
    state.tokenExpirationDate = action.payload;
};

const initialState = {
    userId: "",
    token: "",
    tokenExpirationDate: "",
};
const userSlice = createSlice({
    name: "user-states",
    initialState,
    reducers: {
        updateUserId,
        updateToken,
        updateTokenExpirationDate,
    },
});

export const userActions = userSlice.actions;

export default userSlice;

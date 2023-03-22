import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "react-tooltip/dist/react-tooltip.css";

import { userActions } from "./store/User-Slice";
import { submissionActions } from "./store/Submissions-Slice";
import Submissions from "./views/Submissions";
import Problems from "./views/Problems";
import Statistics from "./views/Statistics";
import YourGroups from "./views/YourGroups";
import YourProblems from "./views/YourProblems";
import CompareUsers from "./views/CompareUsers";
import Login from "./views/Login";
import SignUp from "./views/SignUp";

let logoutTimer;

function App() {
    const dispatch = useDispatch();
    const userName = useSelector((state) => state.UserSlice.userId);
    const tokenExpirationDate = useSelector(
        (state) => state.UserSlice.tokenExpirationDate
    );
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("userData"));

        console.log(storedData);
        if (
            storedData &&
            storedData.token &&
            new Date(storedData.expiration) > new Date()
        ) {
            dispatch(userActions.updateUserId(storedData.userId));
            dispatch(userActions.updateToken(storedData.token));
            dispatch(submissionActions.updateUserName(storedData.userId));
        }
    }, []);

    useEffect(() => {
        if (userName && tokenExpirationDate) {
            const remainingTime =
                new Date(tokenExpirationDate).getTime() - new Date();

            logoutTimer = setTimeout(() => {
                dispatch(userActions.updateToken(""));
                dispatch(userActions.updateUserId(""));
                dispatch(userActions.updateTokenExpirationDate(""));

                localStorage.removeItem("userData");
            }, remainingTime);
        } else {
            clearTimeout(logoutTimer);
        }
    }, [userName, tokenExpirationDate]);

    return (
        <div className='App bg-main-bg text-main-font w-full min-h-screen'>
            <BrowserRouter>
                <Routes>
                    <Route path='/'>
                        <Route path='statistics' element={<Statistics />} />
                        <Route path='groups' element={<YourGroups />} />
                        <Route path='problems' element={<Problems />} />
                        <Route path='yourproblems' element={<YourProblems />} />
                        <Route path='submissions' element={<Submissions />} />
                        <Route path='compareusers' element={<CompareUsers />} />
                        <Route path='login' element={<Login />} />
                        <Route path='signup' element={<SignUp />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

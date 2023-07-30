import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-tooltip/dist/react-tooltip.css";

import Submissions from "./views/Submissions";
import Problems from "./views/Problems";
import Statistics from "./views/Statistics";
import YourGroups from "./views/YourGroups";
import YourProblems from "./views/YourProblems";
import CompareUsers from "./views/CompareUsers";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import getUserGroups from "./components/Groups/getUserGroups";
import { useStateValue } from "./stateProvider";
let logoutTimer;

function App() {
    const [{user_state}, dispatch] = useStateValue()
    const userName = user_state.userId;
    const tokenExpirationDate = user_state.tokenExpirationDate
    
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("userData"));

        if (
            storedData &&
            storedData.token &&
            new Date(storedData.expiration) > new Date()
        ) {
            getUserGroups(storedData.userId, dispatch);

            dispatch({
                type: 'USER_UPDATE_USER_ID',
                data: storedData.userId
            })
            dispatch({
                type: 'USER_UPDATE_USER_TOKEN',
                data: storedData.token
            })
            dispatch({
                type: 'USER_UPDATE_TOKEN_EXPIRATION_DATE',
                data: new Date(storedData.expiration)
            })
            dispatch({
                type: 'USER_UPDATE_SELECTED_USERNAME',
                data: storedData.userId
            })
        }
    }, []);

    useEffect(() => {
        if (userName && tokenExpirationDate) {
            const remainingTime =
                new Date(tokenExpirationDate).getTime() - new Date();

            logoutTimer = setTimeout(() => {
                dispatch({
                    type: 'USER_UPDATE_USER_ID',
                    data: ""
                })
                dispatch({
                    type: 'USER_UPDATE_USER_TOKEN',
                    data: ""
                })
                dispatch({
                    type: 'USER_UPDATE_TOKEN_EXPIRATION_DATE',
                    data: ""
                })
                dispatch({
                    type: 'USER_SET_GROUPS',
                    data: []
                })

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

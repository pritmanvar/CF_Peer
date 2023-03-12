import React from "react";
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

function App() {
    return (
        <div className='App bg-main-bg text-main-font w-full min-h-screen'>
            <BrowserRouter>
                <Routes>
                    <Route path='/'>
                        <Route path='statistics' element={<Statistics />} />
                        <Route path='yourgroups' element={<YourGroups />} />
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

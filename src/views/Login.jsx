import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userActions } from "../store/User-Slice";

import Nav from "../components/Navigation/Nav";
import { submissionActions } from "../store/Submissions-Slice";

const Login = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigateTo = useNavigate();
    const handleFormSubmit = (e) => {
        e.preventDefault();

        axios
            .post("http://localhost:5000/api/users/login", {
                username,
                password,
            })
            .then((res) => {
                setError("");
                console.log(res);
                const tokenExpirationDate = new Date(
                    new Date().getTime() + 1000 * 60 * 60 * 24 * 15 // ms*s*m*h*d
                );

                dispatch(userActions.updateUserId(res.data.user._id));
                dispatch(userActions.updateToken(res.data.user.token));
                dispatch(
                    userActions.updateTokenExpirationDate(
                        tokenExpirationDate.toISOString()
                    )
                );
                dispatch(userActions.setGroups(res.data.user.groups));
                dispatch(submissionActions.updateUserName(res.data.user._id));

                localStorage.setItem(
                    "userData",
                    JSON.stringify({
                        userId: res.data.user._id,
                        token: res.data.user.token,
                        expiration: tokenExpirationDate.toISOString(),
                    })
                );
                navigateTo("/groups");
            })
            .catch((err) => {
                setError(
                    err.response
                        ? err.response.data.message
                        : "Something went wrong"
                );
                console.log(err);
            });
    };
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    return (
        <>
            <Nav selectedIteam='login' />
            <div className='w-4/5 ml-1/5 flex flex-col justify-center items-center min-h-screen'>
                <div>
                    <div className='text-center mb-16'>
                        <h1 className='text-3xl mb-1'>Welcome Back👋</h1>
                        {error && (
                            <div className='w-[350px] p-1 font-semibold text-main-font notificationRed'>
                                {error}
                            </div>
                        )}
                    </div>
                    <form
                        className='flex flex-col mx-auto items-center justify-between w-[350px] h-[275px] text-secondary-font'
                        onSubmit={(e) => handleFormSubmit(e)}>
                        <p className='text-sm text-secondary-font'>
                            Please enter your details.
                        </p>
                        <input
                            className='my-2 py-3 px-4 rounded-full w-full bg-nav-bg outline-0 text-main-font placeholder:text-secondary-font'
                            type='text'
                            onChange={handleUsernameChange}
                            value={username}
                            placeholder='UserName'
                        />
                        <input
                            className='my-2 py-3 px-4 rounded-full w-full bg-nav-bg outline-0 text-main-font placeholder:text-secondary-font'
                            type='password'
                            onChange={handlePasswordChange}
                            value={password}
                            placeholder='Password'
                        />
                        <div className='flex justify-between text-xs w-full px-4    '>
                            <div>
                                <input
                                    className='bg-nav-bg mr-1'
                                    type='checkbox'
                                    name='remember30'
                                    id='remember30'
                                />
                                <span>Remember for 30 days</span>
                            </div>
                            <p className='hover:cursor-pointer'>
                                Forgot Password
                            </p>
                        </div>
                        <button className='bg-my-light-green text-main-bg rounded-full mt-2 py-2 px-4 w-full'>
                            Submit
                        </button>
                        <p>
                            Don't have an account?{" "}
                            <Link
                                to='/signup'
                                className='text-main-font hover:cursor-pointer font-semibold'>
                                Sign Up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;

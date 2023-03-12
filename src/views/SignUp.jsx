import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Navigation/Nav";

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const handleFormSubmit = (e) => {
        e.preventDefault();

        let email = "";
        axios
            .get("https://codeforces.com/api/user.info?handles=" + username)
            .then((res) => {
                if (res.data.result === undefined) {
                    throw new Error(
                        "Some Error Occured, Please try again later"
                    );
                }

                email = res.data.result.email;
            })
            .catch((err) => {
                if (err.response === undefined) {
                    setError(submissionActions.setApiResponce(err.message));
                } else {
                    setError(
                        submissionActions.setApiResponce(
                            err.response.data.comment
                        )
                    );
                }
            });
        axios
            .post("http://localhost:5000/api/users/signup", {
                username,
                password,
                confirmPassword,
                email,
                groups: [],
            })
            .then((res) => {
                console.log(res);
                setError("");
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
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    return (
        <>
            <Nav selectedIteam='login' />
            <div className='w-4/5 ml-1/5 flex flex-col justify-center items-center min-h-screen'>
                <div>
                    <div className='text-center mb-16'>
                        <h1 className='text-3xl mb-1'>Welcome to CF_Peer🙂</h1>
                        {error && (
                            <div className='w-[525px] mx-auto p-1 font-semibold text-main-font notificationRed'>
                                {error}
                            </div>
                        )}
                        <p className='text-sm text-secondary-font w-[550px]'>
                            Please make sure your username is same as{" "}
                            <span className='text-main-font'>
                                CodeForces User Name
                            </span>{" "}
                            and your{" "}
                            <span className='text-main-font'>
                                contact information is not hidden
                            </span>{" "}
                            on CodeForces.
                        </p>
                    </div>
                    <form
                        className='flex flex-col items-center mx-auto justify-between w-[350px] h-[275px] text-secondary-font'
                        onSubmit={(e) => handleFormSubmit(e)}>
                        <input
                            className='my-2 py-3 px-4 rounded-full w-full bg-nav-bg outline-0 text-main-font placeholder:text-secondary-font'
                            type='text'
                            onChange={handleUsernameChange}
                            value={username}
                            placeholder='CodeForces UserName'
                        />
                        <input
                            className='my-2 py-3 px-4 rounded-full w-full bg-nav-bg outline-0 text-main-font placeholder:text-secondary-font'
                            type='password'
                            onChange={handlePasswordChange}
                            value={password}
                            placeholder='Password'
                        />
                        <input
                            className='my-2 py-3 px-4 rounded-full w-full bg-nav-bg outline-0 text-main-font placeholder:text-secondary-font'
                            type='password'
                            onChange={handleConfirmPasswordChange}
                            value={confirmPassword}
                            placeholder='Confirm Password'
                        />
                        <button className='bg-my-light-green text-main-bg rounded-full mt-2 py-2 px-4 w-full'>
                            Submit
                        </button>
                        <p>
                            Already have an account?{" "}
                            <Link
                                to='/login'
                                className='text-main-font hover:cursor-pointer font-semibold'>
                                Log In
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SignUp;

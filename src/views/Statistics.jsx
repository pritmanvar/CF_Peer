import React, { useEffect, useState } from "react";

import Nav from "../components/Navigation/Nav";
import Notification from "../components/Global_Components/Notification"
import SearchBar from "../components/Global_Components/SearchBar";
import axios from "axios";
import RatingsChart from "../components/statistics/RatingsChart";
import Histogram from "../components/statistics/Histogram"
import { useStateValue } from "../stateProvider";

const Statistics = () => {
    const [{ user_state, submission_state }, dispatch] = useStateValue()
    const userName = user_state.selectedUserName;
    console.log(userName)
    const [data, setData] = useState([
        [
            { type: "string", label: "date" },
            { type: "number", label: userName },
            { type: "string", role: "tooltip" },
            { id: "i0", type: "number", role: "interval" },
            { id: "i1", type: "number", role: "interval" },
        ],
    ])
    const apiStatus = submission_state.apiStatus;

    useEffect(() => {
        if (userName) {
            dispatch({
                type: 'SET_SUBMISSION_API_STATUS',
                data: "Fetching"
            })
            dispatch({
                type: 'SET_SUBMISSION_API_RESPONCE',
                data: "Fetching Submissions!!!"
            })
            axios.get(`https://codeforces.com/api/user.rating?handle=${userName}`).then(res => {
                if (res.data.result === undefined) {
                    throw new Error(
                        "Some Error Occured, Please try again later."
                    );
                }

                const result = res.data.result
                const newData = result.map((data) => [new Date(
                    data.ratingUpdateTimeSeconds * 1000
                ).toLocaleDateString(), data.newRating, data.newRating + "\n" + new Date(
                    data.ratingUpdateTimeSeconds * 1000
                ).toLocaleDateString() + "\n" + userName, 0, data.newRating])

                setData([[
                    { type: "string", label: "date" },
                    { type: "number", label: userName },
                    { type: "string", role: "tooltip" },
                    { id: "i0", type: "number", role: "interval" },
                    { id: "i1", type: "number", role: "interval" },
                ], ...newData])

                console.log(newData, "jflaj kjlsjf ", userName)

            }).catch(err => {
                console.log(err)
                dispatch({
                    type: 'SET_SUBMISSION_API_STATUS',
                    data: "Error"
                })
                if (err.response === undefined) {
                    dispatch({
                        type: 'SET_SUBMISSION_API_RESPONCE',
                        data: err.message
                    })
                } else {
                    dispatch({
                        type: 'SET_SUBMISSION_API_RESPONCE',
                        data: err.response.data.comment
                    })
                }
            })
        }
    }, [userName])

    return (
        <>
            {/* {console.log(data)} */}
            <Nav selectedIteam='statistics' />
            <div className='w-4/5 ml-1/5'>
                {apiStatus === "Error" && (
                    <Notification myColor='notificationRed' component='problems' />
                )}


                <div className='mx-5'>
                    <SearchBar component={"statistics"} />
                    {/* UserName selected by user */}
                    {userName !== "" && (
                        <p className='text-xl text-secondary-font my-4'>
                            Statistics of: {" "}
                            <span className='text-main-font'>{userName}</span>
                        </p>
                    )}
                    <div className="flex flex-col gap-4 pb-4">
                        <div className="bg-nav-bg w-full h-96">
                            <RatingsChart data={data} />
                        </div>
                        <div className="flex gap-4">
                            <div className="flex flex-col bg-nav-bg w-full" id="histogram-div">
                                <Histogram submission={submission_state.submission} />
                            </div>
                            <div className="bg-nav-bg w-full">
                                <Histogram submission={submission_state.submission} />
                            </div>
                        </div>
                        <div className="bg-nav-bg w-full h-96">
                            <RatingsChart data={data} />
                        </div>
                        <div className="bg-nav-bg w-full h-96">
                            <RatingsChart data={data} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Statistics;

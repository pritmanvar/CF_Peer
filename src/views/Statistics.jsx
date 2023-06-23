import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Chart } from "react-google-charts";


import Nav from "../components/Navigation/Nav";
import Notification from "../components/Global_Components/Notification"
import SearchBar from "../components/Global_Components/SearchBar";
import axios from "axios";
import RatingsChart from "../components/statistics/RatingsChart";


const Statistics = () => {
    const dispatch = useDispatch()
    const [userName, setUserName] = useState(sessionStorage.getItem("user"))
    const [data, setData] = useState([
        [
            { type: "string", label: "date" },
            { type: "number", label: userName },
            { type: "string", role: "tooltip" },
            { id: "i0", type: "number", role: "interval" },
            { id: "i1", type: "number", role: "interval" },


        ]
    ])
    const apiStatus = useSelector((state) => state.ProblemSlice.apiStatus);

    useEffect(() => {
        if (userName) {
            console.log(userName)
            axios.get(`https://codeforces.com/api/user.rating?handle=${userName}`).then(res => {
                if (res.data.result === undefined) {
                    throw new Error(
                        "Some Error Occured, Please try again later"
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
                dispatch(submissionActions.setApiStatus("Error"));
                if (err.response === undefined) {
                    dispatch(submissionActions.setApiResponce(err.message));
                } else {
                    dispatch(
                        submissionActions.setApiResponce(
                            err.response.data.comment
                        )
                    );
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
                    <SearchBar component={"statistics"} setFinalUserName={setUserName} />
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
                        <div className="bg-nav-bg w-full h-96">
                            <RatingsChart data={data} />
                        </div>
                        <div className="bg-nav-bg w-full h-96">
                            <RatingsChart data={data} />
                        </div>
                        <div className="bg-nav-bg w-full h-96">
                            <RatingsChart data={data} />
                        </div>
                        {/* <div className="bg-nav-bg w-1/2 h-96"></div> */}


                    </div>
                </div>
            </div>
        </>
    );
};

export default Statistics;

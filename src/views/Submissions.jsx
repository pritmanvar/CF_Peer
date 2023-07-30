import React, { useEffect } from "react";
import { TooltipProvider, Tooltip } from "react-tooltip";
import axios from "axios";

import Nav from "../components/Navigation/Nav";
import Filters from "../components/Global_Components/Filters";
import SelectedTags from "../components/Global_Components/SelectedTags";
import SubmissionTable from "../components/submissions/SubmissionTable";
import Notification from "../components/Global_Components/Notification";
import SearchBar from "../components/Global_Components/SearchBar";
import { useStateValue } from "../stateProvider";

const Submissions = () => {
    // Get Data from redux store
    const [{ submission_state, user_state }, dispatch] = useStateValue()
    const userName = user_state.selectedUserName;
    const selectedTags = submission_state.selectedTags
    const apiStatus = submission_state.apiStatus

    // Function to create tag buttion from array of selected tag
    const generateTags = () => {
        return Object.values(selectedTags).map((arr) => {
            return arr.map((tag) => {
                // to assign color.
                let fontColor = "";
                if (tag.split(",")[0] === "rating") {
                    fontColor = "text-my-yellow";
                } else if (tag.split(",")[0] === "verdict") {
                    if (tag.split(",")[1] === "OK") {
                        fontColor = "text-my-green";
                    } else {
                        fontColor = "text-my-red";
                    }
                } else if (tag.split(",")[0] === "problemTag") {
                    fontColor = "text-my-purple";
                } else if (tag.split(",")[0] === "language") {
                    fontColor = "text-my-light-blue";
                }

                return (
                    <SelectedTags
                        component='submissions'
                        tag={tag}
                        key={tag}
                        fontColor={fontColor}
                    />
                );
            });
        });
    };

    // const dispatch = useDispatch()

    // Function to get submissions of user
    const getSubmissionDetails = () => {
        console.log(userName)
        if (userName !== "") {
            // API CALL to get submissions.
            dispatch({
                type: 'SET_SUBMISSION_API_STATUS',
                data: "Fetching"
            })
            dispatch({
                type: 'SET_SUBMISSION_API_RESPONCE',
                data: "Fetching Submissions!!!"
            })
            console.log("CALLING")
            axios
                .get(`https://codeforces.com/api/user.status?handle=${userName}`)
                .then((res) => {
                    console.log(res)
                    if (res.data.result === undefined) {
                        throw new Error(
                            "Some Error Occured, Please try again later"
                        );
                    }
                    dispatch({
                        type: 'SET_SUBMISSION_SUBMISSIONS',
                        data: res.data.result
                    })

                    console.log(res.data.result)

                    // Using set to avoid duplicate values.
                    const ratingSet = new Set();
                    const contestIDSet = new Set();
                    const tagsSet = new Set();
                    const languageSet = new Set();
                    const verdictSet = new Set();

                    // to segregate data into contestID, rating, tags, language, verdict
                    for (const sub of res.data.result) {
                        const { contestId, problem, programmingLanguage, verdict } = sub;

                        ratingSet.add(problem.rating);
                        contestIDSet.add(contestId);
                        problem.tags.forEach((element) => {
                            tagsSet.add(element);
                        });
                        languageSet.add(programmingLanguage);
                        verdictSet.add(verdict);
                    }

                    // Update data in redux store.
                    // rating Array
                    const ratingArray = [...ratingSet];
                    ratingArray.sort((a, b) => a - b);
                    dispatch({
                        type: 'SET_SUBMISSION_RATINGS',
                        data: ratingArray
                    })


                    // contest ID Array
                    const contestIDArray = [...contestIDSet];
                    contestIDArray.sort((a, b) => a - b);
                    contestIDArray.reverse();
                    dispatch({
                        type: 'SET_SUBMISSION_CONTEST_ID',
                        data: contestIDArray
                    })
                    // Problem Tag Array
                    const tagsArray = [...tagsSet];
                    tagsArray.sort();
                    dispatch({
                        type: 'SET_SUBMISSION_TAGS',
                        data: tagsArray
                    })

                    // Language Array
                    dispatch({
                        type: 'SET_SUBMISSION_LANGUAGE',
                        data: [...languageSet]
                    })

                    // Verdict Array
                    const verdictArray = [...verdictSet];
                    verdictArray.sort();
                    dispatch({
                        type: 'SET_SUBMISSION_VERDICT',
                        data: [...verdictArray]
                    })

                    // Set Api Status
                    dispatch({
                        type: 'SET_SUBMISSION_API_STATUS',
                        data: "Success"
                    })
                    dispatch({
                        type: 'SET_SUBMISSION_API_RESPONCE',
                        data: "Feched Successfully"
                    })
                })
                .catch((err) => {
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
                    dispatch({
                        type: 'SET_SUBMISSION_SUBMISSIONS',
                        data: []
                    })
                    dispatch({
                        type: 'SET_SUBMISSION_RATINGS',
                        data: []
                    })
                    dispatch({
                        type: 'SET_SUBMISSION_CONTEST_ID',
                        data: []
                    })
                    dispatch({
                        type: 'SET_SUBMISSION_TAGS',
                        data: []
                    })
                    dispatch({
                        type: 'SET_SUBMISSION_LANGUAGE',
                        data: []
                    })
                    dispatch({
                        type: 'SET_SUBMISSION_VERDICT',
                        data: []
                    })
                });
        }
    };

    useEffect(() => {
        getSubmissionDetails()
        console.log(userName)
    }, [userName])

    return (
        <>
            <Nav selectedIteam='submissions' />
            <div className='w-4/5 ml-1/5'>
                {apiStatus === "Error" && (
                    <Notification
                        myColor='notificationRed'
                        component='submissions'
                    />
                )}
                <div className='mx-5'>
                    <SearchBar component={"submissions"} />

                    {/* Various Filters */}
                    <Filters submission_state={submission_state} component='submissions' />

                    {/* Show generated tags */}
                    <div className='flex flex-wrap min-h-[20px]'>
                        {generateTags()}
                    </div>

                    {/* UserName selected by user */}
                    {userName !== "" && (
                        <p className='text-xl text-secondary-font mb-1'>
                            Submissions of{" "}
                            <span className='text-main-font'>{userName}</span>
                        </p>
                    )}

                    {/* For ToolTip Which Contains Problem Tags */}
                    <TooltipProvider>
                        {/* Table which contains submissions */}
                        <SubmissionTable submission_state={submission_state} />
                        <Tooltip
                            style={{
                                backgroundColor: "#1E1F25",
                                color: "#828282",
                                opacity: 1,
                                maxWidth: "250px",
                            }}
                        />
                    </TooltipProvider>
                </div>
            </div>
        </>
    );
};

export default Submissions;

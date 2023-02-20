import React, { useEffect } from "react";
import Nav from "../components/Navigation/Nav";
import SearchBox from "../components/Global_Components/SearchBox";
import Filters from "../components/Global_Components/Filters";
import SelectedTags from "../components/Global_Components/SelectedTags";
import { useSelector } from "react-redux";
import SubmissionTable from "../components/submissions/SubmissionTable";
import { TooltipProvider, Tooltip } from "react-tooltip";
import Notification from "../components/Global_Components/Notification";

const Submissions = () => {
    // Get Data from redux store
    const userName = useSelector((state) => state.SubmissionSlice.userName);
    const selectedTags = useSelector(
        (state) => state.SubmissionSlice.selectedTags
    );

    const apiStatus = useSelector((state) => state.SubmissionSlice.apiStatus);

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
    return (
        <>
            <Nav selectedIteam='submissions' />
            <div className='w-4/5 ml-1/5'>
                {apiStatus === "Feching" && (
                    <Notification
                        myColor='notificationPurple'
                        component='submissions'
                    />
                )}
                {apiStatus === "Error" && (
                    <Notification
                        myColor='notificationRed'
                        component='submissions'
                    />
                )}
                <div className='mx-5'>
                    <div className='flex justify-between'>
                        <SearchBox component='submissions' />
                        <div className='flex items-center mt-2'>
                            <img
                                className='h-7 w-7'
                                src='https://img.icons8.com/material-outlined/30/828282/appointment-reminders--v1.png'
                            />
                            <img
                                className='h-7 w-7 ml-2 mr-4'
                                src='https://img.icons8.com/color/30/null/circled-user-male-skin-type-7--v1.png'
                            />
                        </div>
                    </div>

                    {/* Various Filters */}
                    <Filters component='submissions' />

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
                        <SubmissionTable />
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

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import Nav from "../components/Navigation/Nav";
import SearchBox from "../components/Global_Components/SearchBox";
import Filters from "../components/Global_Components/Filters";
import SelectedTags from "../components/Global_Components/SelectedTags";
import ProblemTable from "../components/problems/ProblemTable";
import Notification from "../components/Global_Components/Notification";
import getProblemDetails from "../components/problems/getProblemDetails";
import getPossibleFilteres from "../components/problems/getPossibleFilters";

const problemsPerPage = 100;

const Problems = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [inputValue, setInputValue] = useState(1);

    // Get Data from redux store
    const selectedTags = useSelector(
        (state) => state.ProblemSlice.selectedTags
    );

    const dispatch = useDispatch();
    useEffect(() => {
        getProblemDetails(currentPage, selectedTags, dispatch); // Function to get problem details
    }, [currentPage, dispatch, selectedTags]);
    useEffect(() => {
        getPossibleFilteres(dispatch);
    }, []);

    const apiStatus = useSelector((state) => state.ProblemSlice.apiStatus);
    const problemCount = useSelector(
        (state) => state.ProblemSlice.problemCount
    );
    const pageCount = Math.ceil(problemCount / problemsPerPage);

    // Function to create tag buttion from array of selected tag
    const generateTags = () => {
        return Object.values(selectedTags).map((arr) => {
            return arr.map((tag) => {
                // to assign color.
                let fontColor = "";
                if (tag.split(",")[0] === "rating") {
                    fontColor = "text-my-yellow";
                } else if (tag.split(",")[0] === "problemTag") {
                    fontColor = "text-my-purple";
                }

                return (
                    <SelectedTags
                        component='problems'
                        tag={tag}
                        key={tag}
                        fontColor={fontColor}
                    />
                );
            });
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (inputValue >= 1 && inputValue <= pageCount) {
            setCurrentPage(inputValue);
        } else {
            setInputValue(currentPage);
        }
    };

    const handleInputChange = (e) => {
        if (
            (+e.target.value >= 1 && +e.target.value <= pageCount) ||
            e.target.value === ""
        )
            setInputValue(+e.target.value);
        else setInputValue(currentPage);
    };

    const handleDecrement = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const handleIncrement = () => {
        if (currentPage < pageCount) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    return (
        <>
            <Nav selectedIteam='problems' />
            <div className='w-4/5 ml-1/5'>
                {apiStatus === "Feching" && (
                    <Notification
                        myColor='notificationPurple'
                        component='problems'
                    />
                )}
                {apiStatus === "Error" && (
                    <Notification
                        myColor='notificationRed'
                        component='problems'
                    />
                )}
                <div className='mx-5'>
                    <div className='flex justify-between'>
                        <SearchBox component='problems' />
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
                    <Filters component='problems' />

                    {/* Show generated tags */}
                    <div className='flex flex-wrap min-h-[20px]'>
                        {generateTags()}
                    </div>
                    {/* Table which contains problems */}
                    <ProblemTable currentPage={currentPage} />
                    <div className='mt-2 inline-block'>
                        <span
                            className='bg-nav-bg px-2 py-1 m-1 rounded hover:bg-my-purple hover:cursor-pointer'
                            onClick={handleDecrement}>
                            {"<"}
                        </span>
                        <span className='bg-nav-bg px-2 py-1 m-1 rounded'>
                            {currentPage}
                        </span>
                        <span
                            className='bg-nav-bg px-2 py-1 m-1 rounded hover:bg-my-purple hover:cursor-pointer'
                            onClick={handleIncrement}>
                            {">"}
                        </span>
                    </div>
                    <form className='inline-block' onSubmit={handleSubmit}>
                        <input
                            className='ml-1 pl-2 py-1 pr-1 w-8 rounded-l bg-nav-bg outline-0 text-right'
                            type='text'
                            name='inputValue'
                            value={inputValue}
                            onChange={handleInputChange}
                        />
                        <span className='inline-block pr-2 py-1 rounded-r bg-nav-bg'>
                            {"/" + pageCount}
                        </span>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Problems;

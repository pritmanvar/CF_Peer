import React from "react";

import { useSelector } from "react-redux";
import Loader from "../Global_Components/Loader";

// generate JSX for rows of table
const generateJSX = (problems) => {
    return problems.map((prob) => {
        const { contestId, index, name, rating, tags, solvedCount } = prob;

        return (
            <div
                className='grid grid-cols-13 gap-1 my-4 text-sm'
                key={contestId + index}>
                <span className='col-span-3  text-my-purple text-sm'>
                    <a
                        id={contestId + index}
                        className='underline'
                        href={`https://codeforces.com/problemset/problem/${contestId}/${index}`}
                        target='_blank'
                        rel='noopener noreferrer'>
                        {contestId + "/" + index + ". " + name}
                    </a>
                </span>
                <span className='col-span-5  text-secondary-font text-xs text-right'>
                    {tags.join(", ")}
                </span>
                <span className='pr-1 text-center col-span-2'>
                    <select
                        name=''
                        id=''
                        className='bg-nav-bg h-8 w-3/4 text-sm outline-none border-none px-3 py-1 rounded-lg'>
                        <option value='1'>Your Set</option>
                        <option value='1'>1</option>
                        <option value='1'>1</option>
                        <option value='1'>1</option>
                    </select>
                </span>
                <span className={" text-center text-my-yellow"}>
                    {rating === 35000 ? "" : rating}
                </span>
                <span className='text-center text-my-green col-span-2'>
                    {solvedCount}
                </span>
            </div>
        );
    });
};

// React Component
const ProblemTable = ({
    ratingSort,
    solvedSort,
    setRatingSort,
    setSolvedSort,
}) => {
    // handle sorting
    const handleRatingSortChange = () => {
        setRatingSort((pre) => (pre + 1 === 2 ? -1 : pre + 1));
        setSolvedSort(0);
    };
    const handleSolvedSortChange = () => {
        setSolvedSort((pre) => (pre + 1 === 2 ? -1 : pre + 1));
        setRatingSort(0);
    };

    // get problems and api status
    const problems = useSelector((state) => state.ProblemSlice.problems);
    const apiStatus = useSelector((state) => state.ProblemSlice.apiStatus);
    return (
        <>
            {/* Table Heading */}
            <div className='grid grid-cols-13 gap-1 text-sm text-secondary-font text-center rounded-t-lg bg-nav-bg p-2'>
                <span className='col-span-3'>Problem Name</span>
                <span className='col-span-5'>Problem Tags</span>
                <span className='col-span-2'>Add To</span>
                <span
                    className='flex items-center justify-center whitespace-nowrap w-fit hover:cursor-pointer'
                    onClick={handleRatingSortChange}>
                    Rating
                    <div className='inline-block ml-2'>
                        {(ratingSort === 0 || ratingSort === 1) && (
                            <img
                                className='rotate-180'
                                src='https://img.icons8.com/material-rounded/7/828282/give-way.png'
                            />
                        )}
                        {(ratingSort === 0 || ratingSort === -1) && (
                            <img src='https://img.icons8.com/material-rounded/7/828282/give-way.png' />
                        )}
                    </div>
                </span>
                <span
                    className='flex items-center justify-center whitespace-nowrap w-fit hover:cursor-pointer col-span-2'
                    onClick={handleSolvedSortChange}>
                    Solved By
                    <div className='inline-block ml-2'>
                        {(solvedSort === 0 || solvedSort === 1) && (
                            <img
                                className='rotate-180'
                                src='https://img.icons8.com/material-rounded/7/828282/give-way.png'
                            />
                        )}
                        {(solvedSort === 0 || solvedSort === -1) && (
                            <img src='https://img.icons8.com/material-rounded/7/828282/give-way.png' />
                        )}
                    </div>
                </span>
            </div>

            {/* Table Columns */}
            <div
                className={
                    "2xl:text-lg xl:text-base lg:text-sm p-2 border-nav-bg border-2 rounded-b-lg h-[65vh] overflow-y-scroll"
                }>
                {/* Show loader if responce is not ready yet. */}
                {apiStatus === "Fetching" && <Loader color={"my-purple"} />}
                {apiStatus !== "Fetching" && generateJSX(problems)}
            </div>
        </>
    );
};

export default ProblemTable;

import React from "react";

import { problemActions } from "../../store/Problems-Slice";
import { useSelector, useDispatch } from "react-redux";

// to compare problem tags of current problem and selected tags
// const compareTags = (selected, problem) => {
//     let haveSelectedTag = false;
//     problem.forEach((tag) => {
//         if (selected.indexOf("tags," + tag) !== -1) {
//             haveSelectedTag = true;
//         }
//     });
//     return haveSelectedTag;
// };

const generateJSX = () => {
    const problems = useSelector((state) => state.ProblemSlice.problems);
    const dispatch = useDispatch();

    return problems.map((prob) => {
        const { contestId, index, name, rating, tags, solvedCount } = prob;

        return (
            <div
                className='grid grid-cols-12 gap-1 my-4 text-sm'
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
                <span className={" text-center text-my-yellow"}>{rating}</span>
                <span className=' text-center text-my-green'>
                    {solvedCount}
                </span>
            </div>
        );
    });
};

// React Component
const ProblemTable = () => {
    return (
        <>
            {/* Table Heading */}
            <div className='grid grid-cols-12 gap-1 text-sm text-secondary-font text-center rounded-t-lg bg-nav-bg p-2'>
                <span className='col-span-3'>Problem Name</span>
                <span className='col-span-5'>Problem Tags</span>
                <span className='col-span-2'>Add To</span>
                <span>Rating</span>
                <span>Solved By</span>
            </div>

            {/* Table Columns */}
            <div className='2xl:text-lg xl:text-base lg:text-sm p-2 border-nav-bg border-2 rounded-b-lg h-[70vh] overflow-y-scroll'>
                {generateJSX()}
            </div>
        </>
    );
};

export default ProblemTable;

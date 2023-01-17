import React from "react";
import Logo from "./Logo";

const Nav = ({ selectedIteam }) => {
    return (
        <div className='w-1/5 bg-nav-bg h-full fixed text-main-font font-semibold'>
            <Logo />
            <hr className='border-secondary-font mt-6' />
            <div
                className={`hover:bg-gradient-to-r from-my-yellow-gradient to-transparent hover:border-my-yellow navIteam ${
                    selectedIteam == "statistics" ? "navStatistics" : ""
                }`}>
                <img
                    className='mx-4 inline-block'
                    src='https://img.icons8.com/ios-filled/24/828282/combo-chart--v1.png'
                />
                <p className='inline-block text-secondary-font text-2xl'>
                    Statistics
                </p>
            </div>
            <div
                className={`hover:bg-gradient-to-r from-my-green-gradient to-transparent hover:border-my-green navIteam ${
                    selectedIteam == "yourgroups" ? "navYourGroups" : ""
                }`}>
                <img
                    className='mx-4 inline-block'
                    src='https://img.icons8.com/fluency-systems-filled/26/828282/groups.png'
                />
                <p className='inline-block text-secondary-font text-2xl'>
                    Your Groups
                </p>
            </div>
            <div
                className={`hover:bg-gradient-to-r from-my-purple-gradient to-transparent hover:border-my-purple navIteam ${
                    selectedIteam == "submissions" ? "navSubmissions" : ""
                }`}>
                <img
                    className='mx-4 inline-block'
                    src='https://img.icons8.com/ios-filled/26/828282/source-code.png'
                />
                <p className='inline-block text-secondary-font text-2xl'>
                    Submissions
                </p>
            </div>
            <div
                className={`hover:bg-gradient-to-r from-my-light-blue-gradient to-transparent hover:border-my-light-blue navIteam ${
                    selectedIteam == "problemset" ? "navProblemSet" : ""
                }`}>
                <img
                    className='mx-4 inline-block'
                    src='https://img.icons8.com/material-outlined/26/828282/puzzle.png'
                />
                <p className='inline-block text-secondary-font text-2xl'>
                    Problem Set
                </p>
            </div>
            <div
                className={`hover:bg-gradient-to-r from-my-pink-gradient to-transparent hover:border-my-pink navIteam ${
                    selectedIteam == "yourproblems" ? "navYourProblems" : ""
                }`}>
                <img
                    className='mx-4 inline-block'
                    src='https://img.icons8.com/material-outlined/26/828282/christmas-star.png'
                />
                <p className='inline-block text-secondary-font text-2xl'>
                    Your Problems
                </p>
            </div>
            <div
                className={`hover:bg-gradient-to-r from-my-orange-gradient to-transparent hover:border-my-orange navIteam ${
                    selectedIteam == "compareusers" ? "navCompareUsers" : ""
                }`}>
                <img
                    className='mx-4 inline-block'
                    src='https://img.icons8.com/ios-glyphs/26/828282/compare.png'
                />
                <p className='inline-block text-secondary-font text-2xl'>
                    Compare Users
                </p>
            </div>
        </div>
    );
};

export default Nav;

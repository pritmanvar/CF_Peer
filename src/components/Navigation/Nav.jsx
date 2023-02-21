import React from "react";
import { Link } from "react-router-dom";

import Logo from "./Logo";

const Nav = ({ selectedIteam }) => {
    return (
        <div className='w-1/5 bg-nav-bg h-full fixed text-main-font font-semibold lg:text-lg md:text-sm text-xs'>
            <Logo />
            <hr className='border-secondary-font mt-6' />

            {/* Give class names conditonally using selectedIteam for greadient hover effect */}
            <Link to='/statistics'>
                <div
                    className={`hover:bg-gradient-to-r from-my-yellow-gradient to-transparent hover:border-my-yellow navIteam ${
                        selectedIteam === "statistics" ? "navStatistics" : ""
                    }`}>
                    {selectedIteam === "statistics" ? (
                        <img
                            className='mx-2 inline-block'
                            src='https://img.icons8.com/ios-filled/20/ededed/combo-chart--v1.png'
                        />
                    ) : (
                        <img
                            className='mx-2 inline-block'
                            src='https://img.icons8.com/ios-filled/20/828282/combo-chart--v1.png'
                        />
                    )}
                    <p
                        className={`inline-block ${
                            selectedIteam === "statistics"
                                ? "text-main-font"
                                : "text-secondary-font"
                        }`}>
                        Statistics
                    </p>
                </div>
            </Link>
            <Link to='/yourgroups'>
                <div
                    className={`hover:bg-gradient-to-r from-my-green-gradient to-transparent hover:border-my-green navIteam ${
                        selectedIteam === "yourgroups" ? "navYourGroups" : ""
                    }`}>
                    {selectedIteam === "yourgroups" ? (
                        <img
                            className='mx-2 inline-block'
                            src='https://img.icons8.com/fluency-systems-filled/22/ededed/groups.png'
                        />
                    ) : (
                        <img
                            className='mx-2 inline-block'
                            src='https://img.icons8.com/fluency-systems-filled/22/828282/groups.png'
                        />
                    )}
                    <p
                        className={`inline-block ${
                            selectedIteam === "yourgroups"
                                ? "text-main-font"
                                : "text-secondary-font"
                        }`}>
                        Your Groups
                    </p>
                </div>
            </Link>
            <Link to='/problems'>
                <div
                    className={`hover:bg-gradient-to-r from-my-purple-gradient to-transparent hover:border-my-purple navIteam ${
                        selectedIteam === "problems" ? "navProblems" : ""
                    }`}>
                    {selectedIteam === "problems" ? (
                        <img
                            className='mx-2 inline-block'
                            src='https://img.icons8.com/material-outlined/22/ededed/puzzle.png'
                        />
                    ) : (
                        <img
                            className='mx-2 inline-block'
                            src='https://img.icons8.com/material-outlined/22/828282/puzzle.png'
                        />
                    )}
                    <p
                        className={`inline-block ${
                            selectedIteam === "problems"
                                ? "text-main-font"
                                : "text-secondary-font"
                        }`}>
                        Problems
                    </p>
                </div>
            </Link>
            <Link to='/yourproblems'>
                <div
                    className={`hover:bg-gradient-to-r from-my-light-blue-gradient to-transparent hover:border-my-light-blue navIteam ${
                        selectedIteam === "yourproblems"
                            ? "navYourProblems"
                            : ""
                    }`}>
                    {selectedIteam === "yourproblems" ? (
                        <img
                            className='mx-2 inline-block'
                            src='https://img.icons8.com/material-outlined/22/ededed/christmas-star.png'
                        />
                    ) : (
                        <img
                            className='mx-2 inline-block'
                            src='https://img.icons8.com/material-outlined/22/828282/christmas-star.png'
                        />
                    )}
                    <p
                        className={`inline-block ${
                            selectedIteam === "yourproblems"
                                ? "text-main-font"
                                : "text-secondary-font"
                        }`}>
                        Your Problems
                    </p>
                </div>
            </Link>
            <Link to='/submissions'>
                <div
                    className={`hover:bg-gradient-to-r from-my-pink-gradient to-transparent hover:border-my-pink navIteam ${
                        selectedIteam === "submissions" ? "navSubmissions" : ""
                    }`}>
                    {selectedIteam === "submissions" ? (
                        <img
                            className='mx-2 inline-block'
                            src='https://img.icons8.com/ios-filled/22/ededed/source-code.png'
                        />
                    ) : (
                        <img
                            className='mx-2 inline-block'
                            src='https://img.icons8.com/ios-filled/22/828282/source-code.png'
                        />
                    )}
                    <p
                        className={`inline-block ${
                            selectedIteam === "submissions"
                                ? "text-main-font"
                                : "text-secondary-font"
                        }`}>
                        Submissions
                    </p>
                </div>
            </Link>
            <Link to='/compareusers'>
                <div
                    className={`hover:bg-gradient-to-r from-my-orange-gradient to-transparent hover:border-my-orange navIteam ${
                        selectedIteam === "compareusers"
                            ? "navCompareUsers"
                            : ""
                    }`}>
                    {selectedIteam === "compareusers" ? (
                        <img
                            className='mx-2 inline-block'
                            src='https://img.icons8.com/ios-glyphs/22/ededed/compare.png'
                        />
                    ) : (
                        <img
                            className='mx-2 inline-block'
                            src='https://img.icons8.com/ios-glyphs/22/828282/compare.png'
                        />
                    )}
                    <p
                        className={`inline-block ${
                            selectedIteam === "compareusers"
                                ? "text-main-font"
                                : "text-secondary-font"
                        }`}>
                        Compare Users
                    </p>
                </div>
            </Link>
        </div>
    );
};

export default Nav;

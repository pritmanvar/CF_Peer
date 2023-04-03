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
import getProblemByName from "../components/problems/getProblemByName";
import SearchBar from "../components/Global_Components/SearchBar";

const problemsPerPage = 100;

const Problems = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [inputValue, setInputValue] = useState(1);
    const [ratingSort, setRatingSort] = useState(0);
    const [solvedSort, setSolvedSort] = useState(0);

    // Get Data from redux store
    const selectedTags = useSelector(
        (state) => state.ProblemSlice.selectedTags
    );
    const selectedProblems = useSelector(
        (state) => state.ProblemSlice.selectedProblems
    );

    const dispatch = useDispatch();
    useEffect(() => {
        if (selectedProblems.length === 0) {
            // I don't have problem names to filter
            getProblemDetails(
                currentPage,
                selectedTags,
                ratingSort,
                solvedSort,
                dispatch
            ); // Function to get problem details
        } else {
            // I have to filter with problem name
            getProblemByName(selectedProblems, dispatch);
        }
    }, [
        currentPage,
        dispatch,
        selectedTags,
        ratingSort,
        solvedSort,
        selectedProblems,
    ]);

    useEffect(() => {
        getPossibleFilteres(dispatch); // function to get possible filters
    }, []);

    // get data from redux store
    const apiStatus = useSelector((state) => state.ProblemSlice.apiStatus);
    const problemCount = useSelector(
        (state) => state.ProblemSlice.problemCount
    );

    // generate page count from number of problems we have
    const pageCount = Math.ceil(problemCount / problemsPerPage);

    // Function to create tag buttion from array of selected tag
    const generateTags = () => {
        // for various filters
        const tags1 = Object.values(selectedTags).map((arr) => {
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

        // for problem names
        const tags2 = selectedProblems.map((prob) => {
            return <SelectedTags component='name' tag={prob} key={prob} />;
        });

        const finalTags = [...tags1, ...tags2];
        return finalTags;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (inputValue >= 1 && inputValue <= pageCount) {
            // it is valid input value
            setCurrentPage(inputValue);
        } else {
            // it is invalid input so ignore that.
            setInputValue(currentPage);
        }
    };

    const handleInputChange = (e) => {
        // in '+e.target.value' -> '+' is used to convert string to number
        if (
            (+e.target.value >= 1 && +e.target.value <= pageCount) ||
            e.target.value === ""
        ) {
            // it is valid input value
            setInputValue(+e.target.value);
        } else {
            // it is invalid input so ignore that.
            setInputValue(currentPage);
        }
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
                {apiStatus === "Error" && (
                    <Notification
                        myColor='notificationRed'
                        component='problems'
                    />
                )}
                <div className='mx-5'>
                    <SearchBar component={"problems"} />

                    {/* Various Filters */}
                    <Filters component='problems' />

                    {/* Show generated tags */}
                    <div className='flex flex-wrap min-h-[20px]'>
                        {generateTags()}
                    </div>

                    {/* Table which contains problems */}
                    <ProblemTable
                        ratingSort={ratingSort}
                        solvedSort={solvedSort}
                        setRatingSort={setRatingSort}
                        setSolvedSort={setSolvedSort}
                    />

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

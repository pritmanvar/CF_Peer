import React, { useState } from "react";
import { submissionActions } from "../../store/Submissions-Slice";
import { problemActions } from "../../store/Problems-Slice";
import { useDispatch, useSelector } from "react-redux";

const SearchBox = ({ component, showSearchBox }) => {
    const dispatch = useDispatch();

    // get selected problems
    const selectedProblems = useSelector(
        (state) => state.ProblemSlice.selectedProblems
    );
    const [userName, setUserName] = useState(""); // userName typed in text box
    const [problemName, setProblemName] = useState(""); // userName typed in text box

    // Update userName in redux store
    const submitHandle = (e) => {
        e.preventDefault();

        if (component === "submissions") {
            dispatch(submissionActions.updateUserName(userName)); // update userName
            setUserName("");
        } else if (component === "problems") {
            // if this problem is not already present in my redux store then add this in redux store.
            if (selectedProblems.indexOf("name," + problemName) === -1) {
                dispatch(
                    problemActions.addSelectedProblems("name," + problemName)
                );
            }

            setProblemName("");
        }
    };
    const handleChange = (e) => {
        if (component === "submissions") {
            setUserName(e.target.value);
        } else if (component === "problems") {
            setProblemName(e.target.value);
        }
    };
    return (
        <>
            <form
                onSubmit={(e) => submitHandle(e)}
                className={`mt-2 p-2 inline-block bg-nav-bg w-80 rounded-lg overflow-hidden ${
                    showSearchBox === false ? "opacity-0" : ""
                }`}>
                <img
                    className='inline-block bg-nav-bg'
                    src='https://img.icons8.com/ios-glyphs/20/828282/search--v1.png'
                />
                <input
                    className='inline-block ml-1 w-[280px] bg-nav-bg outline-0 text-secondary-font placeholder:text-secondary-font placeholder:text-sm'
                    type='text'
                    onChange={handleChange}
                    value={component === "submissions" ? userName : problemName}
                    placeholder={
                        component === "submissions"
                            ? "Search username here..."
                            : "Search problem by name..."
                    }
                />
            </form>
        </>
    );
};

export default SearchBox;

import React, { useState } from "react";
import { useStateValue } from "../../stateProvider";

const SearchBox = ({ component, showSearchBox }) => {
    const [{ problem_state }, dispatch] = useStateValue()
    // get selected problems
    const selectedProblems = problem_state.selectedProblems;
    const [userName, setUserName] = useState(""); // userName typed in text box
    const [problemName, setProblemName] = useState(""); // userName typed in text box

    // Update userName in redux store
    const submitHandle = (e) => {
        e.preventDefault();

        if (component === "submissions") {
            if (userName) {
                dispatch({
                    type: 'USER_UPDATE_SELECTED_USERNAME',
                    data: userName
                })
                setUserName("");
            }
        } else if (component === "problems") {
            // if this problem is not already present in my redux store then add this in redux store.
            if (selectedProblems.indexOf("name," + problemName) === -1) {
                dispatch({
                    type: 'PROBLEM_STATE_ADD_SELECTED_PROBLEMS',
                    data: "name," + problemName
                })
            }

            setProblemName("");
        } else if (component === "statistics") {
            if (userName) {

                dispatch({
                    type: 'USER_UPDATE_SELECTED_USERNAME',
                    data: userName
                })
                setUserName("");
            }
        }
    };
    const handleChange = (e) => {
        if (component === "submissions" || component === "statistics") {
            setUserName(e.target.value);
        } else if (component === "problems") {
            setProblemName(e.target.value);
        }
    };
    return (
        <>
            <form
                onSubmit={(e) => submitHandle(e)}
                className={`mt-2 mb-2 p-2 inline-block bg-nav-bg w-80 rounded-lg overflow-hidden ${showSearchBox === false ? "opacity-0" : ""
                    }`}>
                <img
                    className='inline-block bg-nav-bg'
                    src='https://img.icons8.com/ios-glyphs/20/828282/search--v1.png'
                />
                <input
                    className='inline-block ml-1 w-[280px] bg-nav-bg outline-0 text-secondary-font placeholder:text-secondary-font placeholder:text-sm'
                    type='text'
                    onChange={handleChange}
                    value={component === "submissions" || component === "statistics" ? userName : problemName}
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

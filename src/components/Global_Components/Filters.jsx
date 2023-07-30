import React from "react";
import MyDropDown from "./MyDropDown";

const Filters = ({ component, problem_state = {}, submission_state = {} }) => {
    // get data from redux store
    const contestID =
        component === "submissions"
            ? submission_state.contestID
            : problem_state.contestID;
    const rating =
        component === "submissions"
            ? submission_state.rating
            : problem_state.rating;
    const verdict = submission_state.verdict;
    const tags =
        component === "submissions"
            ? submission_state.tags
            : problem_state.tags;
    const language = submission_state.language;

    return (
        <div className='flex items-center flex-wrap'>
            <MyDropDown
                id={"contestId"}
                value={"Contest ID"}
                list={contestID}
                component={component}
                problem_state={problem_state}
                submission_state={submission_state}
            />
            <MyDropDown
                id={"rating"}
                value={"Rating"}
                list={rating}
                component={component}
                problem_state={problem_state}
                submission_state={submission_state}
            />
            {component === "submissions" && (
                <MyDropDown
                    id={"verdict"}
                    value={"Verdict"}
                    list={verdict}
                    component={component}
                    submission_state={submission_state}
                />
            )}
            <MyDropDown
                id={"tags"}
                value={"Problem Tag"}
                list={tags}
                component={component}
                problem_state={problem_state}
                submission_state={submission_state}
            />
            {component === "submissions" && (
                <MyDropDown
                    id={"language"}
                    value={"Programming Language"}
                    list={language}
                    component={component}
                    submission_state={submission_state}
                />
            )}
        </div>
    );
};

export default Filters;

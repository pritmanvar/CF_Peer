import React from "react";
import MyDropDown from "./MyDropDown";
import { useSelector } from "react-redux";

const Filters = ({ component }) => {
    // get data from redux store
    const contestID =
        component === "submissions"
            ? useSelector((state) => state.SubmissionSlice.contestID)
            : useSelector((state) => state.ProblemSlice.contestID);
    const rating =
        component === "submissions"
            ? useSelector((state) => state.SubmissionSlice.rating)
            : useSelector((state) => state.ProblemSlice.rating);
    const verdict = useSelector((state) => state.SubmissionSlice.verdict);
    const tags =
        component === "submissions"
            ? useSelector((state) => state.SubmissionSlice.tags)
            : useSelector((state) => state.ProblemSlice.tags);
    const language = useSelector((state) => state.SubmissionSlice.language);

    return (
        <div className='flex items-center flex-wrap'>
            <MyDropDown
                id={"contestId"}
                value={"Contest ID"}
                list={contestID}
                component={component}
            />
            <MyDropDown
                id={"rating"}
                value={"Rating"}
                list={rating}
                component={component}
            />
            {component === "submissions" && (
                <MyDropDown
                    id={"verdict"}
                    value={"Verdict"}
                    list={verdict}
                    component={component}
                />
            )}
            <MyDropDown
                id={"tags"}
                value={"Problem Tag"}
                list={tags}
                component={component}
            />
            {component === "submissions" && (
                <MyDropDown
                    id={"language"}
                    value={"Programming Language"}
                    list={language}
                    component={component}
                />
            )}
        </div>
    );
};

export default Filters;

import React from "react";
import MyDropDown from "../Global Components/MyDropDown";
import { useSelector } from "react-redux";

const Filters = () => {
    // get data from redux store
    const contestID = useSelector((state) => state.SubmissionSlice.contestID);
    const difficulty = useSelector((state) => state.SubmissionSlice.difficulty);
    const verdict = useSelector((state) => state.SubmissionSlice.verdict);
    const problemTags = useSelector(
        (state) => state.SubmissionSlice.problemTags
    );
    const language = useSelector((state) => state.SubmissionSlice.language);

    return (
        <div className='flex my-4 items-center flex-wrap'>
            <MyDropDown
                id={"contestId"}
                value={"Contest ID"}
                list={contestID}
            />
            <MyDropDown
                id={"difficulty"}
                value={"Difficulty"}
                list={difficulty}
            />
            <MyDropDown id={"verdict"} value={"Verdict"} list={verdict} />
            <MyDropDown
                id={"problemTag"}
                value={"Problem Tag"}
                list={problemTags}
            />
            <MyDropDown
                id={"language"}
                value={"Programming Language"}
                list={language}
            />
        </div>
    );
};

export default Filters;

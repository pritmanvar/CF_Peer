import React from "react";
import { useSelector } from "react-redux";
import { TooltipWrapper } from "react-tooltip";

// Possible Verdicts
const vertictMap = {
    OK: "ACCEPTED",
    WRONG_ANSWER: "WA",
    TIME_LIMIT_EXCEEDED: "TLE",
    COMPILATION_ERROR: "CE",
    RUNTIME_ERROR: "RE",
    MEMORY_LIMIT_EXCEEDED: "MLE",
    FAILED: "FAILED",
    PARTIAL: "PARTIAL",
    SKIPPED: "SKIPPED",
    REJECTED: "REJECTED",
    CHALLENGED: "CHALLENGED",
    INPUT_PREPARATION_CRASHED: "INPUT PREPARATION CRASHED",
    CRASHED: "CRASHED",
    SECURITY_VIOLATED: "SECURITY VIOLATED",
    PRESENTATION_ERROR: "PRESENTATION ERROR",
    IDLENESS_LIMIT_EXCEEDED: "IDLENESS LIMIT EXCEEDED",
};
// to compare problem tags of current submission and selected tags
const compareProblemTags = (selected, problem) => {
    let haveSelectedTag = false;
    problem.forEach((tag) => {
        if (selected.indexOf("problemTag," + tag) !== -1) {
            haveSelectedTag = true;
        }
    });
    return haveSelectedTag;
};

// React Component
const SubmissionTable = () => {
    // Get Data From Redux
    const submissions = useSelector(
        (state) => state.SubmissionSlice.submission
    );
    const selectedTags = useSelector(
        (state) => state.SubmissionSlice.selectedTags
    );

    // Function to filter submissions
    const filterSubmissions = (sub) => {
        if (
            (selectedTags["contestId"].length === 0 ||
                selectedTags["contestId"].indexOf(
                    "contestId," + sub.problem.contestId
                ) !== -1) &&
            (selectedTags["difficulty"].length === 0 ||
                selectedTags["difficulty"].indexOf(
                    "difficulty," + sub.problem.rating
                ) !== -1) &&
            (selectedTags["verdict"].length === 0 ||
                selectedTags["verdict"].indexOf("verdict," + sub.verdict) !==
                    -1) &&
            (selectedTags["problemTag"].length === 0 ||
                compareProblemTags(
                    selectedTags["problemTag"],
                    sub.problem.tags
                )) &&
            (selectedTags["language"].length === 0 ||
                selectedTags["language"].indexOf(
                    "language," + sub.programmingLanguage
                ) !== -1)
        ) {
            return true;
        } else {
            return false;
        }
    };

    return (
        <>
            {/* Table Heading */}
            <div className='grid grid-cols-8 gap-1 text-sm text-secondary-font rounded-t-lg bg-nav-bg p-2'>
                <span>Submission ID</span>
                <span className='col-span-2'>Problem Name</span>
                <span>Date & Time</span>
                <span>Language</span>
                <span>Verdict</span>
                <span>Time</span>
                <span>Memory</span>
            </div>

            {/* Table Columns */}
            <div className='2xl:text-lg xl:text-base lg:text-sm text-xs p-2 border-nav-bg border-2 rounded-b-lg h-[65vh] overflow-y-scroll'>
                {submissions
                    .filter((sub) => filterSubmissions(sub))
                    .map(
                        ({
                            id,
                            problem,
                            creationTimeSeconds,
                            programmingLanguage,
                            verdict,
                            timeConsumedMillis,
                            memoryConsumedBytes,
                        }) => {
                            // to assign color.
                            let fontColor = "";
                            if (verdict === "OK") {
                                fontColor = "text-my-green";
                            } else {
                                fontColor = "text-my-red";
                            }
                            return (
                                <div
                                    className='grid grid-cols-8 gap-1 my-4'
                                    key={id}>
                                    <span className='pr-2 text-my-purple underline'>
                                        <a
                                            href={`https://codeforces.com/contest/${problem.contestId}/submission/${id}`}
                                            target='_blank'
                                            rel='noopener noreferrer'>
                                            {id}
                                        </a>
                                    </span>
                                    <span className='col-span-2 pr-2 text-my-light-blue'>
                                        <TooltipWrapper
                                            content={problem.tags.join(", ")}>
                                            <a
                                                id={id}
                                                className='underline'
                                                href={`https://codeforces.com/contest/${problem.contestId}/problem/${problem.index}`}
                                                target='_blank'
                                                rel='noopener noreferrer'>
                                                {problem.contestId +
                                                    "/" +
                                                    problem.index +
                                                    ". " +
                                                    problem.name}
                                            </a>
                                        </TooltipWrapper>
                                        <p className='text-my-yellow'>
                                            {problem.rating}
                                        </p>
                                    </span>
                                    <span className='pr-2'>
                                        {new Date(
                                            creationTimeSeconds * 1000
                                        ).toLocaleString()}
                                    </span>
                                    <span className='pr-2'>
                                        {programmingLanguage}
                                    </span>
                                    <span className={`pr-2 ${fontColor}`}>
                                        {vertictMap[verdict] !== undefined
                                            ? vertictMap[verdict]
                                            : verdict}
                                    </span>
                                    <span className='pr-2'>
                                        {timeConsumedMillis + " ms"}
                                    </span>
                                    <span className='pr-2'>
                                        {memoryConsumedBytes / 1000 + " KB"}
                                    </span>
                                </div>
                            );
                        }
                    )}
            </div>
        </>
    );
};

export default SubmissionTable;

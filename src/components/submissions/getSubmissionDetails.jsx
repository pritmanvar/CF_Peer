import { useEffect } from "react";
import axios from "axios";
import { submissionActions } from "../../store/Submissions-Slice";
import { useSelector, useDispatch } from "react-redux";

// Function to get submissions of user
const getSubmissionDetails = () => {
    const dispatch = useDispatch();
    const userName = useSelector((state) => state.SubmissionSlice.userName); // get username from redux store.
    const apiStatus = useSelector((state) => state.SubmissionSlice.apiStatus); // get username from redux store.
    useEffect(() => {
        if (userName !== "") {
            // API CALL to get submissions.
            dispatch(submissionActions.setApiStatus("Feching"));
            dispatch(
                submissionActions.setApiResponce("Feching Submissions!!!")
            );
            axios
                .get(
                    `https://codeforces.com/api/user.status?handle=${userName}`
                )
                .then((res) => {
                    dispatch(submissionActions.setSubmissions(res.data.result));
                    // setSubmissions(res.data.result);

                    // Using set to avoid duplicate values.
                    const difficultySet = new Set();
                    const contestIDSet = new Set();
                    const problemTagSet = new Set();
                    const languageSet = new Set();
                    const verdictSet = new Set();

                    // to segregate data into contestID, difficulty, problemTag, language, verdict
                    for (const sub of res.data.result) {
                        const {
                            contestId,
                            problem,
                            programmingLanguage,
                            verdict,
                        } = sub;

                        difficultySet.add(problem.rating);
                        contestIDSet.add(contestId);
                        problem.tags.forEach((element) => {
                            problemTagSet.add(element);
                        });
                        languageSet.add(programmingLanguage);
                        verdictSet.add(verdict);
                    }

                    // Update data in redux store.
                    // difficulty Array
                    const difficultyArray = [...difficultySet];
                    difficultyArray.sort((a, b) => a - b);
                    dispatch(submissionActions.setDifficulty(difficultyArray));

                    // contest ID Array
                    const contestIDArray = [...contestIDSet];
                    contestIDArray.sort((a, b) => a - b);
                    contestIDArray.reverse();
                    dispatch(submissionActions.setContestID(contestIDArray));

                    // Problem Tag Array
                    const problemTagArray = [...problemTagSet];
                    problemTagArray.sort();
                    dispatch(submissionActions.setProblemTags(problemTagArray));

                    // Language Array
                    dispatch(submissionActions.setLanguage([...languageSet]));

                    // Verdict Array
                    const verdictArray = [...verdictSet];
                    verdictArray.sort();
                    dispatch(submissionActions.setVerdict(verdictArray));

                    // Set Api Status
                    dispatch(submissionActions.setApiStatus("Success"));
                    dispatch(
                        submissionActions.setApiResponce("Feched Successfully")
                    );
                })
                .catch((err) => {
                    dispatch(submissionActions.setApiStatus("Error"));
                    if (err.response === undefined) {
                        dispatch(submissionActions.setApiResponce(err.message));
                    } else {
                        dispatch(
                            submissionActions.setApiResponce(
                                err.response.data.comment
                            )
                        );
                    }
                    dispatch(submissionActions.setSubmissions([]));
                    dispatch(submissionActions.setDifficulty([]));
                    dispatch(submissionActions.setContestID([]));
                    dispatch(submissionActions.setProblemTags([]));
                    dispatch(submissionActions.setLanguage([]));
                    dispatch(submissionActions.setVerdict([]));
                });
        }
    }, [userName]);
};

export default getSubmissionDetails;

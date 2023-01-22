import { useEffect } from "react";
import axios from "axios";
import { submissionActions } from "../../store/Submissions-Slice";
import { useSelector, useDispatch } from "react-redux";

// Function to get submissions of user
const getSubmissionDetails = () => {
    const dispatch = useDispatch();
    const userName = useSelector((state) => state.SubmissionSlice.userName); // get username from redux store.
    useEffect(() => {
        if (userName !== "") {
            // API CALL to get submissions.
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
                    const difficultyArray = [...difficultySet];
                    difficultyArray.sort((a, b) => a - b);
                    dispatch(submissionActions.setDifficulty(difficultyArray));

                    const contestIDArray = [...contestIDSet];
                    contestIDArray.sort((a, b) => a - b);
                    contestIDArray.reverse();
                    dispatch(submissionActions.setContestID(contestIDArray));

                    const problemTagArray = [...problemTagSet];
                    problemTagArray.sort();
                    dispatch(submissionActions.setProblemTags(problemTagArray));

                    dispatch(submissionActions.setLanguage([...languageSet]));

                    const verdictArray = [...verdictSet];
                    verdictArray.sort();
                    dispatch(submissionActions.setVerdict(verdictArray));
                })
                .catch((err) => {
                    console.error(err);
                    alert(err.response.data.comment);
                });
        }
    }, [userName]);
};

export default getSubmissionDetails;

import axios from "axios";
import { submissionActions } from "../../store/Submissions-Slice";

// Function to get submissions of user
const getSubmissionDetails = (userName, dispatch) => {
    if (userName !== "") {
        // API CALL to get submissions.
        dispatch(submissionActions.setApiStatus("Feching"));
        dispatch(submissionActions.setApiResponce("Feching Submissions!!!"));
        axios
            .get(`https://codeforces.com/api/user.status?handle=${userName}`)
            .then((res) => {
                dispatch(submissionActions.setSubmissions(res.data.result));

                // Using set to avoid duplicate values.
                const ratingSet = new Set();
                const contestIDSet = new Set();
                const tagsSet = new Set();
                const languageSet = new Set();
                const verdictSet = new Set();

                // to segregate data into contestID, rating, tags, language, verdict
                for (const sub of res.data.result) {
                    const { contestId, problem, programmingLanguage, verdict } =
                        sub;

                    ratingSet.add(problem.rating);
                    contestIDSet.add(contestId);
                    problem.tags.forEach((element) => {
                        tagsSet.add(element);
                    });
                    languageSet.add(programmingLanguage);
                    verdictSet.add(verdict);
                }

                // Update data in redux store.
                // rating Array
                const ratingArray = [...ratingSet];
                ratingArray.sort((a, b) => a - b);
                dispatch(submissionActions.setRating(ratingArray));

                // contest ID Array
                const contestIDArray = [...contestIDSet];
                contestIDArray.sort((a, b) => a - b);
                contestIDArray.reverse();
                dispatch(submissionActions.setContestID(contestIDArray));

                // Problem Tag Array
                const tagsArray = [...tagsSet];
                tagsArray.sort();
                dispatch(submissionActions.setTags(tagsArray));

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
                dispatch(submissionActions.setRating([]));
                dispatch(submissionActions.setContestID([]));
                dispatch(submissionActions.setTags([]));
                dispatch(submissionActions.setLanguage([]));
                dispatch(submissionActions.setVerdict([]));
            });
    }
};

export default getSubmissionDetails;

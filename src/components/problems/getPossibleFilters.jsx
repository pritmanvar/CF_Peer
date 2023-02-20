import axios from "axios";
import { problemActions } from "../../store/Problems-Slice";

// Function to get problems
const getPossibleFilteres = (dispatch) => {
    // API CALL to get problems.
    dispatch(problemActions.setApiStatus("Feching"));
    dispatch(problemActions.setApiResponce("Feching Filters!!!"));
    axios
        .get("http://localhost:5000/api/problems/possiblefilters")
        .then((res) => {
            dispatch(
                problemActions.setContestID(
                    res.data.possibleFilters[0].contestId
                )
            );
            dispatch(
                problemActions.setRating(res.data.possibleFilters[0].rating)
            );
            dispatch(problemActions.setTags(res.data.possibleFilters[0].tags));

            // Set Api Status
            dispatch(problemActions.setApiStatus("Success"));
            dispatch(problemActions.setApiResponce("Feched Successfully"));
        })
        .catch((err) => {
            console.log(err);
            dispatch(problemActions.setApiStatus("Error"));
            if (err.response === undefined) {
                dispatch(problemActions.setApiResponce(err.message));
            } else {
                dispatch(
                    problemActions.setApiResponce(err.response.data.comment)
                );
            }
        });
};

export default getPossibleFilteres;
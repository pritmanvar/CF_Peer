import axios from "axios";
import { problemActions } from "../../store/Problems-Slice";

// Function to get problems
const getPossibleFilteres = (dispatch) => {
    // API CALL to get problems.
    dispatch(problemActions.setApiStatus("Fetching"));
    dispatch(problemActions.setApiResponce("Fetching Filters!!!"));

    // call api to fetch possible filters
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

import axios from "axios";
import { problemActions } from "../../store/Problems-Slice";

// Function to get problems
const getProblemByName = (problemName, dispatch) => {
    // API CALL to get problems.
    dispatch(problemActions.setApiStatus("Fetching"));
    dispatch(problemActions.setApiResponce("Fetching Filters!!!"));

    // generate query string from problem names
    // ie: remove "name," from every problem name and convert array to string.
    let queryString = "";
    const query = problemName.map((prob) => {
        return prob.split(",")[1];
    });
    queryString = query.join(",");

    // call api to get number of problems that satisfy given condition
    axios
        .get("http://localhost:5000/api/problems/count?name=" + queryString)
        .then((res) => {
            dispatch(problemActions.setProblemCount(res.data.count));
        })
        .catch((err) => {
            dispatch(problemActions.setApiStatus("Error"));
            console.log(err);
            if (err.response === undefined) {
                dispatch(problemActions.setApiResponce(err.message));
            } else {
                dispatch(
                    problemActions.setApiResponce(err.response.data.message)
                );
            }
        });

    // call api to fetch problems that satisfy given condition
    console.log("calling api for problems");
    axios
        .get("http://localhost:5000/api/problems/name?name=" + queryString)
        .then((res) => {
            dispatch(problemActions.setProblems(res.data.problems));

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

export default getProblemByName;

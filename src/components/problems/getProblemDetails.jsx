import axios from "axios";
import { problemActions } from "../../store/Problems-Slice";

// Function to get problems
const getProblemDetails = (page, selectedTags, dispatch) => {
    // API CALL to get problems.
    dispatch(problemActions.setApiStatus("Feching"));
    dispatch(problemActions.setApiResponce("Feching Problems!!!"));
    console.log("calling api for problem count");

    const filters = [];
    for (const key in selectedTags) {
        const temp = [];

        selectedTags[key].forEach((element) => {
            temp.push(element.split(",")[1]);
        });

        if (temp.length > 0) {
            let str = "&&" + key + "=";
            str += temp.join(",");
            filters.push(str);
        }
    }

    axios
        .get(`http://localhost:5000/api/problems/count`)
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
    console.log("calling api for problems");

    axios
        .get(
            `http://localhost:5000/api/problems?page=${page}${filters.join("")}`
        )
        .then((res) => {
            // update problems in redux store
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
            dispatch(problemActions.setProblems([]));
        });
};

export default getProblemDetails;

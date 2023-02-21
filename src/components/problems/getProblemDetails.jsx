import axios from "axios";
import { problemActions } from "../../store/Problems-Slice";

// Function to get problems
const getProblemDetails = (
    page = 1,
    selectedTags = [],
    ratingSort = 0,
    solvedSort = 0,
    dispatch
) => {
    // API CALL to get problems.
    dispatch(problemActions.setApiStatus("Fetching"));
    dispatch(problemActions.setApiResponce("Fetching Problems!!!"));
    console.log("calling api for problem count");

    // generate proper url using filter array.
    // it will store valid query parameters.
    const filters = [];
    const filtersForCount = [];
    for (const key in selectedTags) {
        const temp = [];

        selectedTags[key].forEach((element) => {
            temp.push(element.split(",")[1]);
        });

        // to get problems
        if (temp.length > 0) {
            let str = "&&" + key + "=";
            str += temp.join(",");
            filters.push(str);
        }

        // to get problem count
        if (temp.length > 0) {
            let str = "";
            if (filtersForCount.length > 0) {
                str = "&&" + key + "=";
            } else {
                str = key + "=";
            }

            str += temp.join(",");
            filtersForCount.push(str);
        }
    }

    // api call to get problem count
    axios
        .get(
            `http://localhost:5000/api/problems/count?${filtersForCount.join(
                ""
            )}`
        )
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

    // api call to get problems
    console.log("calling api for problems");
    axios
        .get(
            `http://localhost:5000/api/problems?page=${page}${filters.join(
                ""
            )}${ratingSort === 0 ? "" : "&&sort=rating," + ratingSort}${
                solvedSort === 0 ? "" : "&&sort=solvedCount," + solvedSort
            }`
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

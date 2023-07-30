import axios from "axios";

// Function to get problems
const getProblemDetails = (
    page = 1,
    selectedTags = [],
    ratingSort = 0,
    solvedSort = 0,
    dispatch
) => {
    // API CALL to get problems.
    dispatch({
        type: 'SET_PROBLEM_STATE_API_STATUS',
        data: "Fetching"
    })
    dispatch({
        type: 'SET_PROBLEM_STATE_API_RESPONCE',
        data: "Fetching Problems!!!"
    })
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
            dispatch({
                type: 'SET_PROBLEM_STATE_PROBLEM_COUNT',
                data: res.data.count
            })
        })
        .catch((err) => {
            dispatch({
                type: 'SET_PROBLEM_STATE_API_STATUS',
                data: "Error"
            })
            console.log(err);
            if (err.response === undefined) {
                dispatch({
                    type: 'SET_PROBLEM_STATE_API_RESPONCE',
                    data: err.message
                })
            } else {
                dispatch({
                    type: 'SET_PROBLEM_STATE_API_RESPONCE',
                    data: err.response.data.message
                })
            }
        });

    // api call to get problems
    console.log("calling api for problems");
    axios
        .get(
            `http://localhost:5000/api/problems?page=${page}${filters.join(
                ""
            )}${ratingSort === 0 ? "" : "&&sort=rating," + ratingSort}${solvedSort === 0 ? "" : "&&sort=solvedCount," + solvedSort
            }`
        )
        .then((res) => {
            // update problems in redux store
            dispatch({
                type: 'SET_PROBLEM_STATE_PROBLEMS',
                data: res.data.problems
            })

            // Set Api Status
            dispatch({
                type: 'SET_PROBLEM_STATE_API_STATUS',
                data: "Success"
            })
            dispatch({
                type: 'SET_PROBLEM_STATE_API_RESPONCE',
                data: "Feched Successfully"
            })
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: 'SET_PROBLEM_STATE_API_STATUS',
                data: "Error"
            })
            if (err.response === undefined) {
                dispatch({
                    type: 'SET_PROBLEM_STATE_API_RESPONCE',
                    data: err.message
                })
            } else {
                dispatch({
                    type: 'SET_PROBLEM_STATE_API_RESPONCE',
                    data: err.response.data.comment
                })
            }
            dispatch({
                type: 'SET_PROBLEM_STATE_PROBLEMS',
                data: []
            })
        });
};

export default getProblemDetails;

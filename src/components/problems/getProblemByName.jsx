import axios from "axios";

// Function to get problems
const getProblemByName = (problemName, dispatch) => {
    // API CALL to get problems.
    dispatch({
        type: 'SET_PROBLEM_STATE_API_STATUS',
        data: "Fetching"
    })
    dispatch({
        type: 'SET_PROBLEM_STATE_API_RESPONCE',
        data: "Fetching Problems!!!"
    })

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

    // call api to fetch problems that satisfy given condition
    console.log("calling api for problems");
    axios
        .get("http://localhost:5000/api/problems/name?name=" + queryString)
        .then((res) => {
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
        });
};

export default getProblemByName;

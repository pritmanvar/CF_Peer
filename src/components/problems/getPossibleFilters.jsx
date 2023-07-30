import axios from "axios";

// Function to get problems
const getPossibleFilteres = (dispatch) => {
    // API CALL to get problems.
    dispatch({
        type: 'SET_PROBLEM_STATE_API_STATUS',
        data: "Fetching"
    })
    dispatch({
        type: 'SET_PROBLEM_STATE_API_RESPONCE',
        data: "Fetching Problems!!!"
    })

    // call api to fetch possible filters
    axios
        .get("http://localhost:5000/api/problems/possiblefilters")
        .then((res) => {
            dispatch({
                type: 'SET_PROBLEM_STATE_CONTEST_ID',
                data: res.data.possibleFilters[0].contestId
            })
            dispatch({
                type: 'SET_PROBLEM_STATE_RATINGS',
                data: res.data.possibleFilters[0].rating
            })
            dispatch({
                type: 'SET_PROBLEM_STATE_TAGS',
                data: res.data.possibleFilters[0].tags
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
                    data: err.response.data.message
                })
            }
        });
};

export default getPossibleFilteres;

import axios from "axios";

const getUserGroups = (username, dispatch) => {
    axios
        .get(`http://localhost:5000/api/users/groups/${username}`)
        .then((result) => {
            dispatch({
                type: 'USER_SET_GROUPS',
                data: result.data.groups
            })
        })
        .catch((error) => {
            console.log(error);
        });
};

export default getUserGroups;

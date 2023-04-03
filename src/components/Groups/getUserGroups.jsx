import axios from "axios";
import { userActions } from "../../store/User-Slice";

const getUserGroups = (username, dispatch) => {
    axios
        .get(`http://localhost:5000/api/users/groups/${username}`)
        .then((result) => {
            dispatch(userActions.setGroups(result.data.groups));
        })
        .catch((error) => {
            console.log(error);
        });
};

export default getUserGroups;

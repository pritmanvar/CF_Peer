import React from "react";
import { useStateValue } from "../../stateProvider";

const Notification = (props) => {
    const [{problem_state, submission_state}] = useStateValue()
    const apiResponce =
        props.component === "submissions"
            ? submission_state.apiResponce
            : problem_state.apiResponce;
    return (
        <div
            className={`${props.myColor} text-main-font text-base text-center font-semibold p-1`}>
            {apiResponce}
        </div>
    );
};

export default Notification;

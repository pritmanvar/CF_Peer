import React from "react";
import { useSelector } from "react-redux";

const Notification = (props) => {
    const apiResponce = useSelector(
        (state) => state.SubmissionSlice.apiResponce
    );
    return (
        <div
            className={`${props.myColor} text-main-font text-base text-center font-semibold p-1`}>
            {apiResponce}
        </div>
    );
};

export default Notification;

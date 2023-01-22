import React, { useState } from "react";
import { submissionActions } from "../../store/Submissions-Slice";
import { useDispatch } from "react-redux";

const UserNameSearchBox = () => {
    const dispatch = useDispatch();
    const [userName, setUserName] = useState(""); // userName typed in text box

    // Update userName in redux store
    const submitHandle = (e) => {
        e.preventDefault();
        dispatch(submissionActions.updateUserName(userName));
        setUserName("");
    };
    return (
        <>
            <form
                onSubmit={(e) => submitHandle(e)}
                className='mt-2 p-2 inline-block bg-nav-bg w-80 rounded-lg overflow-hidden'>
                <img
                    className='inline-block bg-nav-bg'
                    src='https://img.icons8.com/ios-glyphs/20/828282/search--v1.png'
                />
                <input
                    className='inline-block ml-1 w-[280px] bg-nav-bg outline-0 text-secondary-font placeholder:text-secondary-font placeholder:text-sm'
                    type='text'
                    onChange={(e) => setUserName(e.target.value)}
                    value={userName}
                    placeholder={"Search username here..."}
                />
            </form>
        </>
    );
};

export default UserNameSearchBox;

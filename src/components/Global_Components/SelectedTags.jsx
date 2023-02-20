import React from "react";
import { submissionActions } from "../../store/Submissions-Slice";
import { useDispatch } from "react-redux";
import { problemActions } from "../../store/Problems-Slice";

const SelectedTags = ({ tag, fontColor = "text-main-font", component }) => {
    const dispatch = useDispatch();

    // Function to remove tag from selectedTags.
    const removeTag = () => {
        if (component === "submissions") {
            dispatch(submissionActions.removeSelectedTag(tag)); // update data in redux store.
        } else {
            dispatch(problemActions.removeSelectedTag(tag));
        }
    };

    return (
        <span
            className={`flex items-center w-fit rounded-full py-1 px-3 m-1 mt-2 bg-nav-bg text-sm ${fontColor}`}>
            {tag.split(",")[1]}
            <img
                onClick={removeTag}
                className='inline-block ml-2 h-4 w-4'
                src='https://img.icons8.com/ios-glyphs/16/828282/macos-close.png'
            />
        </span>
    );
};

export default SelectedTags;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { problemActions } from "../../store/Problems-Slice";
import { submissionActions } from "../../store/Submissions-Slice";

const MyDropDown = ({ id, value, list, component }) => {
    // get list of selected tags from redux store
    const selectedTags = useSelector((state) => {
        return component === "submissions"
            ? state.SubmissionSlice.selectedTags
            : state.ProblemSlice.selectedTags;
    });

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const selectedValue = e.target.value;
        // if value is already present or nothing is selected then return.
        if (
            selectedValue === value ||
            selectedTags[selectedValue.split(",")[0]].indexOf(selectedValue) !==
                -1
        ) {
            e.target.value = value;
            return;
        }

        if (component === "submissions") {
            dispatch(submissionActions.addSelectedTag(selectedValue)); // update react store.
        } else {
            dispatch(problemActions.addSelectedTag(selectedValue)); // update react store.
        }
        e.target.value = value; // reset dropdown
    };

    return (
        <select
            onChange={(e) => handleChange(e)}
            className='bg-nav-bg h-10 text-sm outline-none border-none px-3 py-1 rounded-lg mr-4 mt-3'
            name={id}
            id={id}>
            <option className='text-secondary-font' value={value}>
                {value}
            </option>
            {list.map((item) => (
                <option
                    value={id + "," + item}
                    key={item === undefined ? "undefined1" : item}>
                    {item}
                </option>
            ))}
        </select>
    );
};

export default MyDropDown;

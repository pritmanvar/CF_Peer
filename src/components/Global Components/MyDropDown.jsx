import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { submissionActions } from "../../store/Submissions-Slice";

const MyDropDown = ({ id, value, list }) => {
    // get list of selected tags from redux store
    const selectedTags = useSelector(
        (state) => state.SubmissionSlice.selectedTags
    );

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const selectedValue = e.target.value;
        // if value is already present or nothing is selected then return.
        if (
            selectedValue === value ||
            selectedTags.indexOf(selectedValue) !== -1
        ) {
            e.target.value = value;
            return;
        }

        dispatch(submissionActions.addSelectedTag(selectedValue)); // update react store.
        e.target.value = value; // reset dropdown
    };

    return (
        <select
            onChange={(e) => handleChange(e)}
            className='bg-nav-bg h-10 text-sm outline-none border-none px-3 py-1 rounded-lg mr-4 mt-4'
            name={id}
            id={id}>
            <option className='text-secondary-font' value={value}>
                {value}
            </option>
            {list.map((item) => (
                <option value={id + "," + item} key={item}>
                    {item}
                </option>
            ))}
        </select>
    );
};

export default MyDropDown;

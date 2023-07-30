import React from "react";
import { useStateValue } from "../../stateProvider";

const MyDropDown = ({ id, value, list, component, problem_state = {}, submission_state = {} }) => {
    // get list of selected tags from redux store
    const selectedTags = component === "submissions"
        ? submission_state.selectedTags
        : problem_state.selectedTags;

    // const dispatch = useDispatch();
    const [{ }, dispatch] = useStateValue()

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

        console.log(selectedValue)
        if (component === "submissions") {
            dispatch({
                type: 'SUBMISSION_ADD_SELECTED_TAG',
                data: selectedValue
            })
        } else {
            dispatch({
                type: 'PROBLEM_STATE_ADD_SELECTED_TAG',
                data: selectedValue
            })
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

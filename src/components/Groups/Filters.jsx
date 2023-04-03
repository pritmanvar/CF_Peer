import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/User-Slice";

const Filters = () => {
    const groups = useSelector((state) => state.UserSlice.groups);

    const dispatch = useDispatch();
    const groupList = groups.map((grp) => grp.name);

    const [selectedIteam, setSelectedIteam] = useState(groupList[0]);

    const handleChange = (e) => {
        const selectedValue = e.target.value;

        dispatch(userActions.setSelectedGroup(selectedValue));
        setSelectedIteam(selectedValue);
    };

    return (
        <div className='flex items-center flex-wrap'>
            <select
                onChange={(e) => handleChange(e)}
                className='bg-nav-bg h-10 text-sm outline-none border-none px-3 py-1 rounded-lg mr-4 mt-3'
                name={groups}
                id={groups}
                value={selectedIteam}>
                {groupList.map((grp) => (
                    <option
                        value={grp}
                        key={grp === undefined ? "undefined2" : grp}>
                        {grp}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Filters;

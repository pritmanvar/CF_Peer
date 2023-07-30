import React from "react";

import SearchBox from "./SearchBox";
import { useStateValue } from "../../stateProvider";

const SearchBar = ({ component, showSearchBox = true }) => {
    const [{user_state}] = useStateValue()
    const userName = user_state.userId;
    return (
        <div className='flex justify-between'>
            <SearchBox component={component} showSearchBox={showSearchBox} />
            {userName !== "" && (
                <div className='flex items-center mt-2'>
                    <img
                        className='h-7 w-7'
                        src='https://img.icons8.com/material-outlined/30/828282/appointment-reminders--v1.png'
                    />
                    <img
                        className='h-7 w-7 ml-2 mr-4'
                        src='https://img.icons8.com/color/30/null/circled-user-male-skin-type-7--v1.png'
                    />
                    <p>{userName}</p>
                </div>
            )}
        </div>
    );
};

export default SearchBar;

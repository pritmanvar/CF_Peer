import React from "react";

import SearchBar from "../components/Global_Components/SearchBar";
import Filters from "../components/Groups/Filters";
import GroupsTable from "../components/Groups/GroupsTable";
import Nav from "../components/Navigation/Nav";
import { useStateValue } from "../stateProvider";

const YourGroups = () => {
    const [{user_state}] = useStateValue()
    return (
        <>
            <Nav selectedIteam='yourgroups' />
            <div className='w-4/5 ml-1/5'>
                <div className='mx-5'>
                    <SearchBar showSearchBox={true} />
                    <div className='flex justify-between'>
                        <div>
                            <Filters user_state={user_state} />
                            <GroupsTable user_state={user_state} />
                        </div>
                        <div>{/* Calender or chatbox */}</div>
                    </div>
                </div>
            </div>
            <div className='bg-red-900'></div>
        </>
    );
};

export default YourGroups;

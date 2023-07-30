import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";

const GroupsTable = ({user_state}) => {
    const selectedGroup = user_state.selectedGroup;
    const groups = user_state.groups;

    const [tableRows, setTableRows] = useState([]);

    const getUsers = useCallback(async () => {
        if (!selectedGroup) return;

        const users = groups.filter((grp) => grp.name === selectedGroup)[0]
            .acceptedUsers;

        const myUsersString = users.join(";");

        let ratings = [];

        try {
            const res = await axios.get(
                `https://codeforces.com/api/user.info?handles=${myUsersString}`
            );
            ratings = res.data.result.map((usr) =>
                usr.rating === undefined ? 0 : usr.rating
            );
        } catch (error) {
            console.log(error);
        }

        return users.map((user, indx) => {
            return (
                <div className='grid grid-cols-8 gap-1 p-2 text-sm' key={indx}>
                    <span>{indx + 1 + "."}</span>
                    <span className='col-span-3'>{user}</span>
                    <span className='col-span-2 text-my-yellow'>
                        {ratings[indx]}
                    </span>
                </div>
            );
        });
    }, [selectedGroup]);

    useEffect(() => {
        getUsers()
            .then((res) => {
                setTableRows(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [getUsers]);

    return (
        <>
            {/* Table Heading */}
            <div className='grid grid-cols-8 gap-1 w-[550px] mt-4 text-secondary-font rounded-t-lg bg-nav-bg p-2'>
                <span>No.</span>
                <span className='col-span-3'>User Name</span>
                <span className='col-span-2'>Rating</span>
                <span className='col-span-2 text-center'>
                    Change in Ratings
                </span>
            </div>

            {/* Table Rows */}
            <div
                className={
                    "2xl:text-lg xl:text-base lg:text-sm p-2 border-nav-bg border-2 rounded-b-lg max-h-[60vh] w-[550px] overflow-y-scroll"
                }>
                {tableRows}
            </div>
        </>
    );
};

export default GroupsTable;

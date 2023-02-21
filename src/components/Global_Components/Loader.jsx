import React from "react";

const Loader = ({ color }) => {
    return (
        <div className='h-full w-full flex justify-center items-center'>
            <div
                className={`animate-spin h-16 w-16 rounded-full border-x-${color} border-y-transparent border-8`}></div>
        </div>
    );
};

export default Loader;

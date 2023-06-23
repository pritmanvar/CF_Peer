import React from "react";
import Nav from "../components/Navigation/Nav";

const CompareUsers = () => {
    const data = [
        [
            { type: "number", label: "x" },
            { type: "number", label: "values" },
            { id: "i0", type: "number", role: "interval" },
            { id: "i1", type: "number", role: "interval" },
            { type: "number", label: "values" },
            { id: "i0", type: "number", role: "interval" },
            { id: "i1", type: "number", role: "interval" },

        ],
        [1, 100, 0, 1000, 120, 0, 120],
        [2, 120, 0, 120, 100, 0, 100],
        [3, 130, 0, 130, 120, 0, 120],
        [4, 90, 0, 90, 80, 0, 80],
        [5, 70, 0, 70, 80, 0, 80],
        [6, 30, 0, 30, 50, 0, 50],
        [7, 80, 0, 80, 40, 0, 40],
        [8, 100, 0, 100, 90, 0, 90],
    ];
    return <Nav selectedIteam='compareusers' />;
};

export default CompareUsers;

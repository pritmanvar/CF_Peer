import React, { useState } from "react";
import { Chart } from "react-google-charts";

export default function Histogram({ submission }) {
    const [showAccepted, setShowAccepted] = useState(false)
    const [data, setData] = useState(showAccepted ? submission.filter(sub => sub.verdict === "OK").map(sub => [sub.problem.rating]) : submission.map(sub => [sub.problem.rating]))
    const options = {
        title: "Problem Ratings Analysis",
        titleTextStyle: { color: "#EDEDED", textAlign: 'center', margin: 'auto' },
        curveType: 'function',
        backgroundColor: 'transparent', // Set your desired background color here
        is3D: true,
        intervals: { style: "area" },
        width: document.getElementById('histogram-div')?.clientWidth,

        textStyle: {
            color: 'red' // Set the text color to red
        },
        // legend: 'none', // Hide the legends
        annotations: {
            textStyle: {
                fontSize: 12,
                bold: true,
                textAlign: 'center', // Center the text horizontally
                verticalAlignment: 'middle' // Center the text vertically
            }
        },
        legend: {
            textStyle: {
                color: '#828282' // Set the text color to #828282
            },
        },

        hAxis: {
            title: "Ratings",
            titleTextStyle: { color: "#EDEDED" },
            gridlines: {
                color: 'transparent'
            },
            textStyle: {
                color: '#828282' // Set the text color to #828282
            },
            minValue: 700,
            viewWindow: { min: 700 }
        },
        vAxis: {
            title: "Number of Problem Attempted",
            titleTextStyle: { color: "#EDEDED" },
            minValue: 0,
            gridlines: {
                color: 'transparent'
            },
            textStyle: {
                color: '#828282' // Set the text color to #828282
            },
            viewWindow: { min: 0 }
        },
        chartArea: { left: 65, right: 100, top: 40, bottom: 70, width: "100%", height: "100%", background: "#00000000" },
        animation: {
            duration: 1000,
            easing: "out",
            startup: true,
        },
        textAlign: 'center',
        series: [{ color: "#0FA06D" }, { color: "#FBC914" }],
        tooltip: { isHtml: true }
    };

    console.log([["Number"], ...data])
    return (
        <>
            <div className="flex items-center gap-2 mt-2 ml-2 text-xs" onClick={() => setShowAccepted(pre => !pre)}>
                <div className="h-3 w-3 bg-transparent border-2"></div>
                <div>Show Accepted Only</div>
            </div>
            <Chart
                chartType="Histogram"
                width="100%"
                height="400px"
                data={[["Number"], ...data]}
                options={options}
            />
        </>
    );
}

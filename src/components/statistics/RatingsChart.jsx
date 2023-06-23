import React from 'react'
import { Chart } from "react-google-charts";


const RatingsChart = ({ data }) => {
    const options = {
        title: "Rating Change",
        titleTextStyle: { color: "#EDEDED", textAlign: 'center', margin: 'auto' },
        curveType: 'function',
        backgroundColor: 'transparent', // Set your desired background color here
        is3D: true,
        intervals: { style: "area" },

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
            title: "Date",
            titleTextStyle: { color: "#EDEDED" },
            gridlines: {
                color: 'transparent'
            },
            textStyle: {
                color: '#828282' // Set the text color to #828282
            },
        },
        vAxis: {
            title: "Ratings",
            titleTextStyle: { color: "#EDEDED" },
            minValue: 0,
            gridlines: {
                color: 'transparent'
            },
            textStyle: {
                color: '#828282' // Set the text color to #828282
            },
        },
        chartArea: { left: 100, right: 160, top: 50, bottom: 100, width: "100%", height: "100%", background: "#00000000" },
        animation: {
            duration: 1000,
            easing: "out",
            startup: true,
        },
        textAlign: 'center',
        series: [{ color: "#0FA06D" }, { color: "#FBC914" }],
        tooltip: { isHtml: true }
    };
    return (

        < Chart
            chartType="LineChart"
            width="100%"
            height="100%"
            data={data}
            options={options}
        />

    )
}

export default RatingsChart

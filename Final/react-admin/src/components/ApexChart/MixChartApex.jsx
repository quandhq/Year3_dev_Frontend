import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

// Reference: https://apexcharts.com/react-chart-demos/mixed-charts/multiple-yaxis/#

const MultipleYAxis = ({ nameChart, id, time, temperature, humidity, option }) => {
    console.log("This is in Chartttttttt")
    if(option !== "now")
    {
        console.log("THIS IS NOT NOWWWWWWWWWWWWW IN MULTICHARTTTTTTTTTT")
        console.log(temperature)
    }
    

    let new_data = null
    if(option === "now")
        {   
            let new_time = null;
            if(time)
            {
                new_time = time.map((t)=>{
                                          let unixTimestamp = t;
                                          let date = new Date(unixTimestamp * 1000);
                                          return date.getHours().toString() + 
                                          ":" + date.getMinutes().toString() + 
                                          ":" + date.getSeconds().toString();
                                        });
            }

            new_data = {
                options: {
                        title: {
                            text: nameChart
                        },
                        xaxis: {
                            categories: new_time ? new_time : []
                        },
                        yaxis: [
                            {
                                title: {
                                    text: "Temp"
                                }
                            },
                            {
                                opposite: true,
                                title: {
                                    text: "Hum"
                                }
                            }
                        ]
                    },
                series: [{
                    name: "T",
                    type: "line",
                    data: temperature
                }, {
                    name: "H",
                    type: 'line',
                    data: humidity
                }]
            }
        }
        else
        {
            let new_time = null;
            if(time)
            {
                new_time = time;
            }
            new_data = {
                options: {
                        title: {
                            text: nameChart
                        },
                        xaxis: {
                            categories: new_time ? new_time : []
                        },
                        yaxis: [
                            {
                                title: {
                                    text: "Temp"
                                }
                            },
                            {
                                opposite: true,
                                title: {
                                    text: "Hum"
                                }
                            }
                        ]
                    },
                series: [{
                    name: "Te",
                    type: "line",
                    data: temperature
                }, {
                    name: "Hu",
                    type: 'line',
                    data: humidity
                }]
            }
        }

    return (
        <div id="chart">
            <ReactApexChart options={new_data.options} 
                            series={new_data.series} 
                            type={"line"} 
                            height="" 
            />
        </div>
    );
};

export default MultipleYAxis;
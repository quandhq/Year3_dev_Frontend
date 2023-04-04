import React, { Component } from "react";
import { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const BarChart_Apex = ({nameChart, id, time, value}) => {
    /* create useState for data to pass to chart */
    const [data, setData] = useState({
                                        options: {
                                          xaxis: {
                                            categories: [1992, 1994, 1995, 1996]
                                          }
                                        },
                                        series: [
                                          {
                                            name: nameChart,
                                            data: [23, 123, 121,12]
                                          }
                                        ]
                                      }
                                    ); 

    /* function inside userEffect runs each time data of useState changes */
    useEffect(() => {
        /* create a function that converse unix time stamp t into a string that show hour, minutes and second and
        map that function to all members of array time */
        let new_time = time.map((t)=>{
          let unixTimestamp = t;
          let date = new Date(unixTimestamp * 1000);
          return date.getHours().toString() + ":" + date.getMinutes().toString() + ":" + date.getSeconds().toString();
          });
        /* new value to set for data of useState */
        let new_data = {
                    options: {
                      xaxis: {
                        categories: new_time
                      }
                    },
                    series: [
                      {
                        name: `nameChart ${id}`,
                        data: value
                      }
                    ]
                  };
        setData(new_data);
    },[time, id, value]);

    // const data =  ;


        return (
            <div className="app">
              <div className="row">
                <div className="mixed-chart">
                  <Chart
                    options={data.options}
                    series={data.series}
                    type="bar"
                    width="100%"
                    height="360px"
                  />

                </div>
              </div>
            </div>
          );
}

export default BarChart_Apex;
import React, {useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useState } from "react";


const resolutionX = 6
const resolutionY = 4


const generateData = (data, resolutionX, resolutionY) => 
{
   let series = [];
   let count = 0;
   for(let i=1; i<=resolutionY;++i)
   {
      let serie = {name: "", data : []};
      serie.name = `${i}`;
      serie.data = [];
      for(let j=1;j<=resolutionX;++j)
      {
         serie.data.push({x:`${j}`, y: data[count]}); //add 4 {x, y} to serie.data  for each i
         ++count;
      }
      series.push(serie);
   }
   return series;
};


const TemperatureMap = ({data, resolutionX, resolutionY}) => {
    let [state, setState] = useState({
              series: [{
                        name: 'Metric1',
                        data: [{x: '1', y: 22}, {x: '2', y: 29}, {x: '3',y: 13}, {x: '4',y: 32}]
                      },
                      {
                        name: 'Metric2',
                        data: [{x: '1', y: 22}, {x: '2', y: 29}, {x: '3',y: 13}, {x: '4',y: 32}]
                      },
                      {
                        name: 'Metric3',
                        data: [{x: '1', y: 22}, {x: '2', y: 29}, {x: '3',y: 13}, {x: '4',y: 32}]
                      },
                      {
                        name: 'Metric4',
                        data: [{x: '1', y: 22}, {x: '2', y: 29}, {x: '3',y: 13}, {x: '4',y: 32}]
                      }],
              options: {
                        chart: {height: 350, type: 'heatmap',},
                        dataLabels: {enabled: false},
                        colors: ["#008FFB"],
                        title: {text: 'HeatMap Chart (Single color)'},
                        // stroke: {width: 0}, //space between cells

                        plotOptions: {
                            heatmap: {
                              shadeIntensity: 0.5,
                              radius: 0,
                              useFillColorAsStroke: true, //delete space between cells
                              colorScale: {
                                ranges: [{from: 340,to: 540,name: 'temp',color: '#FF0000'},
                                      // {from: 6,to: 20,name: 'medium',color: '#128FD9'},
                                      // {from: 21,to: 45,name: 'high',color: '#FFB200'},
                                      // {from: 46,to: 55,name: 'extreme',color: '#FF0000'}
                                    ]
                                  }
                                }
                              },

                        xaxis: {
                          labels: {
                            show: true,
                            rotate: 0,
                            rotateAlways: false,
                            hideOverlappingLabels: true,
                            showDuplicates: false,
                            trim: false,
                            minHeight: undefined,
                            maxHeight: 40,
                            style: {
                                colors: [],
                                fontSize: '5px',
                                fontFamily: 'Helvetica, Arial, sans-serif',
                                fontWeight: 400,
                                cssClass: 'apexcharts-xaxis-label',
                                },
                              },
                            },
                              
                              
                        yaxis: {
                          labels: {
                            show: true,
                            rotate: 0,
                            rotateAlways: false,
                            hideOverlappingLabels: true,
                            showDuplicates: false,
                            trim: false,
                            minHeight: undefined,
                            maxHeight: 40,
                            style: {
                                colors: [],
                                fontSize: '3px',
                                fontFamily: 'Helvetica, Arial, sans-serif',
                                fontWeight: 400,
                                cssClass: 'apexcharts-xaxis-label',
                                },
                              },
                            },

                          }
      }
    );
    
    useEffect(() => { 
      setState({...state, series: generateData(data, resolutionX, resolutionY)});
    },[state,data, resolutionX, resolutionY]);

    console.log("???????????????????????????????????????????????????????????????????");
    console.log(data)
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    console.log(state.series);
    console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");


    return (
      <div id="chart" style={{ position: "relative", margin: "auto", width: "100%", height: "100%"  }}>
            <ReactApexChart 
            options={state.options} 
            series={state.series} 
            type="heatmap" 
            height={350} 
            />
      </div>  
    );
  }

export default TemperatureMap;
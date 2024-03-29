import Chart from 'chart.js/auto';
import { Bar, Line } from "react-chartjs-2";
import React, { useState, useEffect } from "react";

// prop to pass inside: <Barchart data={...} time={...} id={...} chartName={...}/>
function BarChart({data, time, id, chartName}){
  console.log(data); 
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
 
  const [chartOptions, setChartOptions] = useState({});
 
  useEffect(() => {

    let new_time = time.map((t)=>{
      let unixTimestamp = t;
      let date = new Date(unixTimestamp * 1000);
      return date.getHours().toString() + ":" + date.getMinutes().toString() + ":" + date.getSeconds().toString();
    })

    

    setChartData({
      labels: new_time.reverse(),
      datasets: [
        {
          label: `${chartName} ${id}`,
          data: data.reverse(),
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.4)",
          
        },
      ],
    });
    // setChartOptions({
    //   scales: {
    //         y: {
    //             title: {
    //               display: true,
    //               text: 'Humidity',
    //               font: {
    //                     family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
    //                     size: 20,
        
    //               },
    //               color: Chart.defaults.color,
    //             },
                
    //         },
    //         x: {
    //             title: {
    //               display: true,
    //               text: 'Time',
    //               font: {
    //                 family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
    //                 size: 20,
        
    //                   },
    //               color: Chart.defaults.color,
    //             },
                
    //         }
    //   },
      
    //   responsive: true,
    //   plugins: {
    //     legend: {
    //       position: "top",
    //     },
    //     title: {
    //       display: true,
    //       text: "Whom the fuck let the dogs out",
    //       size: 10,
    //     },
    //   },
      
    // });
  }, [data, ]);


  useEffect(() => {
    // setChartData({
    //   labels: ["John", "Kkkkevin", "Geroge", "Micheal", "Oreo"],
    //   datasets: [
    //     {
    //       label: "Whom the fuck let the dogs out",
    //       // data: [12, 55, 34, 120, 720],
    //       data: data,
    //       borderColor: "rgb(53, 162, 235)",
    //       backgroundColor: "rgba(53, 162, 235, 0.4)",
          
    //     },
    //   ],
    // });
    setChartOptions({
      scales: {
            y: {
                title: {
                  display: true,
                  text: '%',
                  font: {
                        family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                        size: 10,
        
                  },
                  color: Chart.defaults.color,
                },
                
            },
            x: {
                title: {
                  display: true,
                  text: 'Time',
                  font: {
                    family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                    size: 10,
        
                      },
                  color: Chart.defaults.color,
                },
                
            }
      },
      
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
         //  text: mac,
          size: 10,
        },
      },
      
    });
  }, []);
 
  return (
     <>
      
     
     <div style={{ position: "relative", margin: "auto", width: "200%", height: "500px", border: "1px solid black" }}>
       <Bar options={chartOptions} data={chartData}/>
    </div>
    
    </>
    
  );
}
 
export default BarChart;
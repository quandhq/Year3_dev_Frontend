import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

// Reference: https://apexcharts.com/react-chart-demos/line-charts/basic/

export const BarChartApex = ({ nameChart, id, time, value, option }) => {
  const [data, setData] = useState({
    options: {
      title: {
        text: nameChart
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      }
    },
    series: [{
      name: nameChart,
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    }]
  });


  /* function inside userEffect runs each time props passed in change */
  useEffect(() => {
    let new_data;
    if(option === 1)
    {
      let new_time = time.map((t)=>{
                                      let unixTimestamp = t;
                                      let date = new Date(unixTimestamp * 1000);
                                      return date.getHours().toString() + 
                                      ":" + date.getMinutes().toString() + 
                                      ":" + date.getSeconds().toString();
                                    });
      /* new value to set for data of useState */
      new_data = {
        options: {
          title: {
            text: nameChart
          },
          xaxis: {
            categories: new_time,
          }
        },
        series: [{
          name: nameChart,
          data: value,
        }]
      };
    }
    else if(option === 2)
    {
      let new_time = time.map((t)=>{
                                    let unixTimestamp = t;
                                    let date = new Date(unixTimestamp * 1000);
                                    return date.getDate().toString() + 
                                    "/" + date.getMonth().toString() + 
                                    "/" + date.getFullYear().toString();
                                  });
      new_data = {
        options: {
          title: {
            text: nameChart
          },
          xaxis: {
            categories: new_time,
          }
        },
        series: [{
          name: nameChart,
          data: value,
        }]
      };
    }
    
    setData(new_data);
    }, [id, time, value, option])

    return (
      <div id="chart">
        <ReactApexChart options={data.options} series={data.series} type="bar" height="200%"/>
      </div>
    );
};
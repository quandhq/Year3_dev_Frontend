import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

// Reference: https://apexcharts.com/react-chart-demos/line-charts/basic/
// TODO: Update chart (DONE)

export const LineChartApex = ({ nameChart, id, time, value }) => {
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
    setData(new_data);
    }, [id, time, value])

  return (
    <div id="chart">
      <ReactApexChart options={data.options} series={data.series} type="line" height="200%"/>
    </div>
  );
};
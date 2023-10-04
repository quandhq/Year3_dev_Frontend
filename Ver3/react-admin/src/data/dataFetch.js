// /* CURRENTLY USING THIS VERSION FOR GETING DATA FOR CHARTS */


// import { useState, useEffect, useCallback, useSyncExternalStore } from "react";

// const useFetch = (url,) => {
//    console.log(url)
//    console.count("useFetch start!!!")
//    const [hum, getHum] = useState([])
//    const [temp, getTemp] = useState([])
//    const [time, getTime] = useState([])
//    const [co2, getCo2] = useState([])

//    const getSensors =
//    async () => {
//       const response = await fetch(url,{
//       'method':'GET',
//       headers: {
//         'Content-Type':'application/json',
//          }
//       });
//       const new_sensors = await response.json()
//       if(new_sensors)
//       {
//             console.log(new_sensors);
//             console.log(new_sensors.hum);
//             getTemp(new_sensors.temp);
//             getHum(new_sensors.hum);
//             getTime(new_sensors.time)
//       }
//       else
//       {
//          console.count("NO DATA !!!!!")
//       }
    
//   };

//    useEffect(() => {
//       setTimeout(() => {getSensors()}, 500);
//    },[co2, temp, hum, time]);        

//    return {co2, temp, hum, time};
// };

// export default useFetch;
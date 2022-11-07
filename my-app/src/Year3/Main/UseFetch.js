import { useState, useEffect } from "react";

const UseFetch = (url) => {
   console.log("useFetch start!!!")
   const [humidity, getHumidity] = useState([])
   const getSensors = async () => {
      const response = await fetch(url,{
      'method':'GET',
      headers: {
        'Content-Type':'application/json',
         }
      });
      const new_sensors = await response.json()
      let new_sensors_humidity = new_sensors.map((new_sensor)=>{return new_sensor.humidity})
      console.log(new_sensors)
      console.log(new_sensors_humidity)
      getHumidity(new_sensors_humidity)
      // if(new_sensors)
      // {
      //    console.log("Fetch data successfull!!")
      // }
   };

   useEffect(() => {
      getSensors();
   }, [humidity]);

   return {humidity};
};

export default UseFetch;
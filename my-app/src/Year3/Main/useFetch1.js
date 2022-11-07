import { useState, useEffect, useCallback } from "react";

const useFetch1 = (url) => {
   console.count("useFetch start!!!")
   const [humidity, getHumidity] = useState([])
   const [temperature, getTemperature] = useState([])
   const [time, getTime] = useState([])
   const getSensors =
   async () => {
      const response = await fetch(url,{
      'method':'GET',
      headers: {
        'Content-Type':'application/json',
         }
      });
      const new_sensors = await response.json()
      if(new_sensors)
      {
         console.count("SUCCESS");
         // console.count(new_sensors);
            let new_sensors_humidity = new_sensors.map((new_sensor)=>{return new_sensor.humidity})
            let new_sensors_temperature = new_sensors.map((new_sensor)=>{return new_sensor.temperature})
            let new_sensors_time = new_sensors.map((new_sensor)=>{return new_sensor.time})
            console.log(new_sensors)
            console.log(new_sensors_humidity)
            getTemperature(new_sensors_temperature);
            getHumidity(new_sensors_humidity);
            getTime(new_sensors_time)
      }
      else
      {
         console.count("NO DATA !!!!!")
      }
    
  };

   useEffect(() => {
      setTimeout(() => {getSensors()}, 2000);
   },[humidity,temperature,time]);        

   return {humidity,temperature,time};
};

export default useFetch1;
import { useState, useEffect, useCallback, useSyncExternalStore } from "react";

const useFetch1 = (url) => {
   console.log(url)
   console.count("useFetch start!!!")
   const [humidity, getHumidity] = useState([])
   const [temperature, getTemperature] = useState([])
   const [time, getTime] = useState([])
   const [co2, getCo2] = useState([])
   const [dust, getDust] = useState([])
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
            let new_sensors_co2 = new_sensors.map((new_sensor)=>{return new_sensor.co2})
            let new_sensors_dust = new_sensors.map((new_sensor)=>{return new_sensor.dust})
            console.log("this is from id 1");
            console.log(new_sensors);
            console.log(new_sensors_humidity);
            getTemperature(new_sensors_temperature);
            getHumidity(new_sensors_humidity);
            getTime(new_sensors_time)
            getCo2(new_sensors_co2)
            getDust(new_sensors_dust)
      }
      else
      {
         console.count("NO DATA !!!!!")
      }
    
  };

   useEffect(() => {
      setTimeout(() => {getSensors()}, 1000);
   },[temperature,humidity,co2,dust,time]);        

   return {temperature,humidity,co2,dust,time};
};

export default useFetch1;
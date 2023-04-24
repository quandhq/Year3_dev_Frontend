/* CURRENTLY USING THIS VERSION FOR GETING DATA FOR CHARTS */


import { useState, useEffect, useCallback, useSyncExternalStore } from "react";

const useFetch = (url) => {
   console.log(url)
   console.count("useFetch start!!!")
   const [humidity, getHumidity] = useState([])
   const [temperature, getTemperature] = useState([])
   const [time, getTime] = useState([])
   const [co2, getCo2] = useState([])
   const [dust, getDust] = useState([])
   const [light, getLight] = useState([])
   const [sound, getSound] = useState([])

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
            console.log(new_sensors);
            console.log(new_sensors.humidity);
            getTemperature(new_sensors.temperature);
            getHumidity(new_sensors.humidity);
            getTime(new_sensors.time)
            getCo2(new_sensors.co2)
            getDust(new_sensors.dust)
            getSound(new_sensors.sound)
            getLight(new_sensors.light)
      }
      else
      {
         console.count("NO DATA !!!!!")
      }
    
  };

   useEffect(() => {
      setTimeout(() => {getSensors()}, 500);
   },[temperature,humidity,co2,dust,sound,light,time]);        

   return {temperature,humidity,co2,dust,sound,light,time};
};

export default useFetch;
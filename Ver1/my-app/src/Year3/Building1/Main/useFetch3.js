import { useState, useEffect, useCallback, useSyncExternalStore } from "react";

const useFetch3 = (url) => {
   console.log(url)
   console.count("useFetch3 start!!!")
   const [data, setDataMap] = useState([]);
   const [resolutionX, setResolutionX] = useState(0);
   const [resolutionY, setResolutionY] = useState(0);   

   const getData =
   async () => {
      const response = await fetch(url,{
      'method':'GET',
      headers: {
        'Content-Type':'application/json',
         }
      });
      const new_data = await response.json();
      if(new_data)
      {
         // console.count(new_sensors);
         console.log(new_data);
         setDataMap(new_data.data);
         setResolutionX(new_data.resolutionX);
         setResolutionY(new_data.resolutionY);
      }
      else
      {
         console.count("NO DATA !!!!!");
      }
  };

   useEffect(() => {
      setTimeout(() => {getData()}, 3000);
   },[url, data, resolutionX, resolutionY]);        

   return {data, resolutionX, resolutionY};
};

export default useFetch3;
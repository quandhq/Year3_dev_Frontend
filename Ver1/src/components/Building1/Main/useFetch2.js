/* ERROR VERSION - NOT USING */
import {useState, useEffect} from "react";

const useFetch2 = (url) => {

   const [result, setResult] = useState("");
   const [level, setLevel] = useState("");

   const postLevel = 
      async () => {
         const requestOption = {
            method: 'GET',
            headers: {
               'Content-Type':'application/json',
               }
         };
         const response = await fetch(url,requestOption);
         const new_data = response.json()
         const result = new_data.result
         const level = new_data.level
         setResult(result);
         setLevel(level);
      }
      
      useEffect(() => {
         postLevel();
      },[result, level]);

      alert(`New result is ${result}`)
      return {result, level};
}

export default useFetch2;
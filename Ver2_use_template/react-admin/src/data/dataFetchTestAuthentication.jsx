/* CURRENTLY USING THIS VERSION FOR GETING DATA FOR CHARTS */


import { useState, useEffect, useCallback, useSyncExternalStore } from "react";

const useFetch = (url,callbackSetSignIn) => {
    console.log(url)
    console.count("useFetch start!!!")
    const [co2, getCo2] = useState([])
    const [hum, getHum] = useState([])
    const [temp, getTemp] = useState([])
    const [time, getTime] = useState([])

        //get the access-token and the refresh-token on the local storage
    const token = {access_token: null, refresh_token: null}
    if(localStorage.getItem("access") !== null && localStorage.getItem("refresh") !== null)
    {
            token.access_token = localStorage.getItem("access"); 
            token.refresh_token = localStorage.getItem("refresh");
    }
    else
    {
        throw new Error("There is no access token and refresh token ....");
    }

   /*
    *brief: functio to verify if the tokens stored on the local machine are valid 
    *return: boolean, true if the access-token is still valid, false otherwise
    */
   const verifyAccessToken  = async () =>
   {
        //call the API to verify access-token
        const verify_access_token_API_endpoint = "http://localhost:8000/api/token/verify"
        const verify_access_token_API_data = 
        {
            "token": token.access_token,
        }
        const verify_access_token_API_option = 
        {
            "method": "POST",
            "headers": 
            {
                "Content-Type": "application/json",
            },
            "body": JSON.stringify(verify_access_token_API_data),

        }
        const verify_access_token_API_response = await fetch(verify_access_token_API_endpoint, verify_access_token_API_option);
        if(verify_access_token_API_response.status !== 200)
        {
            return false;
        }
        return true;
    }

    /*
     *brief: this function is to verify the refresh-token and refresh the access-token if the refresh-token is still valid
     */
    const verifyRefreshToken  = async () =>
    {
        //call the API to verify access-token
        const verify_refresh_token_API_endpoint = "http://localhost:8000/api/token/refresh"
        const verify_refresh_token_API_data = 
        {
            "refresh": token.refresh_token,
        }
        const verify_refresh_token_API_option = 
        {
            "method": "POST",
            "headers": 
            {
                "Content-Type": "application/json",
            },
            "body": JSON.stringify(verify_refresh_token_API_data),

        }
        const verify_refresh_token_API_response = await fetch(verify_refresh_token_API_endpoint, verify_refresh_token_API_option);
        const verify_refresh_token_API_response_data = await verify_refresh_token_API_response.json();
        if(verify_refresh_token_API_response.status !== 200)
        {
            return false;
        }
        else if(verify_refresh_token_API_response.status === 200 &&  verify_refresh_token_API_response_data.hasOwnProperty("access"))
        {
            localStorage.setItem("access", verify_refresh_token_API_response_data["access"]);
            localStorage.setItem("refresh", verify_refresh_token_API_response_data["refresh"]);
            return true
        }
        else
        {
            throw new Error("Can not get new access token ....");
        }
    }
    
    const getSensorsData = async (url, access_token) => {
        const response = await fetch(url,{
        'method':'GET',
        "headers": {
            'Content-Type':'application/json',
            "Authorization": `Bearer ${access_token}`
            }
        });
        const new_sensors = await response.json()
        if(new_sensors)
        {
                console.log(new_sensors);
                console.log(new_sensors.humidity);
                getTemp(new_sensors.temp);
                getHum(new_sensors.hum);
                getTime(new_sensors.time)
                getCo2(new_sensors.co2)
        }
        else
        {
            console.count("NO DATA !!!!!")
        }
        }

    const getSensors = async () => {
        //verify the access token first
        const  verifyAccessToken_response = await verifyAccessToken();
        //if the access token is still valid
        if(verifyAccessToken_response === true)
        {
            getSensorsData(url, token["access_token"]);
        }
        //if the access token is no longer valid, verify the refreshing token and refresh the access token if needed
        else
        {
            let verifyRefreshToken_response = null;
            try
            {
                verifyRefreshToken_response = await verifyRefreshToken();
            }
            catch(err)
            {
                alert(err);
            }
            if(verifyRefreshToken_response === true)
            {
                getSensorsData(url, token["access_token"]);
            }
            else
            {
                callbackSetSignIn(false);
            }

        }
    };

   useEffect(() => {
        setTimeout(() => {getSensors()}, 500);
   },[co2,temp,hum,time]);        

   return {co2,temp,hum,time};
};

export default useFetch;
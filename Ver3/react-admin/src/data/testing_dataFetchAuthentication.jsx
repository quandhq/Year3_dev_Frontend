/* CURRENTLY USING THIS VERSION FOR GETING DATA FOR CHARTS */


import { useState, useEffect, useCallback, useSyncExternalStore } from "react";
import MultipleYAxis from "../components/ApexChart/MixChartApex";

const FetchTest = (url,callbackSetSignIn, time_ms_delay, optionData) => {

    // const backend_host = "27.71.227.1"
    


    console.log(url)
    console.count("useFetch start!!!")
    console.log(time_ms_delay)
    console.log("____________________________")
    if(optionData === "day")
    {
        console.log("RUNNNIGN DAY 1")
    }
    const [isLoading, setIsLoading] = useState(false)
    const [co2, getCo2] = useState(null)
    const [hum, getHum] = useState(null)
    const [temp, getTemp] = useState(null)
    const [time, getTime] = useState(null)

        //get the access-token and the refresh-token on the local storage
        const token = {access_token: null, refresh_token: null}

        const backend_host = "localhost:8000"

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
            const verify_access_token_API_endpoint = `http://${backend_host}/api/token/verify`
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
            const verify_access_token_API_response = await fetch(verify_access_token_API_endpoint, 
                                                                verify_access_token_API_option,);
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
            const verify_refresh_token_API_endpoint = `http://${backend_host}/api/token/refresh`
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
            const verify_refresh_token_API_response = await fetch(verify_refresh_token_API_endpoint, 
                                                                    verify_refresh_token_API_option,);
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
            console.log("TESTING TESTTINGAUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU22222222222222222222222")
            const response = await fetch(url,{
            'method':'GET',
            "headers": {
                'Content-Type':'application/json',
                "Authorization": `Bearer ${access_token}`
                }
            });
            console.log("TESTING TESTTINGAUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU3333333333333333333333333333")
            console.log(response)
            const new_sensors = await response.json()
            console.log("This is data from backendddddddd")
            console.log(new_sensors)
            if(new_sensors)
            {
                console.log("inside AUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU")
                if(optionData === "day")
                {
                    console.log("inside AUUUU")
                }
                console.log(new_sensors);
                console.log(new_sensors.humidity);
                getTemp(new_sensors.temp);
                getHum(new_sensors.hum);
                getTime(new_sensors.time)
                getCo2(new_sensors.co2)
                console.log("_____________________________________________________________________________________________")
                setIsLoading(false)
                console.log("_____________________________________________________________________________________________")
            }
            else
            {
                console.count("NO DATA !!!!!")
            }
        }
        
        const getSensors = async () => {
            if(optionData === "day")
            {
                console.log("inside getTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTSensordata")
            }
            console.log("TESTING TESTTINGAUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU")
            //verify the access token first
            const  verifyAccessToken_response = await verifyAccessToken();
            //if the access token is still valid
            if(verifyAccessToken_response === true)
            {
                console.log("TESTING TESTTINGAUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU1111111111111111111111111")
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
    
    // if(optionData === "day")
    // {
    //     console.log("RUNNNIGN DAY 2");
    //     console.log("running function in dayyyyyyyyyyyyyy section")
    //     getSensors();
    // }
    
    let  timer = null;
    useEffect(() => {
        if(optionData === "now")
        {
            console.log("running function in nowwwwwwwwww section")
            timer = setTimeout(() => {console.log("inside useeffecttttttTTTTTTTTTTTTTTTTTT "); getSensors()}, time_ms_delay);
            
        }
        else
        {
            getSensors()
        }
        
    },[co2,temp,hum,time, url]);        

    return (
        <div>
            {
            isLoading ? 
                <h1>LOADING DATA ...</h1> 
                :
                <MultipleYAxis nameChart={"testing"}  id={1} time={time} temperature={temp} humidity={hum} option={optionData}/>
            }
        </div>
    );
};

export {FetchTest};
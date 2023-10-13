import { useState, useEffect } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { host } from "../App";


const SetTimer = ({room_id}) => 
{
    const [time, setTime] = useState(0)
    const url = `http://${host}/api/room/set_timer?room_id=${room_id}`;
    const set_timer_funtion = async (url, time) => 
    {
        const headers = {
            "Content-Type": "application/json",
        }
        const data = {"time":  time}
        const fetch_option = {
            "method": "POST",
            "headers": headers,
            "body": JSON.stringify(data),
        };
        let response;
        let data_response;
        try
        {
            response = await fetch(url, fetch_option);
            data_response = await response.json();
        }
        catch(err)
        {
            console.log("Error while setting actuator timer! Error Code: " + err );
        }
        if(response.status == 200)
        {
            alert("Successfully set timer!")
        }
        else
        {
            alert("Some error happened with Backend! Error: " + data_response["Response"])
        }

    }
    return (
        <Box
            display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" 
        >
            <Box>
                <MobileDateTimePicker onChange={(new_value)=>{
                                            setTime(Date.parse(new_value)/1000 + 7*60*60);
                                        }
                                    }
                />
            </Box>
            <Box m="10px"/>
            <Button
                sx={{
                    backgroundColor: "black",
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "8px 18px",
                    }}
                variant="contained"
				onClick={()=>{
                    if(time <= (new Date()).getTime()/1000 + 7*60*60 + 1*60)
                    {
                        alert("Timer is not valid! Only accept time 1 minute at least beyond current time!");
                    }
                    else
                    {
                        set_timer_funtion(url, time);
                        alert("Timer accepted!")
                    }
				}}
			>
				Submit
			</Button>
        </Box>
    );
}

export default SetTimer;
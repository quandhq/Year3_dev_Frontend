import { useState, useEffect } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { host } from "../App";


const ActuatorStatus = ({room_id}) => 
{
    const [status, setStatus] = useState(0)
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
    }
    return (
        <Box
            display="flex" flexDirection="row" alignItems="center" justifyContent="center" 
        >
            <Box
                sx={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    border: "solid 2px",
                    backgroundColor: status == 0 ? 'red' : "green",
                }}
                display="flex" flexDirection="row" alignItems="center" justifyContent="center"      
            >
                <h1>{status == 0 ? "Off" : "On"}</h1>
            </Box>
        </Box>
    );
}

export default ActuatorStatus;
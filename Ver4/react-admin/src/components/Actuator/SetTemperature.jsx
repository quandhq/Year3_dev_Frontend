import { useState, useEffect } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { host } from "../../App";
import Grid from "@mui/material";
import TextField from "@mui/material/TextField";
import Header from "../Header";

export default function SetTemperature({actuatorStatus, node_id, callbackSetSignIn, room_id}) 
{
    const [temperatureInSetTemperature, setTemperatureInSetTemperature] = useState(null);

    

    return (
        <Box
            // display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" 
            width="100%"
            height="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
        >
            <Header title="Set temperature:" fontSize="20px"/>

            <Box m="10px"/>
            <Box>
                <TextField
                    required
                    id="temperature"
                    name="temperature"
                    label="Temperature"
                    fullWidth
                    autoComplete="temperature"
                    variant="outlined"
                    // value={dataCreateNode.x_axis}
                    onInput={(e)=>{e.target.value = e.target.value.replace(/[^0-9]/g, '')}}
                    onChange={(e)=>setTemperatureInSetTemperature(e.target.value)}
                />
            </Box>

            <Box m="10px"/>
            <Box>
                {
                    actuatorStatus === 1 ?
                    <Button
                        sx={{
                            backgroundColor: "black",
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "8px 18px",
                            }}
                        variant="contained"
                        onClick={()=>{
                            if(temperatureInSetTemperature >= 40)
                            {
                                alert("Temperature must be less than 40!");
                            }
                            else
                            {
                                setTemperature(temperatureInSetTemperature);
                                alert("End timer accepted!");
                            }
                        }}
                    >
                        Submit
                    </Button>
                    :
                    <h3>Actuator is OFF</h3>
                }
            </Box>
            
        </Box>
    );
}
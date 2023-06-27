import React from "react";
import GaugeChart from "react-gauge-chart";
import { useState } from "react";
import { memo } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../Header";
import { json } from "react-router-dom";

const Control = () =>
{
    console.log("This is from Control component")
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [speed, setSpeed] = useState(0);

    const Increase = () => {
        setSpeed(speed < 100 ? (speed + 1) : 100);
    };

    const Decrease = () => {
        setSpeed(speed > 0 ? (speed - 1) : 0);
    };

    return (
        <Box m="20px" display="flex"  flexDirection="column"
            > 
            <Box>
                <GaugeChart id="gauge control" 
                            nrOfLevels={20} 
                            percent={speed/100} 
                            colors={['#5BE12C', '#F5CD19', '#EA4228']} 
                            textColor={"#888888"}
                            formatTextValue={value => value + "%"}
                            width="100%" 
                />
            </Box>

            <Box
                display="flex" 
                justifyContent="space-between" 
                alignItems="center"
                height="10">
                <Button
                    sx={{
                    backgroundColor: colors.blueAccent[700],
                    color: colors.grey[100],
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "10px 20px",
                    }}
                    onClick={Increase}
                >
                            {/* <DownloadOutlinedIcon sx={{ mr: "10px" }} /> */}
                            +
                </Button>
                <Button
                    sx={{
                    backgroundColor: colors.blueAccent[700],
                    color: colors.grey[100],
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "10px 20px",
                    }}
                    onClick={Decrease}
                >
                            {/* <DownloadOutlinedIcon sx={{ mr: "10px" }} /> */}
                            -
                </Button>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
                <Button
                    sx={{
                    backgroundColor: colors.blueAccent[700],
                    color: colors.grey[100],
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "10px 20px",
                    }}
                    onClick={
                        async(e) => {
                            const url_sending_set_point = `http://127.0.0.1:8000/api/v1.1/control/fans?farm_id=1`;
                            const speed_monitor_data = {
                                "option": "manual",
                                "speed": speed,
                            }
                            const response = await fetch(url_sending_set_point,
                                                        {
                                                            'method':'POST',
                                                            'headers': {
                                                                'Content-Type':'application/json',
                                                                },
                                                            "body": JSON.stringify(speed_monitor_data),
                                                        },);
                            const new_data = await response.json();
                            console.log(new_data)
                            alert(new_data['Result']);
                        }
                    }
                >
                    {/* <DownloadOutlinedIcon sx={{ mr: "10px" }} /> */}
                    Send
                </Button>
            {/* <button className="col" onClick={
                                            async(e) => {
                                                const url_sending_set_point = `http://127.0.0.1:8000/api/set/${speed}`;
                                                const response = await fetch(url_sending_set_point,{
                                                'method':'GET',
                                                headers: {
                                                    'Content-Type':'application/json',
                                                    }
                                                });
                                                const new_data = await response.json();
                                                alert(new_data['data']);
                                            }
                                            }> 
                    SEND 
                </button> */}
            </Box>
        </Box>
    );
}

export default React.memo(Control);

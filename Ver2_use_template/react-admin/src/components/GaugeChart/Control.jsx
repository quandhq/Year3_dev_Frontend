import React from "react";
import GaugeChart from "react-gauge-chart";
import { useState } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

const Control = React.memo(() => {
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
        <Box m="20px">
        <GaugeChart id="gauge control" 
                    nrOfLevels={20} 
                    percent={speed/100} 
                    colors={['#5BE12C', '#F5CD19', '#EA4228']} 
                    textColor={"#888888"}
                    formatTextValue={value => value + "%"} 
        />
        <Box display="flex" justifyContent="space-between" alignItems="center">
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
                onClick={Increase}
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
)

export default Control;

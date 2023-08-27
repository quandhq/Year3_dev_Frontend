import { Box, Typography, useTheme, Button } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";
import Header from "./Header";
import {host} from "../App"
import { useEffect, useState } from "react";

const AirQualityIndex = ({ aqi }) => {
    let bgColour="";
    let level="";

    if (aqi > 0  && aqi <=50){
        bgColour = "#008000";   
        level = "Good";
    } else if (aqi > 50  && aqi <= 100) {
        bgColour = "#FFFF00";
        level = "Moderate";
    } else if (aqi > 100  && aqi <= 150) {
        bgColour = "#FF8C00";
        level = "Unhealthy for Sensitive Groups";
    } else if (aqi > 150  && aqi <= 200) {
        bgColour = "#FF0000";
        level = "Unhealthy";
    } else if (aqi > 200  && aqi <= 300) {
        bgColour = "#6A5ACD";
        level = "Very Unhealthy";
    } else if (aqi > 300 ) {
        bgColour = "#A0522D";
        level = "Hazardous";
    } 

    return (
        <Box
            container="true"
            display="flex"
            flexDirection="column"
            alignItems="center"
            jutifyContent="center"
        >
            <Button onClick={() => {
                window.open( "https://www.airnow.gov/aqi/aqi-basics/", "_blank")
            }} style={{
                width: 150,
                height: 150,
                borderRadius: "100%",
                fontSize: 50,
                background: bgColour,
                }}> 
                    <div style={{ textAlign: 'center' }}>
                        <Header title={aqi} fontSize="30px"/>
                        <Header title={level} fontSize="20px"/>
                    </div>
            </Button>
            
        </Box>

    );
};

export default AirQualityIndex;
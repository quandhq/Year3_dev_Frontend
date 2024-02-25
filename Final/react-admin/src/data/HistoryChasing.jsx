import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import Header from "../components/Header";
import HistoryToggleOffOutlinedIcon from '@mui/icons-material/HistoryToggleOffOutlined';
import { useState, useContext } from "react";
import { UserContext } from "../App";
import { DatePicker } from "@mui/x-date-pickers";
import { host } from "../App";


export function HistoryChasing(
    {
        setOptionChartData,
        setOptionData,
        setUnixTimestampStart,
        setUnixTimestampEnd,
        setUrlOption,
    }
)
{

    const checkUndefined = (object) => 
    {
        if(object === null)
        {
            return false;
        }
        let buffer = [];
        for(let i of Object.keys(object))
        {   
            buffer.push(object.i);
        }
        if(buffer.every((j) => {return (j === undefined)})){
            return false;
        }  
        else{
            return true;
        }
    }
    
    const checkTimeOption = (time_start, time_end, option) => 
    {
        console.log(time_start);
        console.log(time_end);
        if(option === 'day')
        {
            if(time_start === time_end || Math.round((time_end - time_start)/(3600*24)) <= 7 && Math.round((time_end - time_start)/(3600*24)) >= 0)
            {
                return true;
            }
            return false;
        }
        else if(option === 'month')
        {
            if(Math.round((time_end - time_start)/(3600*24)) <= 30 && Math.round((time_end - time_start)/(3600*24)) >= 0)
            {
                return true;
            }
            return false;
        }
        else if(option === 'year')
        {
            if(Math.round((time_end - time_start)/(3600*24*31)) <= 12 && Math.round((time_end - time_start)/(3600*24*31)) >= 0)
            {
                return true;
            }
            return false;
        }
        else
        {
            return false;
        }
    }

    const [optionChartDataInside, setOptionChartDataInside] = useState("now")
    const [optionDataInside, setOptionDataInside] = useState("now");        //change option to show different Chart
    const [unixTimestampStartInside, setUnixTimestampStartInside] = useState(0);
    const [unixTimestampEndInside, setUnixTimestampEndInside] = useState(0);
    const backend_host=host;
    // const apiHistoryChart = `http://${backend_host}/api/v1.1/monitor/data/history?farm_id=1&time_start=${unixTimestampStart}&time_end=${unixTimestampEnd}&option=${optionChartData}`;
    // const [apiHistoryChartState, setApiHistoryChartState] = useState(apiHistoryChart)
    // console.log("RRRRRRRRRreload component")
    // const dataHistoryChart = Fetch(apiHistoryChartState, callbackSetSignIn, 0, optionChartData); >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    const dataHistoryChart = null 



                

    return (
        <Box
                    container={true}
                    display="flex"
                    direction="row"
                    justifyContent="center"
                >
                    <Box 
                        display="flex" 
                        justifyContent="center" 
                        alignItems="center"
                    >
                        
                        <Box>
                            <Header title="Start Time" fontSize="15px"/>
                            <DatePicker onChange={(new_value)=>{
                                                        setUnixTimestampStartInside(Date.parse(new_value)/1000);
                                                    }
                                                }
                            />
                        </Box>
                        <Box m={1} mt="5vh">
                        </Box>
                        <Box>
                            <Header title="End Time" fontSize="15px"/>
                            <DatePicker onChange={(new_value)=>{
                                                        setUnixTimestampEndInside(Date.parse(new_value)/1000)
                                                    }
                                                }
                            />
                        </Box>
                    </Box>

                    <Box m={4}/>
                    <Box 
                        display="flex" 
                        justifyContent="center" 
                        alignItems="center"
                        mt="22px"
                        >
                            <Button
                                // sx={{
                                //     backgroundColor: colors.blueAccent[400],
                                //     color: colors.grey[100],
                                //     fontSize: "15px",
                                //     fontWeight: "bold",
                                //     padding: "8px 18px",
                                //     }}
                                sx={{
                                    backgroundColor: "black",
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    padding: "8px 18px",
                                    }}
                                variant="contained"
                                onClick={()=>{
                                    if(checkTimeOption(unixTimestampStartInside, unixTimestampEndInside, 'year'))
                                    {
                                        setOptionData("year");
                                        setOptionChartData("year");
                                        console.log("Set option to Year");
                                        setUnixTimestampStart(unixTimestampStartInside);
                                        setUnixTimestampEnd(unixTimestampEndInside);
                                        setUrlOption(1)
                                    }
                                    else
                                    {
                                        alert("Invalid optionnnnn!!!!!!")    
                                    }
                                }}
                            >
                                <HistoryToggleOffOutlinedIcon sx={{ mr: "10px" }} />
                                Year
                            </Button>                                    
                            <Box m={0.5} />
                            <Button
                                // sx={{
                                //     backgroundColor: colors.blueAccent[400],
                                //     color: colors.grey[100],
                                //     fontSize: "15px",
                                //     fontWeight: "bold",
                                //     padding: "8px 18px",
                                //     }}
                                sx={{
                                    backgroundColor: "black",
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    padding: "8px 18px",
                                    }}
                                variant="contained"
                                onClick={()=>{
                                    if(checkTimeOption(unixTimestampStartInside, unixTimestampEndInside, 'month'))
                                    {
                                        setOptionData("month");
                                        setOptionChartData("month");
                                        console.log("Set option to Month");
                                        setUnixTimestampStart(unixTimestampStartInside);
                                        setUnixTimestampEnd(unixTimestampEndInside);
                                        setUrlOption(1)
                                    }
                                    else
                                    {
                                        alert("Invalid optionnnnn!!!!!!")    
                                    }
                                }}
                            >
                                <HistoryToggleOffOutlinedIcon sx={{ mr: "10px" }} />
                                Month
                            </Button>
                            <Box m={0.5} />
                            <Button
                                // sx={{
                                //     backgroundColor: colors.blueAccent[400],
                                //     color: colors.grey[100],
                                //     fontSize: "15px",
                                //     fontWeight: "bold",
                                //     padding: "8px 18px" ,
                                //     }}
                                sx={{
                                    backgroundColor: "black",
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    padding: "8px 18px",
                                    }}
                                variant="contained"
                                onClick={async() => {
                                    if(checkTimeOption(unixTimestampStartInside, unixTimestampEndInside, 'day'))
                                    {
                                        setOptionData("day");
                                        setOptionChartData("day");
                                        console.log("Set option to Day");
                                        setUnixTimestampStart(unixTimestampStartInside);
                                        setUnixTimestampEnd(unixTimestampEndInside);
                                        setUrlOption(1)
                                    }
                                    else
                                    {
                                        alert("Invalid optionnnnn!!!!!!");    
                                    }
                                }}
                                    
                                    
                            >
                                <HistoryToggleOffOutlinedIcon sx={{ mr: "10px" }} />
                                Day
                            </Button>
                            <Box m={0.5} />
                            <Button
                                // sx={{
                                //     backgroundColor: colors.blueAccent[400],
                                //     color: colors.grey[100],
                                //     fontSize: "15px",
                                //     fontWeight: "bold",
                                //     padding: "8px 18px",
                                //     }}
                                sx={{
                                    backgroundColor: "black",
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    padding: "8px 18px",
                                    }}
                                variant="contained"
                                onClick={(e) =>
                                    {
                                        setUrlOption(2);
                                    }
                                }
                                    
                                    
                            >
                                <HistoryToggleOffOutlinedIcon sx={{ mr: "10px" }} />
                                Now
                            </Button>

                    
                    </Box>
                </Box>
    );

}
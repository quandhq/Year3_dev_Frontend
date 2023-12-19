import SetTimer from "./SetTimer";
import Control from "./GaugeChart/Control";
import ActuatorStatus from "./ActuatorStatus";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import HistoryToggleOffOutlinedIcon from '@mui/icons-material/HistoryToggleOffOutlined';
import { LineChartApex } from "../../components/ApexChart/LineChartApex";
import { BarChartApex } from "../../components/ApexChart/BarChartApex";
import { useState, useContext } from "react";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { host } from "../../App";
import SetTemperature from "./SetTemperature";

export default function Actuator({room_id, actuatorInfoOfRoom, callbackSetSignIn})
{


    /*
     *
    actuatorInfoOfRoom has this form
    {"sensor":[{"id":1,"node_id":1,"x_axis":2,"y_axis":17,"function":"sensor","mac":"BNM:OURT:AR","status":"sync","time":1,"room_id":1},
            {"id":2,"node_id":2,"x_axis":13,"y_axis":6,"function":"sensor","mac":"BNM:OURT:TYY","status":"sync","time":1,"room_id":1}
        ],
        "actuator":[]} 

        => just the value of key "actuator"
     */
    const [actuatorCommand, setActuatorCommand] = useState(null);
    const [actuatorStatus, setActuatorStatus] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [temperature, setTemperature] = useState(null);
    


    return (
        <>
        {
            actuatorInfoOfRoom.length !== 0 ?
            <>
                {
                    actuatorInfoOfRoom.map(e=>{
                        return(
                            <Grid
                            container
                            alignItems="stretch"
                            style={{
                                    display: "flex", 
                                    height: "100%", 
                                    // backgroundColor: "red"
                                    marginTop: '20px',
                                }}
                            justify="space-between" 
                        >
                            
                            <Grid
                                p="10px"
                                xs={12}
                                sm={12}
                                md={12}
                                lg={4}
                                container="true"
                                display="flex"
                                direction="column"
                            >
                                <Box 
                                    sx={{boxShadow: 1,
                                        borderRadius: '5px', 
                                        backgroundColor: "white"}}
                                    width="100%"
                                    height="100%"
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <h1>Actuator node id: {e["node_id"]}</h1>
                                </Box>
                            </Grid>

                            <Grid
                                p="10px"
                                xs={12}
                                sm={12}
                                md={12}
                                lg={4}
                                container="true"
                                display="flex"
                                direction="column"
                            >
                                <Box 
                                    sx={{boxShadow: 1,
                                        borderRadius: '5px', 
                                        backgroundColor: "white"}}
                                    width="100%"
                                    height="100%"
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Box mt="10px" mb="15px">
                                        <SetTimer actuatorStatus={actuatorStatus}
                                                room_id={room_id}
                                                callbackSetSignIn={callbackSetSignIn}
                                                node_id={e["node_id"]}
                                                />
                                    </Box>
                                </Box>
                                
                            </Grid>
                            <Grid
                                    p="10px"
                                    item={true}
                                    xs={12}
                                    sm={12}
                                    lg={4}
                                    display="flex"
                                    direction="column"
                                    alignItems="center"
                                    justify="center"
                                    
                                >
                                    <Box 
                                        sx={{boxShadow: 1,
                                            borderRadius: '5px', 
                                            backgroundColor: "white"}}
                                        width="100%"
                                        height="100%"
                                        display="flex"
                                        flexDirection="column"
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <Box mt="10px" mb="10px">
                                            {/* <Header title="Set temperature:" fontSize="20px"/> */}
                                            {/* <Control room_id={room_id} callbackSetSignIn={callbackSetSignIn} actuatorStatus={actuatorStatus}/> */}
                                            <SetTemperature actuatorStatus={actuatorStatus} node_id={e["node_id"]} callbackSetSignIn={callbackSetSignIn} room_id={room_id}/>
                                        </Box>
                                    </Box>
                            </Grid>
                            <Grid
                                p="10px"
                                xs={12}
                                sm={12}
                                md={12}
                                lg={4}
                                container="true"
                                display="flex"
                                direction="column"
                            >
                                <Box
                                    sx={{boxShadow: 1,
                                        borderRadius: '5px', 
                                        backgroundColor: "white"}}
                                    width="100%"
                                    height="100%"
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Box mt="10px" mb="15px"
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="center"
                                    justify="center">

                                        <Header title="Actuator Status:" fontSize="20px"/>
                                        <Box m="10px" />
                                        <ActuatorStatus room_id={room_id} setActuatorStatus={setActuatorStatus} callbackSetSignIn={callbackSetSignIn}
                                            node_id={e["node_id"]}
                                        />
                                    </Box>
                                </Box>

                            </Grid>
                        </Grid>
                        )
                    })
                }
            </>
            
            :
            <Grid
                container
                alignItems="stretch"
                style={{
                        display: "flex", 
                        height: "100%", 
                        // backgroundColor: "red"
                        marginTop: '20px',
                    }}
                justify="space-between" 
            >
                <Grid
                    p="10px"
                    xs={12}
                    sm={12}
                    md={12}
                    lg={4}
                    container="true"
                    display="flex"
                    direction="column"
                >
                    <Box 
                        sx={{boxShadow: 1,
                            borderRadius: '5px', 
                            backgroundColor: "white"}}
                        width="100%"
                        height="100%"
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <h1>No actuator is available!</h1>
                    </Box>
                </Grid>
            </Grid>
        }
        </>
    )
}
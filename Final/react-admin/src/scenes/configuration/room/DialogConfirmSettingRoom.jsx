import * as React from 'react';
import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { host } from '../../../App';
import DialogConfirmSettingRoomNewRoomConfirm from './DialogConfirmSettingRoomNewRoomConfirm';
import DialogConfirmSettingRoomNewRoom from './DialogConfirmSettingRoomNewRoom';
import PermDataSettingIcon from '@mui/icons-material/PermDataSetting';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';



const steps = ['Setting Room', 'Confirm'];

function getStepContent(step, setDataSettingRoom, dataSettingRoom) {
  switch (step) {
    case 0:
        return <DialogConfirmSettingRoomNewRoom setDataSettingRoom={setDataSettingRoom} dataSettingRoom={dataSettingRoom}/>
    case 1:
      return <DialogConfirmSettingRoomNewRoomConfirm dataSettingRoom={dataSettingRoom}/>;
    default:
      throw new Error('Unknown step');
  }
}




export default function DialogConfirmSettingRoom({callbackSetSignIn,
                            RoomConfigLoading,
                            row, 
                            configurationRoomAll}) 
{
    let remain_room_id_configurationRoomAll = [];
    if(configurationRoomAll !== undefined && configurationRoomAll.length > 0)
    {
        for(let i=0; i<configurationRoomAll.length; ++i)
        {
            if(configurationRoomAll[i].room_id !== row.room_id)
            {
                remain_room_id_configurationRoomAll.push(configurationRoomAll[i].room_id);
            }
        }   
    }
    console.log(remain_room_id_configurationRoomAll)

    const [dataSettingRoom, setDataSettingRoom] = useState({...row})


    const api = `http://${host}/api/configuration/room/command`;
    const settingRoom = async (url, access_token, data, RoomConfigLoading) => 
    {
        const headers = 
        {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access_token}`,
        }
        const option_fetch = 
        {
            "method": "PUT",
            "headers": headers,
            "body": JSON.stringify(data),
        }
        const response = await fetch(url, option_fetch);
        if(response.status == 200)
        {
            const data_response = await response.json();
            alert(data_response.Response)
            RoomConfigLoading[1](!RoomConfigLoading[0]);
        }
        else
        {
            const data_response = await response.json();
            alert(data_response.Response)
            RoomConfigLoading[1](!RoomConfigLoading[0]);
        }
    }

    const verify_and_get_data = async (fetch_data_function, callbackSetSignIn, backend_host, url, data, RoomConfigLoading) => 
    {

        const token = {access_token: null, refresh_token: null}
        // const backend_host = host;
        if(localStorage.getItem("access") !== null && localStorage.getItem("refresh") !== null)
        {
            token.access_token = localStorage.getItem("access"); 
            token.refresh_token = localStorage.getItem("refresh");
        }
        else
        {
            throw new Error("There is no access token and refresh token ....");
        }

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

        const  verifyAccessToken_response = await verifyAccessToken();

        if(verifyAccessToken_response === true)
        {
            // const response = await fetch(url)
            // const data = await response.json()
            fetch_data_function(url, token["access_token"], data, RoomConfigLoading)
        }
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
                fetch_data_function(url, token["access_token"], data, RoomConfigLoading);
            }
            else
            {
                callbackSetSignIn(false);
            }
        }

    }
    const [activeStep, setActiveStep] = React.useState(0);
    const name_lookup = {
        room_id: "Room id",
        construction_name: "Construction name",
        x_length: "Width",
        y_length: "Length",
        information: "Information",
    }
    const handleNext = () => {
        let flag = 1;
        if(activeStep === 0 )
        {
            for(const prop in dataSettingRoom)
            {
                if(dataSettingRoom[prop] === null)
                {   
                    alert(`You have to fill in ${name_lookup[prop]}!`);
                    flag = 0;
                    break;
                }
                if(prop === "room_id")
                {
                    for(let i=0; i<remain_room_id_configurationRoomAll.length; ++i)
                    {
                        if(remain_room_id_configurationRoomAll[i].toString() === dataSettingRoom[prop].toString())
                        {
                            alert("Room id've already existed!");
                            flag = 0;
                            break;
                        }
                    }
                }
                if(prop === "x_length" || prop === "y_length")
                {
                    if(parseInt(dataSettingRoom[prop]) < 0 || parseInt(dataSettingRoom[prop]) > 1000)
                    {
                        alert("Size must be lower than 1000 and greater than 0");
                        flag = 0;
                        break;
                    }
                }
            }
            if(flag === 1)
            {
                setActiveStep(activeStep + 1);
            }
        }
        else if(activeStep === steps.length - 1)
        {
            verify_and_get_data(settingRoom, callbackSetSignIn, host, api, dataSettingRoom, RoomConfigLoading);
            setActiveStep(0);
            handleClose();
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };


    const [open, setOpen] = React.useState(false);

    const handleOpen = () =>
    {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        verify_and_get_data(settingRoom, callbackSetSignIn, host, api, dataSettingRoom, RoomConfigLoading);
        setOpen(false);
    }



    return (
        <div>
            <Button
                    startIcon={<PermDataSettingIcon />}
                    sx={{
                        backgroundColor: "#ed6c02",
                        fontSize: "10px",
                        fontWeight: "bold",
                        padding: "5px 12px",
                        }}
                    variant="contained"

                    onClick={handleOpen}
            >
                Setting
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent="space-between"
                    >
                        <h2>Setting room record!</h2>
                        <Button onClick={handleClose}><CloseIcon/></Button>
                    </Box>
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>

                    {getStepContent(activeStep, setDataSettingRoom, dataSettingRoom)}

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        {activeStep !== 0 && (
                        <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                            Back
                        </Button>
                        )}

                        <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 3, ml: 1 }}
                        >
                        {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                        </Button>
                    </Box>
                    </React.Fragment>
                </DialogContentText>
                </DialogContent>
                
            </Dialog>
        </div>
    );
}
import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PermDataSettingIcon from '@mui/icons-material/PermDataSetting';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { host } from '../../App';


export default function DialogConfirmSetting({callbackSetSignIn, RoomConfigLoading, row}) 
{

    const [dataRoomSetting, setDataRoomSetting] = useState({...row});
    const api = `http://${host}/api/configuration/room/command`;

    const settingRoom = async (url, access_token, dataRoomSetting, RoomConfigLoading) => 
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
            "body": JSON.stringify(dataRoomSetting),
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
            RoomConfigLoading[1](RoomConfigLoading[0]);
        }
    }

    const verify_and_get_data = async (fetch_data_function, callbackSetSignIn, backend_host, url, dataRoomSetting, RoomConfigLoading) => 
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
            fetch_data_function(url, token["access_token"], dataRoomSetting, RoomConfigLoading)
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
                fetch_data_function(url, token["access_token"], dataRoomSetting, RoomConfigLoading);
            }
            else
            {
                callbackSetSignIn(false);
            }
        }

    }

    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        console.log(dataRoomSetting)
        verify_and_get_data(settingRoom, callbackSetSignIn, host, api, dataRoomSetting, RoomConfigLoading)
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

                onClick={()=>{
                    setOpen(true);
                }}
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
                <h2>Setting room record!</h2>
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                <React.Fragment>
                    <Typography variant="h4" gutterBottom>
                        Detail
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}>
                            <FormControl>
                                <FormLabel id="demo-controlled-radio-buttons-group">Construction type</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    row
                                    value={dataRoomSetting.construction_name}
                                    onChange={(e)=>setDataRoomSetting({...dataRoomSetting, construction_name: e.target.value})}
                                >
                                    <FormControlLabel value="building" control={<Radio />} label="Building" />
                                    <FormControlLabel value="farm" control={<Radio />} label="Farm" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            required
                            id="x_length"
                            name="x_length"
                            label="Width"
                            fullWidth
                            autoComplete="x_length"
                            variant="standard"
                            value={dataRoomSetting.x_length}
                            onInput={(e)=>{e.target.value = e.target.value.replace(/[^0-9]/g, '')}}
                            onChange={(e)=>setDataRoomSetting({...dataRoomSetting, x_length: e.target.value})}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            required
                            id="y_length"
                            name="y_length"
                            label="Length"
                            fullWidth
                            autoComplete="y_length"
                            variant="standard"
                            value={dataRoomSetting.y_length}
                            onInput={(e)=>{e.target.value = e.target.value.replace(/[^0-9]/g, '')}}
                            onChange={(e)=>setDataRoomSetting({...dataRoomSetting, y_length: e.target.value})}
                        />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                        <TextField
                            required
                            id="information"
                            name="information"
                            label="Information"
                            fullWidth
                            autoComplete="information"
                            variant="standard"
                            value={dataRoomSetting.information}
                            onChange={(e)=>setDataRoomSetting({...dataRoomSetting, information: e.target.value})}
                        />
                        </Grid>
                    </Grid>
                </React.Fragment>
            </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleConfirm} autoFocus>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}

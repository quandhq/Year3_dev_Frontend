import { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from '../theme';

export default function FilterNode({setNodeIdFilter, apiInformatiionTag, callbackSetSignIn, backend_host}) {
	const theme = useTheme();
    const colors = tokens(theme.palette.mode);
	const [isLoading, setIsLoading] = useState(true);
	const [sensorNodeIdState, setSensorNodeIdState] = useState(0)
	const handleChange = (event) => {
		setSensorNodeIdState(event.target.value);
		console.log(event.target.value);
		// setNodeIdFilter(event.target.value);
		//#< DONING IN THISS>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>4
	};
	const [sensorNodeInfo, setSensorNodeInfo] = useState([])

	const get_sensor_node_info = async (url, access_token) => 
	{ 
		const headers = 
		{
			"Content-Type": "application/json",
			// "Authorization": `Bearer ${access_token}`, 	//!< do not need to get authorization yet. in back end all APIS are public
		}

		const option_request = 
		{
			"method" : "GET",
			"headers" : headers,
			"body": null,
		}

		let sensor_room_response = null;
		let sensor_room_response_data = null;

		try
		{
			sensor_room_response = await fetch(url, option_request);
			sensor_room_response_data = await sensor_room_response.json();
		}
		catch(err)
		{
			alert("Error happened while getting data! Error: " + err + "!");
		}
		
		if(sensor_room_response.status === 200)
		{
			let temp_list = sensor_room_response_data["node_info"]["sensor"];
			let new_sensorNodeInfo = []
			temp_list.forEach((i)=>{
				new_sensorNodeInfo.push(i["node_id"])
			})
			new_sensorNodeInfo.sort();	//!< sort the list of all sensor node_id in this room in ascending order
			new_sensorNodeInfo.unshift(0);	//!< all one more "null" value in the front of the list
			setSensorNodeInfo(new_sensorNodeInfo);
			setIsLoading(false);
		}
		else
		{
			alert("Sensor nodes information fetching failed! Status code: " + sensor_room_response.status)
		}
	}

	const verify_and_get_data = async (fetch_data_function, callbackSetSignIn, backend_host, url) => 
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
			fetch_data_function(url, token["access_token"])
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
				fetch_data_function(url, token["access_token"]);
			}
			else
			{
				callbackSetSignIn(false);
			}
		}

	}


  useEffect(()=>{
		verify_and_get_data(get_sensor_node_info, callbackSetSignIn, backend_host, apiInformatiionTag);
  },[])

  return (
	<>
	{
		isLoading ? 
		<Box>
			<h1>Loading ...</h1>
		</Box>
		:
		<Box
			container="true"
			display="flex"
			flexDirection="row"
			alignItems="center"
		>
			<Box sx={{ minWidth: 100 }}
				
				>
				<FormControl
					fullWidth
				>
					<InputLabel id="demo-simple-select-label">Sensor id</InputLabel>
					<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={sensorNodeIdState}
					label="Sensor Node"
					onChange={handleChange}
					>
						{
							sensorNodeInfo.map((i)=>{
								if(i === 0)
								{
									return (
										<MenuItem value={0}>None</MenuItem>
									);
								}
								else
								{
									return (
										<MenuItem value={i}>{i}</MenuItem>
									);		
								}
							})
						}
					</Select>
				</FormControl>
			</Box>

			<Box m={1} />
			
			<Button
				// sx={{
				// 	backgroundColor: colors.blueAccent[400],
				// 	color: colors.grey[100],
				// 	fontSize: "15px",
				// 	fontWeight: "bold",
				// 	padding: "8px 18px",
				// 	}}
                sx={{
                    backgroundColor: "black",
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "8px 18px",
                    }}
                variant="contained"

				onClick={()=>{
					setNodeIdFilter(sensorNodeIdState);
					// setApi(`http://${backend_host}/api/get/daily_data/${id}`)
				}}
			>
				Submit
			</Button>
		
		</Box>
	}
	</>
  );
}
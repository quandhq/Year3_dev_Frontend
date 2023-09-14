import Header from "./Header";
import { Box } from "@mui/material";
import plan from "../assets/plan.svg";
import {Button, useMediaQuery} from "@mui/material";
import { host } from "../App";
import { useState, useEffect, useRef } from "react";

/**
 * @brief This component RoomMap will render out the image room with all node 
 *          sticks to it in real position according to the x and y axises provided
 *          in database backend.
 * @returns 
 */
const RoomMap = () => 
{
    const [imageWidth, setImageWidth] = useState(0);
    const boxRef = useRef(null);
    const [nodePosition, setNodePosition] = useState([]);


    const backend_host = host;

    const fetch_data_function = async (api, access_token) =>
    {
        const headers = 
        {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access_token}`,
        }
        const option_fetch = 
        {
            "method": "GET",
            "headers": headers,
            "body": null,
        }

        let response;
        let data_response;
        try
        {
            response = await fetch(api, option_fetch);
        }
        catch(err)
        {
            alert("Error happend while getting data. Error: " + err);
        }
        if(response && response.status === 200)
        {   
            data_response = await response.json();
            console.log(data_response);
        }

    }


    const verify_and_get_data = async (fetch_data_function, callbackSetSignIn, backend_host, api_to_fetch) => 
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
            fetch_data_function(api_to_fetch, token["access_token"])
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
                fetch_data_function(api_to_fetch, token["access_token"]);
            }
            else
            {
                callbackSetSignIn(false);
            }
        }

    }

    useEffect(() => {
        let boxWidth;
        let currentImageWidth;

        const handleResize = () => {
          const windowWidth = window.innerWidth;
          let width;
    
          if (windowWidth >= 1280) {
            width = 450; // Adjust the width for large screens
          } else if (windowWidth >= 960) {
            width = 400; // Adjust the width for medium screens
          } else {
            width = 300; // Adjust the width for small screens
          }
    
          setImageWidth(width);
          currentImageWidth = width;
        };
    
        handleResize(); // Initial resize check
    
        window.addEventListener("resize", handleResize);

        if(boxRef.current)
        {
            boxWidth = boxRef.current.offsetWidth;
        }
        // alert(boxWidth);
        // alert(currentImageWidth);
        
    
        // Clean up the event listener on component unmount
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);

    
    return (
        <Box
            style={{ 
                width: "100%", height: "100%", 
                position: "relative"}}
            // id="box_of_room_image"
            ref={boxRef}
            display="flex" 
            justifyContent="center" 
        >
            <img
                alt="profile-room"
                src={plan}
                style={{ 
                    width: `${imageWidth}px`,
                    cursor: "pointer", borderRadius: "0%" 
                }}
                // id="room_image"
            />
            <Button
                style={{ position: "absolute", 
                        top: "50%", left: "50%", 
                        transform: "translate(-50%, -50%)", borderRadius: "50%", 
                        width: "100px", height: "100px", backgroundColor: "blue", 
                        zIndex: 1, //!< this makes sure the button stays above the image 
                    }}
            >
                BTUN
            </Button>
        </Box>
    );
}


export default RoomMap;
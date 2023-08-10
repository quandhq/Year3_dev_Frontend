import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../Header";
import {IconButton} from "@mui/material";
import { useState } from "react";
import { Button, Icon, TextField, Paper} from "@mui/material";

const ControlPanel = () => {
  const [tempSetPoint, setTempSetPoint] = useState(0)
  const [co2SetPoint, setCo2SetPoint] = useState(0)

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dataRow = [
    {
		  id: 1,
		  aim_column: "Temperature",
	  },
    {
      id: 2,
      aim_column: "Co2 Level",
    },
  ]


  const columns = [
    { 
      field: "aim_column", 
      headerName: "Aim",
      flex: 1,
    },
    {
      field: "set_point",
      headerName: "Set Point",
      flex: 1,
      // cellClass: "name-column--cell",
      renderCell: (row_information) => {
        return (
          <Box
            // width="80%"
            // height="30%"
            // mb="50px"
            // p="10px"
            display="center"
            justifyContent="center"
            backgroundColor=""
            borderRadius="10px"
          >
            <TextField
              // label="Set Point label"
              sx={{
                width: { md: 60 },
                "& .MuiInputBase-root": {
                    height: 40
                }
              }}
              name="Set Point name"
              defaultValue={0}
              onChange={(event)=>{
                if(row_information.row.id===1)
                {
                  setTempSetPoint(event.target.value)
                }
                else if(row_information.row.id===2)
                {
                  setCo2SetPoint(event.target.value)
                }
              }}	
              // helperText="Enter"
            />
          </Box>
        );
      },
    },
    {
      field: "processValue",
      headerName: "Process Value",
      flex: 1,
      // cellClassName: "name-column--cell",
      renderCell: () => {
        return(
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor=""
            borderRadius="4px"
          >
            -:-
          </Box>
        )
      }
      // renderCell: () => {
      //   return (
      //     <Box
      //       width="60%"
      //       m="0 auto"
      //       p="5px"
      //       display="flex"
      //       justifyContent="center"
      //       backgroundColor={colors.greenAccent[600]}
      //       borderRadius="4px"
      //     >
      //       <Button
      //         onClick={()=>{alert(tempSetPoint)}}
      //       >
      //         <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
      //           Send
      //         </Typography>
      //       </Button>
      //     </Box>
      //   );
      // },
    },
    {
      field: "submit",
      headerName: "Send",
      flex: 1,
      renderCell: (row_information) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="2px"
            display="flex"
            justifyContent="center"
            backgroundColor={colors.greenAccent[600]}
            borderRadius="4px"
          >
            <Button onClick={()=>{
                    if(row_information.row.id === 1)
                    {
                      alert(`This is temperature: ${tempSetPoint}`)
                    }
                    else
                    {
                      alert(`This is Co2: ${co2SetPoint}`)
                    }
                  }}
            > 
              <Typography color={colors.grey[100]} sx={{ ml: "0px" }} variant="h6">
                Send
              </Typography>
            </Button>
          </Box>
        );
      },
    },
  ];

  const CustomHeaderCell = (params) => {
    return (
      <div></div>
    );
  };

  return (
    <Box m="0px">
      <Box marginLeft="10px">
        <Header title="Control Panel" variant="h5"/>
      </Box>

      <Box
        m="-5px 30px 30px 20px"
        height="25vh"       //set height of all component
        sx={{
          width: { md: 500 },
                "& .MuiInputBase-root": {
                    height: 35
                },

          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
          },
        }}
      >
        <DataGrid 
            hideFooter="true"
            rows={dataRow} 
            columns={columns} 
            disableColumnMenu="true"
            components={{headerCell: CustomHeaderCell}}
        />
      </Box>
    </Box>
  );
};

export default ControlPanel;

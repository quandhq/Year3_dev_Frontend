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
		  aim_column: "Tempeature"
	  },
    {
      id: 2,
      aim_column: "Co2",
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
      renderCell: (row_information) => {
        return (
          <Box
            container="true"
            display="flex"
            flexDirection="row"
            alignItems="center"
            justify="center"
            backgroundColor=""
            borderRadius="10px"
          >
            <TextField
              sx={{
                width: { md: 105 },
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
            />
          </Box>
        );
      },
    },
    {
      field: "processValue",
      headerName: "Process Value",
      flex: 1,
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
      
    },
    {
      field: "submit",
      headerName: "Submit",
      flex: 1,
      renderCell: (row_information) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="2px"
            display="flex"
            justifyContent="center"
            borderRadius="4px"
          >
            <Button 
                variant="outlined"
                onClick={()=>{
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
              <Header title="Submit" fontSize="12px"/>
            </Button>
          </Box>
        );
      },
    },
  ];

  



  return (
      <Box
        
        height="200px"       //set height of all component
        sx={{
          width: { xs:410, sm: 410, md: 510, lg: 510 },
                "& .MuiInputBase-root": {
                    height: 35
                },

          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
            fontSize: "15px",
            justifyContent: "center",
          },
          "& .name-column--cell": {
            color: "red",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#050505",
            borderBottom: "none",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            textAlign: 'center',
            borderRadius: '4px',
            fontSize: "15px",
          },
          "& .MuiDataGrid-columnHeaderTitleContainer": {
            backgroundColor: "#050505",
            borderBottom: "none",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            textAlign: 'center',
            borderRadius: '4px',
            color: "white",
          },
          "& .MuiDataGrid-virtualScroller": {
          },
          
        }}
      >
        <DataGrid 
            hideFooter={true}
            rows={dataRow} 
            columns={columns} 
            disableColumnMenu={true}
      />
      </Box>
  );
};

export default ControlPanel;

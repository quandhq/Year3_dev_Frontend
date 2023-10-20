import * as React from 'react';
import { useState } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Header from '../../components/Header';
import { Container, Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import RoomConfig from './RoomConfig';
import NodeConfig from './room/NodeConfig';



export default function Configuration() {
    const [config, setConfig] = useState(0);
    const [roomIdForNodeConfig, setRoomIdForNodeConfig] = useState(0);
    const dict = {0: <RoomConfig setConfig={setConfig} setRoomIdForNodeConfig={setRoomIdForNodeConfig}/>, 
                1: <NodeConfig roomIdForNodeConfig={roomIdForNodeConfig} setConfig={setConfig}/>};
    return (
        <Container maxWidth="lg"
            sx={{
                marginTop: '20px',
                // boxShadow: 1,
                // borderRadius: '5px', 
                // backgroundColor: "white"
            }}
        >
            <Box m="20px" />
            {
                dict[config]
            }
        </Container>
    );
}
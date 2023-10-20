import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

export default function Confirm({dataCreateRoom}) {
  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom>
        Confirm
      </Typography>
      <Grid item xs={12} md={6}>
      {/* <CardActionArea component="a" href="#"> */}
        {/* <Card sx={{ display: 'flex' }}> */}
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h3" variant="h5">
                {`Room id: ${dataCreateRoom.room_id}`}
            </Typography>
            <Typography component="h3" variant="h5">
                {`Construction type: ${dataCreateRoom.construction_name}`}
            </Typography>
            <Typography component="h3" variant="h5">
                {`Width: ${dataCreateRoom.x_length}`}
            </Typography>
            <Typography component="h3" variant="h5">
                {`Length: ${dataCreateRoom.y_length}`}
            </Typography>
            <Typography component="h3" variant="h5">
                {`Information: ${dataCreateRoom.information}`}
            </Typography>
          </CardContent>
        {/* </Card> */}
      {/* </CardActionArea> */}
    </Grid>
    </React.Fragment>
  );
}
import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';


export default function BasicCard(props) {
  return (
    <Card sx={{ maxWidth: '100%',backgroundColor:'#f0eeed' }}>
      <CardActions sx={{display:'flex',justifyContent:'space-between'}}>
        <Box >
         {props.content}
        </Box>
        <Button size="small" onClick={props.deleteAttachFileFunction}>{props.delete}</Button>
      </CardActions>
    </Card>
  );
}

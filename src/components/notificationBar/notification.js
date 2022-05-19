import React from "react";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import StylesChat from '../chatbox/chatbox.module.css'

const NotificationBar = (props)=>{
    return(
        <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            flexWrap:'wrap-reverse',
            minHeight: '10vh'}}>
      <div >
        <h4 className = {StylesChat.adminMessage}>{props.adminMessage}</h4>
        <h4 className = {StylesChat.newUserJoined} 
             style = { props.styleNewUserJoin}>
                    {props.newUserJoined}
        </h4>
        </div>
        </Paper>
      </Grid>
    
    );
}

export default NotificationBar;
import React, { useEffect, useState } from "react";
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import PopoverFunction from '../popover/popover';
import SendIcon from '@mui/icons-material/Send';
import Styles from '../Dashboard/dashboard.module.css';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import wallpaper from '../../images/whatsapp.jpeg';
import BasicCard from "../../card/card";



const Chatbox=(props)=>{
  return(
        <Grid item xs={12} md={8} lg={9}>
        <Paper
          sx={{
            p: 2,
            background:`url(${wallpaper})`,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 540,
          borderRadius:'2% 2%'}} >

      <div className = {Styles.container}>
     
        <div className={Styles.recieveMsgcontainer}>
          {props.recieveMessage}
          </div>
      </div>
      <div 
         className = {Styles.attachedFilesDiv} 
         style = {props.styleAttachedFiles}>
        <BasicCard 
         delete = {props.deleteAttachedFiles}
         content = {props.AttachedFilesContent}
         deleteAttachFileFunction={props.deleteAttachFileFunction}/>
      </div>
      <div className={Styles.inputDiv}>

        <form onSubmit={props.submitMessage}>
        <input type='text' placeholder='Type New Message' 
               onChange={props.inputMessage}
               onClick={(e)=>{e.target.style.outline='none';} }/>
       
        <PopoverFunction 
           description={
             <button 
                 type='button' 
                 className={Styles.attachfiles}
                 >{props.attachfiles}
             </button>}  
           popovermessage='attach files' />

        <PopoverFunction 
           description={
             <button type='button' className={Styles.emojis}>
                 <InsertEmoticonIcon color='primary' />
              </button>} 
           popovermessage="send emoji's"/>

        <PopoverFunction 
           description={
             <button 
                 type='submit' 
                 className={Styles.sendmessage}
                 id={props.id}>
                 <SendIcon 
                    color='primary' 
                    sx={{fontSize:'25px',cursor:'pointer'}}/>
              </button>} 
           popovermessage="send message"/>

        </form>
      </div>
        </Paper>
      </Grid>
     
    );
}
export default Chatbox;
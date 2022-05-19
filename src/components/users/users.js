import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import PersonOutlineSharpIcon from '@mui/icons-material/PersonOutlineSharp';

const MainListItems =(props)=> {

  return(
 <div>
   <List>
   {props.usersArray.map((element,index)=>{
    
     return( 
       element.map((element1,index1)=>{
         return (
           <div key={index1}>
   <ListItem button key={index1}>
     <ListItemIcon>
       <Avatar 
       src = {element1.getimage}
       sx={{ mr: 5,mt:2, bgcolor: 'info.main' }}>
         < PersonOutlineSharpIcon/>
         
         
       </Avatar>
     </ListItemIcon>
     <ListItemText primary={element1.name} sx={{color:'whitesmoke',ml:'1vh'}} />
   </ListItem>
   </div>
         );
     })
     );
   })}
   </List>
 </div>
);
 }
export default MainListItems;
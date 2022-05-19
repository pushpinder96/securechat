import React from "react";
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import PersonOutlineSharpIcon from '@mui/icons-material/PersonOutlineSharp';
import Typography from '@mui/material/Typography';
import { styled} from '@mui/material/styles';
import PopoverFunction from '../popover/popover';


const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
const profileimageStyles={
  width:'100%',
  height: 'max-content',
  
}


const NavBar=(props)=>{
    return(
        <AppBar position="absolute" open={props.open}>
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={props.toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(props.open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{
               flexGrow: 1,
               fontFamily:'Roboto'
                }}
          >
            SecureChat
          </Typography>
          <Avatar src={
                    (props.profileimage!=='')?
                     props.profileimage:
                      null}
                      onClick={props.openModal}
                   sx={
                      { m: 1, bgcolor: 'info.secondary',
                      cursor:'pointer'
                       }}>
           <PopoverFunction 
               description={(props.profileimage=='')?
                         <PersonOutlineSharpIcon onClick={props.openModal}/>:null
                      } 
                   popovermessage="Edit Profile"/>
           </Avatar>
        </Toolbar>
      </AppBar>
     
    );
}

export default NavBar;
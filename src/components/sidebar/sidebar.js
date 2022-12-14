import React from "react";
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import { styled} from '@mui/material/styles';
import MainListItems from '../users/users';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        backgroundColor:'#004ba0',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
          },
        }),
      },
    }),
  );

const Sidebar=(props)=>{
    return(

        <Drawer variant="permanent" open={props.open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
              backgroundColor:'#63a4ff'
            }}
          >
            <IconButton onClick={props.toggleDrawer}>
            <Typography
              component="h1"
              variant="subtitle1"
              color="whitesmoke"
              noWrap
              sx={{ 
                flexGrow: 1,
                fontFamily:"Segoe UI Symbol" 
              }}
            >
              Recently Joined Users
            </Typography>
              <ChevronLeftIcon />
             </IconButton>
            </Toolbar>
           <Divider />
          <List>
         < MainListItems usersArray={props.users} />
        </List>
          
        </Drawer>

    );
}

export default Sidebar;
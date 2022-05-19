import React,{useState,useEffect} from 'react';
import Snackbar from '@mui/material/Snackbar'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import {Link,useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import LockIcon from '@mui/icons-material/Lock';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import SendIcon from '@mui/icons-material/Send';
import { useContext } from 'react';
import { MyContext } from '../../context/contextAPI';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function SignIn(props) {

  
  const context=useContext(MyContext);
  
  const history=useNavigate();
  const [SnackbarRoomID,setSnackbarRoomID]=useState(false);
  const[NameField,setNameField]=useState(false);
  const[RoomField,setRoomField]=useState(false);
  const [nameData,setNameData]=useState('');
  const [RoomID,setRoomID]=useState('');
  const [RoomIDmatched,setRoomIDmatched]= useState('');
  const [vertical]=useState('top');
  const [horizontal]=useState('right');
  const [RoomData,SetRoomData]=useState({});

  useEffect(() => {
    let cleanUp=false;
    const result = async()=>{ 

         await axios.get('https://chat-room-e4e82-default-rtdb.europe-west1.firebasedatabase.app/userrooms/.json').
         then((res)=>{
           if(!cleanUp){
           SetRoomData(res.data);
           }
           }).
         catch((error)=>{
           console.log(error);
         })  
        }
        result();
        return ()=>{
         cleanUp=true;
          // SetRoomData('');
        }
  },[]);

const demoRoomhandler = (event)=>{
  console.log(RoomData);
 Object.entries(RoomData).forEach(([key,value])=>{
   if(key =='demo'){
     console.log(value);
     history(`/dashboard?name=${value.name+Math.floor(Math.random()*1000)}&room=${value.room}&adminname=${value.email}`)
            
   }
 })
}  

const handleSubmit =(event) => {
      event.preventDefault();

      Object.entries(RoomData).forEach(([key,value])=>{
        Object.entries(value).forEach(([key1,value1])=>{

          if(key1 === 'room'){
            if(RoomID===value1){
              setRoomIDmatched(value1);
              history(`/dashboard?name=${nameData}&room=${RoomID}&adminname=${value.name}`)
            }
            else if(RoomID!==value1){
            
                setTimeout(() => { setSnackbarRoomID(true);  }, 100);
                setTimeout(() => { setSnackbarRoomID(false); }, 6000);
              
              console.log('dosent match');
            }
            else{
              return;
            }
          }
        })
      })

  };

  return (

    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="s">
      <Box 
          sx=
             {{backgroundColor:'transparent',width:'100%' }} >
          <Typography sx={{color:'info.main',fontFamily:'BlinkMacSystemFont'}} component="h1" variant="h5">
              Secure Chat <SendIcon/>
         </Typography> 
        </Box> 
      </Container>

      <Container component="main" maxWidth="s">
      <Box 
          sx=
             {{
               backgroundColor:'transparent',
               width:'100%',
               position:'relative',
               left:'90%', }} >
          <Button 
               type='button' 
               variant="outlined"  
               sx={{ mt: 1, mb: 1 }}
               onClick={demoRoomhandler}>
            
                 Demo Room
            
            </Button>
        </Box> 
      </Container>
      
      
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'info.main' }}>
          <LockIcon />
          </Avatar>
         
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          
          
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="Name"
              label="Name"
              name="Name"
              autoComplete="Name"
              autoFocus
              onChange={(e)=>{
                setNameField(true);
                setNameData(e.target.value);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="RoomID"
              label="RoomID"
              type="password"
              id="RoomID"
              autoComplete="text"
              onChange={(e)=>{
                setRoomField(true)
                setRoomID(e.target.value);
              }}
            />  
           {/**  <Link to= {(RoomID==RoomIDmatched)?'/dashboard':'/'}>*/}
            <Button
              type="submit" fullWidth
              variant="contained" 
              sx={{ mt: 3, mb: 2 }}
              disabled={(NameField === false || RoomField === false)?true:false} >
              Start Chat
            </Button>
            
            <Button 
               type='button'  fullWidth
               variant="outlined"  
               sx={{ mt: 1, mb: 1 }}>
                <Link to='/createnewroom' style={{color:'inherit',textDecoration:'none'}}>
                 Create New Room
                </Link>
            </Button>
         
          </Box>
        </Box>
      </Container>

{/*messages */}

<Snackbar
  anchorOrigin={{ vertical, horizontal }}
  open={context.snackbar}
  autoHideDuration={6000}
  message="Please Check Your Email to Get Your Personal Room Chat No."
/>
<Snackbar

 anchorOrigin={{ vertical, horizontal }}
 open={SnackbarRoomID}
 autoHideDuration={6000}
 message="Please Put Valid Room Number."
  />

    </ThemeProvider>
  );
}
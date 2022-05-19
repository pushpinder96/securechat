import React,{useState,useContext} from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import {Link,useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import SendIcon from '@mui/icons-material/Send';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import {Database} from '../../firebase/firebase';
import { MyContext } from "../../context/contextAPI";

const theme = createTheme();

function CreateRoom(props) {
 
  const history=useNavigate();
  const [emailData,setemailData]=useState('');
  const [userNameData,setuserNameData]=useState('');
  const [roomNumber,setroomNumber]=useState('');
  const[UserNameField,setUserNameField]=useState(false);
  const[EmailField,setEmailField]=useState(false);
  const context=useContext(MyContext);
  
  const handleSubmit = async(event) => {

    event.preventDefault();
    context.snackState();
    history('/');
    window.location.reload();

     const userObject = {
        name: userNameData,
        email: emailData,
        room:roomNumber
    };
    
 const usersRef =  Database.ref(`userrooms`);
 const userroom = `${Math.floor(Math.random()*500)}user`;

    
   usersRef.child(userroom).set({
    name : userNameData,
    email : emailData,
    room:roomNumber
  }).catch(alert);


      await axios.post(' http://localhost:8080/roomcreated',userObject)
      .then(
        (res)=>{console.log('success');
      })
      .catch((error)=>{
        console.log(error);
      })

  };

  const randomNumbers=()=>{
   let result='';
    let characters='abcdefghijklmnopqrstuvwxyz0123456789';
        for(let i=0;i<5;i++){
            result=result+ characters.charAt(Math.floor(Math.random()*characters.length));
        }
       setroomNumber(result);
 }

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
          <Avatar sx={{ m: 1, bgcolor: 'purple' }}>
          <AddCommentOutlinedIcon />
          </Avatar>
         
          <Typography component="h1" variant="h5">
            Create New Room
          </Typography>
          
          
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="UserName"
              name="username"
              type='text'
              autoComplete="username"
              autoFocus
              onChange={(e)=>{
                        setUserNameField(true);
                        setuserNameData(e.target.value);
                      }}/>

            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              label="E-Mail"
              type="email"
              id="email"
              autoComplete="email"
              onChange={(e)=>{
                        setEmailField(true);
                        setemailData(e.target.value);
                      }}/>
            
             <Typography component="p" variant='body2' >
             Room No. Will Sent To Your Given Email Address.
             </Typography>
          
             <Button 
               type='submit'  fullWidth
               disabled={(UserNameField === false || EmailField === false)?true:false}
               variant="contained" color='secondary' 
               onClick={randomNumbers} 
               sx={{ mt: 1, mb: 1 }}>
             <Link to='/createnewroom'
                  style={{color:'inherit',textDecoration:'none'}}>
                 Create New Room
             </Link>
            </Button>
         
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}


/*
const CreateRoom=()=>{
return(
    <div>
        <button onClick={randomNumbers}>helllo</button>
    </div>
);
}
*/
export default CreateRoom;
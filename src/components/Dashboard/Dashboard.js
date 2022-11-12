
import React,{useState,useRef,useEffect,useContext} from 'react';
import {  createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Navbar from '../appBar/appBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import NotificationBar from '../notificationBar/notification';
import Sidebar from '../sidebar/sidebar';
import {useLocation} from 'react-router-dom';
import Styles from '../Dashboard/dashboard.module.css';
import BasicModal from '../../modal/modal';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import CollectionsIcon from '@mui/icons-material/Collections';
import Chatbox from '../chatbox/chatbox';
import axios from 'axios';
import io from 'socket.io-client';
import queryString from 'query-string';
import Messages from '../messages/messages';
import BasicCard from '../../card/card';
import {MyContext} from '../../context/contextAPI';
import { Storage,Database } from '../../firebase/firebase';
import { Typography } from '@mui/material';

const drawerWidth = 240;
let socket;
const mdTheme = createTheme();

function DashboardContent() {


  const Context=useContext(MyContext);
  const location = useLocation();
  const videoref = useRef(null);
  const photoRef = useRef(null);
  const [open, setOpen] = useState(true);
  const [openModalVideo, setopenModalVideo] = useState(false);
  const [openmodal, setOpenmodal] = useState(false);
  const [getimage,setImage] = useState('');
  const [hasphoto,setHasphoto] = useState(false);
  const [AttachedData,setAttachedData] = useState({Url:'',id:''});
  const [AttachedDataFile,setAttachedDataFile] = useState('');
  const [AttachedFileName,setAttachedFileName] = useState('');
  const [AttachFilesDisplay,setAttachFilesDisplay] = useState('');
  const [AttachFilesTypeFunction,setAttachFilesTypeFunction] = useState(false);
  const [idUrlDownload , setidUrlDownload] = useState('');
  const [progress,setprogress] = useState('');
  //effects

  const ENDPOINT='https://secure-chat-app.adaptable.app/';
  const [username,setusername] = useState('');
  const [userRoom,SetUserRoom] = useState('');
  const [adminMsg,setadminMsg] = useState('');
  const [newUserJoin,setNewUserJoin] = useState('');
  const [userleft, setuserleft] = useState('');

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [usersProfile,setusersProfile] = useState([]);

  //room join emitting

  useEffect(()=>{
    
    let {name,room,adminname} = queryString.parse(location.search);
  
    setusername(name);
    SetUserRoom(room);  
    socket = io(ENDPOINT);
    socket.emit('join-room',{name,room,adminname,getimage:getimage});

    axios.get('https://chat-room-e4e82-default-rtdb.europe-west1.firebasedatabase.app/userrooms.json')
    .then(res=>{
      Object.entries(res.data).forEach(array=>{
        if(array[1].room == room){
          const usersRef =  Database.ref(`userrooms`);

   usersRef.child(`${array[0]}`)
           .child(`${array[0]}`)
           .child(`user${Math.floor(Math.random()*1000)}`)
           .set({
    name : name,
    profile : getimage

  }).catch(alert);
        console.log(array);
        }
      })
    })

   
    return ()=>{
    //  socket.emit('disconnect');
      socket.off();
    }
},[ENDPOINT,location.search]);

//admin message on
useEffect(()=>{

  socket.on('admin-message',({user})=>{
    setadminMsg(user);
  });
  socket.on('new-user-joined',({newUserName})=>{
    setNewUserJoin(newUserName);
  });

},[adminMsg,newUserJoin]);

useEffect(()=>{
  let {name,room,adminname} = queryString.parse(location.search);
  

  socket.emit('allusers',{name,room,adminname,getimage:getimage})

},[getimage]);

useEffect(()=>{

  socket.on('user-left',({newUserName})=>{
    setuserleft(newUserName);
    setNewUserJoin(newUserName);
  });
/*
  socket.on('disconnectionMade',(user)=>{
    console.log(user);
    setuserleft(user);
  })
*/
},[userleft]);


useEffect(()=>{
  socket.on('roomData',({room,users,image})=>{
    
    let profile = users;

  setusersProfile([profile]);
    
 })
 
},[newUserJoin,userleft])

useEffect(() => {
  socket.on('recieve-message', (message,AttachedData) => {
    setMessages(messages => [ ...messages, message ]);

  });
  
},[]);

//functions
  const handleOpenVideo = () => setopenModalVideo(true);
  const handleOpen = () => setOpenmodal(true);
  const handleClose = () => setOpenmodal(false);
  
  const handleCloseVideoModal = () => {
           
          setopenModalVideo(false);
          let video = videoref.current;
               window.localStream.getVideoTracks()[0].stop();
                video.src = '';
          setHasphoto(false);
          }

          console.log(usersProfile);
  const toggleDrawer = () => {setOpen(!open);};

  const getimageFunction= (e)=>{
      let imageLoad=new FileReader();
          imageLoad.onload =()=>{
        if(imageLoad.readyState==2){
           setImage(imageLoad.result);
            handleClose();
        }
      }
      imageLoad.readAsDataURL(e.target.files[0]);
  }

  const submitMessage= (e)=>{
    e.preventDefault();

    let message = e.target.childNodes[0].value;


    setAttachFilesTypeFunction(true);
    Context.AttachFilesTypeFunction(AttachedData);
   
    
    if(message!==''){
      
      e.target.childNodes[0].value='';
      socket.emit('send-message',{message,AttachedData});
      
    }
    else if(message=="" && AttachedFileName!==''){
      const usersRef =  Database.ref(`userdata`);
     usersRef.child(`${Math.floor(Math.random()*10000)}user`).set({
    id : AttachedData.id,
    downloadURL : AttachedData.Url
  }).catch(alert);
    
            
        message=AttachedFileName;
        socket.emit('send-message',{message,AttachedData});

    }
    else if(message!=="" && AttachedFileName!==''){
     
      const usersRef =  Database.ref(`userdata`);
     usersRef.child(`${Math.floor(Math.random()*10000)}user`).set({
    id : AttachedData.id,
    downloadURL : AttachedData.Url
  }).catch(alert);
    
            message=AttachedFileName;
            e.target.childNodes[0].value='';
            socket.emit('send-message',{message,AttachedData});
    }
    else{

      console.log('nothing happend');
    
    }


    setAttachFilesDisplay(false);
  }
    
  const openWebCam=()=>{
    
    handleClose();
    handleOpenVideo();

    navigator.mediaDevices.getUserMedia({
      video:{width:600,height:400}
    }).then((stream)=>{
      let video =videoref.current;
          window.localStream=stream;
          video.srcObject=stream;
          video.play();
    }).catch((error)=>{
        console.log(error);
    })
    
  }

  const takesnap=()=>{
     const photoWidth=200;
     const photoHeight=150;

     let video = videoref.current;
     let photo = photoRef.current;

     photo.width=photoWidth;
     photo.height=photoHeight;

     let ctx = photo.getContext('2d');
     ctx.drawImage(video,0,0,photoWidth,photoHeight)
     setHasphoto(true);
  }

  const setProfileFunction = () =>{

    let photo = photoRef.current;
    let dataURL = photo.toDataURL();
     setImage(dataURL);
     
  }

  const attachFilesFunction = async(e) =>{

    let imageLoad=new FileReader(); 
    
    imageLoad.onprogress =()=>{
          
      if(imageLoad.readyState == 1){
      setprogress(true);
      // setAttachFilesDisplay(true);
       console.log(imageLoad);
      }
  }
    
     
       imageLoad.onload =()=>{
          
        if(imageLoad.readyState==2){
         setAttachFilesDisplay(true);
         setprogress(false);
         } 
    }
    imageLoad.readAsDataURL(e.target.files[0]);

     let FileName = e.target.files[0];

    const usersData =  Storage.ref(`userdata`);
    const uploadTask = await usersData.child(`/images/${FileName.name}`).put( FileName).catch(alert);
    const downloadTask=await usersData.child(`/images/${FileName.name}`).getDownloadURL();
    
    setAttachedData( (prevState => ({
      ...prevState,
      Url:  downloadTask,
      id: `${Math.floor(Math.random()*10000)}user`
    
  })));
    //setAttachedData(await downloadTask);

     setAttachedDataFile(FileName);
     setAttachedFileName(FileName.name);
     
    
     Context.AttachFilesTypeFunction('');

  }

  const deleteAttachFileFunction = (e) =>{
    setAttachFilesDisplay(false);
  }

const  chatBoxInputChangeHandler = (e) =>{
   let inputValue = e.target.value;
   setAttachedData('');
}
  
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        {/** input to choose file from pc*/}
        
        <input
          accept="image/jpg , image/png ,image/jpeg"
          className='input'
          style={{ display: 'none' }}
          id="raised-button-file"
          multiple
          type="file"
          onChange={getimageFunction}
        />

        <input
          accept="image/* , application/pdf,application/vnd.ms-excel"
          className='input'
          style={{ display: 'none' }}
          id="open-attach-files"
          multiple
          type="file"
          onChange={attachFilesFunction}
        />
{/**files choosed from pc function ends */}

          <Navbar 
           open={open}
           toggleDrawer={toggleDrawer}
           openModal={handleOpen}
           profileimage={getimage}/>
          
          <Sidebar 
          open={open} 
          toggleDrawer={toggleDrawer}
          users={usersProfile}/>

         <BasicModal 
           open={openmodal} 
           handleClose={handleClose}
           firstPropDescription='Take Picture'  
           secondPropDescription='Choose From Gallery '
           firstProp={
                <PhotoCameraOutlinedIcon 
                   onClick={openWebCam}
                   sx={{fontSize:'2.5vw',cursor:'pointer'}}
                   />}
                   secondProp={<label htmlFor="raised-button-file">
                 <CollectionsIcon 
                    sx={{fontSize:'2.5vw',cursor:'pointer'}}
                    ></CollectionsIcon></label> }/>

        <BasicModal 
             open={openModalVideo}
             handleClose={handleCloseVideoModal}
             firstProp={<video ref={videoref}></video>}
             secondProp={
               <button 
                  style={{
                    position:'absolute',
                    top:'94%',
                    left:'0',
                    width:'100%',
                    height:'4vh',
                    cursor:'pointer',
                    backgroundColor:'blue',
                    color:'whitesmoke'
                  }} 
                  onClick={takesnap}>Take Snap</button>}
              firstPropDescription={<canvas ref={photoRef}></canvas>}
              secondPropDescription={
                  (hasphoto==true)?
                   <button 
                   onClick={setProfileFunction}
                   className={Styles.webcamBtn}>Set as Profile</button>:
                   null}/>
              
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            minHeight: '95vh',
            overflowY: 'hidden',
            overflowX:'hidden',
            backgroundColor:'#eeeeee'
          }}>

          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={5} sx={{ flexDirection: { xs: "column-reverse", md: "row"} }}>
              <Chatbox 
                submitMessage={submitMessage}
                id='submitmessaageID'
                styleAttachedFiles={(AttachFilesDisplay)?{display:'block'}:{display:'none'}}
                AttachedFilesContent =
                        {(progress==true)? 
                          <Box sx={{ display: 'flex' }}>
                            <CircularProgress color="secondary" />
                          </Box>:
                         <Typography variant="body2">
                         {AttachedFileName}
                         </Typography>}
                deleteAttachedFiles={<HighlightOffIcon />}
                deleteAttachFileFunction={deleteAttachFileFunction}
                inputMessage={ chatBoxInputChangeHandler}
                attachfiles=
                  {<label   
                       htmlFor='open-attach-files'>
                       <AttachFileIcon color='grey'/>
                  </label>} 
                recieveMessage=
                {<div><Messages 
                     messages={messages}
                     name={username}/></div>} />
      
             <NotificationBar 
             newUserJoined={newUserJoin}
             styleNewUserJoin={(newUserJoin=="")?{display:'none'}:{display:'block'}}
             adminMessage={adminMsg}
             />
             </Grid>
            
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}

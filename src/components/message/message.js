import React,{useContext} from 'react';
import { MyContext } from '../../context/contextAPI'; 
import './message.css';
import DownloadFileBox from '../downloadFileDialogueBox/downloadFileDialogueBox';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

const Message = (props) => {

  let Context = useContext(MyContext);
  let SentByCurrentUser = false;

  const trimmedName = props.name.trim().toLowerCase();
  console.log(props.message.attachedFile.id);

  if(props.message.user === trimmedName) {
    SentByCurrentUser = true;
  }
  return (

    SentByCurrentUser && props.message.attachedFile=='' 
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{trimmedName}</p>
         
         <div className="messageBox sentmessagecolor">
            <p className="messageText colorWhite">{props.message.text}</p>
            </div>
          
        </div>
        )
        : SentByCurrentUser && props.message.attachedFile!=='' 
        ? (
          <div className="messageContainerFile justifyEnd" >
            <p className="sentTextFile pr-10">{trimmedName}</p>
           
           <div className='messageBoxFile'>
           <DownloadFileBox 
             icon={<FileDownloadOutlinedIcon/>}
             FileName={props.message.text}
            id={props.message.attachedFile.id}
             /> </div>
            </div>
          )
          :  
          SentByCurrentUser == false && props.message.attachedFile!==''
          ?(
            <div className="messageContainerFile justifyStart">
            
           
           <div className='messageBoxFile'>
           <DownloadFileBox 
             icon={<FileDownloadOutlinedIcon/>}
             FileName={props.message.text}
             id={props.message.attachedFile.id}
             />
              </div>

              <p className="sentTextFile pl-10">{props.message.user}</p>
            </div>
          ):
        (
          <div className="messageContainer justifyStart">
            <div className="messageBox arrivalmessagecolor">
              <p className="messageText colorDark">{props.message.text}</p>
            </div>
            <p className="sentText pl-10 ">{props.message.user}</p>
          </div>
        )
  );
}

export default Message;
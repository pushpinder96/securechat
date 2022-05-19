import React, { useState } from 'react';
import axios from 'axios';
import fileDownload from 'js-file-download';
import Styles from '../downloadFileDialogueBox/downloadFile.module.css';

const DownloadFileBox = (props)=>{

  const [dataURL , setdataURL] = useState('');
 
 
  const handleClick = (url, filename,id) => {

    axios.get('https://chat-room-e4e82-default-rtdb.europe-west1.firebasedatabase.app/userdata.json')
    .then((res)=>{
      setdataURL(res.data);
      Object.entries(res.data).forEach(array=>{

        for (let i = 0; i < array.length; i++) {
          const element = array[1].id;
          
          if(element == id){

            axios.get(array[1].downloadURL, {
              responseType: 'blob',
            
            })
            .then((res) => {
              console.log(res.data);
              fileDownload(res.data, filename)
            })
            return;
          }
          
        }
  
      })

    })
    

}

    return(
    <div>
        <div className={Styles.outerDiv}>
            <div onClick={
                       ()=> handleClick(
                             `${props.downloadLink}`,
                              `${props.FileName}`,
                              `${props.id}`)}
            className={Styles.iconDiv}
            ><p className={Styles.icon}>{props.icon }</p></div>
            <div className={Styles.descriptionDiv}>
                {props.FileName}
                </div>
        </div>

    </div>
    );

}

export default DownloadFileBox;
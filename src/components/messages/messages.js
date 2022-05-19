import React,{useEffect,useRef} from 'react';
import Message from '../message/message';
import './messages.css';

const Messages = (props) => {


  const messagesEndRef = useRef(null);
  

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({Boolean:true, behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  },[props.messages]);



return(
   <div>
  <div 
   className="messages" 
   style={{
      padding: '5% 0',
      overflow: 'auto',
      flex: 'auto'
    
   }}  >
    {props.messages.map(( message, i) => 
           <div key={i}>
            <Message 
               message={message} 
               name={props.name}
                />
               </div>
               )}
  </div>
  <div ref={messagesEndRef} />
  </div>
  );
    }

export default Messages;
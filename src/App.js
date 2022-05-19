import React,{useState} from 'react';
import './App.css';
import SignIn from './components/loginPage/loginpage';
import Copyright from './components/copyright/copyright';
import CreateRoom from './components/createRoom/createRoom';
import {Route,Routes} from 'react-router-dom';
import {Provider} from './context/contextAPI';
import Dashboard from './components/Dashboard/Dashboard';


function App() {

  const [snackbar,Setsnackbar]=useState(false);
  const [AttachFilesType,setAttachFilesType] = useState('');

  const snackbarFunc=()=>{
    setTimeout(() => { Setsnackbar(true);  }, 100);
    setTimeout(() => { Setsnackbar(false); }, 6000);
  }

  const AttachFilesTypeFunction = (value)=>{
        setAttachFilesType(value);
  }

  

  let contextValues={
     snackbar:snackbar,
     snackState:snackbarFunc,
     AttachFilesType:AttachFilesType,
     AttachFilesTypeFunction:AttachFilesTypeFunction,
  };

  return (
    <div className="App">
      <Provider value={contextValues}>
       
       <header  className="App-header">
         <Routes>
          <Route path='/' exact element={<SignIn />} />
          <Route path='/createnewroom' element={<CreateRoom />} />
          <Route path='/dashboard' element={<Dashboard />} />
      
         </Routes>

         <Copyright sx={{ mt: 8, mb: 4 }} />
        </header>
     </Provider>
    </div>
  );
}

export default App;

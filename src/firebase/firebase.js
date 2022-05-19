import firebase from 'firebase/compat/app';
import  'firebase/compat/database';
import  'firebase/compat/storage';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDKpAXuzOr53melzFzAtyEu3XgFidwi6qk",
    authDomain: "chat-room-e4e82.firebaseapp.com",
    databaseURL: "https://chat-room-e4e82-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "chat-room-e4e82",
    storageBucket: "chat-room-e4e82.appspot.com",
    messagingSenderId: "224028573956",
    appId: "1:224028573956:web:845e66b95a7a1d8add5051"
  };

// Initialize Firebase
 firebase.initializeApp(firebaseConfig);


export const Database= firebase.database();
export const Storage= firebase.storage();
export const firebaseAuth=firebase.auth();
export default firebase;
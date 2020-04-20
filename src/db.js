import * as firebase from 'firebase'

var firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY ,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN ,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL ,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID ,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_FIREBASE_APPID   ,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID 
    };
// Initialize Firebase

const db = firebase.initializeApp(firebaseConfig);


export default db;
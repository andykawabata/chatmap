import * as firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyD7GXJQYmDgoltY9dAu_0KdyhQItNPZs8w",
    authDomain: "chatmap-bbb88.firebaseapp.com",
    databaseURL: "https://chatmap-bbb88.firebaseio.com",
    projectId: "chatmap-bbb88",
    storageBucket: "chatmap-bbb88.appspot.com",
    messagingSenderId: "12374374455",
    appId: "1:12374374455:web:64766fe4b8b6b7113867b2",
    measurementId: "G-KB71M53T2Q"
};
// Initialize Firebase
const db = firebase.initializeApp(firebaseConfig);

export default db;
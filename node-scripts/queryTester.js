const firebase = require('firebase');
const config = require('./config')

const db = firebase.initializeApp(config.firebaseConfig);


db.firestore().collection("states").doc("Massachusetts").collection("cities").doc("Northampton")
        .collection("pois").doc("The Roost").collection("comments")
        .add({text: "teeext", user: "peet", created: firebase.firestore.Timestamp.now().seconds })
        .then(docRef => {
            console.log(docRef.id);
            console.log(docRef.get().text)
            process.exit(1);
        })
        
const firebase = require('firebase');
const config = require('./config')

const db = firebase.initializeApp(config.firebaseConfig);


db.firestore().collection("states").doc("Massachusetts").collection("cities").doc("Northampton").collection("pois").doc("The Roost").collection("comments").get()
.then(function(querySnapshot) {
    querySnapshot.forEach(sub => {
        if (sub.docs.length > 0) {
          console.log('subcollection exists');
        }
        else
            console.log("subcollection does not exist")
    })
    console.log("subcollection does not exist")
    process.exit();
})
    
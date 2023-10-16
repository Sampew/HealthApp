
import * as firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAwPwtmwEFUEJk7PSd3cVP3ivhVUoIDGBs",
  authDomain: "healthapp-c54db.firebaseapp.com",
  projectId: "healthapp-c54db",
  storageBucket: "healthapp-c54db.appspot.com",
  messagingSenderId: "537518195437",
  appId: "1:537518195437:web:5d086b3b3c2fa3792882e4"
};

let app;
if (firebase.apps.length === 0){
    app=firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const auth = firebase.auth()

const firestore = firebase.firestore();

const quotesCollection = firestore.collection('quotes'); 

export {auth, quotesCollection};
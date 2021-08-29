import firebase from 'firebase'
import 'firebase/firestore'; 
var firebaseConfig = {
    apiKey: "AIzaSyDGXPjISMr1nh7hKVjUIBOH3gbvHJ0Ae_o",
    authDomain: "last-journal.firebaseapp.com",
    projectId: "last-journal",
    storageBucket: "last-journal.appspot.com",
    messagingSenderId: "31752015091",
    appId: "1:31752015091:web:8e2073d1e34bca7dfcfb86",
    measurementId: "G-EP2BD0Z4P4"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const firestore = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage()

export { 
    firestore,
    auth,
    storage
}
import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyApoBn65jFI-u39Id4Y08jx1ci0MdE9DFo",
    authDomain: "snapchat-demo-4b64c.firebaseapp.com",
    projectId: "snapchat-demo-4b64c",
    storageBucket: "snapchat-demo-4b64c.appspot.com",
    messagingSenderId: "925105966642",
    appId: "1:925105966642:web:311063c310072f1827b62b",
    measurementId: "G-RSFVBTDQ25"
  };
const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore();
const auth = firebase.auth()
const storage = firebase.storage()
const provider = new firebase.auth.GoogleAuthProvider()

export {db , auth ,storage ,provider }

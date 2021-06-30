import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBN_bqWl1BcLuiTAjuJ4FwKg8rrUrrsOJ4",
  authDomain: "provenda-2417d.firebaseapp.com",
  databaseURL: "https://provenda-2417d.firebaseio.com",
  projectId: "provenda-2417d",
  storageBucket: "provenda-2417d.appspot.com",
  messagingSenderId: "1058117063258",
  appId: "1:1058117063258:web:b87e5a2063560aff20fe63",
  measurementId: "G-9JK82BD1M1"
  };
 var app= firebase.initializeApp(config);
  firebase.analytics();
  export const auth = firebase.auth;
  export const db = firebase.firestore(app);
  export const storage = firebase.storage().ref();
const { initializeApp } = require("firebase/app");

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6Dwb9I3PETCDMYpULhNKNpG81cSkN-yQ",
  authDomain: "creamdream-22a4e.firebaseapp.com",
  projectId: "creamdream-22a4e",
  storageBucket: "creamdream-22a4e.appspot.com",
  messagingSenderId: "98131452484",
  appId: "1:98131452484:web:6635c30cbb8cd7b9de5211",
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);

exports.FirebaseApp = FirebaseApp;

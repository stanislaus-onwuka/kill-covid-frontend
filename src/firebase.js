import firebase from 'firebase/app';
import "firebase/auth";
  
const firebaseConfig = {
  apiKey: "AIzaSyAtmxjKV88E92x7dDWo3AoYiHBUTxkutHU",
  authDomain: "coveed-19.firebaseapp.com",
  databaseURL: "https://coveed-19.firebaseio.com",
  projectId: "coveed-19",
  storageBucket: "coveed-19.appspot.com",
  messagingSenderId: "1332829122",
  appId: "1:1332829122:web:a22b5852298ee0912b945b",
  measurementId: "G-XTF1VWVKFT"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const providerGoogle = new firebase.auth.GoogleAuthProvider();
const providerFacebook = new firebase.auth.FacebookAuthProvider();
const providerTwitter = new firebase.auth.TwitterAuthProvider();

const signInWithGoogle = async() => {
  const data = await auth.signInWithPopup(providerGoogle);
  console.log(data)
};

const signInWithFacebook = async() => {
  const data = await auth.signInWithPopup(providerFacebook);
  console.log(data)
};

const signInWithTwitter = async() => {
  const data = await auth.signInWithPopup(providerTwitter);
  console.log(data)
};

export { auth, signInWithGoogle, signInWithFacebook, signInWithTwitter };
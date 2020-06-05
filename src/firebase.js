import firebase from 'firebase/app';
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  apppId : process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MESUREMENT_ID
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
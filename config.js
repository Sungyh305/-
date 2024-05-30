import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
// your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB4-rjA5BG-L1l6WA_4pLMYYUrEIac6lOM',
  authDomain: 'login-943f1.firebaseapp.com',
  projectId: 'login-943f1',
  storageBucket: 'login-943f1.appspot.com',
  messagingSenderId: '377784229097',
  appId: '1:377784229097:web:6a5dbe5300e8a82fbda478',
  measurementId: 'G-S3DTKPKZCZ',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };

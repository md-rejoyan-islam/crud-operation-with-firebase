// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  getAuth,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3xFuzwODrmL8iMCLrQdewKFm0P83gcHw",
  authDomain: "fir-66e95.firebaseapp.com",
  projectId: "fir-66e95",
  storageBucket: "fir-66e95.appspot.com",
  messagingSenderId: "89453362339",
  appId: "1:89453362339:web:94b1afe8474d2b4f175316",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const storage = getStorage(firebaseApp);
export const auth = getAuth(firebaseApp);
// export const auth = initializeAuth(firebaseApp, {
//   errorMap: debugErrorMap,
// });

export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

// export
export default firebaseApp;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getStorage } from "@firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKxCdLxFEItP_N3OgJUys75rJk4oWqmKY",
  authDomain: "cs303-a40b4.firebaseapp.com",
  projectId: "cs303-a40b4",
  storageBucket: "cs303-a40b4.appspot.com",
  messagingSenderId: "1055377566806",
  appId: "1:1055377566806:web:dc813f91470b9788e69ff7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore(app);
const userRef = collection(db, "users");
const roomRef = collection(db, "rooms");
const storage = getStorage(app);

export { app, auth, db, userRef, roomRef,storage };

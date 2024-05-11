import { auth, db } from "./firebaseConfig";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { router } from "expo-router";
import { getUserById } from "./user";

onAuthStateChanged(auth, async (user) => {
  getUserUId().then((id) => {
    getUserById(id).then((uu) => {
        console.log("userasas", uu);
        if (user) {
          if(user && uu[0].Role==="User"){
          router.replace("/(tabs)/home");
          }
          else {
            router.replace("/(admin)/AdminHome");
          }
          
        } else {
          router.replace("/(authenticate)/login");
        }
    });
    
  });
});

async function register(name, email, password) {
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Registration Error:", error.message);
    throw error;
  }
}

async function login(email, password) {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return {success: true};
  } catch (error) {
    let msg = error.message;
    if(msg.includes('(auth/invalid-email)')) msg='Invalid email';
    if(msg.includes('(auth/invalid-credential)')) msg='Invalid credentials';
    return {success: false, msg};
  }
}

async function addUserData(object) {
  try {
    await setDoc(doc(db, "users", object.id), object);
  } catch (error) {
    console.error("Add User Data Error:", error.message);
    throw error;
  }
}


async function getUserUId() {
  if (auth.currentUser != null) {
     console.log("this here =", auth.currentUser.uid);
    return auth.currentUser.uid;
  } else {
    return null;
  }
}

async function resetPassword(email) {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error("Password Reset Error:", error.message);
    throw error;
  }
}

async function logout() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout Error:", error.message);
    throw error;
  }
}


export { register, login, resetPassword, logout  , getUserUId , addUserData};

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

onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log("We are authenticated now!");
    router.replace("/(tabs)/home");
  } else {
    console.log("We are not authenticated");
    router.replace("/(authenticate)/login");
  }
});

async function register(name, email, password) {
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await addUserData(cred.user.uid, name, email);
    return cred;
  } catch (error) {
    console.error("Registration Error:", error.message);
    throw error;
  }
}

async function login(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Login Error:", error.message);
    throw error;
  }
}

async function addUserData(uid, name, email) {
  try {
    await setDoc(doc(db, "users", uid), {
      name: name,
      email: email,
      uid: uid,
    });
  } catch (error) {
    console.error("Add User Data Error:", error.message);
    throw error;
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

export { register, login, resetPassword, logout };

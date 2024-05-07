import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  Pressable,
  StyleSheet,
  ImageBackground,
  Animated,
  TouchableOpacity,
  Image,
} from "react-native";
import COLORS from "../constants/colors";
import { router } from "expo-router";
import firebase from "firebase/app";
import "firebase/auth";
import { Reset } from "../firebase/auth";
import Logo from "../assets/images/Logo.png";



const forgot = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");


  const handleResetPassword = async () => {
    try {
      await Reset(email);
      setMessage("Password reset email sent. Please check your inbox.");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/Register.jpeg")}
      style={styles.background}
      blurRadius={5}
    >
      

      <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
      <Text style={styles.title}>Forgot Password?</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TouchableOpacity onPress={handleResetPassword} style={styles.button}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>

      <Pressable onPress={() => router.replace("/(authenticate)/login")}>
        <Text style={styles.link}>Login</Text>
      </Pressable>
      {message ? <Text style={styles.message}>{message}</Text> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>


    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },

  logo: {
    width: 300,
    height: 300,
    marginBottom: 50,
    marginTop:-90,
  },
  
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "Quicksand",
    marginBottom: 20,
    color: "white",
  },
  
  input: {
    width: "100%",
    height: 50,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#858080",
    borderRadius: 25,
    paddingHorizontal: 15,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    
  },
  icon: {
    marginRight: 10,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#FCC873",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "black",
    fontSize: 18,
  },
  link: {
    marginTop: 10,
    color: "#858080",
    textDecorationLine: "underline",
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginTop: 10,
  },
  message: {
    color: "green",
    marginTop: 10,
  },
});

export default forgot;

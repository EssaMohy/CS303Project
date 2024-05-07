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
  Keyboard,
  Easing
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

  const [logoOpacity] = useState(new Animated.Value(1));

  // Event listeners for keyboard show/hide
  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener("keyboardDidShow", () => {
      Animated.timing(logoOpacity, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        useNativeDriver: true,
      }).start();
    });

    const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () => {
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        useNativeDriver: true,
      }).start();
    });

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);

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
      
    <Animated.View style={[styles.logoContainer, { opacity: logoOpacity }]}>
    <Image source={Logo} style={styles.logo} />
    </Animated.View>
      <View style={styles.container}>
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

  logoContainer: {
    position: "absolute",
    top: 15, // Adjust as needed for your logo size
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  logo: {
    width: 320, // Set the width of your logo
    height: 320, // Set the height of your logo
    resizeMode: "contain", // Keeps the aspect ratio intact
  },
  
  container: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop:310,
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
    color:'white'
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

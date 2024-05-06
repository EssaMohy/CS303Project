import { router } from "expo-router";
import React, { useState , useEffect } from "react";
import { MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import {
  View,
  TextInput,
  Button,
  Text,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  Keyboard,
  Animated,
  Easing,
} from "react-native";
import { register } from "../firebase/auth";
import COLORS from "../constants/colors";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handlePress = async () => {
    try {
      const credentials = await register(userName, email, password);
      console.log("credentials", credentials);
      router.replace("/(tabs)/home");
    } catch (error) {
      console.log("error", JSON.stringify(error));
      setError(error);
    }
  };
  const [logoOpacity] = useState(new Animated.Value(1));

  useEffect(() => {
    // Event listener for keyboard show
    const keyboardShowListener = Keyboard.addListener("keyboardDidShow", () => {
      Animated.timing(logoOpacity, {
        toValue: 0, // Fade out
        duration: 300, // Animation speed
        easing: Easing.out(Easing.poly(4)), // Easing function for a smooth start
        useNativeDriver: true, // Use native driver for better performance
      }).start();
    });

    // Event listener for keyboard hide
    const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () => {
      Animated.timing(logoOpacity, {
        toValue: 1, // Fade in
        duration: 300, // Animation speed
        easing: Easing.out(Easing.poly(4)), // Easing function for a smooth start
        useNativeDriver: true, // Use native driver for better performance
      }).start();
    });

    // Cleanup function
    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);
  return (
    <ImageBackground
      source={require("../assets/images/Register.jpeg")} // Replace with your image path
      style={styles.background}
      blurRadius={4} // Optional: if you want the background image to be blurred
    >
      <Animated.View style={[styles.logoContainer, { opacity: logoOpacity }]}>
        <Image
          source={require("../assets/images/Logo.png")}
          style={styles.logo}
        />
        <Text style={styles.elegantText}>Elevate Every Day</Text>
      </Animated.View>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="email-outline"
            size={24}
            color="#858080"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
value={email}
        onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <Octicons
            name="person"
            size={24}
            color="#858080"
            style={styles.icon}
          />
          <TextInput style={styles.input} 
placeholder="Name"
value={userName}
        onChangeText={setUserName}
 />
        </View>
        <View style={styles.inputContainer}>
          <Octicons name="lock" size={24} color="#858080" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
value={password}
        onChangeText={setPassword}
          />
        </View>
        <TouchableOpacity onPress={handlePress} style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
{error ? <Text style={styles.error}>{error.code}</Text> : null}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    justifyContent: "flex-end", // Changed from "center" to "flex-end"
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 170, // Increased padding to push the content down
  },
  inputContainer: {
    flexDirection: "row", // Align icon and text input
    alignItems: "center", // Center items vertically
    width: "100%",
    height: 50,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#858080",
    borderRadius: 25,
    paddingHorizontal: 15,
    backgroundColor: "rgba(133, 128, 128, 0.4)", // Semi-transparent background
    color: "black",
  },
  input: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 10,
    fontWeight: "bold",
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
  logoContainer: {
    position: "absolute",
    top: 100, // Adjust as needed for your logo size
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  logo: {
    width: 175, // Set the width of your logo
    height: 175, // Set the height of your logo
    resizeMode: "contain", // Keeps the aspect ratio intact
  },
  elegantText: {
    fontFamily:'Quicksand-Bold',
    marginTop: 13, // Space between logo and text
    color: "#D3D3D3", // Light color for contrast
    fontSize: 22, // Adjust as needed
  },
});


export default Register;

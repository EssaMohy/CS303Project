import React, { useState, useEffect } from "react";
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
  Platform,
  Alert
} from "react-native";
import { addUserData, getUserUId, register } from "../firebase/auth";
import { router } from "expo-router";
import { addUser } from "../firebase/user";

const Register = () => {
  // State hooks for form inputs and error handling
  const [name, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // State hook for logo opacity animation
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

  // Handler for the registration process
  const handlePress = async () => {
    let isValid=true;
    if (!name || !email || !password) {
      isValid=false;
      Alert.alert("Register", "Please enter the username, email and password");
    }
    if(isValid) {
      register( name, email, password)
      .then(() => {
        getUserUId().then((id) => {
          user_id = id;
          addUserData({
            id: id,
            name: name,
            email: email,
            Role: "User",
            image:
              "https://64.media.tumblr.com/d82d24956974272dff1f745a004a43bf/tumblr_o51oavbMDx1ugpbmuo3_540.png",
            cart: [],
            balance: 0,
          });
        });
      })
      .catch((error) => {
        console.log(error.message);
      });

    };
  };

  // Handler for returning to the previous screen
  const handleReturn = () => {
    router.replace("/(authenticate)/login");
  };
  return (
    <ImageBackground
      source={require("../assets/images/Register.jpeg")} 
      style={styles.background}
      blurRadius={5} 
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
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
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
        <TouchableOpacity onPress={handleReturn} style={styles.Rebutton}>
            <Text style={styles.RebuttonText}>Login</Text>
          </TouchableOpacity>

        {error ? <Text style={styles.error}>{error.code}</Text> : null}
      </View>
    </ImageBackground>
  );
};

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
    justifyContent: "flex-end", 
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 170, 
  },
  inputContainer: {
    flexDirection: "row", 
    alignItems: "center", 
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
    color: "white",
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
  elegantText: {
    fontFamily: "Quicksand",
    marginTop: -95, // Space between logo and text
    color: "#D3D3D3", // Light color for contrast
    fontSize: 20, // Adjust as needed
  },
  Rebutton: {
    marginTop: 10, // Add some space between the Register button and this text
    marginBottom: 10, // Add some space below the text
  },
  RebuttonText: {
    color: "#858080", // Use the same color as your Register button for consistency
    textDecorationLine: "underline", // Underline the text to make it clear it's a link
    fontSize: 16, // Set a font size that's easy to read
    fontWeight: "bold", // Make the text bold to stand out
  },
});

export default Register;

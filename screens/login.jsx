import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  Keyboard,
  Easing,
  ImageBackground,
  Alert,
} from "react-native";
import COLORS from "../constants/colors";
import { login } from "../firebase/auth";
import { MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { router } from "expo-router";

const Login = () => {
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

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Login', "Please enter the email and password");
      return;
    }
    try {
      const response = await login(email, password);
      if(!response.success){
        Alert.alert('Login', response.msg);
      }
      /* console.log("credentials", credentials); */
      // Handle successful login, navigate to home screen
    } catch (error) {
      console.log("error", JSON.stringify(error));
      setError(error); // Ensure setError is defined and updates the state
    }
  };
  return (
    <ImageBackground
    source={require("../assets/images/Login.jpeg")} // Replace with your image path
    style={styles.background}
    blurRadius={5} // Optional: if you want the background image to be blurred
  >
    <Animated.View style={[styles.logoContainer, { opacity: logoOpacity }]}>
      <Image
        source={require("../assets/images/Logo.png")}
        style={styles.logo}
      />
      <Text style={styles.elegantText}>Welcome Back!</Text>
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
        <Octicons name="lock" size={24} color="#858080" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
value={password}
      onChangeText={setPassword}
        />
      </View>

{error ? <Text style={styles.error}>{error.code}</Text> : null}
    </View>
    
    <View style={styles.buttonContainer}>
  <TouchableOpacity onPress={handleLogin} style={styles.button}>
    <Text style={styles.buttonText}>Login</Text>
  </TouchableOpacity>
</View>


        <View style={styles.link1}>
        <Pressable onPress={() => router.replace("/(authenticate)/register")}>
          <Text style={styles.link1}>Don't have an account? Register here</Text>
        </Pressable>
        </View>

        <View style={styles.link2}>
        <Pressable onPress={() => router.replace("/(authenticate)/forgot")}>
          <Text style={styles.link2}>Forgot Password?</Text>
        </Pressable>
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
    paddingBottom: 10, 
    paddingTop: 50, 
  },
  inputContainer: {
    flexDirection: "row", 
    alignItems: "center", 
    width: "100%",
    height: 50,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#858080",
    borderRadius: 25,
    paddingHorizontal: 15,
    backgroundColor: "rgba(133, 128, 128, 0.4)", 
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

  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 10, 
  },

  button: {
    width: "90%",
    height: 45,
    backgroundColor: "#FCC873",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: 'center',
    marginBottom: 20, 
    marginTop: 10,
    borderWidth: 1,
},

link1:{
    width: "100%",
    marginTop: 0,
    marginBottom: 10, 
    color: "grey",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 17,
},
link2:{
    width: "100%",
    marginTop: 0,
    marginBottom: 20, 
    color: "grey",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 17,
},

  buttonText: {
    color: "black",
    fontSize: 18,
  },

  logoContainer: {
    position: "absolute",
    top: 30, 
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  logo: {
    width: 320, 
    height: 320, 
    resizeMode: "contain", 
  },
  elegantText: {
    fontFamily: "Quicksand",
    marginTop: -95, 
    color: "#D3D3D3", 
    fontSize: 20, 
  },
});

export default Login;
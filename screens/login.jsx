import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";
import { login } from "../firebase/auth";
import COLORS from "../constants/colors";
import { router } from "expo-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const credentials = await login(email, password);
      console.log("credentials", credentials);
      router.replace("/(tabs)/home");
    } catch (error) {
      console.log("error", JSON.stringify(error));
      setError(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} color={COLORS.primary} />
      <Pressable onPress={() => router.replace("/(authenticate)/register")}>
        <Text style={styles.link}>Don't have an account? Register here</Text>
      </Pressable>
      <Pressable onPress={() => router.replace("/(authenticate)/forgot")}>
        <Text style={styles.link}>Forgot Password?</Text>
      </Pressable>
      {error ? <Text style={styles.error}>{error.code}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 20,
    width: "100%",
  },
  link: {
    marginTop: 10,
    color: COLORS.primary,
  },
  error: {
    color: "red",
    marginTop: 10,
  },
});

export default Login;

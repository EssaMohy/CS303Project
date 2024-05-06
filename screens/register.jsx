import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  Pressable,
  StyleSheet,
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Make Your Account</Text>
      <TextInput
        placeholder="Name"
        value={userName}
        onChangeText={setUserName}
        style={styles.input}
      />
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
      <Button title="Register" onPress={handlePress} color={COLORS.primary} />
      <Pressable onPress={() => router.replace("/(authenticate)/login")}>
        <Text style={styles.link}>Login</Text>
      </Pressable>
      <Pressable onPress={() => router.replace("/(authenticate)/forgot")}>
        <Text style={styles.link}>Forgot Password</Text>
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

export default Register;

import { StyleSheet, Text, View, Button, TouchableOpacity, ScrollView, Image, TextInput } from "react-native";
import React, { useState } from "react";
import { logout } from "../../../firebase/auth";

const Profile = () => {
  const handleSignOut = async () => {
    try {
      await logout(); // Call the signOut function
      // Handle successful sign out, navigate to login screen or other appropriate action
    } catch (error) {
      console.log("Error signing out:", error);
    }
  };

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSaveProfile = () => {
    // Here you can save the profile information to your backend or AsyncStorage
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: "black", fontSize: 24 }}> My Profile</Text>

      <Image source={require("../../../assets/images/icon.png")} style={styles.image} />

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity onPress={handleSaveProfile} style={styles.button}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 80,
    backgroundColor: '#f0f0f0', // Off-white background color
  },
  image: {
    width: 170,
    height: 170,
    borderRadius: 100,
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 14,
    paddingLeft: 15,
    marginBottom: 10,
    borderWidth: 1,  // Add border width
    borderColor: '#FCC873',
  },
  button: {
    width: '80%',
    height: 60,
    backgroundColor: '#FCC873',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
  },
});

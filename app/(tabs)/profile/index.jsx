import { StyleSheet, Text, View, Button,TouchableOpacity } from "react-native";
import React from "react";
import { signOut} from "../../../firebase/auth"; // Import the signOut function from your Firebase authentication module
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

  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
          <Text style={styles.buttonText}>LogOut</Text>
        </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#FCC873",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    top: 50,
    borderWidth:1,
  },
  buttonText: {
    color: "black",
    fontSize: 18,
  alignItems:"center",
  },
});
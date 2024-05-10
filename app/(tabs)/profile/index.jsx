import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { logout } from "../../../firebase/auth";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import SettingBar from "../../../components/SettingBar";
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
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: 5,
        backgroundColor: "white",
        borderTopLeftRadius: 30, // Adjust the radius as needed
        borderTopRightRadius: 30,
      }}
    >
      <View
        style={{
          width: "80%",
          height: 160,
          marginHorizontal: "10%",
          marginTop: 20,
          flexDirection: "row",
        }}
      >
        <View style={{ padding: 5 }}>
          <Image
            source={require("../../../assets/images/person.png")}
            style={{
              width: 130,
              height: 130,
              borderRadius: 999,
              marginVertical: 15,
            }}
          />
        </View>
        <View
          style={{
            borderRightWidth: 2,
            borderRightColor: "#9C9C9C",
            marginHorizontal: "5%",
            padding: 10,
            height: "80%",
            marginVertical: "10%",
          }}
        />
        <View style={{ padding: 5, marginVertical: "20%" }}>
          <Text style={{ color: "#222222", fontSize: 16 }}>Joined</Text>
          <Text style={{ color: "#9C9C9C", fontSize: 16 }}>2 mon ago</Text>
        </View>
      </View>
      <View style={{ padding: 25 }}>
        <Text style={{ color: "#222222", fontSize: 18 }}>Hoang Toddy</Text>
        <Text style={{ color: "#9C9C9C", fontSize: 14 }}>Trinh Huu</Text>
      </View>
      <SettingBar name={"My info"} iconName={"info"} />
      <SettingBar name={"Setting"} iconName={"settings"} />
      <SettingBar name={"policy"} iconName={"policy"} />
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleSignOut}
        style={{
          width: "35%",
          height: 40,
          backgroundColor: "gray",
          marginHorizontal: "5%",
          borderRadius: 999,
          flexDirection: "row",
          marginVertical: 30,
          padding: 10,
        }}
      >
        <AntDesign name="logout" size={20} color="red" />
        <View style={{ marginLeft: 8 }}>
          <Text style={{ color: "#fff", fontSize: 16 }}>Sign Out</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingBottom: 75,
    backgroundColor: "white", // Off-white background color
    borderTopLeftRadius: 30, // Adjust the radius as needed
    borderTopRightRadius: 30, // Adjust the radius as needed
  },
  outerWrapper: {
    padding: 15, // This padding allows the plus icon to overlap the image
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 85,
  },
  imageContainer: {
    width: 170,
    height: 170,
    borderRadius: 85,
    overflow: "hidden",
    borderWidth: 0.5,
    borderColor: "#FCC873",
    justifyContent: "center", // Center horizontally
    alignItems: "center", // Center vertically
    position: "relative",
  },
  plusIcon: {
    position: "absolute",
    bottom: 16, // Position the plus button to overlap the profile picture at the bottom
    right: 33, // Position the plus button to overlap the profile picture on the right
    backgroundColor: "#FCC873",
    borderRadius: 18, // Make the plus button circular
    width: 33, // Adjust the size of the plus button
    height: 33, // Adjust the size of the plus button
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#f0f0f0",
  },
  plusIconText: {
    color: "#f0f0f0",
    fontSize: 28,
    lineHeight: 30, // Center the plus icon vertically
  },
  input: {
    width: "90%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingLeft: 45,
    marginBottom: 3,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderColor: "#ddd", // Light grey border color
    borderWidth: 1,
  },
  button: {
    width: "80%",
    height: 50,
    backgroundColor: "#FCC873", // iOS blue button color
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  imagePickerModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  pickImageButton: {
    backgroundColor: "#FCC873",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  pickImageButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#FCC873",
    padding: 10,
    borderRadius: 10,
  },
  cancelButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    position: "relative", // Add this line
  },
  icon: {
    position: "absolute",
    left: 15,
    zIndex: 1, // Ensure the icon is above the TextInput
  },
});


import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import defaultProfileImg from "../../../assets/images/person.png";

const ProfileEdit = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [showImagePicker, setShowImagePicker] = useState(false);

  const handleSaveProfile = () => {
    // Here you can save the profile information to your backend or AsyncStorage
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
      setShowImagePicker(false); // Hide the image picker modal
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: "black", fontSize: 24 }}> My Profile</Text>

      <View style={styles.outerWrapper}>
        {image ? (
          <View style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
          </View>
        ) : (
          <View style={styles.imageContainer}>
            <Image source={defaultProfileImg} style={styles.image} />
          </View>
        )}
        <TouchableOpacity
          onPress={() => setShowImagePicker(true)}
          style={styles.plusIcon}
        >
          <Text style={styles.plusIconText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Ionicons
          name="person-outline"
          size={24}
          color="#FCC873"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons
          name="mail-outline"
          size={24}
          color="#FCC873"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#999"
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons
          name="lock-closed-outline"
          size={24}
          color="#FCC873"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#999"
          secureTextEntry
        />
      </View>

      <TouchableOpacity onPress={handleSaveProfile} style={styles.button}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
      {/* Image Picker Modal */}
      <Modal visible={showImagePicker} animationType="slide" transparent={true}>
        <View style={styles.imagePickerModal}>
          <TouchableOpacity onPress={pickImage} style={styles.pickImageButton}>
            <Text style={styles.pickImageButtonText}>
              Change profile picture
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowImagePicker(false)}
            style={styles.cancelButton}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default ProfileEdit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 75,
    backgroundColor:"white", // Off-white background color
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
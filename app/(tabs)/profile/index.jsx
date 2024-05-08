import { StyleSheet, Text, View, Button, TouchableOpacity, ScrollView, Image, TextInput, Modal, ImageBackground } from "react-native";
import React, { useState } from "react";
import { logout } from "../../../firebase/auth";
import * as ImagePicker from 'expo-image-picker';

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
  const [image, setImage] = useState(null);
  const [showImagePicker, setShowImagePicker] = useState(false);

  const handleSaveProfile = () => {
    // Here you can save the profile information to your backend or AsyncStorage
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
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

      <TouchableOpacity onPress={() => setShowImagePicker(true)} style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      {image && 
        <ImageBackground source={{ uri: image }} style={styles.image} />
      }

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

      {/* Image Picker Modal */}
      <Modal
        visible={showImagePicker}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.imagePickerModal}>
          <TouchableOpacity onPress={pickImage} style={styles.pickImageButton}>
            <Text style={styles.pickImageButtonText}>Pick an image from camera roll</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowImagePicker(false)} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
    borderRadius:85,
  },
  addButton: {
    position: 'absolute',
    top: 20,
    right: 10,
    backgroundColor: '#FCC873',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 14,
    paddingLeft: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#FCC873',
  },
  button: {
    width: '60%',
    height: 50,
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
  imagePickerModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pickImageButton: {
    backgroundColor: '#FCC873',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    
  },
  pickImageButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight:'bold',
  },
  cancelButton: {
    backgroundColor: '#FCC873',
    padding: 10,
    borderRadius: 10,
  },
  cancelButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight:'bold',
  },
});

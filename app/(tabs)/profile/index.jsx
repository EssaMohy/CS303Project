import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Ionicons , AntDesign } from "@expo/vector-icons";
import defaultProfileImg from "../../../assets/images/person.png";
import { getUserUId , logout } from "../../../firebase/auth";
import { getUserById } from "../../../firebase/user";
import { db, storage } from "../../../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";


const ProfileEdit = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [usercart, setUserCart] = useState([]);
 const [balance, setBalance] = useState(0);
  const handleSaveProfile = () => {
    // Here you can save the profile information to your backend or AsyncStorage
    getUserUId().then((id) => {
      //console.log(id);
      getUserById(id).then((user) => {
        console.log("user",user);
        setName(user[0].name);
        setEmail(user[0].email);
        setImage(user[0].image);
        setUserCart(user[0].cart);
        setBalance(user[0].balance);
      });
    });
  };
  useEffect(() => {
    handleSaveProfile();
  }, []);

  const uploadImageAsync = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
    try {
      const storageRef = ref(storage, `Images/image-${Date.now()}`);
      console.log("storageRef", storageRef);
      const result = await uploadBytes(storageRef, blob);
      console.log("result", result);
      blob.close();
      return await getDownloadURL(storageRef);
    } catch (error) {
      console.log(`Error : ${error}`);
    }
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("result image", result);

    if (!result.canceled) {
      const uploadURL = await uploadImageAsync(result.assets[0].uri);
      setImage(uploadURL);
    } else {
      setImage(null);
    }
  };
  const handleUpdate = () => {
    try {
      getUserUId().then((id) => {
        user_id = id;
        setDoc(doc(db, "users", user_id), {
          id: id,
          email,
          name: name,
          Role: "User",
          image,
          cart: usercart,
          balance: balance,
        }).then(() => {
          Alert.alert(
            "Profile Updated!",
            "Your profile has been updated successfully."
          );
        });
      });
    } catch (err) {
      console.log(err.massage);
    }
  };

  const handleSignOut = async () => {
    try {
      await logout(); 
      
    } catch (error) {
      console.log("Error signing out:", error);
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

      <TouchableOpacity onPress={handleUpdate} style={styles.button}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
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


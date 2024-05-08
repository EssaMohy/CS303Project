import { StyleSheet, Text, View, Button,TouchableOpacity,ScrollView,ImageBackground,Image, TextInput } from "react-native";
import React, {useState} from "react";
import { signOut} from "../../../firebase/auth"; // Import the signOut function from your Firebase authentication module
import { logout } from "../../../firebase/auth";
import user from "../../../assets/images/icon.png";


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
    <ImageBackground
      source={require("../../../assets/images/gg.jpg")}
      style={styles.background}
      blurRadius={4}
    >

    <View style={styles.container}>
      <Text style={{color: "black",fontSize: 24, }}> My Profile</Text>
     
      <Image source={user}
      style={styles.image}
      ></Image>
      
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
  </ImageBackground>
 
  );
};

export default Profile;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom:50, // Adjust this value to increase or decrease the space between the top of the screen and the image
  },
  image: {
    width: 170,
    height: 170,
    borderRadius:100,
  },
  textcont:{
   alignContent:"center",
   marginBottom:200,

  },
  text:{
    fontSize: 24,
    fontFamily: "Quicksand",
    marginBottom: 0,
    color: "white",
  },

  input: {
    width: '80%',
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    paddingLeft: 15,
    marginBottom: 10,
  },
  button: {
    width: '60%',
    height: 50,
    backgroundColor: '#FCC873',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:50,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
  
  },
});
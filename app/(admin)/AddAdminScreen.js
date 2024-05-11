import React, { useState } from "react";
import {
  View,
  Text,
  Keyboard,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { addUserData, getUserUId, register } from "../../firebase/auth";
import { addUser } from "../../firebase/user";
import Button from "../../components/Button";
import Input from "../../components/Input";
const RegistrationScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = React.useState({});


  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    let user_id;

    if (!email) {
      handleError("Please enter email", "email");
      isValid = false;
    } else if (!email.match(/\S+@\S+\.\S+/)) {
      handleError("Please enter a valid email", "email");
      isValid = false;
    }

    if (!name) {
      handleError("Please enter fullname", "fullname");
      isValid = false;
    }
   

   

    if (!password) {
      handleError("Please enter password", "password");
      isValid = false;
    }

    if (isValid) {
      console.log("valid", isValid);
      register(name,email, password)
      
        .then(() => {
          getUserUId().then((id) => {
            user_id = id;
            console.log("id", id);
            addUserData({
              id: id,
              email,
              name,
              Role: "Admin",
              image:
                "https://64.media.tumblr.com/d82d24956974272dff1f745a004a43bf/tumblr_o51oavbMDx1ugpbmuo3_540.png",
            });
          });
         
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };
  function handleChangeStartDate(propDate) {
    setStartedDate(propDate);
  }

  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
  };
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}
      >
        <Text style={{ color: "black", fontSize: 40, fontWeight: "bold" }}>
          Add Admin
        </Text>
        <Text style={{ color: '#BABBC3', fontSize: 18, marginVertical: 10 }}>
          Enter Admin Details
        </Text>
        <View style={{  }}>
          <Input
            value={email}
            onChangeText={setEmail}
            onFocus={() => handleError(null, email)}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors.email}
          />

          <Input
            value={name}
            onChangeText={setName}
            onFocus={() => handleError(null, name)}
            iconName="account-outline"
            label="Name"
            placeholder="Enter your  name"
            error={errors.name}
          />
         

         
          <Input
            value={password}
            onChangeText={setPassword}
            onFocus={() => handleError(null, password)}
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            error={errors.password}
            password
          />
          
          <Button title="Add Admin" onPress={validate} />
        
        </View>
      </ScrollView>
    </View>
  );
};

export default RegistrationScreen;
const styles = StyleSheet.create({
  textHeader: {
    fontSize: 36,
    marginVertical: 60,
    color: "#111",
  },
  textSubHeader: {
    fontSize: 25,
    color: "#111",
  },
  inputBtn: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "#222",
    height: 50,
    paddingLeft: 8,
    fontSize: 18,
    justifyContent: "center",
    marginTop: 14,
  },
  submitBtn: {
    backgroundColor: "#342342",
    paddingVertical: 22,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 12,
    marginVertical: 16,
  },
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#080516",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    padding: 35,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

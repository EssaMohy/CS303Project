import { View, Text, StyleSheet } from "react-native";
import { Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const SplashScreen = () => {
  return (
    <LinearGradient
      // Gradient colors array
      colors={['#696969', '#FFFFFF']}
      // Style for the LinearGradient component
      style={styles.gradient}
    >
    <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/Logo.png")}
          style={styles.logo}
        />
        <Text style={styles.elegantText}>Elevate Every Day</Text>
      </View>
      </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  logo: {
    width: 350, // Increase the width of your logo
    height: 350, // Increase the height of your logo
    resizeMode: "contain",// Keeps the aspect ratio intact
    marginTop: -30, 
  },
  elegantText: {
    fontFamily: "Quicksand Light",
    marginTop: -85, // Decrease the space between logo and text to move up
    color: "#BD8334", // Light color for contrast
    fontSize: 20, // Increase font size
  },
});

export default SplashScreen;

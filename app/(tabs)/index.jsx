import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Home from "../../screens/home";
import Register from "../../screens/register";

const index = () => {
  return <Register></Register>;
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

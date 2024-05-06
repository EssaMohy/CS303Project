import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Home from "../../../screens/home";

const index = () => {
  return <Home></Home>;
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

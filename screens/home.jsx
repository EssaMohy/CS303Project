import { StyleSheet, Text, View } from "react-native";
import React from "react";

const home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headingtxt}>Hello</Text>
      <Text style={styles.headingtxt2}>Choose your top brands</Text>
    </View>
  );
};

export default home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  headingtxt: {
    fontSize: 35,
    fontWeight: "600",
    color: "#233B6F",
    marginTop: 10,
  },
  headingtxt2: {
    fontSize: 25,
    fontWeight: "400",
    color: "black",
  },
});

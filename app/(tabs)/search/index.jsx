import { StyleSheet, Text, View } from "react-native";
import React from "react";

const search = () => {
  return (
    <View style={styles.container}>
      <Text>search</Text>
    </View>
  );
};

export default search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"white",
    borderTopLeftRadius: 30, // Adjust the radius as needed
    borderTopRightRadius: 30, // Adjust the radius as needed
  },
});

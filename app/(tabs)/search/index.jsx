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
  },
});

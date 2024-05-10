import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import brands from "../data/brands";

export default function Brands() {
  return (
    <View>
      <ScrollView
        horizontal
        contentContainerStyle={{
          gap: 10,
          paddingVertical: 10,
        }}
      >
        {brands.map((item, index) => (
          <TouchableOpacity key={index}>
            <Image source={{ uri: item.image }} style={styles.image}></Image>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
});

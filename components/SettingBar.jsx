import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
const SettingBar = ({ name, iconName }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        width: "90%",
        height: 40,
        backgroundColor: "#6f6e74",
        marginHorizontal: "5%",
        borderRadius: 999,
        flexDirection: "row",
        padding: 8,
        marginVertical: 10,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flex: 1, flexDirection: "row" }}>
          <MaterialIcons name={iconName} size={26} color="white" />
          <Text style={{ color: "#fff", fontSize: 17, marginLeft: 10 }}>
            {name}
          </Text>
        </View>

        <View>
          <Ionicons name="chevron-forward" size={26} color="white" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SettingBar;

import { View, Text } from "react-native";
import React from "react";
import { Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

const SearchCard = ({ image, name, price,favorite }) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 8,
      }}
    >
      <View
        style={{
          width: "92%",
          height: "auto",
          backgroundColor: "#FAF9F6",
          marginHorizontal: "4%",
          borderRadius: 22,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            marginHorizontal: 2,
            width: "40%",
            marginVertical: "1.5%",
          }}
        >
          <Image
            style={{ height: 100, width: "100%", borderRadius: 17 }}
            source={{ uri: image }}
          />
        </View>
        <View style={{ width: "60%", padding: 10 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginRight: 20,
            }}
          >
            <Text style={{ fontSize: 16, color: "#222222" }}>{name}</Text>
            <Ionicons
              style={{
                marginTop: 3,
              }}
              name={favorite?"backspace":"bookmark"}
              color={"#222222"}
              size={favorite?25:20}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginRight: 20,
            }}
          >
            <BlurView
              tint="default"
              intensity={100}
              style={{ width: 50, overflow: "hidden", borderRadius: 20 }}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: "#222222",
                  marginTop: 4,
                  marginLeft: 2,
                }}
              >
                {price} LE
              </Text>
            </BlurView>
            
          </View>
        </View>
      </View>
    </View>
  );
};

export default SearchCard;
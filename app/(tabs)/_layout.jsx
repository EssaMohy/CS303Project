import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import colors from "@/constants/colors";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#233B6F",
        tabBarStyle: {
          position: "absolute",
          bottom: 25,
          left: 20,
          right: 20,
          backgroundColor: "#FCC873",
          borderRadius: 20,
          height: 60,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="search-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="bag-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="user" size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

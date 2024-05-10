import { StyleSheet, Text, View , Keyboard , StatusBar , colorScheme} from "react-native";
import React, { useEffect, useState } from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";

export default function Layout() {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setIsKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setIsKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  return (
    <> 
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content' } />
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
          opacity: isKeyboardVisible ? 0 : 1,
        },
        headerShown:false,
        headerStyle: {
          backgroundColor: "transparent",
          borderBottomLeftRadius: 30, // Adjust the radius as needed
          borderBottomRightRadius: 30, // Adjust
        },
        headerShadowVisible: false,
        headerTitle: "EON",
        headerStyle: {
          backgroundColor: "transparent",
          height: 85,
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
    </>
  );
}

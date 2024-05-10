import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView,Keyboard,StatusBar, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { TextInput } from "react-native";
import { FlatList } from "react-native";
import SearchCard from "../../../components/SearchCard";
const search = ({search}) => {
  const data = [
    {
      image: "https://watchesofmayfair.com.au/media/catalog/product/cache/802bc0ad6eb1824c36662c78b0bb3dfe/r/o/rolex-submariner-date-116613ln_image-01.png",
      name: "Rolex Submariner",
      type: "Eng | Fiction | 2h10m",
      price: "100",
      id: 1,
    },
    {
      image: "https://watchesofmayfair.com.au/media/catalog/product/cache/802bc0ad6eb1824c36662c78b0bb3dfe/r/o/rolex-submariner-date-116613ln_image-01.png",
      name: "Harry Potter 2",
      type: "Eng | Fiction | 2h10m",
      price: "100",
      id: 2,
    },
    {
      image: "https://watchesofmayfair.com.au/media/catalog/product/cache/802bc0ad6eb1824c36662c78b0bb3dfe/r/o/rolex-submariner-date-116613ln_image-01.png",
      name: "Harry Potter 3",
      type: "Eng | Fiction | 2h10m",
      price: "100",
      id: 3,
    },
    {
      image:"https://watchesofmayfair.com.au/media/catalog/product/cache/802bc0ad6eb1824c36662c78b0bb3dfe/r/o/rolex-submariner-date-116613ln_image-01.png",
      name: "Harry Potter 4",
      type: "Eng | Fiction | 2h10m",
      price: "100",
      id: 4,
    },
    {
      image:"https://watchesofmayfair.com.au/media/catalog/product/cache/802bc0ad6eb1824c36662c78b0bb3dfe/r/o/rolex-submariner-date-116613ln_image-01.png",
      name: "Harry Potter 5",
      type: "Eng | Fiction | 2h10m",
      price: "100",
      id: 5,
    },
    {
      image:"https://watchesofmayfair.com.au/media/catalog/product/cache/802bc0ad6eb1824c36662c78b0bb3dfe/r/o/rolex-submariner-date-116613ln_image-01.png",
      name: "Harry Potter 6",
      type: "Eng | Fiction | 2h10m",
      price: "100",
      id: 6,
    }
  ];
  return (
    <SafeAreaView
    style={{  flex: 1, backgroundColor: "white"  }}
  >
      <View
        style={{
          flexDirection: "row",
          padding: 10,
        }}
      >
        <View
          style={{
            flex: 1,
            height: 50,
            borderRadius: 15,
            flexDirection: "row",
            backgroundColor: "#E5E5E5",
            alignItems: "center",
            paddingHorizontal: 10,
          }}
        >
          <TextInput
            style={{
              flex: 1,
              height: 40,
              backgroundColor: "transparent",
              borderBottomWidth: 0,
              fontSize: 16,
              color: "#000",
            }}
            placeholder="Search"
            placeholderTextColor={"#222222"}
            //value={searchQuery}
          />
        </View>
        <View
          style={{
            width: 50,
            height: 50,
            marginLeft: 5,
            backgroundColor: "#e98c5e",
            borderRadius: 15,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {search ? (
            <Icon
              name="cancel"
              size={28}
              color={"white"}
              // onPress={clearSearch} // Trigger handleSearch when the search icon is clicked
            />
          ) : (
            <Icon
              name="search"
              size={28}
              color={"white"}
              // onPress={handleSearch} // Trigger handleSearch when the search icon is clicked
            />
          )}
        </View>
      </View>
        <View style={{ flex: 1, }}>
        <FlatList
          data={data}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SearchCard
              name={item.name}
              image={item.image}
              price={item.price}
              type={item.type}
            />
          )}
        />
        </View>
        <View style={{ height:100}}></View>

  </SafeAreaView>
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

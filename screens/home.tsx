import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import CategoryButtons from "../components/CategoryButtons";
import Listings from "@/components/Listings";
import ListingData from "@/data/destinations.json";
import Brands from "@/components/brands";

const home = () => {
  const [category, setCategory] = useState<string>("Trending");

  const onCatChanged = (category: string) => {
    console.log("Category: ", category);
    setCategory(category);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headingtxt}>Hello</Text>
      <Text style={styles.headingtxt2}>Choose your top brands</Text>

      <CategoryButtons onCategoryChanged={onCatChanged}></CategoryButtons>

      <Listings listings={ListingData} category={category}></Listings>

      <Text style={styles.headingtxt2}>Top Deals</Text>
      <Image
        source={{
          uri: "https://specials-images.forbesimg.com/imageserve/6633a0d4fc14cc1b894daf7e/Best-Watches-For-Men-2024/960x0.jpg?fit=scale",
        }}
        style={styles.image}
      ></Image>
      <Text style={styles.headingtxt2}>Search by brand</Text>
      <Brands></Brands>
      <Text style={styles.headingtxt2}>Latest Products</Text>
      <Listings listings={ListingData} category={category}></Listings>

      <Text> </Text>
      <Text> </Text>
      <Text> </Text>
      <Text> </Text>
      <Text> </Text>
    </ScrollView>
  );
};

export default home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    borderTopLeftRadius: 30, // Adjust the radius as needed
    borderTopRightRadius: 30, // Adjust the radius as needed
    backgroundColor:"white",
  },
  headingtxt: {
    fontSize: 35,
    fontWeight: "600",
    color: "#233B6F",
    marginTop: 10,
  },
  headingtxt2: {
    fontSize: 20,
    fontWeight: "400",
    color: "black",
  },
  image: {
    width: 320,
    height: 200,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
});

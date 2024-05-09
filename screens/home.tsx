import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import CategoryButtons from "../components/CategoryButtons";
import Listings from "@/components/Listings";
import ListingData from '@/data/destinations.json';

const home = () => {
  const[category, setCategory] = useState<string>('Trending'); 

  const onCatChanged = (category: string) => {
    console.log("Category: ", category);
    setCategory(category);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headingtxt}>Hello</Text>
      <Text style={styles.headingtxt2}>Choose your top brands</Text>

      <CategoryButtons onCategoryChanged={onCatChanged}></CategoryButtons>

      <Listings listings={ListingData}></Listings>

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

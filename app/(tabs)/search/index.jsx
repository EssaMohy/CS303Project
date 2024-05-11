import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  StatusBar,
  StyleSheet,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { TextInput } from "react-native";
import { FlatList } from "react-native";
import SearchCard from "../../../components/SearchCard";
import { getProducts } from "../../../firebase/products";
const search = ({ search }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const getProductHandle = async () => {
    const products = await getProducts();
    let allProducts = [];

    for (const product of products) {
      allProducts.push({ ...product });
    }

    if (searchTerm) {
      const filteredProductsArr = allProducts.filter((product) =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filteredProductsArr);
    } else {
      setFilteredProducts(allProducts);
    }
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
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
            value={searchTerm}
            onChangeText={(query) => setSearchTerm(query)}
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
          <Icon
            name="search"
            size={28}
            color={"white"}
            onPress={getProductHandle} // Trigger handleSearch when the search icon is clicked
          />
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={filteredProducts}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SearchCard
              name={item.productName}
              image={item.imageURL}
              price={item.price}
              type={item.type}
            />
          )}
        />
      </View>
      <View style={{ height: 100 }}></View>
    </SafeAreaView>
  );
};

export default search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
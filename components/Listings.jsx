import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ListingType } from "@/app/types/listingTypes";
import Colors from "@/constants/colors";
import { Link } from "expo-router";



const Listings = ({ listings, category }) => {
  const [loading, setLoading] = useState(false);

  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  useEffect(() => {
    console.log("update listing");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [category]);

  const renderItems = ({
    item,
  } ) => {
    return (
      <Link href={`/listing/${item.id}`} asChild>
        <View style={styles.item}>
          <TouchableOpacity>
            <View>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.overlay}>
                <Text
                  style={styles.brandtxt}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.brand}
                </Text>
                <Text style={styles.price}>${item.price}</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleAddToCart(item)}
            style={styles.addButton}
          >
            <Text style={styles.addButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </Link>
    );
  };

  return (
    <View>
      <FlatList
        data={loading ? [] : listings}
        renderItem={renderItems}
        horizontal
        showsHorizontalScrollIndicator={false}
      ></FlatList>
    </View>
  );
};

export default Listings;

const styles = StyleSheet.create({
  item: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 10,
    marginRight: 20,
    width: 185,
  },
  image: {
    width: 165,
        height: 157,
    borderRadius: 10,
    marginBottom: 50,
  },
  overlay: {
    alignContent: "space-between",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    paddingVertical: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  brandtxt: {
    fontSize: 18,
    fontWeight: "600",
    color: "#233B6F",
  },
  price: {
    fontSize: 15,
    fontWeight: "600",
    color: "black",
  },
  addButton: {
    backgroundColor: "#FCC873",
    padding: 5,
    borderRadius: 15,
    marginTop: 5,
    alignItems: "center",
  },
  addButtonText: {
    color: "black",
    fontWeight: "bold",
  },
});

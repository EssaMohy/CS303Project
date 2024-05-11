import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Button,
  ActivityIndicator,
  Platform,
  StatusBar,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import CartCard from "../../../components/Cartacard";
import { useState } from "react";

const Cart = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [ClearLoading, setClearLoading] = useState(false);
  //const [data, setData] = useState([]);
  const data = [
    {
      id: 1,
      name: "item1",
      price: 10,
      image:
        "https://watchesofmayfair.com.au/media/catalog/product/cache/802bc0ad6eb1824c36662c78b0bb3dfe/r/o/rolex-submariner-date-116613ln_image-01.png",
      quantity: 1,
    },
    {
      id: 2,
      name: "item2",
      price: 20,
      image:
        "https://watchesofmayfair.com.au/media/catalog/product/cache/802bc0ad6eb1824c36662c78b0bb3dfe/r/o/rolex-submariner-date-116613ln_image-01.png",
      quantity: 2,
    },
    {
      id: 3,
      name: "item3",
      price: 30,
      image:
        "https://watchesofmayfair.com.au/media/catalog/product/cache/802bc0ad6eb1824c36662c78b0bb3dfe/r/o/rolex-submariner-date-116613ln_image-01.png",
      quantity: 3,
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      {isLoading || ClearLoading ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
          }}
        >
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        <>
          <View style={styles.header}>
            <TouchableOpacity style={{ flex: 1, justifyContent: "center" }}>
              <AntDesign name={null} size={24} color="#393F42" />
            </TouchableOpacity>

            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text
                style={{ color: "black", fontSize: 20, alignSelf: "center" }}
              >
                Cart
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "red" }}>delete all</Text>
            </View>
          </View>
          <View style={styles.upperContentLine} />
          {data.length ? (
            <FlatList
              data={data}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <CartCard
                  itemName={item.name}
                  id={item.id}
                  itemQuantity={item.quantity}
                  itemImage={item.image}
                  itemPrice={item.price}
                />
              )}
            />
          ) : (
            <View style={styles.emptyMessage}>
              <Text style={styles.emptyText}>العربة فارغة</Text>
            </View>
          )}
          <View style={styles.totalPrice}>
            <Text style={styles.totalPriceText}> المجموع : </Text>
            <Text style={styles.totalPriceText}>5555</Text>
          </View>

          <View style={styles.button}>
            <Button
              style={{ height: 44, radius: 20, color: "#FE5900" }}
              title={"Check Out"}
            />
          </View>
          <View style={{ height:75}}></View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 7,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ?StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: "row",
    marginTop: 10,
  },
  upperContentLine: {
    borderBottomWidth: 0.2,
    marginTop: 10,
    width: "100%",
  },
  button: {
    backgroundColor: "#FE5900",
    height: 44,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
    width: "95%",
    marginHorizontal: "2.5%",
  },
  button1: {
    width: "100%",
    borderRadius: 1,
  },
  emptyMessage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "black",
  },
  totalPrice: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 5,
    padding: 5,
    backgroundColor: "transparent",
  },
  totalPriceText: {
    fontWeight: "500",
    fontSize: 14,
    color: "#393F42",
  },
});

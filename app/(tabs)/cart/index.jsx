import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Platform,
  StatusBar,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import CartCard from "../../../components/Cartacard";
import { useEffect, useState } from "react";
import { getProductByID } from "../../../firebase/products";
import { getCurrUserId, getUserById, updateUser } from "../../../firebase/user";
import Button from "../../../components/Button";
import { getTotalCash } from "../../../firebase/cart";

const Cart = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userCart, setUserCart] = useState([]);
  const [ProductInCart, setProductInCart] = useState([]);
  const [ClearLoading, setClearLoading] = useState(false);
  const [totalInCash, setTotalInCash] = useState(0);
  const user_id = getCurrUserId();
console.log(userCart);
  const getProductHandle = async () => {
    let allProducts = [];
    // setRefreshing(true);
    for (const product of userCart) {
      const getProdduct = await getProductByID(product.product_id);
      allProducts.push({
        ...getProdduct,
        id: product.product_id,
        qnt: product.qnt,
      });
    }
    // setRefreshing(false);
    setProductInCart(allProducts);
  };

  useEffect(() => {
    getProductHandle();
  }, [userCart]);
  const handelDelete = async () => {
    getUserById(user_id)
      .then((user) => {
        updateUser(user_id, { cart: [] }).then(() => {
          console.log("delete cart");
        });
      })
      .catch((err) => alert(err.message));
  };
  useEffect(() => {
    const user_id = getCurrUserId();
    getUserById(user_id).then((user) => setUserCart(user[0].cart));
  }, []);


  useEffect(() => {
    let totalCash = 0;
    const getTotal = async () => {
      await getTotalCash().then((total) => totalCash = total);
    }
    getTotal().then(() => setTotalInCash(totalCash));
  }, [totalInCash]);
 
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
              <Text onPress={handelDelete} style={{ color: "red" }}>
                delete all
              </Text>
            </View>
          </View>
          <View style={styles.upperContentLine} />
          {ProductInCart.length ? (
            <FlatList
              data={ProductInCart}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <CartCard
                  itemName={item.productName}
                  id={item.id}
                  itemQuantity={item.qnt}
                  itemImage={item.imageURL}
                  itemPrice={item.price}
                />
              )}
            />
          ) : (
            <View style={styles.emptyMessage}>
              <Text style={styles.emptyText}>your cart is empty</Text>
            </View>
          )}
          <View style={styles.totalPrice}>
            <Text style={styles.totalPriceText}> Total: </Text>
            <Text style={styles.totalPriceText}>{totalInCash}</Text>
          </View>

          <View style={styles.button}>
            <Button
             
              title={"Checkout"}
            />
          </View>
          <View style={{ height: 75 }}></View>
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
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
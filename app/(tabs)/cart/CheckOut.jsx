import {
  StyleSheet,
  StatusBar,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Modal,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import BasicProductList from "../../../components/BasicProductList";

const CheckOut = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [cartproduct, setCartproduct] = useState([
    {
      id: 1,
      title: "Rolex Submariner",
      price: 10000,
      quantity: 1,
    }
  ]);
  return (
    <SafeAreaView style={styles.container}>
 
    <View style={styles.topBarContainer}>
      <TouchableOpacity
      >
        <Ionicons
          name="arrow-back-circle-outline"
          size={30}
          color={"#707981"}
        />
      </TouchableOpacity>
      <View></View>
      <View></View>
    </View>
    <ScrollView style={styles.bodyContainer} showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
      <Text style={styles.primaryText}>Order Summary</Text>
      <ScrollView
        style={styles.orderSummaryContainer}
        nestedScrollEnabled={true}
      >
        {cartproduct.map((product, index) => (
          <BasicProductList
            key={index}
            title={product.title}
            price={product.price}
            quantity={product.quantity}
          />
        ))}
      </ScrollView>
      <Text style={styles.primaryText}>Total</Text>
      <View style={styles.totalOrderInfoContainer}>
        <View style={styles.list}>
          <Text>Order</Text>
          <Text>1000$</Text>
        </View>
        <View style={styles.list}>
          <Text>Delivery</Text>
          <Text>20$</Text>
        </View>
        <View style={styles.list}>
          <Text style={styles.primaryTextSm}>Total</Text>
          <Text style={styles.secondaryTextSm}>
           120$
          </Text>
        </View>
      </View>
      <Text style={styles.primaryText}>Contact</Text>
      <View style={styles.listContainer}>
        <View style={styles.list}>
          <Text style={styles.secondaryTextSm}>Email</Text>
          <Text style={styles.secondaryTextSm}>
            bukhtyar.haider1@gmail.com
          </Text>
        </View>
        <View style={styles.list}>
          <Text style={styles.secondaryTextSm}>Phone</Text>
          <Text style={styles.secondaryTextSm}>+92 3410988683</Text>
        </View>
      </View>
      <Text style={styles.primaryText}>Address</Text>
      <View style={styles.listContainer}>
        <TouchableOpacity
          style={styles.list}
        >
          <Text style={styles.secondaryTextSm}>Address</Text>
          <View>
            {country || city || streetAddress != "" ? (
              <Text
                style={styles.secondaryTextSm}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {address.length < 25
                  ? `${address}`
                  : `${address.substring(0, 25)}...`}
              </Text>
            ) : (
              <Text style={styles.primaryTextSm}>Add</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
      <Text style={styles.primaryText}>Payment</Text>
      <View style={styles.listContainer}>
        <View style={styles.list}>
          <Text style={styles.secondaryTextSm}>Method</Text>
          <Text style={styles.primaryTextSm}>Cash On Delivery</Text>
        </View>
      </View>

      <View style={styles.emptyView}></View>
    </ScrollView>
    <View style={styles.buttomContainer}>
   
        <TouchableOpacity
          style={styles.button} >
          <Text style={styles.buttonText}>Submit Order</Text>
          </TouchableOpacity>
  
    </View>
  </SafeAreaView>
  );
};

export default CheckOut;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirecion: "row",
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingBottom: 0,
    flex: 1,
  },
  topBarContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  toBarText: {
    fontSize: 15,
    fontWeight: "600",
  },
  bodyContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  orderSummaryContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    maxHeight: 220,
  },
  totalOrderInfoContainer: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#fff",
  },
  primaryText: {
    marginBottom: 5,
    marginTop: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
  list: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
    padding: 10,
  },
  primaryTextSm: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FB6831",
  },
  secondaryTextSm: {
    fontSize: 15,
    fontWeight: "bold",
  },
  listContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
  },
  buttomContainer: {
    width: "100%",
    padding: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },
  emptyView: {
    width: "100%",
    height: 20,
  },
  modelBody: {
    flex: 1,
    display: "flex",
    flexL: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  modelAddressContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    width: 320,
    height: 400,
    backgroundColor: "#fff",
    borderRadius: 20,
    elevation: 3,
  },  
});
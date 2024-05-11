import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getCurrUserId, getUserById, updateUser } from "../firebase/user";

const CartCard = ({
  itemName,
  id,
  itemPrice,
  itemColor,
  itemQuantity,
  itemImage,
  checked,
}) => {
  const [quantity, setQuantity] = useState(itemQuantity);
  const [isloading, setISLoading] = useState(false);
  const [showConfirmButton, setShowConfirmButton] = useState(false);
  const user_id = getCurrUserId();

  const handelDelete = async () => {
    getUserById(user_id)
    .then(user => {
      updateUser(user_id, { cart: [  ...user[0].cart,  ] }).then(() => {
        console.log("edit product");
      })
    })
    .catch(err => alert(err.message));
  };
const handelUpdate = async (id) => {
  getUserById(user_id)
  .then(user => {
    updateUser(user_id, { cart: [ ...user[0].cart, { product_id: id, qnt: quantity} ] }).then(() => {
      console.log("edit product");
    })
  })
  .catch(err => alert(err.message));
};
  const handleIncrement = () => {
    if (quantity < 12) {
      setQuantity((prevQuantity) => {
        setShowConfirmButton(true); // Show the button when quantity changes
        return prevQuantity + 1;
      });
    } else {
    alert("لا يمكنك زيادة الكمية المتاحة لهذا المنتج");
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => {
        setShowConfirmButton(true); // Show the button when quantity changes
        return prevQuantity - 1;
      });
    } else {
        alert("لا يمكنك تقليل الكمية المتاحة لهذا المنتج");
    }
  };
  
  return (
    <View style={[styles.cardContainer, isloading && styles.loadingContainer]}>
      {isloading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      )}

      <View style={styles.imageCard}>
        <Image
          source={{ uri: itemImage }}
          style={{ width: 100, height: 100, borderRadius: 10 }}
        />
      </View>

      <View style={styles.textCard}>
        <Text
          style={{
            fontWeight: "500",
            fontSize: 14,
            padding: 3,
            color: "#000000",
            textAlign: "right",
          }}
        >
          {itemName}
        </Text>
        {itemColor && (
          <Text
            style={{
              fontWeight: "500",
              fontSize: 14,
              color: "#000000",
              textAlign: "right",
            }}
          >
            {itemColor}
          </Text>
        )}
        <Text
          style={{
            fontWeight: "500",
            fontSize: 14,
            color: "#000000",
            textAlign: "right",
          }}
        >
          {itemPrice} EGP
        </Text>
      </View>

      <View
        style={{
          flexDirection: "column",
          width: "30%",
          backgroundColor: "transparent",
          justifyContent: "space-evenly",
          padding: 5,
          alignItems: "center",
        }}
      >
        <View />
        <View style={styles.cardOptions}>
          <View
            style={{
              backgroundColor: "#fff",
              marginHorizontal: 2,
              borderRadius: 999,
              borderColor: "#939393",
              borderWidth: 0.5,
            }}
          >
            <AntDesign
              name="plus"
              size={25}
              color="#393F42"
              onPress={handleIncrement}
            />
          </View>
          <Text
            style={{
              fontWeight: "bold",
              marginHorizontal: 5,
              color: "#939393",
            }}
          >
            {quantity}
          </Text>
          <View
            style={{
              backgroundColor: "#fff",

              borderRadius: 999,
              borderColor: "#939393",
              borderWidth: 0.5,
            }}
          >
            <AntDesign
              name="minus"
              size={25}
              color="#393F42"
              onPress={handleDecrement}
            />
          </View>
        </View>

        {showConfirmButton && (
          <View
            style={{
              backgroundColor: "tomato",
              width: "50%",
              alignItems: "center",
              marginVertical: "5%",
              height: 30,
              borderRadius: 5,
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                handelUpdate(id);
                setShowConfirmButton(false); // Optionally hide the button after pressing it
              }}
            >
              <Text style={{ color: "white", fontWeight: "400", fontSize: 14 }}>
                تاكيد
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    backgroundColor: "#FAF9F6",
    width: "95%",
    height: "auto",
    marginHorizontal: "2.5%",
    marginVertical: 10,
    borderRadius: 10,
  },

  imageCard: {
    width: "30%",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },

  textCard: {
    width: "35%",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: 5,
  },

  cardOptions: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  loadingContainer: {
    opacity: 0.5, // Adjust the opacity as needed
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)", // Adjust the background color and opacity
  },
});

export default CartCard;

import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { getUserUId, logout } from "../../firebase/auth";
import { getUserById, getUsers, subscribeUser } from "../../firebase/user";
import { getProducts, subscribeProduct } from "../../firebase/products";
import { router } from "expo-router";
import { auth } from "../../firebase/firebaseConfig";

const AdminHome = () => {
  const ss = () => {
    logout(auth).then(() => {
      console.log("sign out done");
    });
  };
  const [Users, setUsers] = useState([]);
  const [Products, setProducts] = useState([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [image, setimage] = useState(null);

  const getUsersHandle = async () => {
    const arr = await getUsers();
    setUsers(arr);
  };
  useEffect(() => {
    getUsersHandle();
  }, []);

  const getProductsHandle = async () => {
    const arr = await getProducts();
    setProducts(arr);
  };
  useEffect(() => {
    getProductsHandle();
  }, []);

  useEffect(() => {
    const unsubscribeUser = subscribeUser(({ change, snapshot }) => {
      if (change.type === "added") {
        getUsersHandle();
      }
      if (change.type === "modified") {
        getUsersHandle();
      }
      if (change.type === "removed") {
        getUsersHandle();
      }
    });
  }, []);
  useEffect(() => {
    const unsubscribe = subscribeProduct(({ change, snapshot }) => {
      if (change.type === "added") {
        getProductsHandle();
      }
      if (change.type === "modified") {
        getProductsHandle();
      }
      if (change.type === "removed") {
        getProductsHandle();
      }
    });
  }, []);
  useEffect(() => {
    getUserUId().then((id) => {
      //console.log(id);
      getUserById(id).then((user) => {
        // console.log(user);
        setEmail(user[0].email);
        setimage(user[0].image);
        setName(user[0].name);
      });
    });
  }, []);

  return (
    <ScrollView
      style={{
        padding: 22,
        backgroundColor: "#fff",
      }}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.userInfoSection}>
          <View style={{ flexDirection: "row", marginTop: 36 }}>
            <Avatar.Image source={{ uri: image }} size={60} />

            <View style={{ marginLeft: 5 }}>
              <Title
                style={[
                  styles.title,
                  {
                    marginTop: 20,
                    color: "#222222",
                    fontSize: 24,
                  },
                ]}
              >
                {name}
              </Title>
              <Title
                style={[
                  {
                    color: "#222222",
                    marginTop: -5,
                    fontSize: 14,
                    fontWeight: 600,
                  },
                ]}
              >
                Admin
              </Title>
            </View>
          </View>
        </View>

        <View style={styles.infoBoxWrapper}>
          <View
            style={[
              styles.infoBox,
              {
                borderRightColor: "#dddddd",
                borderRightWidth: 1,
              },
            ]}
          >
            <Title style={{ color: "#222222" }}>{Users.length}</Title>
            <TouchableRipple
              onPress={() => {
                router.navigate("/AllUsersScreen");
              }}
            >
              <Caption style={{ color: "#222222", fontSize: 15 }}>
                Users
              </Caption>
            </TouchableRipple>
          </View>
          <View
            style={[
              styles.infoBox,
              {
                borderRightColor: "#dddddd",
                borderRightWidth: 1,
              },
            ]}
          >
            <Title style={{ color: "#222222" }}>{Products.length}</Title>
            <TouchableRipple onPress={() => {}}>
              <Caption style={{ color: "#222222", fontSize: 15 }}>
                Products
              </Caption>
            </TouchableRipple>
          </View>

          <View style={styles.infoBox}>
            <Title style={{ color: "#222222" }}>-</Title>
            <Caption style={{ color: "#222222", fontSize: 15 }}>Orders</Caption>
          </View>
        </View>

        <View style={styles.menuWrapper}>
          <TouchableRipple
            onPress={() => {
              router.navigate("/AddProductScreen");
            }}
          >
            <View style={styles.menuItem}>
              <Ionicons name="add-circle-outline" size={27} color="#964B00" />
              <Text style={styles.menuItemText}>Add Product</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple
            onPress={() => {
              router.navigate("/DeleteProductScreen");
            }}
          >
            <View style={styles.menuItem}>
              <AntDesign name="delete" size={26} color="#964B00" />
              <Text style={styles.menuItemText}>Delete Product</Text>
            </View>
          </TouchableRipple>

          <TouchableRipple
            onPress={() => {
              router.navigate("/EditProductScreen");
            }}
          >
            <View style={styles.menuItem}>
              <FontAwesome5 name="edit" size={25} color="#964B00" />
              <Text style={styles.menuItemText}>Edit Product</Text>
            </View>
          </TouchableRipple>

          <TouchableRipple
            onPress={() => {
              router.navigate("/AddAdminScreen");
            }}
          >
            <View style={styles.menuItem}>
              <AntDesign name="adduser" size={28} color="#964B00" />
              <Text style={styles.menuItemText}>Add Admin</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple
            onPress={() => {
              router.navigate("/DeleteUserScreen");
            }}
          >
            <View style={styles.menuItem}>
              <AntDesign name="deleteuser" size={28} color="#964B00" />
              <Text style={styles.menuItemText}>Delete User</Text>
            </View>
          </TouchableRipple>
        </View>

        <TouchableOpacity onPress={ss} style={styles.button}>
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 80,
  },
  infoBox: {
    width: "33%",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    padding: 10,
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  menuItemText: {
    color: "#222222",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
  button: {
    backgroundColor: "#964B00",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
    marginLeft: "20%",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default AdminHome;

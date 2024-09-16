import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { BASE_URL, processResponse } from "../../config";
import { AuthContext } from "../../context/AuthContext";

export default function MedDetails({ route, navigation }) {
  const [data, setData] = useState(null);
  const { product_name } = route.params;
  const [showFullDetails, setShowFullDetails] = useState(false);
  const { userInfo } = useContext(AuthContext);

  const addToCart = (productId, price) => {
    try {
      fetch(`${BASE_URL}cart/add-cart`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify({
          product_id: productId,
          price: price,
          quantity: 1,
        }),
      })
        .then(processResponse)
        .then((res) => {
          const { statusCode, data } = res;
          alert(data.success);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const toggleDetails = () => {
    setShowFullDetails(!showFullDetails);
  };

  useEffect(() => {
    console.log(product_name);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden={false} translucent={true} />
      <View style={styles.header}>
        <TouchableOpacity
          underlayColor={"#fff"}
          activeOpacity={0.2}
          style={styles.menu_button}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome size={30} name={"angle-left"} color="#333" />
        </TouchableOpacity>
        <Text style={styles.header_title}>Medicine Details</Text>
        <View style={{ width: 25, height: 25 }} />
      </View>
      <ScrollView>
        <View style={styles.content}>
          <View style={styles.upper_container}>
            <Text style={styles.title}>{product_name.name}</Text>
            <Image
              source={require("../../../assets/logo/logo-updated.png")}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <View style={styles.bottom_container}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Details:</Text>
              <TouchableOpacity onPress={toggleDetails} style={{ flex: 1 }}>
                <>
                  <Text
                    style={[
                      styles.detailText,
                      { maxHeight: showFullDetails ? "none" : 20 * 18 },
                    ]}
                    numberOfLines={showFullDetails ? null : 20}
                  >
                    {product_name.details}
                  </Text>
                  {!showFullDetails &&
                    product_name.details.length > 20 * 20 && (
                      <Text style={styles.ellipsis}>(...)</Text>
                    )}
                </>
              </TouchableOpacity>
            </View>

            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Prescription Required:</Text>
              <Text style={styles.detailText}>
                {product_name.is_prescription_required ? "Yes" : "No"}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Merchant Name:</Text>
              <Text style={styles.detailText}>
                {product_name.merchant_name}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Price:</Text>
              <Text style={styles.detailText}>{product_name.price} PHPs</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={() => alert("run")}
      >
        <FontAwesome name="shopping-cart" size={20} color="#fff" />
        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: "10%",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 30,
  },
  menu_button: {
    height: 25,
    width: 25,
  },
  header_title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2f2f2",
  },
  upper_container: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 10,
  },
  bottom_container: {},
  detailItem: {
    flexDirection: "row",
    marginBottom: 10,
  },
  detailLabel: {
    fontWeight: "bold",
    marginRight: 5,
  },
  detailText: {
    width: "95%",
    textAlign: "justify",
    lineHeight: 20,
  },
  addToCartButton: {
    backgroundColor: "#6EB95B",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    height: 50,
    borderRadius: 5,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  addToCartButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL, processResponse } from "../../config";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native";

export default function Home({ navigation }) {
  const { userInfo } = useContext(AuthContext);
  const [categoryList, setCategoryList] = useState([]);
  const [pharmacyList, setPharmacyList] = useState([]);
  const [itemList, setItemList] = useState([]);

  const getCategories = () => {
    try {
      fetch(`${BASE_URL}category-list`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        //body: JSON.stringify({})
      })
        .then(processResponse)
        .then((res) => {
          const { statusCode, data } = res;
          setCategoryList(data.product);
          //console.log(data);
        })
        .catch((e) => console.log(e));
    } catch (e) {
      console.log(e);
    }
  };
  const getMerchants = () => {
    try {
      fetch(`${BASE_URL}merchant-list`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        //body: JSON.stringify({})
      })
        .then(processResponse)
        .then((res) => {
          const { statusCode, data } = res;
          setPharmacyList(data.result);
        })
        .catch((e) => console.log(e));
    } catch (e) {
      console.log(e);
    }
  };
  const useGenerateRandomColor = () => {
    let color = Math.random().toString(16).substr(-6);
    return `#${color}`;
  };

  const getItems = () => {
    try {
      fetch(`${BASE_URL}product-list`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then(processResponse)
        .then((res) => {
          const { statusCode, data } = res;
          setItemList(data.result);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getCategories();
    getMerchants();
    getItems();
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar hidden={false} translucent={true} />
      <ScrollView>
        <View style={styles.main_header}>
          <Text style={styles.header_user_text}>
            Hello{" "}
            <Text style={{ fontWeight: "bold" }}>
              {userInfo.details.first_name},
            </Text>
          </Text>
          <Text style={styles.header_user_subtext}>Find your medicines</Text>
        </View>
        <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 10,
            }}
          >
            <Text style={styles.sub_menus}>Browse by category</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("BrowseCategory");
              }}
            >
              <Text style={styles.sub_menus_btn}>View all</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            underlayColor={"#87b5eb"}
            style={[styles.inner_container]}
            onPress={() =>
              navigation.navigate("OtcCategory", {
               
              })
            }
          >
            <FlatList
              horizontal={true}
              data={categoryList}
              ItemSeparatorComponent={() => {
                return <View style={{ marginRight: 10 }} />;
              }}
              extraData={categoryList}
              renderItem={({ item }) => {
                return (
                  <View
                    style={{
                      height: 175,
                      width: 150,
                      borderRadius: 10,
                      backgroundColor: useGenerateRandomColor(),
                    }}
                  >
                    <View style={{ padding: 20 }}>
                      <Text
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        style={{
                          color: "#fff",
                          fontSize: 18,
                          textShadowColor: "red",
                          textShadowColor: "rgba(0, 0, 0, 0.75)",
                          textShadowOffset: { width: -1, height: 1 },
                          textShadowRadius: 10,
                        }}
                      >
                        {item.desc}
                      </Text>
                    </View>
                  </View>
                );
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 10,
            }}
          >
            <Text style={styles.sub_menus}>Browse by Pharma</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("BrowsePharma");
              }}
            >
              <Text style={styles.sub_menus_btn}>View all</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal={true}
            data={pharmacyList}
            ItemSeparatorComponent={() => {
              return <View style={{ marginRight: 10 }} />;
            }}
            extraData={pharmacyList}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    height: 75,
                    width: 200,
                    borderRadius: 10,
                    backgroundColor: "#fff",
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      width: 75,
                      backgroundColor: "#c2c2c2",
                      borderTopLeftRadius: 10,
                      borderBottomLeftRadius: 10,
                    }}
                  ></View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                    }}
                  >
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{ fontWeight: "bold" }}
                    >
                      {item.merchant_name}
                    </Text>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{ color: "#b2b2b2" }}
                    >
                      {item.address}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
        <View>
          <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 10,
              }}
            >
              <Text style={styles.sub_menus}>Keep Discovering</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("BrowseMedicine");
                }}
              >
                <Text style={styles.sub_menus_btn}>View all</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              paddingHorizontal: 20,
            }}
          >
            {itemList.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    width: "50%",
                    paddingHorizontal: 5,
                    marginBottom: 10,
                  }}
                >
                  <View
                    style={{
                      height: 180,
                      borderRadius: 10,
                      backgroundColor: useGenerateRandomColor(),
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ padding: 20 }}>
                      {/* Medicine name at the bottom of the card */}
                      <Text
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        style={{
                          color: "#fff",
                          fontSize: 18,
                          textShadowColor: "red",
                          textShadowColor: "rgba(0, 0, 0, 0.75)",
                          textShadowOffset: { width: -1, height: 1 },
                          textShadowRadius: 10,
                        }}
                      >
                        {item.name}
                      </Text>
                    </View>
                    <View style={{ paddingHorizontal: 20, paddingBottom: 10 }}>
                      {/* "Price: " label */}
                      <Text style={{ color: "#fff", fontSize: 14 }}>
                        Price: {item.price}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // marginHorizontal: 20,
  },
  main_header: {
    backgroundColor: "#6EB95B",
    paddingHorizontal: 20,
    paddingTop: "10%",
    paddingBottom: "10%",
    elevation: 2,
    shadowOffset: { width: 0, height: 100 },
    shadowOpacity: 5,
    shadowRadius: 50,
  },
  header_user_text: {
    marginTop: 10,
    fontSize: 20,
    color: "white",
  },
  header_user_subtext: {
    fontWeight: "bold",
    fontSize: 32,
    color: "white",
  },
  sub_menus: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#B2B1B9",
  },
  sub_menus_btn: {
    fontSize: 18,
    color: "#DDDDDD",
    fontWeight: "bold",
  },
});

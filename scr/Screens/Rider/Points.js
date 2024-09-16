import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  FlatList,
  RefreshControl
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { BASE_URL, processResponse } from "../../config";
import { AuthContext } from "../../context/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { format } from 'date-fns';
import base64 from 'react-native-base64';


export default function Points({ navigation }) {
  const { userInfo } = useContext(AuthContext);
  const [pointsData, setPointsData] = useState(null);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getTransasctions();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const transactions = [
    {
      trans_id: 1,
      trans_details: "Points Added",
      trans_date: "27 Dec 2023, 4:34 PM",
      trans_points: 1000,
      trans_type: "add",
    },
  ];

  const getTransasctions = async () => {
    // console.log(userInfo.details.user_id);
    try {
      await fetch(`${BASE_URL}rider/rider-points/${userInfo.details.user_id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      })
        .then(processResponse)
        .then((res) => {
          const { statusCode, data } = res;
          console.log(data);
          if(statusCode === 200){
            setPointsData(data.riderpoints);
          }
        
        });
    } catch (e) {
      console.log(e);
    }
  };

  function formatDate(date){
    var date = new Date(date);
    var formattedDate = format(date, "MMM do Y h:mma");
    return formattedDate;
  }

  // const DecryptionPoints = () => {
  //   const encodedString = "eyJpdiI6InlIT0ZlUGR5VW1WWVBudU9qTWt5SHc9PSIsInZhbHVlIjoiOVhmVUk5UFNsdzIzU0MvWmtCbUhDQT09IiwibWFjIjoiYzI5MzlmODM4ZDM2ZDIzZTc4NDlhOWNiNGUwOTU4ZGFhNzg1MTFmNDAyN2MyMzdhMmYzMDQ2ZTFhMzA0Yzc5NiIsInRhZyI6IiJ9";
  //   const key = '2IsDRVGb2BAThR17tEh52zIjFZNF72a0cPpdHU+BHoE=';
  //   const decodedString = CryptoJS.enc.Base64.parse(encodedString);
  //   const salt = CryptoJS.enc.Hex.parse('salt'); // Replace 'salt' with your actual salt
  //   const iterations = 100000;
  //   const keyDerivationFunction = CryptoJS.PBKDF2;
  //   const keyLength = 32;
  //   const derivedKey = keyDerivationFunction(CryptoJS.enc.Utf8.parse(key), salt, {
  //     keySize: keyLength,
  //     iterations: iterations,
  //   });
  //   const encryptionKey = derivedKey.toString(CryptoJS.enc.Hex);
  //   const decryptedData = CryptoJS.AES.decrypt(
  //     { ciphertext: decodedString },
  //     CryptoJS.enc.Hex.parse(encryptionKey),
  //     {
  //       mode: CryptoJS.mode.CBC,
  //       padding: CryptoJS.pad.Pkcs7,
  //     }
  //   ).toString(CryptoJS.enc.Utf8);
  //   console.log(decryptedData);
  // }
  useEffect(() => {
    // DecryptionPoints();

    getTransasctions();
    // const intervalId = setInterval(getTransasctions, 2000);
    // return () => clearInterval(intervalId);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={false} translucent={true} />
      <View style={styles.header} >
        <TouchableOpacity
          underlayColor={"#fff"}
          activeOpacity={0.2}
          style={styles.menu_button}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={require("../../../assets/angle-left.png")}
            style={styles.menu_icon}
          />
        </TouchableOpacity>
        <Text style={styles.header_title}>Points Wallet</Text>
        <View style={styles.menu_button} />
      </View>
      <View
        style={[
          styles.upper_headiing,
          { paddingHorizontal: 20, paddingVertical: 50 },
        ]}>
        <View style={{ marginBottom: 5 }}>
          <Text style={{ fontSize: 18, fontWeight: "600", color: "#b2b2b2" }}>
            Avalable Points
          </Text>
        </View>
        <View>
          <Text style={{ fontSize: 44, fontWeight: "bold", color: "#44b678" }}>
            {pointsData !== null && pointsData.length > 0 ? pointsData[0].current_points : 0} pt/s
          </Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <LinearGradient
          colors={["transparent", "lightgreen"]}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
          }}
        />
        <ScrollView refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
          <View style={{ padding: 20 }}>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                Recent Transactions
              </Text>
            </View>
            {pointsData ?
              pointsData.map((items, index) => {
                // console.log(items.points);
                const points_decoded = base64.decode(items.points);
                return (
                  <View key={index} style={{paddingHorizontal: 15, paddingVertical: 20, marginBottom: 10, flexDirection: 'row', borderRadius: 15, backgroundColor: '#fff', elevation: 5}}>
                    <View style={{flex: 1}}>
                      <Text style={{fontWeight: 'bold'}}>{items.status ? 'Cash-in' : 'Cash-out'}</Text>
                      <Text style={{color: '#b2b2b2'}}>{formatDate(items.created_at)}</Text>
                    </View>
                    <View style={{}}>
                        <Text style={{}}>{items.status ? '+' : '-'} {points_decoded} pt/s</Text>
                    </View>
                  </View>
                )
              }) : null
            }
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    width: "100%",
    paddingBottom: 20,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#f2f2f2",
    borderBottomWidth: 5,
    paddingTop: "13%",
  },
  menu_button: {
    height: 20,
    width: 20,
  },
  menu_icon: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  header_title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  upper_headiing: {
    // backgroundColor: 'white',
    // borderBottomWidth: 1.5,
    // elevation: 2* -2.5 * 10
  },
});

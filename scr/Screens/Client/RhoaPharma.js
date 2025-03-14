import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    ScrollView,
    Image,
    SafeAreaView,
    Button,
    TextInput,
  } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { BASE_URL, processResponse } from "../../config";
import { AuthContext } from "../../context/AuthContext";
import { WebView } from "react-native-webview";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';

export default function Clinic({ navigation }) {
  const SafeProvider = SafeAreaProvider;



  return (
    <SafeAreaProvider>
        <SafeAreaView>
        <View style={styles.header}>
        <TouchableOpacity
          underlayColor={"#fff"}
          activeOpacity={0.2}
          style={styles.RhoaPharmaMenu_button}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome size={30} name={"angle-left"} color="#00000" />
        </TouchableOpacity>
          <Text style={styles.headerText}>Rhoa Pharmacy</Text>
        </View>
        </SafeAreaView>
      
    </SafeAreaProvider> 
  );
}

const styles = StyleSheet.create({
    header: {
        width: "100%", 
        paddingBottom: 20,
        backgroundColor: "#6EB95A",
        paddingHorizontal: 20,
        justifyContent: "center",
        alignItems: "flex-start",
        borderBottomColor: "#f2f2f2",
        borderBottomWidth: 5,
        paddingTop: "13%",
      },
      headerText: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold",
      },
      RhoaPharmaMenu_button:{
        height: 25,
        width: 25,
      }
})



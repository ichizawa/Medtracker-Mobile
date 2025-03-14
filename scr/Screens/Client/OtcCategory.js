import React, { useContext, useState, useEffect } from "react";
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
import { FontAwesome } from "@expo/vector-icons";
import { BASE_URL, processResponse } from "../../config";
import { AuthContext } from "../../context/AuthContext";
import { WebView } from "react-native-webview";
import { SafeAreaProvider } from "react-native-safe-area-context";


export default function OtcCat({ route, navigation }) {
  const SafeProvider = SafeAreaProvider;

  const OtcMedicineData = [
    { name: "Paracetamol", pharma: "Calle Farma", price: "10.00", color: "#ffff" },
    { name: "Ibuprofen ", pharma: "Calle Farma", price: "20.00", color: "#ffff" },
    { name: "Aspirin ", pharma: "Calle Farma", price: "6.00", color: "#ffff" },
    { name: "Mefenamic Acid", pharma: "Calle Farma",  price: "5.00", color: "#ffff" },
    { name: "WATSONS Co-amoxiclav 6", pharma: "Calle Farma",  price: "11.00", color: "#ffff" },
    { name: "Naproxen ", pharma: "Calle Farma", price: "35.50", color: "#ffff" },
  ];  

  const categories = [
    "Pain Relievers",
    "Allergy Relief",
    "Cough & Cold",
    "Vitamins",
    "Digestion",
    "First Aid",
  ];

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
        <TouchableOpacity
          underlayColor={"#fff"}
          activeOpacity={0.2}
          style={styles.OTCmenu_button}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome size={30} name={"angle-left"} color="#00000" />
        </TouchableOpacity>
          <Text style={styles.headerText}>OTC Medicines</Text>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.text}>
            <View style={{ flex: 1, marginRight: 10, height: "100%" }}>
              <TextInput
                style={styles.searchBarButonText}
                placeholder="Search OTC Medicines..."
              />
            </View>
          </View>
         
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category, index) => (
              <TouchableOpacity key={index} style={styles.catMedButton}>
                <Text style={styles.catMedButtonText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.sub_menus}>Look for your medicine</Text>

          {/* Grid UI */}
          <View style={styles.gridContainer}>
            {OtcMedicineData.map((item, index) => (
              <TouchableOpacity key={index} style={styles.gridItem}>
                <View style={[styles.card, { backgroundColor: item.color }]}>
                  <View style={styles.textContainer}>
                  <View style={styles.OtcMedImage}>
                  </View>

                    <Text
                      numberOfLines={2}
                      ellipsizeMode="tail"
                      style={styles.OtcMedicineName}
                    >
                      {item.name}
                    </Text>
                    <Text  style={{color: "#000", fontSize: 12,}}>
                      Pharma: {item.pharma}
                    </Text>
                    <Text style={styles.medicinePrice}>
                      Price: {item.price}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
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
  content: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  text: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  searchBarButon: {
    color: "#C8C8C8",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 12, // Inner spacing
    height: 45, // Adjust height
    margin: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  searchBarButonText: {
    width: "100%",
    //height: 45,
    backgroundColor: "#f1f2f3",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  gridItem: {
    width: "48%", // Ensures two items per row
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    width: 160, // Adjust the width as needed
    elevation: 4, // Shadow for Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    margin: 8,
  },
  textContainer: {
    padding: 5,
  },
  OtcMedicineName: {
    color: "#000",
    fontSize: 14,
    fontWeight: "bold",
  },
  medicinePrice: {
    color: "#000",
    fontSize: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  
  catMedButton: {
    borderWidth: 1,
    borderColor: "#7BC36D",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 3,
    marginHorizontal: 1,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  catMedButtonText: {
    color: "#7BC36D",
    fontSize: 16,
    fontWeight: "500",
    paddingLeft: 5,
    paddingRight: 5,
  },
  sub_menus: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#B2B1B9",
    paddingTop: 10,
    paddingBottom: 5,
  },
  OtcMedImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    backgroundColor: '#ddd',
    marginBottom: 10,
  },
  OTCmenu_button: {
    height: 25,
    width: 25,
  },
  
 
});

import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, ScrollView, Dimensions } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { BASE_URL, processResponse } from '../../config';
import { FontAwesome } from "@expo/vector-icons";
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

export default function BrowseMedicine({navigation}) {
  const { userInfo } = useContext(AuthContext);
  const [itemList, setItemList] = useState([]);

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
  }

  const useGenerateRandomColor = () => {
    let color = Math.random().toString(16).substr(-6);
    return `#${color}`;
  };

  useEffect(() => {
    getItems();
  }, [])

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={{ paddingVertical: 1, paddingHorizontal: 0, marginRight: 15 }}>
        <View style={{ height: 200, width: (Dimensions.get('window').width - 60) / 2, borderRadius: 10, backgroundColor: useGenerateRandomColor() }}>
          <View style={{ flex: 1, padding: 20, justifyContent: 'flex-end' }}>
            <Text numberOfLines={2} ellipsizeMode='tail' style={{ color: '#fff', fontSize: 18, textShadowColor: 'red', textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: { width: -1, height: 1 }, textShadowRadius: 10 }}>{item.name}</Text>
            <Text style={{ color: '#fff', fontSize: 12, textShadowColor: 'red', textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: { width: -1, height: 1 }, textShadowRadius: 10 }}>Price: {item.price}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.main_header}>
        <TouchableOpacity
          underlayColor={"#fff"}
          activeOpacity={0.2}
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <FontAwesome size={30} name={"angle-left"} color="#fff" />
        </TouchableOpacity>
        <View>
          <Text style={styles.header_user_text}>Hello <Text style={{ fontWeight: 'bold' }}>Edlian,</Text></Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.search_bar_container}>
          <View style={styles.search_bar}>
            <TextInput style={styles.search_input} placeholder="Search for medicines" />
          </View>
          <View style={styles.gridContainer}>
            {itemList.map((item, index) => (
              <TouchableOpacity key={index} style={styles.gridItem}>
                <View style={{ paddingVertical: 1, paddingHorizontal: 0 }}>
                  <View style={{ height: 200, width: (Dimensions.get('window').width - 60) / 2, borderRadius: 10, backgroundColor: useGenerateRandomColor() }}>
                    <View style={{ flex: 1, padding: 20, justifyContent: 'flex-end' }}>
                      <Text numberOfLines={2} ellipsizeMode='tail' style={{ color: '#fff', fontSize: 18, textShadowColor: 'red', textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: { width: -1, height: 1 }, textShadowRadius: 10 }}>{item.name}</Text>
                      <Text style={{ color: '#fff', fontSize: 12, textShadowColor: 'red', textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: { width: -1, height: 1 }, textShadowRadius: 10 }}>Price: {item.price}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  main_header: {
    backgroundColor: '#6EB95B',
    paddingHorizontal: 20,
    paddingTop: '10%',
    paddingBottom: '10%',
    elevation: 2,
    shadowOffset: { width: 0, height: 100 },
    shadowOpacity: 5,
    shadowRadius: 50,
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  header_user_text: {
    fontSize: 20,
    color: 'white',
    marginLeft: 20,
  },
  search_bar_container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  search_bar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  search_input: {
    flex: 1,
    fontSize: 16,
    padding: 10,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    marginTop: 15,
  },
  gridItem: {
    width: '48%', 
    marginBottom: 15,
  },
  backButton: {
    marginRight: 20,
  },
  
});

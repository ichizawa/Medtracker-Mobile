import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, SafeAreaView, } from 'react-native'
import { FontAwesome } from "@expo/vector-icons";
import React from 'react'

export default function BrowseCategory({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.main_header}>
      <TouchableOpacity
          underlayColor={"#fff"}
          activeOpacity={0.2}
          style={styles.menu_button}
          onPress={() => navigation.goBack()}>
        <FontAwesome size={30} name={"angle-left"} color="#333" />
        </TouchableOpacity>
          <Text style={styles.header_user_text}>Hello <Text style={{fontWeight: 'bold'}}>Edlian,</Text></Text>
          <Text style={styles.header_user_subtext}>Find your medicines by category</Text>
        </View>
        <View style={styles.search_bar_container}>
          <View style={styles.search_bar}>
            <TextInput style={styles.search_input} placeholder="Search for medicines" />
          </View>
        </View>
        <ScrollView style={styles.card_container}>
          <View style={styles.card_row}>
            <View style={styles.card}>
              <View style={styles.card_image_container}>
                {/* Add your image or other content here */}
              </View>
              <Text style={styles.card_title}>Category 1</Text>
              <Text style={styles.card_description}>This is the description for card 1.</Text>
            </View>
            <View style={styles.card}>
              <View style={styles.card_image_container}>
                {/* Add your image or other content here */}
              </View>
              <Text style={styles.card_title}>Category 2</Text>
              <Text style={styles.card_description}>This is the description for card 2.</Text>
            </View>
          </View>
          <View style={styles.card_row}>
            <View style={styles.card}>
              <View style={styles.card_image_container}>
                {/* Add your image or other content here */}
              </View>
              <Text style={styles.card_title}>Category 3</Text>
              <Text style={styles.card_description}>This is the description for card 3.</Text>
            </View>
            <View style={styles.card}>
              <View style={styles.card_image_container}>
                {/* Add your image or other content here */}
              </View>
              <Text style={styles.card_title}>Category 4</Text>
              <Text style={styles.card_description}>This is the description for card 4.</Text>
            </View> 
          </View>
          <View style={styles.card_row}>
            <View style={styles.card}>
              <View style={styles.card_image_container}>
                {/* Add your image or other content here */}
              </View>
              <Text style={styles.card_title}>Category 5</Text>
              <Text style={styles.card_description}>This is the description for card 5.</Text>
            </View>
            <View style={styles.card_row}>
            <View style={styles.card}>
              <View style={styles.card_image_container}>
                {/* Add your image or other content here */}
              </View>
              <Text style={styles.card_title}>Category 6</Text>
              <Text style={styles.card_description}>This is the description for card 5.</Text>
              </View>
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
      // marginHorizontal: 20,
    
    },
    main_header: {
      backgroundColor: '#6EB95B',
      paddingHorizontal: 20, 
      paddingTop: '10%', 
      paddingBottom: '10%',
      elevation: 2,
      shadowOffset: {width: 0, height: 100},
      shadowOpacity: 5,
      shadowRadius: 50,
    },

    header_user_text: {
        marginTop: 10,
        fontSize:20, 
        color: 'white', 
      },
     header_user_subtext: {
        fontWeight: 'bold', 
        fontSize: 22,
        color: 'white',
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
      card_container: {
        paddingHorizontal: 20,
        paddingVertical: 10,
      },
      card_row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
      },
      card: {
        backgroundColor: '#f7f7f7',
        borderRadius: 10,
        padding: 20,
        flexBasis: '48%',
      },
      card_image_container: {
        width: '100%',
        height: 100,
        borderRadius: 10,
        backgroundColor: '#ddd',
        marginBottom: 10,
      },
      card_title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
      },
      card_description: {
        fontSize: 16,
        color: '#666',
      },
      backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 1,
      },
      backButtonText: {
        fontSize: 24,
        color: 'white',
      },
})
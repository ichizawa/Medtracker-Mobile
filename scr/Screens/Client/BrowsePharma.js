import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import { FontAwesome } from "@expo/vector-icons";
import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { BASE_URL, processResponse } from '../../config';

export default function BrowsePharma({ navigation }) {
    const [pharmacyList, setPharmacyList] = useState([]);

    const getMerchants = () => {
        try {
            fetch(`${BASE_URL}merchant-list`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                //body: JSON.stringify({})
            })
                .then(processResponse)
                .then(res => {
                    const { statusCode, data } = res;
                    setPharmacyList(data.result);
                })
                .catch((e) => console.log(e))
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getMerchants();
    }, []);

    return (

        <View style={styles.container}>
            <View style={styles.main_header}>
                <View style={styles.headerContent}>
                    <TouchableOpacity
                        underlayColor={"#fff"}
                        activeOpacity={0.2}
                        style={styles.menu_button}
                        onPress={() => navigation.goBack()}>
                        <FontAwesome size={30} name={"angle-left"} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.header_user_text}>Hello <Text style={{ fontWeight: 'bold' }}>Edlian,</Text></Text>
                </View>
            </View>
            <ScrollView>
                <View style={styles.search_bar_container}>
                    <View style={styles.search_bar}>
                        <TextInput style={styles.search_input} placeholder="Search for clinic" />
                        <FontAwesome style={styles.search_icon} size={20} name={"search"} color="#333" />
                    </View>
                </View>

                <View style={styles.card_container}>
                    {pharmacyList ? pharmacyList.map((items, index) => {
                        console.log(items);
                        if (index % 2 === 0) {
                            return (
                                <View key={index} style={styles.card_row}>
                                    <View style={styles.card}>
                                        <View style={styles.card_image_container}>

                                        </View>
                                        <View style={styles.card_content_container}>
                                            <View style={styles.card_content}>
                                                <Text style={[styles.card_content_text, styles.pharmacy_name]}>{items.merchant_name}</Text>
                                            </View>
                                            <View style={styles.card_content}>
                                                <Text style={[styles.card_content_text, styles.contact_number]}>{items.contact_no}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    {pharmacyList[index + 1] &&
                                        <View style={styles.card}>
                                            <View style={styles.card_image_container}>

                                            </View>
                                            <View style={styles.card_content_container}>
                                                <View style={styles.card_content}>
                                                    <Text style={[styles.card_content_text, styles.pharmacy_name]}>{pharmacyList[index + 1].merchant_name}</Text>
                                                </View>
                                                <View style={styles.card_content}>
                                                    <Text style={[styles.card_content_text, styles.contact_number]}>{pharmacyList[index + 1].contact_no}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    }
                                </View>
                            )
                        }
                        return null;
                    })
                        : null
                    }
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
        shadowOffset: { width: 0, height: 100 },
        shadowOpacity: 5,
        shadowRadius: 50,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    header_user_text: {
        marginTop: 10,
        fontSize: 20,
        color: 'white',
        marginLeft: 20,
    },
    header_user_subtext: {
        fontWeight: 'bold',
        fontSize: 30,
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
        justifyContent: 'space-between',
    },
    search_input: {
        flex: 1,
        fontSize: 16,
        padding: 10,
    },
    search_icon: {
        marginLeft: 10,
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
    pharmacy_name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    contact_number: {
        fontSize: 11,
    },
})

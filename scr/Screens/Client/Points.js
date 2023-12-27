import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
import React, {useContext, useEffect, useState} from 'react'

export default function Points({navigation}) {
    const transactions = [
        {trans_id: 1, trans_details: 'Points Added', trans_date: '27 Dec 2023, 4:34 PM', trans_points: 1000, trans_type: 'add'},
        {trans_id: 2, trans_details: 'ROA PHARMACY BANGKAL TALOMO', trans_date: '27 Dec 2023, 4:34 PM', trans_points: 150, trans_type: 'minus'},
        {trans_id: 3, trans_details: 'ROA PHARMACY BANGKAL TALOMO', trans_date: '23 Dec 2023, 2:44 PM', trans_points: 350, trans_type: 'minus'},
        {trans_id: 4, trans_details: 'D and K Pharmacy', trans_date: '10 Dec 2023, 11:44 AM', trans_points: 250, trans_type: 'minus'},
        {trans_id: 5, trans_details: 'Calle Farma', trans_date: '24 Nov 2023, 12:04 PM', trans_points: 250, trans_type: 'minus'},
        {trans_id: 1, trans_details: 'Points Added', trans_date: '24 Nov 2023, 11:51 AM', trans_points: 1000, trans_type: 'add'}
    ]
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                underlayColor={'#fff'}
                activeOpacity={0.2}
                style={styles.menu_button}
                onPress={() => navigation.goBack()}
                >
                <Image source={require('../../../assets/angle-left.png')} style={styles.menu_icon}/>
                </TouchableOpacity>
                <Text style={styles.header_title}>Points Wallet</Text>
                <View style={styles.menu_button}/>
            </View>
            <View
                style={{paddingHorizontal: 20, paddingVertical: 50}}
            >
                <View style={{marginBottom: 5}}>
                    <Text style={{fontSize: 18,fontWeight: '600', color: '#b2b2b2'}}>Avalable Points</Text>
                </View>
                <View>
                    <Text style={{fontSize: 44, fontWeight: 'bold', color: '#44b678'}}>1000 pt/s</Text>
                </View>
            </View>
            <View style={{flex: 1, backgroundColor: '#f2f2f2'}}>
                <ScrollView>
                    <View style={{padding: 20}}>
                        <View style={{marginBottom: 10}}>
                            <Text  style={{fontWeight: 'bold', fontSize: 18}}>Recent Transactions</Text>
                        </View>
                        <View>
                            {transactions.length > 0 ?
                                    transactions.map((item, index) => {
                                        return (
                                            <View key={index} style={{paddingHorizontal: 15, paddingVertical: 20, marginBottom: 10, flexDirection: 'row', borderRadius: 5, backgroundColor: '#fff', elevation: 5}}>
                                                <View style={{flex: 1}}>
                                                    <Text style={{fontWeight: 'bold'}}>{item.trans_details}</Text>
                                                    <Text style={{color: '#b2b2b2'}}>{item.trans_date}</Text>
                                                </View>
                                                <View style={{}}>
                                                    <Text style={{}}>{item.trans_type === 'minus' ? '-' : null }{item.trans_type === 'add' ? '+' : null } {item.trans_points}</Text>
                                                </View>
                                            </View>
                                        )
                                    })

                                :
                                    null
                            }
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff'
    },
    header:{
        flexDirection: 'row',
        width: '100%',
        paddingBottom: 20,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#f2f2f2',
        borderBottomWidth: 5,
    },
    menu_button: {
        height: 20,
        width: 20,
    },
    menu_icon: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    header_title: {
        fontSize: 18,
        fontWeight: 'bold'
    }
})
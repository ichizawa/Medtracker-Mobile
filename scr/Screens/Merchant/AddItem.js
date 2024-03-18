import { StyleSheet, Text, View, Switch, TouchableOpacity, Image, Dimensions, TextInput, ScrollView } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import SelectDropdown from 'react-native-select-dropdown'
import { BASE_URL, processResponse } from '../../config'
import * as ImagePicker from 'expo-image-picker'
import { AuthContext } from '../../context/AuthContext';
import { StatusBar } from 'expo-status-bar';

const window_width = Dimensions.get('window').width

export default function AddItem({navigation}) {
    const {userInfo} = useContext(AuthContext);

    const [prescriptionRequired, setPrescriptionReqiured] = useState(false);
    const [categories, setCategories] = useState(null);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [productName, setProductName] = useState(null);
    const [productDescription, setProductDescription] = useState(null);
    const [productPrice, setProductPrice] = useState(null);
    const [productStock, setProductStock] = useState(null);
    const [image, setImage] = useState(null);
    
    const [isProductNameFocussed, setProductNameFocused] = useState(false);
    const [isDescFocussed, setDescFocussed] = useState(false);
    const [isPriceFocussed, setPriceFocussed] = useState(false);
    const [isQuantityFocussed, setQuantityFocussed] = useState(false);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            base64: true,
            aspect: [1, 1],
            quality: 0.8,
        });
        if (!result.canceled) {
            setImage('data:image/webp;base64,'+result.assets[0].base64);
        } else {
            console.log('canceled');
        }
    }
    const getCategories = () => {
        try {
            fetch(`${BASE_URL}category-list`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then(processResponse)
            .then(res => {
                const {statusCode, data} = res;
                setCategories(data.product);
            })
        } catch (e) {
            console.log(e);
        }
    }
    const addProduct = () => {
        try {
            fetch(`${BASE_URL}merchant/add-product`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo.token}`
                },
                body: JSON.stringify({
                    category_id: selectedCategoryId,
                    name: productName,
                    details: productDescription,
                    price: parseFloat(productPrice),
                    stock: parseInt(productPrice),
                    photo: image,
                    is_prescription_required: prescriptionRequired ? 1 : 0 // 0 = false 1 = true
                })
            })
            .then(processResponse)
            .then(res => {
                const {statusCode, data} = res;
                console.log(data);
                navigation.goBack();
            })
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        getCategories();
    }, [])
    return (
        <View style={styles.container}>
            <StatusBar hidden = {false} backgroundColor= 'white' translucent = {false} />
            <ScrollView  style={{flexGrow: 1, backgroundColor: '#fff'}} automaticallyAdjustKeyboardInsets={true}>
                <View style={styles.header}>
                    <TouchableOpacity
                    underlayColor={'#fff'}
                    activeOpacity={0.2}
                    style={styles.menu_button}
                    onPress={() => navigation.goBack()}
                    >
                        <Image source={require('../../../assets/angle-left.png')} style={styles.menu_icon_left}/>
                    </TouchableOpacity>
                    <Text style={styles.header_title}>Add Item</Text>
                    <View style={styles.menu_button}/>
                </View>
                <View style={styles.body}>
                    <View style={styles.image_container}>
                        <View style={{flex: 1, padding: 15}}>
                            {image ?
                                    <View
                                        style={{
                                            backgroundColor: '#f1f2f3',
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: 10,
                                            elevation: 2
                                        }}>
                                        <Image
                                            source={{ uri: image}}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                borderRadius: 10,
                                                resizeMode: 'contain',
                                            }}
                                        />
                                    </View>
                                :
                                    <View
                                        style={{
                                            backgroundColor: '#f1f2f3',
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: 10
                                        }}
                                    />
                            }
                        </View>
                        <View style={{flex: 1, padding: 15}}>
                            <TouchableOpacity
                                underlayColor={'#f3f3f3'}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 10
                                }}
                                onPress={() => pickImage()}
                            >
                                <>
                                    <Image source={require('../../../assets/circle-camera.png')} style={{width: 35, height: 35, tintColor: '#4CA771', marginBottom: 10}}/>
                                    <Text style={{fontWeight: 'bold', color: '#4CA771'}}>Upload Image</Text>
                                </>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.field_container}>
                        <Text style={[styles.input_label, {color: isProductNameFocussed ? 'green' : '#b2b2b2'}]}>Product Name</Text>
                        <TextInput style={[styles.text_input, {borderColor: isProductNameFocussed ? 'green' : '#f1f2f3'}]} 
                        onFocus = {() => {setProductNameFocused(true)}}
                        onBlur= {() => {setProductNameFocused(false)}}
                        onChangeText={(e) => setProductName(e)} value={productName}/>
                    </View>
                    <View style={styles.field_container}>
                        <Text style={styles.input_label}>Item Category</Text>
                        <SelectDropdown
                            buttonStyle={{height: 45, marginVertical: 15, width: '100%', borderRadius: 10, paddingHorizontal: 20}}
                            buttonTextStyle={{textAlign: 'left', color: '#000', fontSize: 14, marginLeft: 0}}
                            defaultButtonText='Select Category'
                            dropdownStyle={{borderRadius: 10}}
                            renderDropdownIcon={(isOpened) => {
                                return (
                                    <Image source={isOpened ? require('../../../assets/angle-up.png') : require('../../../assets/angle-down.png')} style={{width: 15, height: 15}}/>
                                )
                            }}
                            rowStyle={{}}
                            data={categories}
                            onSelect={(selectedItem, index) => {
                                setSelectedCategoryId(selectedItem.id)
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                // text represented after item is selected
                                // if data array is an array of objects then return selectedItem.property to render after item is selected
                                return selectedItem.desc
                            }}
                            rowTextForSelection={(item, index) => {
                                // text represented for each item in dropdown
                                // if data array is an array of objects then return item.property to represent item in dropdown
                                return item.desc
                            }}
                        />
                    </View>
                    <View style={styles.field_container}>
                        <Text style={[styles.input_label, {color: isDescFocussed ? 'green' : '#b2b2b2'}]}>Description</Text>
                        <TextInput style={[styles.multiline_input, {borderColor: isDescFocussed ? 'green' : '#f1f2f3'}]} multiline={true} numberOfLines={5} value={productDescription} 
                        onFocus = {() => {setDescFocussed(true)}}
                        onBlur= {() => {setDescFocussed(false)}}
                        onChangeText={(e) => setProductDescription(e)}/>
                    </View>
                    <View style={styles.field_container}>
                        <Text style={[styles.input_label, {color: isPriceFocussed ? 'green' : '#b2b2b2'}]}>Price</Text>
                        <TextInput style={[styles.text_input, {borderColor: isPriceFocussed ? 'green' : '#f1f2f3'}]} value={productPrice} 
                        onFocus = {() => {setPriceFocussed(true)}}
                        onBlur= {() => {setPriceFocussed(false)}}
                        onChangeText={(e) => setProductPrice(e)}/>
                    </View>
                    <View style={styles.field_container}>
                        <Text style={[styles.input_label, {color: isQuantityFocussed ? 'green' : '#b2b2b2'}]}>Quantity</Text>
                        <TextInput style={[styles.text_input, {borderColor: isQuantityFocussed ? 'green' : '#f1f2f3'}]} value={productStock} 
                        onFocus = {() => {setQuantityFocussed(true)}}
                        onBlur= {() => {setQuantityFocussed(false)}}
                        onChangeText={(e) => setProductStock(e)}/>
                    </View>
                    <View style={styles.prescription_container}>
                        <View style={{width: 50, height: 50}}>
                            <Image source={require('../../../assets/medical-prescription.png')} style={{width: '100%', height: '100%', resizeMode: 'contain'}}/>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 20}}>
                            <Text style={{fontWeight: 'bold'}}>Prescription Required</Text>
                        </View>
                        <View style={{width: 50, height: 50, alignItems: 'center', justifyContent: 'center'}}>
                            <Switch
                                value={prescriptionRequired}
                                onValueChange={(e) => setPrescriptionReqiured(e)}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity
                style={{
                    width: '100%',
                    height: 50,
                    backgroundColor: '#4CA771',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onPress={() => addProduct()}
            >
                <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>Add</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff'
    },
    header:{
        paddingBottom: Platform.OS === 'ios' ? 20 : 10,
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '5%'
    },
    menu_button: {
        height: 20,
        width: 20,
    },
    menu_icon_right: {
        width: '80%',
        height: '80%',
        resizeMode: 'contain',
    },
    menu_icon_left: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    header_title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    body: {
        flex: 1,
    },
    image_container: {
        backgroundColor: '#fff',
        height: window_width / 2,
        width: '100%',
        flexDirection: 'row',
        borderBottomWidth: 5,
        borderBottomColor: '#d3d3d3',
    },
    field_container: {
        backgroundColor: '#fff',
        padding: 15,
        width: '100%',
        borderBottomWidth: 5,
        borderBottomColor: '#d3d3d3',
    },
    prescription_container: {
        backgroundColor: '#fff',
        padding: 15,
        width: '100%',
        borderBottomWidth: 5,
        borderBottomColor: '#d3d3d3',
        flexDirection: 'row'
    },
    text_input: {
        width: '100%',
        //height: 45,
        backgroundColor: '#f1f2f3',
        borderColor: '#f1f2f3',
        borderWidth: 1.5,
        borderRadius: 10,
        marginVertical: 15,
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    multiline_input: {
        width: '100%',
        backgroundColor: '#f1f2f3',
        borderColor: '#f1f2f3',
        borderWidth: 1.5,
        borderRadius: 10,
        marginVertical: 15,
        padding: 15,
        textAlignVertical: 'top'
    },
    input_label: {
        //marginBottom: 15,
        color: '#b2b2b2'
    }
})
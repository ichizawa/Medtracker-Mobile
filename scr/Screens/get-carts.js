import React, { useContext, useEffect, useState } from 'react'
import { BASE_URL, processResponse } from '../../config'
import { AuthContext } from '../../context/AuthContext'
import SyncStorage from 'sync-storage';

export const cartItemsArray = async () => {
    const {userInfo} = useContext(AuthContext);
    try {
        await fetch(`${BASE_URL}cart/cart-item`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
        })
        .then(processResponse)
        .then(res => {
            const {statusCode, data} = res;
            let merchant_list = [];
            let cartsItems = [];
            if(statusCode === 200 && data.cart_items.length > 0) {
                data.cart_items.map((item) => {
                    cartsItems.push(item);

                    if(merchant_list.find(element => element === item.merchant_name) !== undefined) {
                        console.log('1 record found');
                    } else {
                        merchant_list.push(item.merchant_name);
                    }
                })
                SyncStorage.set('itemsInCart', JSON.stringify(data.cart_items));
            } else {
                console.log('Null')
            }
        })
    } catch (e) {
        console.log(e);
    }
};
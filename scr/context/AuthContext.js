import React, {createContext, useState, useEffect} from 'react'
import { BASE_URL, processResponse } from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState(null);
    const login = (email, password) => {
        try {
            fetch(`${BASE_URL}login`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
            .then(processResponse)
            .then(res => {
                const {statusCode, data} = res;
                // console.log(statusCode);
                // console.log(data);
                if(statusCode === 200) {
                    setUserInfo(data);
                }else {
                    alert(data.error);
                }
            })
            .catch((e) => 
            // console.log(data)
            console.log(e)
            )
        } catch (e) {
            console.log(e);
        }
    }
    const register = (email, password) => {
        try {
            fetch(`${BASE_URL}register`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    user_type: 1, //1 customer, 2 merchant, 3 rider
                    first_name: '',
                    last_name: '',
                    middle_name: '',
                    contact_no: '',
                    address: '',
                    lat: '',
                    long: '',
                })
            })
            .then(processResponse)
            .then(res => {
                const {statusCode, data} = res;
            })
            .catch((e) => console.log(e))
        } catch (e) {
            console.log(e);
        }
    }
    const logout = () => {
        try {
            fetch(`${BASE_URL}logout`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo.token}`
                },
                //body: JSON.stringify({})
            })
            .then(processResponse)
            .then(res => {
                const {statusCode, data} = res;
                if(statusCode === 200) {
                    console.log(data);
                    setUserInfo(null);
                }
                console.log(data);
            })
            .catch((e) => console.log(e))
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <AuthContext.Provider value={{
            login,
            logout,
            userInfo
        }}>{children}</AuthContext.Provider>
    )
}
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { BASE_URL } from "./config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [userInfo, setUserInfo] = useState({});
    const [failLog, setFailLog] = useState(false);

    const[logged, setLogged] = useState(false)

    const login = (Res) => {

        axios.post(`${BASE_URL}/login`, Res)
        .then(res => {
            let userInfo = res.data;
            setUserInfo(userInfo);
            AsyncStorage.setItem('userInfo', Res.code);
            setFailLog(false)
            setLogged(true)
            setTimeout(() => {
                setLogged(false)
                AsyncStorage.removeItem('userInfo')
                setUserInfo({});
              }, 1800000);
        })
        .catch(e => {
            console.log(`Login error : ${e}`);
            setFailLog(true);
            setLogged(false)
        })
    };

return (
    <AuthContext.Provider
        value={{
            userInfo,
            failLog,
            logged,
            login
        }}>
        {children}
    </AuthContext.Provider>
)
}
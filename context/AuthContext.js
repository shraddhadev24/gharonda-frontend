import React, { createContext, useState, useEffect } from "react";
import  { configureAxiosHeaders } from '../service/service';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [auth, setAuthState] = useState("");

  // Get current auth state from AsyncStorage
  const getAuthState = async () => {
    try {
      const authDataString = await AsyncStorage.getItem("auth");
      const authData = JSON.parse(authDataString || {});

      configureAxiosHeaders(authData.token);
      setAuthState(authData);
    } catch (err) {
      setAuthState({});
    }
  };

  // Update AsyncStorage & context state
  const setAuth = async (auth) => {
    try {
      await AsyncStorage.setItem("auth", JSON.stringify(auth));

      // Configure axios headers
      configureAxiosHeaders(auth.token);
      setAuthState(auth);
    } catch (error) {
      Promise.reject(error);
    }
  };


  const logout = async () => {
    try {
      await AsyncStorage.removeItem("auth");

      // Configure axios headers
      configureAxiosHeaders(null);
      setAuthState("");
    } catch (error) {
      console.log('error---', error);
      Promise.reject(error);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
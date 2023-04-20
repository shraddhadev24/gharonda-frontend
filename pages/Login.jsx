import { StatusBar } from 'expo-status-bar';
import { useState, useContext } from 'react';
import { StyleSheet, Text, SafeAreaView, TextInput, Button, Image, View } from 'react-native';

import { AuthContext } from '../context/AuthContext';
import { IMAGE_PATH } from "../utils/imageHelper";
import {  login } from "../service/service";

export default function Login({ navigation }) {

  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    mobileNumber: '',
    password: ''
  })

  const { setAuth } = useContext(AuthContext);


  const onPressLogin = async () => {
    const newError = {
      ...errors
    }

    let isValid = true;

    if (!mobileNumber) {
      isValid = false;
      newError.mobileNumber = 'Mobile Number is required';
    }

    if (mobileNumber.length !== 10) {
      isValid = false;
      newError.mobileNumber = 'Mobile Number is not valid';
    }

    if (!password) {
      isValid = false;
      newError.password = 'Password is required';
    }

    setErrors(newError);

    if (!isValid) return;
    else {
      const loginRes  = await login({
        mobileNumber,
        password
      });

      console.log('>>. LoginRes', loginRes);
      if (loginRes?.status === 200) {
        setAuth(loginRes.data)
        navigation.navigate('Home')
      }

      if (loginRes?.status === 400) {
        setErrors({
          ...errors,
          password: loginRes.data.message
        })
      }
    }

    
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.Logo}
        source={{
          uri: IMAGE_PATH.logo,
        }}
      />
      <Text style={styles.loginTitle}>Login</Text>

      <Text style={styles.inputLabel}>Mobile Number</Text>
      <TextInput
        placeholder="Enter Mobile Number"
        style={styles.input}
        keyboardType="numeric"
        value={mobileNumber}
        onChangeText={(text) => { 
          setMobileNumber(text)
          setErrors({
            ...errors,
            mobileNumber: ''
          })
        }}
      />
      {errors.mobileNumber && (
        <Text style={styles.errorText}>{errors.mobileNumber}</Text>
      )}
      {/* <br /> */}
      <Text style={styles.inputLabel}>Password</Text>
      <TextInput
        placeholder="Enter Password Here"
        style={styles.input}
        value={password}
        onChangeText={(text) => { 
          setPassword(text)
          setErrors({
            ...errors,
            password: ''
          })
        }}
        secureTextEntry={true}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password}</Text>
      )}

      {/* <br /> */}
      <View style={{ marginTop: 20 }}>
        <Button
          onPress={onPressLogin}
          title="Login"
          color="#068136"
          style={styles.loginButton}
          accessibilityLabel="Login Button"
        />
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a9ddbc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginTitle: {
    fontFamily: 'Cochin',
    color: "#068136",
    fontSize: 30,
    marginBottom: 30,

  },
  inputLabel: {
    alignSelf: "flex-start",
    marginLeft: "15%",
    margin: 2,
    marginTop: 8,
    color: "#068136",
    fontWeight: "bold"
  },
  input: {
    backgroundColor: "white",
    height: 35,
    paddingLeft: 10,
    borderRadius: 4,
    width: "70%",
    // marginBottom: 10,
    // borderRadius: "4px",
  },
  loginButton: {
    color: "#068136",
    borderRadius: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    alignSelf: "flex-start",
    marginLeft: "15%",
    // margin: 0,
  },
  Logo: {
    width: 200,
    height: 92
  }
});

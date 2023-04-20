

import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { AuthProvider, AuthContext } from '../context/AuthContext';
import AuthStack from './AuthStack';
import PrivateStack from './PrivateStack';

import { useContext } from 'react';
// import { AuthContext } from './context/AuthContext';
const Stack = createNativeStackNavigator();

export default function App() {

  const { auth }  = useContext(AuthContext);

  console.log('User token---', auth);
  return (
      <NavigationContainer>
        {auth.token ? <PrivateStack /> : <AuthStack />}
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily: "Rockwell"
  },
});

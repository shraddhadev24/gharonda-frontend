import { StatusBar } from 'expo-status-bar';

import Login from "./pages/Login"
import Home from './pages/Home'
import Menu from './pages/components/Menu';

import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-web';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { AuthProvider, AuthContext } from './context/AuthContext';
import AppStack from './navigation/AppStack';
import { useContext } from 'react';
// import { AuthContext } from './context/AuthContext';
const Stack = createNativeStackNavigator();

export default function App() {

  const { auth }  = useContext(AuthContext);

  console.log('User token---', auth);
  return (
    <AuthProvider>
      <AppStack />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily: "Rockwell"
  },
});

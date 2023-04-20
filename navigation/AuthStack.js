import Login from "../pages/Login"
import Home from '../pages/Home'
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
      <Stack.Navigator screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{title: 'Welcome'}}
        />
        {/* <Stack.Screen name="Home" component={Home} /> */}

      </Stack.Navigator>
  );
}

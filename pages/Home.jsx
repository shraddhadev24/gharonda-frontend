import { StyleSheet, TouchableHighlight, Button, View, Image, DrawerLayoutAndroid, SafeAreaView } from 'react-native';
import { IMAGE_PATH } from "../utils/imageHelper"; 

import { useRef, useState, useEffect, useContext } from 'react';
import Batches from './Batches';
import Inventory from './Inventory';
import ReadyMaterial from './ReadyMaterial';
import Users from './Users';
import Dashboard from './Dashboard';
import CleaningBatch from "./CleaningBatches";

import Login from './Login';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { getDecodedToken } from '../service/service';
import { Avatar, Text } from 'react-native-paper';
import { AuthContext } from "../context/AuthContext";

const Stack = createNativeStackNavigator();

const Home = ({ navigation }) => {
    const drawer = useRef();
    const { auth, logout } = useContext(AuthContext);
    const [decodedToken, setDecodedToken] = useState({});

    useEffect(() => {
      const decodedTokenRes = getDecodedToken(auth.token);
      setDecodedToken(decodedTokenRes);
    }, []);

    const onPressNavigation = (screen) => {
      navigation.navigate(screen)
      drawer.current?.closeDrawer()
    }

    const handleLogout = () => {
      logout()
      // onPressNavigation("Login")
    }

    const navigationView = () => (
      <View style={[styles.container, styles.navigationContainer]}>
        
        <View style={styles.avatarDiv}>
          <Avatar.Text size={40} label={decodedToken?.name?.charAt(0)} />
          <Text  variant="headlineSmall">{decodedToken.name}</Text>
          <Text>{decodedToken.mobile}</Text>
        </View>


        <TouchableHighlight
          style={styles.navigationItem}
          onPress={() => onPressNavigation("Dashboard")}
        >
          <Text>Dashboard</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.navigationItem}
          onPress={() => onPressNavigation("Users")}
        >
          <Text>Users</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.navigationItem}
          onPress={() => onPressNavigation("Inventory")}
        >
          <Text>Inventory</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.navigationItem}
          onPress={() => onPressNavigation("Batches")}
        >
          <Text>Batches</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.navigationItem}
          onPress={() => onPressNavigation("Cleaning Batch")}
        >
          <Text>Cleaning Batch</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.navigationItem}
          onPress={() => onPressNavigation("Shift Summary")}
        >
          <Text>Shift Summary</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.navigationItem}
          onPress={handleLogout}
        >
          <Text>Logout</Text>
        </TouchableHighlight>
        {/* <Button
            title="Close drawer"
            onPress={() => drawer.current?.closeDrawer()}
          /> */}
      </View>
    );

    return (
      <DrawerLayoutAndroid
        renderNavigationView={navigationView}
        ref={drawer}
        drawerWidth={300}
        drawerPosition={"left"}
      >
        <SafeAreaView style={styles.header}>
          <TouchableHighlight onPress={() => drawer.current?.openDrawer()}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: IMAGE_PATH.menuIcon,
              }}
            />
          </TouchableHighlight>
        </SafeAreaView>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Shift Summary" component={ReadyMaterial} />
          <Stack.Screen name="Batches" component={Batches} />
          <Stack.Screen name="Inventory" component={Inventory} />
          <Stack.Screen name="Users" component={Users} />
          <Stack.Screen name="Cleaning Batch" component={CleaningBatch} />

          {/* <Stack.Screen name="Login" component={Login} /> */}

        </Stack.Navigator>
        {/* <ReadyMaterial /> */}
      </DrawerLayoutAndroid>
    );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
  tinyLogo: {
    width: 30,
    height: 30,
    color: "green",
    marginLeft: 8,
    marginTop: 8,
  },
  navigationItem: {
    padding: 10,
    borderBottomColor: "silver",
    borderWidth: 1,
    borderTopColor: "white",
    borderLeftColor: "white",
    borderRightColor: "white",
  },
  header: {
    paddingBottom: 8,
    borderBottomColor: "black",
    borderWidth: 1,
    borderTopColor: "white",
    borderLeftColor: "white",
    borderRightColor: "white",
  },
  navigationContainer: {
    // width: 200
  },
  logo: {
    width: 66,
    height: 58,
  },
  avatarDiv: {
    display: "flex",
    alignItems: "center",
    marginVertical: 10,
  },
});

export default Home;
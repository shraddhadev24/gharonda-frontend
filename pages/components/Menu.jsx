import { StyleSheet, Text, TouchableHighlight, Button, View, Image, DrawerLayoutAndroid } from 'react-native';
import { IMAGE_PATH } from "../../utils/imageHelper"; 

import { useRef } from 'react';

const Home = () => {
    const drawer = useRef();

    const navigationView = () => (
        <View style={[styles.container, styles.navigationContainer]}>
          <Text style={styles.paragraph}>I'm in the Drawer!</Text>
          <Button
            title="Close drawer"
            onPress={() => drawer.current?.closeDrawer()}
          />
        </View>
    );

    return (
        <DrawerLayoutAndroid
            renderNavigationView={navigationView}
            ref={drawer}
            drawerWidth={300}
            drawerPosition={"left"}
        >
        <View>
            <TouchableHighlight onPress={() => drawer.current?.openDrawer()}>
                <Image
                    style={styles.tinyLogo}
                    source={{
                        uri: IMAGE_PATH.menuIcon,
                    }}            
                />
            </TouchableHighlight>
        </View>
        </DrawerLayoutAndroid>

    )
}

const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
    },
    tinyLogo: {
      width: 30,
      height: 30,
      color: '#068236',
      marginLeft: 8,
      marginTop: 8
    },
    logo: {
      width: 66,
      height: 58,
    },
  });

  export default Home;
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";

import { getDecodedToken } from "../service/service";
import { Avatar, Card, Button, Text } from "react-native-paper";

const Dashboard = () => {
  const { auth } = useContext(AuthContext);
  const [decodedToken, setDecodedToken] = useState({});

  useEffect(() => {
    const decodedTokenRes = getDecodedToken(auth.token);
    setDecodedToken(decodedTokenRes);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Card style={styles.card} type="outlined">
            <Card.Content>
              <Text style={styles.textColor} variant="titleLarge">Hello !</Text>
              <Text style={styles.textColor} variant="bodyMedium">{decodedToken.name}</Text>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   backgroundColor: '#a9ddbc',
      padding: 15
    //   alignItems: 'center',
    //   justifyContent: 'center',
    },
    card: {
        backgroundColor: '#a4dc7c',
    },
    textColor: {
        color: 'black',
    }
  });

export default Dashboard;

import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
} from "react-native";
import { DataTable } from "react-native-paper";
import { getAllUsers } from "../service/service";;

const Users = () => {
  const [userList, setUsersList] = useState([]);

  const fetchInventory = async () => {
    const res = await getAllUsers();
    if (res.status === 200) {
      const { data } = res.data;
      if (data && Array.isArray(data) && data.length) {
        setUsersList([...data]);
      }
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);


  const header = (
    <View style={[styles.container, styles.inlineLayout]}>
      <Text style={styles.title}>Users</Text>
    </View>
  );

  return (
          <SafeAreaView>
            {header}
            <DataTable>
              <DataTable.Header style={styles.tableHeaderRow}>
                <DataTable.Title>
                  <Text style={styles.tableHeder}>Name</Text>
                </DataTable.Title>
                <DataTable.Title>
                  <Text style={styles.tableHeder}>Mobile Number</Text>
                </DataTable.Title>
                <DataTable.Title>
                  <Text style={styles.tableHeder}>Active</Text>
                </DataTable.Title>
              </DataTable.Header>
      
              {userList.map((user) => {
                const { name, mobileNumber, isActive } = user;
                return (
                  <DataTable.Row key={user._id} style={styles.tableRow}>
                    <DataTable.Cell>{name}</DataTable.Cell>
                    <DataTable.Cell>{mobileNumber}</DataTable.Cell>
                    <DataTable.Cell>{isActive ? 'Yes' : 'No'}</DataTable.Cell>
                  </DataTable.Row>
                );
              })}
            </DataTable>
          </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 12,
    marginRight: 12,
  },
  tableHeaderRow: {
    backgroundColor: "#a4dc7c",
  },
  tableRow: {
    borderBottomColor: "#a4dc7c",
    borderWidth: 1,
    borderTopColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    backgroundColor: "white",
  },
  tableHeder: {
    color: "black",
    fontSize: 12,
    fontWeight: "bold",
  },
  addInventoryBtn: {
    width: "60%",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: "20%",
  },
  inlineLayout: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    direction: "inherit",
    flexWrap: "nowrap",
  },
  title: {
    fontSize: 18,
  },
  tinyLogo: {
    width: 20,
    height: 20,
  },
});

export default Users;

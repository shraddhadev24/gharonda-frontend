import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Image,
  Button,
  TouchableHighlight,
} from "react-native";
import { DataTable } from "react-native-paper";
import { getAllInventory } from "../service/service";
import { IMAGE_PATH } from "../utils/imageHelper";
import InventoryModal from "./components/InventoryModal";

const Inventory = () => {
  const [shift, selectedShift] = useState("left");
  const [inventoryList, setInventoryList] = useState([]);
  const [showAddInventory, setAddInventory] = useState(false);
  const [selectedInventory, setSelectedInventory] = useState("");

  const fetchInventory = async () => {
    const res = await getAllInventory();
    if (res.status === 200) {
      const { data } = res.data;
      if (data && Array.isArray(data) && data.length) {
        setInventoryList([...data]);
      }
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);


  const header = (
    <View style={[styles.container, styles.inlineLayout]}>
      <Text style={styles.title}>Inventory</Text>
    </View>
  );

  const handleCloseInventoryModal = () => { 
    setAddInventory(false) 
    setSelectedInventory("")
    fetchInventory();
  }

  const handleEditButton = (inventory) => { 
    setAddInventory(true) 
    setSelectedInventory(inventory)
    // fetchInventory();
  }

  if (showAddInventory) {
    return (
        <SafeAreaView>
            {header}
            <InventoryModal closeModal={handleCloseInventoryModal} selectedInventory={selectedInventory} />
        </SafeAreaView>
    )
  }

  return (
          <SafeAreaView>
            {header}
            <DataTable>
              <DataTable.Header style={styles.tableHeaderRow}>
                <DataTable.Title>
                  <Text style={styles.tableHeder}>Name</Text>
                </DataTable.Title>
                <DataTable.Title>
                  <Text style={styles.tableHeder}>Qty</Text>
                </DataTable.Title>
                <DataTable.Title>
                  <Text style={styles.tableHeder}>Avg Pc.</Text>
                </DataTable.Title>
                <DataTable.Title>
                  <Text style={styles.tableHeder}>Last Pc.</Text>
                </DataTable.Title>
                <DataTable.Title> </DataTable.Title>
              </DataTable.Header>
      
              {inventoryList.map((inventory) => {
                const { itemName, quantity, avgPrice, lastPrice } = inventory;
                return (
                  <DataTable.Row key={inventory._id} style={styles.tableRow}>
                    <DataTable.Cell>{itemName}</DataTable.Cell>
                    <DataTable.Cell>{quantity}</DataTable.Cell>
                    <DataTable.Cell>{avgPrice.toFixed(2)}</DataTable.Cell>
                    <DataTable.Cell>{lastPrice.toFixed(2)}</DataTable.Cell>
                    <DataTable.Cell>
                      <TouchableHighlight
                        key={inventory._id + "image"}
                        onPress={() => handleEditButton(inventory)}
                      >
                        <Image
                          style={styles.tinyLogo}
                          source={{
                            uri: IMAGE_PATH.pencilIcon,
                          }}
                        />
                      </TouchableHighlight>
                    </DataTable.Cell>
                  </DataTable.Row>
                );
              })}
            </DataTable>
            <View style={styles.addInventoryBtn}>
              <Button
                color="#068136"
                buttonStyle={{
                  color: "#a4dc7c",
                }}
                title="Add Inventory"
                onPress={() => { setAddInventory(true) }}
              />
            </View>
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

export default Inventory;

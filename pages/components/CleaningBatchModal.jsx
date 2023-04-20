import moment from "moment";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Button, TextInput, ToggleButton } from "react-native-paper";
import {
  getAllInventory,
  createCleaningBatch,
  updateCleaningBatch,
} from "../../service/service";

const BatchModal = ({ handleClose, selectedBatch, batchNameIndex }) => {
  const [isLoading, setLoading] = useState(false);
  const [inventoryList, setInventoryList] = useState([]);
  const [materials, setMaterials] = useState({});
  const [errors, setErrors] = useState({});
  const [quantityMapping, setQuantityMapping] = useState({});
  const [shift, setShiftValue] = useState("Day");
  const [spinner, setSpinner] = useState(true);

  const EDIT_MODE = selectedBatch ? true : false;

  const fetchInventory = async () => {
    setSpinner(true)
    const res = await getAllInventory();
    if (res.status === 200) {
      const { data } = res.data;
      if (data && Array.isArray(data) && data.length) {
        const inventoryQuantity = {};
        await Promise.all(
          data.map((inventoryData) => {
            inventoryQuantity[inventoryData._id] = inventoryData.quantity;
          })
        );
        setInventoryList([...data]);
        setQuantityMapping(inventoryQuantity);
        setSpinner(false)
      }
    }
  };

  useEffect(() => {
    fetchInventory();
    if (EDIT_MODE) {
      setMaterials(selectedBatch.oldMaterials);
      setShiftValue(selectedBatch.shift);
    }
  }, []);

  const handleChange = (inventoryId, value) => {
    const newMaterials = { ...materials };
    const newErrors = { ...errors };

    newMaterials[inventoryId] = value;
    newErrors[inventoryId] = "";

    setMaterials(newMaterials);
    setErrors(newErrors);
  };

  const handleSave = async () => {
    const newErrors = { ...errors };
    let isValid = true;

    await Promise.all(
      Object.entries(materials).map(([key, value]) => {
        if (quantityMapping[key] < value) {
          newErrors[key] = `Only ${quantityMapping[key]}Kg is available`;
          isValid = false;
        }
      })
    );
    setErrors(newErrors);

    if (!isValid) return;

    if (isValid) {
      let payload;

      if (EDIT_MODE) {
        payload = {
          materials: materials,
          oldMaterials: selectedBatch.oldMaterials,
          name: selectedBatch.name,
          batchId: selectedBatch._id,
        };
      } else {
        payload = {
          shift,
          date: moment().toISOString(),
          materials,
          name: "Batch No-" + batchNameIndex,
        };
      }
      setLoading(true);
      let createBatchRes;

      if (EDIT_MODE) {
        createBatchRes = await updateCleaningBatch(payload);
      } else {
        createBatchRes = await createCleaningBatch(payload);
      }
      if (createBatchRes.status === 200) {
        setLoading(false);
        handleCancel();
      }
    }
  };

  const handleCancel = () => {
    handleClose();
  };

  return (
    <View>
      <Text style={[styles.title, styles.container]}>
        {EDIT_MODE ? "Update Batch - " + selectedBatch.name : "Add Batch"}
      </Text>
      <View style={styles.centeredView}>
        <View style={[styles.inlineLayout]}>
          <View>
            <Text style={styles.shiftTitle}>Shift Selected</Text>
            <Text style={styles.shiftText}>{shift}</Text>
          </View>
          {!EDIT_MODE && (
            <ToggleButton.Row
              onValueChange={(value) => setShiftValue(value)}
              value={shift}
              editable={!EDIT_MODE}
            >
              <ToggleButton
                style={styles.dayButton}
                icon="white-balance-sunny"
                value="Day"
                status={shift === "Day" ? "checked" : "unchecked"}
              />
              <ToggleButton
                style={styles.nightBtn}
                icon="weather-night"
                value="Night"
              />
            </ToggleButton.Row>
          )}

          {/* <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />; */}
        </View>
        {spinner ? (
          <View>
            <ActivityIndicator size="small" color="#0000ff" />
          </View>
        ) : (
          <View style={styles.inlineLayout}>
            {inventoryList.map((inventory) => {
              return (
                <View key={inventory._id}>
                  {/* <Text>{inventory.itemName + ` (${inventory.quantity}Kg)`}</Text> */}
                  <TextInput
                    label={inventory.itemName}
                    value={materials[inventory._id]?.toString()}
                    mode="outlined"
                    style={styles.textInput}
                    keyboardType="numeric"
                    onChangeText={(text) => {
                      handleChange(inventory._id, text);
                    }}
                    editable={true}
                  />
                  {errors[inventory._id] && (
                    <Text style={styles.errorText}>
                      {errors[inventory._id]}
                    </Text>
                  )}
                </View>
              );
            })}
          </View>
        )}

        {inventoryList.length > 0 && (
          <View style={styles.saveInventoryBtn}>
            <Button
              buttonColor="#068136"
              loading={isLoading}
              mode="contained"
              onPress={handleSave}
            >
              {EDIT_MODE ? "Update Batch" : "Save Batch"}
            </Button>

            <Button
              textColor="#068136"
              style={styles.input}
              mode="outlined"
              onPress={handleCancel}
            >
              Cancel
            </Button>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
  },
  saveInventoryBtn: {
    marginTop: 20,
    width: "80%",
    marginLeft: "10%",
    marginRight: "10%",
  },
  title: {
    fontSize: 18,
  },
  centeredView: {
    marginLeft: "4%",
    marginRight: "4%",
    width: "92%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  container: {
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 12,
    marginRight: 12,
  },
  inlineLayout: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    direction: "inherit",
    flexWrap: "wrap",
  },
  textInput: {
    width: 120,
    marginRight: 20,
    marginTop: 10,
  },
  dayButton: {
    backgroundColor: "#EBF457",
  },
  nightBtn: {
    backgroundColor: "#CACAC8",
  },
  shiftTitle: {
    fontWeight: "bold",
  },
  shiftText: {
    fontSize: 12,
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
});

export default BatchModal;

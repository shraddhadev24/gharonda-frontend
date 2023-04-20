import moment from "moment";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Button, TextInput, ToggleButton } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";

import {
  getAllInventory,
  createReadyMaterialSummary,
  updateReadyMaterialSummary,
} from "../../service/service";

const ReadyMaterialModal = ({ handleClose, selectedSummary }) => {
  const [isLoading, setLoading] = useState(false);

  const [shift, setShiftValue] = useState("Day");
  const emptyTotalSetError = {
    color: "",
    size: "",
    feetHeight: "",
    weight: "",
    totalPcs: "",
    stock: "",
  };
  const emptyTotalSetData = {
    color: "Rosegold",
    size: "2.5 * 1.5",
    feetHeight: null,
    weight: null,
    totalPcs: null,
    stock: null,
  };

  const [errors, setErrors] = useState({
    totalSets: [{...emptyTotalSetError}],

  });

  const [materialFields, setMaterialsField] = useState({
    usedBatch: null,
    scrap: null,
    totalInput: null,
    totalOutput: null,
    // totalPcs: null,
    totalSets: [emptyTotalSetData],
    // stock: null,
    // sizeHeight: null,
    // sizeWidth: null,
    // feetHeight: null,
    // feetWidth: null,
    // color: "Rosegold",
    remark: null,
  });

  const EDIT_MODE = selectedSummary ? true : false;

  useEffect(() => {
    if (EDIT_MODE) {
      const {
        usedBatch,
        scrap,
        totalInput,
        totalOutput,
        totalPcs,
        stock,
        sizeHeight,
        sizeWidth,
        feetHeight,
        feetWidth,
        color,
        remark,
      } = selectedSummary;

      setMaterialsField({
        usedBatch: usedBatch.toString(),
        scrap: scrap.toString(),
        totalInput: totalInput.toString(),
        totalOutput: totalOutput.toString(),
        totalPcs: totalPcs.toString(),
        stock: stock.toString(),
        sizeHeight: sizeHeight.toString(),
        sizeWidth: sizeWidth.toString(),
        feetHeight: feetHeight.toString(),
        feetWidth: feetWidth.toString(),
        color: color.toString(),
        remark: remark.toString(),
      });
      setShiftValue(selectedSummary.shift);
    }
  }, []);

  const handleAddTotalSet = () => {
    setMaterialsField({
      ...materialFields,
      totalSets: [...materialFields.totalSets, emptyTotalSetData],
    });
    setErrors({
      ...errors,
      totalSets: [...errors.totalSets, emptyTotalSetError],

    })
  };

  const handleChange = (fieldName, value) => {
    const newMaterials = { ...materialFields };
    const newErrors = { ...errors, btnError: "" };

    newMaterials[fieldName] = value;
    newErrors[fieldName] = "";

    setMaterialsField(newMaterials);
    setErrors(newErrors);
  };

  const handleChangeTotalSetsFields = (fieldName, index, value) => {
    console.log('>>>>>', fieldName, index, value);

    const newMaterials = { ...materialFields };
    const newErrors = { ...errors, btnError: "" };

    newMaterials.totalSets[index][fieldName] = value;

    if (newErrors.totalSets[index] && newErrors.totalSets[index][fieldName]) {
      newErrors.totalSets[index][fieldName] = "";
    }

    console.log(">>>> 123 ",  newMaterials.totalSets[index][fieldName]);

    setMaterialsField(newMaterials);
    setErrors(newErrors);
  };

  const handleSave = async () => {
    const newErrors = { ...errors };
    let isValid = true;
    await Promise.all(
      Object.entries(materialFields).map(([key, value]) => {
        if (!value) {
          newErrors[key] = `Required`;
          isValid = false;
        }
      })
    );

    await Promise.all(materialFields.totalSets.map(async(totalSetObj, totalSetIndex) => {
      await Promise.all(
        Object.entries(totalSetObj).map(([key, value]) => {
          if (!value) {
            newErrors.totalSets[totalSetIndex][key] = `Required`;
            isValid = false;
          }
        })
      );
    }))

    console.log ('isValid===', newErrors);
    setErrors(newErrors);

    if (!isValid) return;

    if (isValid) {
      let payload;

      if (EDIT_MODE) {
        payload = {
          ...materialFields,
          materialId: selectedSummary._id,
        };
      } else {
        payload = {
          ...materialFields,
          shift,
          date: moment().toISOString(),
        };
      }

      console.log("Payload----", payload);
      // return;
      setLoading(true);

      let createBatchRes;
      if (EDIT_MODE) {
        createBatchRes = await updateReadyMaterialSummary({
          ...payload,
          materialId: selectedSummary._id,
        });
      } else {
        createBatchRes = await createReadyMaterialSummary(payload);
      }

      if (createBatchRes.status === 200) {
        setLoading(false);
        handleCancel();
      } else if (createBatchRes.status === 400) {
        const { data } = createBatchRes;
        setErrors({
          ...errors,
          btnError: data.message,
        });
        setLoading(false);
      }
    }
  };

  const handleCancel = () => {
    handleClose();
  };

  return (
    <ScrollView>
      <View style={[styles.container]}>
        <Text style={[styles.title]}>
          {EDIT_MODE ? "Update Material Summary" : "Add Material Summary "}
        </Text>
        <Text>
          {EDIT_MODE
            ? moment(selectedSummary.date).format("DD MMM, YY")
            : moment().format("DD MMM, YY")}
        </Text>
      </View>
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
        </View>
        <View>
          <View>
            <TextInput
              label={"Used Batch"}
              value={materialFields["usedBatch"]}
              mode="outlined"
              style={styles.textInput}
              keyboardType="numeric"
              onChangeText={(text) => {
                handleChange("usedBatch", text);
              }}
              editable={true}
            />
            {errors["usedBatch"] && (
              <Text style={styles.errorText}>{errors["usedBatch"]}</Text>
            )}
          </View>
          <View>
            <TextInput
              label={"Scrap"}
              value={materialFields["scrap"]}
              mode="outlined"
              style={styles.textInput}
              keyboardType="numeric"
              onChangeText={(text) => {
                handleChange("scrap", text);
              }}
              editable={true}
            />
            {errors["scrap"] && (
              <Text style={styles.errorText}>{errors["scrap"]}</Text>
            )}
          </View>
          <View>
            <TextInput
              label={"Total Input"}
              value={materialFields["totalInput"]}
              mode="outlined"
              style={styles.textInput}
              keyboardType="numeric"
              onChangeText={(text) => {
                handleChange("totalInput", text);
              }}
              editable={true}
            />
            {errors["totalInput"] && (
              <Text style={styles.errorText}>{errors["totalInput"]}</Text>
            )}
          </View>
          <View>
            <TextInput
              label={"Total Output"}
              value={materialFields["totalOutput"]}
              mode="outlined"
              style={styles.textInput}
              keyboardType="numeric"
              onChangeText={(text) => {
                handleChange("totalOutput", text);
              }}
              editable={true}
            />
            {errors["totalOutput"] && (
              <Text style={styles.errorText}>{errors["totalOutput"]}</Text>
            )}
          </View>

          {/*
              this need to be in loop
            */}
          <View>
            {materialFields.totalSets.map((totalSetObj, totalSetIndex) => {
              return (
                <View
                  style={styles.totalView}
                  key={"total-set-container-" + (totalSetIndex + 1)}
                >
                  <View>
                    <TextInput
                      label={"Total Pcs"}
                      value={materialFields.totalSets[totalSetIndex]["totalPcs"]}
                      mode="outlined"
                      style={styles.textInput}
                      keyboardType="numeric"
                      onChangeText={(text) => {
                        handleChangeTotalSetsFields(
                          "totalPcs",
                          totalSetIndex,
                          text
                        );
                      }}
                      editable={true}
                    />
                    {errors.totalSets[totalSetIndex] &&
                      errors.totalSets[totalSetIndex]["totalPcs"] && (
                        <Text style={styles.errorText}>
                          {errors.totalSets[totalSetIndex]["totalPcs"]}
                        </Text>
                      )}
                  </View>
                  <View>
                    <TextInput
                      label={"Stock"}
                      value={totalSetObj["stock"]}
                      mode="outlined"
                      style={styles.textInput}
                      keyboardType="numeric"
                      onChangeText={(text) => {
                        handleChangeTotalSetsFields(
                          "stock",
                          totalSetIndex,
                          text
                        );
                      }}
                      editable={true}
                    />
                    {errors.totalSets[totalSetIndex] &&
                      errors.totalSets[totalSetIndex]["stock"] && (
                        <Text style={styles.errorText}>
                          {errors.totalSets[totalSetIndex]["stock"]}
                        </Text>
                      )}
                    {/* {errors["stock"] && (
                      <Text style={styles.errorText}>{errors["stock"]}</Text>
                    )} */}
                  </View>
                  <View style={{}}>
                    <Text style={{ fontWeight: "bold" }}>Size: </Text>
                    {/* 
                    <DropDownPicker
                      open={open}
                      value={totalSetObj["size"]}
                      items={items}
                      setOpen={setOpen}
                      setValue={setValue}
                      setItems={setItems}
                    /> */}
                    <Picker
                      selectedValue={totalSetObj["size"]}
                      style={styles.pickerSelect}
                      onValueChange={(itemValue, itemIndex) => {
                        handleChangeTotalSetsFields(
                          "size",
                          totalSetIndex,
                          itemValue
                        );
                      }}
                    >
                      <Picker.Item label="2.5 * 1.5" value="2.5 * 1.5" />
                      <Picker.Item label="3 * 2" value="3 * 2" />
                      <Picker.Item label="4 * 2.5" value="4 * 2.5" />
                      <Picker.Item label="5 * 2.5" value="5 * 2.5" />
                      <Picker.Item label="6 * 2.5" value="6 * 2.5" />
                    </Picker>
                  </View>
                  <View style={{}}>
                    <View>
                      <TextInput
                        label={"Feet - H"}
                        value={totalSetObj["feetHeight"]}
                        mode="outlined"
                        style={[styles.textInput]}
                        keyboardType="numeric"
                        onChangeText={(text) => {
                          handleChangeTotalSetsFields(
                            "feetHeight",
                            totalSetIndex,
                            text
                          );
                        }}
                        editable={true}
                      />
                      {/* {errors["feetHeight"] && (
                        <Text style={styles.errorText}>
                          {errors["feetHeight"]}
                        </Text>
                      )} */}
                      {errors.totalSets[totalSetIndex] &&
                        errors.totalSets[totalSetIndex]["feetHeight"] && (
                          <Text style={styles.errorText}>
                            {errors.totalSets[totalSetIndex]["feetHeight"]}
                          </Text>
                        )}
                    </View>
                    <View>
                      <TextInput
                        label={"Weight"}
                        value={totalSetObj["weight"]}
                        mode="outlined"
                        style={[styles.textInput]}
                        keyboardType="numeric"
                        onChangeText={(text) => {
                          handleChangeTotalSetsFields(
                            "weight",
                            totalSetIndex,
                            text
                          );
                        }}
                        editable={true}
                      />
                      {/* {errors["Weight"] && (
                        <Text style={styles.errorText}>{errors["Weight"]}</Text>
                      )} */}
                      {errors.totalSets[totalSetIndex] &&
                        errors.totalSets[totalSetIndex]["weight"] && (
                          <Text style={styles.errorText}>
                            {errors.totalSets[totalSetIndex]["weight"]}
                          </Text>
                        )}
                    </View>
                  </View>
                  <View style={styles.input}>
                    <Text style={{ fontWeight: "bold" }}>Color: </Text>
                    <Picker
                      selectedValue={totalSetObj["color"]}
                      style={styles.pickerSelect}
                      onValueChange={(itemValue, itemIndex) => {
                        handleChangeTotalSetsFields(
                          "color",
                          totalSetIndex,
                          itemValue
                        );
                      }}
                    >
                      <Picker.Item label="Rosegold" value="Rosegold" />
                      <Picker.Item label="Dark Brown" value="Darkbrown" />
                      <Picker.Item label="Dark Gray" value="DarkGray" />
                      <Picker.Item label="Black" value="Black" />
                      <Picker.Item label="White" value="White" />
                      <Picker.Item label="Ivory" value="Ivory" />
                    </Picker>
                    {/* {materialFields["color"]} */}
                    {errors["btnError"] && (
                      <Text style={styles.errorText}>{errors["btnError"]}</Text>
                    )}
                    <View style={styles.spacer} />
                  </View>
                  {materialFields.totalSets.length === totalSetIndex + 1 ? (
                    <View style={styles.totalViewAddButton}>
                      <Button
                        buttonColor="#068136"
                        textColor="white"
                        icon="plus"
                        compact={true}
                        mode="outlined"
                        onPress={handleAddTotalSet}
                      >
                        Add More
                      </Button>
                      <View style={styles.spacer} />
                    </View>
                  ) : null}
                </View>
              );
            })}
           
          </View>

          <View>
            <TextInput
              label={"Remark"}
              value={materialFields["remark"]}
              mode="outlined"
              onChangeText={(text) => {
                handleChange("remark", text);
              }}
              editable={true}
            />
            {errors["remark"] && (
              <Text style={styles.errorText}>{errors["remark"]}</Text>
            )}
          </View>
        </View>
        <View style={styles.saveInventoryBtn}>
          <Button
            buttonColor="#068136"
            loading={isLoading}
            mode="contained"
            onPress={handleSave}
          >
            Save Summary
          </Button>

          <Button
            textColor="#068136"
            style={[styles.input, { marginBottom: 50 }]}
            mode="outlined"
            onPress={handleCancel}
          >
            Cancel
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
  },
  spacer: {
    height: 20
  },
  totalViewAddButton: {
    // margin: '0 auto',
    // width: '50%'
    marginHorizontal: 40
  },
  pickerSelect: {
    // height: 30,
    // width: 250,
    backgroundColor: "white",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 4,
    borderColor: "grey",
    marginVertical: 0,
    marginRight: 25,
    paddingVertical: 0,

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
  totalView: {
    borderColor: "silver",
    borderWidth: 1,
    backgroundColor: 'silver',
    paddingHorizontal: 20,
    marginVertical: 20,
    borderRadius: 10,
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
    // width: 180,
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

export default ReadyMaterialModal;

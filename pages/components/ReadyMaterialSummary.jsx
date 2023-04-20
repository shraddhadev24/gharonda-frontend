import React from "react";
import { ScrollView, View, Text, StyleSheet, Button } from "react-native";
import { List, IconButton } from "react-native-paper";
import moment from "moment";
import Separator from "./Seperator";
const ReadyMaterialSummary = ({ selectedSummary }) => {
  const summary = selectedSummary;
  const { batches } = summary;

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.inlineLayout]}>
        <View>
          <Text style={[styles.title]}>Summary </Text>
          <Text>{moment(selectedSummary.date).format("DD MMM, YY")}</Text>
          <Text>
            <Text style={styles.boldText}>Shift: </Text>
            {selectedSummary.shift}
          </Text>
        </View>
        <View>
          <Button color="#068136" title="Download"></Button>
        </View>
      </View>
      <View style={[styles.cardContainer, styles.topSpacer]}>
        <Text style={[styles.boldText, { fontSize: 16, color: "#068136" }]}>
          Overall Summary
        </Text>
        <View style={[styles.inlineLayout, { justifyContent: "flex-start" }]}>
          <View style={styles.materialFieldView}>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Used Batch: </Text>
              {summary.usedBatch}
            </Text>
          </View>
          <View style={styles.materialFieldView}>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Stock: </Text>
              {summary.stock}
            </Text>
          </View>

          <View style={styles.materialFieldView}>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Total Input: </Text>
              {summary.totalInput}
            </Text>
          </View>
          <View style={styles.materialFieldView}>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Total Output: </Text>
              {summary.totalOutput}
            </Text>
          </View>
          <View style={styles.materialFieldView}>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Total Pcs: </Text>
              {summary.totalOutput}
            </Text>
          </View>
          <View style={styles.materialFieldView}>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Scrap: </Text>
              {summary.scrap}
            </Text>
          </View>
          <View style={styles.materialFieldView}>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Size: </Text>
              {summary.sizeHeight} * {summary.sizeWidth}
            </Text>
          </View>
          <View style={styles.materialFieldView}>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Feet: </Text>
              {summary.feetHeight} * {summary.feetWidth}
            </Text>
          </View>
          <View style={styles.materialFieldView}>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Color: </Text>
              {summary.color}
            </Text>
          </View>
          <View style={{ marginRight: 20, marginTop: 10 }}>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Remark: </Text>
              {summary.remark}
            </Text>
          </View>
        </View>
        <Text
          style={[
            styles.boldText,
            { fontSize: 14, color: "#068136" },
            styles.topSpacer,
          ]}
        >
          Batches Summary
        </Text>

        <Separator />
        <List.Section title="">
          {batches.length ? (
            batches.map((batch) => (
              <List.Accordion
                title={`${batch.name} (${batch.shift})`}
                description={
                  <View>
                    <Text>{`Total Input: ${batch.totalInput} Kg`}</Text>
                    <Text>{moment(batch.date).format("DD MMM, YY")}</Text>
                  </View>
                }
                //   left={(props) => <List.Icon {...props} icon="folder"/>}
              >
                <View style={styles.cardContainer}>
                  <View
                    style={[
                      styles.inlineLayout,
                      { justifyContent: "flex-start" },
                    ]}
                  >
                    {batch.materials.map((material) => (
                      <View key={material._id} style={{ marginRight: 20, marginTop: 18 }}>
                        <Text>
                          <Text style={{ fontWeight: "bold" }}>Name: </Text>
                          {material.itemName}
                        </Text>
                        <Text>
                          <Text style={{ fontWeight: "bold" }}>Qty: </Text>
                          {material.quantity}
                        </Text>
                      </View>
                    ))}
                  </View>
                  <Separator />
                  <View
                    style={[
                      styles.inlineLayout,
                      { justifyContent: "flex-start" },
                    ]}
                  >
                    <View style={{ marginRight: 20, marginTop: 18 }}>
                      <Text style={{ fontWeight: "bold" }}>Last Updated: </Text>
                      <Text>
                        {moment(batch.updateAt).format("DD MMM YY, HH: MM")}
                      </Text>
                    </View>

                    {/* <View style={{ marginRight: 20, marginTop: 18 }}>
                      <IconButton
                        icon="delete"
                        // iconColor={MD3Colors.error50}
                        size={20}
                        onPress={() => console.log("Pressed")}
                      />
                    </View> */}
                    {/* <View style={{ marginRight: 20, marginTop: 18 }}>
                      <IconButton
                        icon="pencil"
                        // iconColor={MD3Colors.error50}
                        size={20}
                        onPress={() => console.log("Pressed")}
                      />
                    </View> */}
                  </View>
                </View>
              </List.Accordion>
            ))
          ) : (
            <View style={[styles.cardContainer, { paddingVertical: 20 }]}>
              <Text>No Batch Created Yet.</Text>
            </View>
          )}
        </List.Section>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  topSpacer: {
    marginTop: 18,
  },
  cardContainer: {
    backgroundColor: "white",
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 4,
    paddingVertical: 10,
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
  boldText: {
    fontWeight: "bold",
  },
  shiftText: {
    fontSize: 12,
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
  materialFieldView: {
    marginRight: 20,
    marginTop: 10,
    width: 130,
  },
});

export default ReadyMaterialSummary;

import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  View,
  Button,
  StyleSheet,
  ActivityIndicator,
  Picker,
} from "react-native";
import { List, IconButton } from "react-native-paper";
import moment from "moment";
import ReadyMaterialModal from "./components/ReadyMaterialModal";
import Separator from "./components/Seperator";
import ReadyMaterialSummary from "./components/ReadyMaterialSummary";
import {
  getAllMaterialSummary,
  deleteReadyMaterialSummary,
} from "../service/service";
import DeleteModal from "./components/DeleteModal";

const ReadyMaterial = () => {
  const [summaryList, setSummaryList] = useState([]);
  const [showReadyMaterialModal, setReadyMaterialModal] = useState(false);
  const [selectedSummary, setSelectedSummary] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const [showDeleteModal, setDeleteModal] = useState(false);
  const [spinner, setSpinner] = useState(true);

  const clickSeeBatches = (summary) => {
    setSelectedSummary(summary);
    setShowSummary(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setSpinner(false);
    }, 90000);
  });

  const fetchSummaryList = async () => {
    const res = await getAllMaterialSummary();
    if (res.status === 200) {
      const { data } = res.data;
      if (data && Array.isArray(data) && data.length) {
        setSummaryList([...data]);
      }
    }
  };

  useEffect(() => {
    fetchSummaryList();
  }, []);

  const handleAddSummary = () => {
    setReadyMaterialModal(true);
  };

  const handleCloseModal = () => {
    setReadyMaterialModal(false);
    fetchSummaryList();
  };

  const handledCloseDeleteModal = () => {
    setDeleteModal(false);
    setSelectedSummary(null);
  };

  const handleDeleteConfirm = async () => {
    await deleteReadyMaterialSummary({ materialId: selectedSummary._id });
    fetchSummaryList();
    setDeleteModal(false);
    setSelectedSummary(null);
  };

  const onPressDelete = async (summary) => {
    setSelectedSummary(summary);
    setDeleteModal(true);
  };

  const handleEdit = async (summary) => {
    setSelectedSummary(summary);
    setReadyMaterialModal(true);

    // setAddBatch(false);
    // fetchBatches();
  };

  if (showReadyMaterialModal) {
    return (
      <View>
        <ReadyMaterialModal
          handleClose={handleCloseModal}
          selectedSummary={selectedSummary}
        />
      </View>
    );
  }

  if (showDeleteModal) {
    return (
      <DeleteModal
        title="Delete Summary"
        body="Are you sure, you want to delete this summary"
        visible={showDeleteModal}
        onClose={handledCloseDeleteModal}
        onConfirm={handleDeleteConfirm}
      />
    );
  }

  if (showSummary) {
    return <ReadyMaterialSummary selectedSummary={selectedSummary} />;
  }

  // return (
  //   <ScrollView style={styles.centerContainer}>
  //     {spinner ? (
  //       <View>
  //         <ActivityIndicator size="small" color="#0000ff" />
  //       </View>
  //     ) : (
  //       <View style={styles.serverCrash}>
  //         <Text>Server Crashed!!! </Text>
  //       </View>
  //     )}
  //   </ScrollView>
  // );
  return (
    <ScrollView>
      <View style={[styles.container, styles.inlineLayout]}>
        <View>
          <Text style={styles.title}>Material Summary</Text>
          <Text>{moment().format("DD MMM, YY")}</Text>
        </View>
        <Button
          title="Add"
          style={styles.viewBtn}
          color="#068136"
          onPress={handleAddSummary}
        />
      </View>
      {summaryList.length ? (
        summaryList.map((summary) => (
          <List.Accordion
            key={summary._id}
            //    style={{ borderColor: 'black', border: 1, borderStyle: 'solid'}}
            title={`${moment(summary.date).format("DD MMM, YY")} (${
              summary.shift
            })`}
            description={
              <View>
                <Text>{`Total Input: ${summary.totalInput} Kg`}</Text>
                {/* <Text>{moment(batch.date).format("DD MMM, YY")}</Text> */}
              </View>
            }
          >
            <View style={styles.cardContainer}>
              <Separator />
              <View
                style={[styles.inlineLayout, { justifyContent: "flex-start" }]}
              >
                <View style={styles.materialFieldView}>
                  <Text>
                    <Text style={{ fontWeight: "bold" }}>Used Batch: </Text>
                    {summary.usedBatch}
                  </Text>
                </View>
                {/*  */}
                <View style={styles.materialFieldView}>
                  <Text>
                    <Text style={{ fontWeight: "bold" }}>Scrap: </Text>
                    {summary.scrap}
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
                <View>
                  {summary.totalSets.map((totalSetObj) => {
                    return (
                      <View  style={[styles.inlineLayout, styles.totalSetDiv, { justifyContent: "flex-start" }]}>
                        <View style={styles.materialFieldView}>
                          <Text>
                            <Text style={{ fontWeight: "bold" }}>
                              Total Pcs:{" "}
                            </Text>
                            {totalSetObj.totalPcs}
                          </Text>
                        </View>
                        <View style={styles.materialFieldView}>
                          <Text>
                            <Text style={{ fontWeight: "bold" }}>Stock: </Text>
                            {totalSetObj.stock}
                          </Text>
                        </View>
                        <View style={styles.materialFieldView}>
                          <Text>
                            <Text style={{ fontWeight: "bold" }}>Size: </Text>
                            {totalSetObj.size}
                          </Text>
                        </View>
                        <View style={styles.materialFieldView}>
                          <Text>
                            <Text style={{ fontWeight: "bold" }}>Feet: </Text>
                            {totalSetObj.feetHeight}
                          </Text>
                        </View>
                        <View style={styles.materialFieldView}>
                          <Text>
                            <Text style={{ fontWeight: "bold" }}>Weight: </Text>
                            {totalSetObj.weight}
                          </Text>
                        </View>
                        <View style={styles.materialFieldView}>
                          <Text>
                            <Text style={{ fontWeight: "bold" }}>Color: </Text>
                            {totalSetObj.color}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
              <Separator />
              <View
                style={[
                  styles.inlineLayout,
                  { justifyContent: "space-between" },
                ]}
              >
                <View style={{ marginRight: 20, marginTop: 10 }}>
                  <Text style={{ fontWeight: "bold" }}>Last Updated: </Text>
                  <Text>
                    {moment(summary.updateAt).format("DD MMM YY, HH: MM")}
                  </Text>
                </View>
                <View
                  style={[
                    styles.inlineLayout,
                    { justifyContent: "space-between" },
                  ]}
                >
                  <View style={{ marginRight: 0, marginTop: 0 }}>
                    {/* <Text style={{ fontWeight: "bold" }}>Delete </Text> */}

                    <IconButton
                      icon="delete"
                      // iconColor={MD3Colors.error50}
                      size={20}
                      onPress={() => onPressDelete(summary)}
                    />
                  </View>
                  <View style={{ marginRight: 10, marginTop: 0 }}>
                    <IconButton
                      icon="pencil"
                      // iconColor={MD3Colors.error50}
                      size={20}
                      onPress={() => handleEdit(summary)}
                    />
                  </View>
                </View>
              </View>
              <View
                style={{
                  marginTop: 10,
                  width: "60%",
                  marginLeft: "20%",
                  marginBottom: 10,
                  marginRight: "20%",
                }}
              >
                <Button
                  onPress={() => clickSeeBatches(summary)}
                  title="See Batches"
                />
              </View>
              <Separator />
            </View>
          </List.Accordion>
        ))
      ) : (
        <View style={[styles.cardContainer, { paddingVertical: 20 }]}>
          <Text>No Material Summary Created Yet.</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  serverCrash: {
    backgroundColor: "yellow",
    margin: 20,
    padding: 20,
  },
  centerContainer: {
    paddingVertical: 100,
  },
  totalSetDiv: {
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
    borderColor: 'silver',
    borderRadius: 10
  },
  container: {
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 12,
    marginRight: 12,
  },
  cardContainer: {
    backgroundColor: "white",
    paddingLeft: 12,
    paddingRight: 12,
  },
  inlineLayout: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    direction: "inherit",
    flexWrap: "wrap",
  },

  title: {
    fontSize: 18,
  },
  shiftBtn: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    marginLeft: 20,
  },
  dayBtn: {
    backgroundColor: "#EBF457",
    borderColor: "#EBF457",
    borderWidth: 2,
  },
  nightBtn: {
    backgroundColor: "#CACAC8",
    marginLeft: 0,
    borderColor: "#CACAC8",
    borderWidth: 2,
  },
  selectedDayBtn: {
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#C1EB06",
  },
  selectedNightBtn: {
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#787979",
  },
  viewBtn: {
    height: 30,
  },
  materialFieldView: {
    marginRight: 20,
    marginTop: 10,
    width: 130,
  },
});

export default ReadyMaterial;

import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Button,
  DrawerLayoutAndroid,
} from "react-native";
import { RadioButton, List, IconButton, Chip } from "react-native-paper";
import moment from "moment";
import BatchModal from "./components/BatchModal";
import { getAllBatches } from "../service/service";
import DeleteModal from "./components/DeleteModal";
import { deleteBatch } from "../service/service";

const Batches = () => {
  const [shift, selectedShift] = useState("left");
  const [filterValue, setFilterValue] = useState("All");
  const [showAddBatch, setAddBatch] = useState(false);
  const [batches, setBatches] = useState([]);
  const [expanded, setExpanded] = useState(true);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [showDeleteModal, setDeleteModal] = useState(false);
  const [batchNameIndex, setBatchNameIndex] = useState(1);

  const handlePress = () => setExpanded(!expanded);

  const fetchBatches = async () => {
    const res = await getAllBatches();
    if (res.status === 200) {
      const { data } = res.data;
      if (data && Array.isArray(data) && data.length) {
        setBatches([...data]);
      }
    }
  };

  useEffect(() => {
    fetchBatches();
  }, []);


  const handleAddBatch = () => {
    setAddBatch(true);
    const today = moment().startOf('day');
    const todaysBatch = batches.filter((batchEle) => moment(batchEle.date).isAfter(today));
    setBatchNameIndex(todaysBatch.length + 1);
  };

  const handleCloseBatchModal = () => {
    setAddBatch(false);
    fetchBatches();
    setSelectedBatch(null)
  };


  const handledCloseDeleteModal = () => {
    setDeleteModal(false);
    setSelectedBatch(null)
  }


  const handleDeleteConfirm = async () => {
    await deleteBatch({ batchId: selectedBatch._id })
    fetchBatches();
    setDeleteModal(false);
    setSelectedBatch(null)
  }

  const onPressDelete = async (batch) => {
    setSelectedBatch(batch)
    setDeleteModal(true);
  }


  const handleEdit = async (batch) => {

    const oldMaterials = {};

    await Promise.all(batch.materials.map((material) => {
      oldMaterials[material.inventoryId] = material.quantity
    }));

    const newBatch = {
      ...batch,
      oldMaterials
    }

    setSelectedBatch(newBatch)
    setAddBatch(true);

    // setAddBatch(false);
    // fetchBatches();
  };


  const Separator = () => <View style={styles.separator} />;

  if (showAddBatch) {
    return (
      <View>
        <BatchModal batchNameIndex={batchNameIndex} handleClose={handleCloseBatchModal} selectedBatch={selectedBatch} />
      </View>
    );
  }

  if (showDeleteModal) {
    return (
      <DeleteModal
        title="Delete Batch"
        body="Are you sure, you want to delete this batch"
        visible={showDeleteModal}
        onClose={handledCloseDeleteModal}
        onConfirm={handleDeleteConfirm}
      />
    ); 
  }


  return (
    <ScrollView>
      <View style={[styles.container, styles.inlineLayout]}>
        <View>
          <Text style={styles.title}>Batch Summary</Text>
          <Text>{moment().format("DD MMM, YY")}</Text>
        </View>
        <Button
          title="+ Add Batch"
          style={styles.viewBtn}
          color="#068136"
          onPress={handleAddBatch}
        />
      </View>

      <List.Section title="">
        {batches.length ? (
          batches.map((batch) => (
            <List.Accordion
              title={`${batch.name} (${batch.shift})`}
              key={batch._id}
              description={
                <View>
                  <Text>{`Total Input: ${batch.totalInput} Kg`}</Text>
                  <Text>{moment(batch.date).format("DD MMM, YY")}</Text>
                  <Chip mode="flat" compact={true}>{batch.status}</Chip>

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
                    <View key={material.inventoryId} style={{ marginRight: 20, marginTop: 18 }}>
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
                    { justifyContent: "space-between", paddingBottom: 10 },
                  ]}
                >
                  <View style={{ marginRight: 20, marginTop: 10 }}>
                    <Text style={{ fontWeight: "bold" }}>Last Updated: </Text>
                    <Text>
                      {moment(batch.updateAt).format("DD MMM YY, HH: MM")}
                    </Text>
                  </View>
                  <View style={[styles.inlineLayout, { justifyContent: "space-between" }]}>
                    <View style={{ marginRight: 0, marginTop: 0 }}>
                      {/* <Text style={{ fontWeight: "bold" }}>Delete </Text> */}

                      <IconButton
                        icon="delete"
                        // iconColor={MD3Colors.error50}
                        size={20}
                        onPress={() => onPressDelete(batch)}
                      />
                    </View>
                    <View style={{ marginRight: 0, marginTop: 0  }}>
                      <IconButton
                        icon="pencil"
                        // iconColor={MD3Colors.error50}
                        size={20}
                        onPress={() => handleEdit(batch)}
                      />
                    </View>
                  </View>

                </View>
              </View>
            </List.Accordion>
          ))
        ) : (
            <View style={[styles.cardContainer, {paddingVertical: 20}]}>
                <Text>No Batch Created Yet.</Text>
            </View>
        )}
      </List.Section>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default Batches;

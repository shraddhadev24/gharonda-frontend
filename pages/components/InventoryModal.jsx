import { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { createInventory, updateInventory } from "../../service/service";

const InventoryModal = ({ closeModal, selectedInventory }) => {
  const [itemName, setItemName] = useState("")
  const [quantity, setQuantity] = useState("")
  const [price, setPrice] = useState("")
  const [newQuantity, setNewQuantity] = useState("")
  const [newPrice, setNewPrice] = useState("")
  const [errors, setNewErrors] = useState({
    itemName: '',
    quantity: '',
    price: '',
    newQuantity: '',
    newPrice: ''
  });

  const EDIT_MODE = selectedInventory ? true : false;

  useEffect(() => {
    if (EDIT_MODE) {
      setItemName(selectedInventory.itemName);
      setQuantity(selectedInventory.quantity.toString());
      setPrice(selectedInventory.avgPrice.toFixed(2).toString());
    }
  },[])
  const [isLoading, setLoading] = useState(false);

  const handleSave = async () => {
    const newErrors = {
      itemName: '',
      quantity: '',
      price: ''
    }

    let isValidCheck = true;

    if (EDIT_MODE) {
      if (!newQuantity) {
        newErrors.newQuantity = 'Quantity is required';
        isValidCheck = false;
      }
  
      if (!newPrice) {
        newErrors.newPrice = 'Price is required';
        isValidCheck = false;
      }
    } else {

      if (!itemName) {
        newErrors.itemName = 'Item Name is required';
        isValidCheck = false;
      }
  
      if (!quantity) {
        newErrors.quantity = 'Quantity is required';
        isValidCheck = false;
      }
  
      if (!price) {
        newErrors.price = 'Price is required';
        isValidCheck = false;
      }
    }


    setNewErrors(newErrors)

    if (isValidCheck) {
      setLoading(true);

      let res;
      
      if (EDIT_MODE) {
        res = await updateInventory({
          "inventoryId": selectedInventory._id,
          "quantity": newQuantity,
          "price": newPrice
        });
      } else {
        res = await createInventory({
          "name": itemName,
          "quantity": quantity,
          "price": price
        });
      }

      setLoading(false);

      if (res.status === 200) {
        handleCancel();
      }
    }

  }

  const resetData = () => {
    setItemName("");
    setNewErrors({});
    setPrice("");
    setQuantity("");
    setLoading(false);
  }

  const handleCancel = () => {
    closeModal()
    resetData()
  }

  return (
    <View style={styles.centeredView}>
      <TextInput
        label="Item Name"
        value={itemName}
        mode="outlined"
        style={styles.input}
        onChangeText={(text) => {
          setItemName(text)
          setNewErrors({
            ...errors,
            itemName: ''
          })
        }}
        editable={!EDIT_MODE}
      />
      {errors.itemName && <Text style={styles.errorText}>{errors.itemName}</Text>}

      <TextInput
        label="Quantity"
        placeholder="Quantity"
        mode="outlined"
        value={quantity}
        style={styles.input}
        keyboardType="numeric"
        onChangeText={(text) => {
          setQuantity(text)
          setNewErrors({
            ...errors,
            quantity: ''
          })
        }}
        editable={!EDIT_MODE}
      />
      {errors.quantity && <Text style={styles.errorText}>{errors.quantity}</Text>}

      <TextInput
        label="Price"
        value={price}
        mode="outlined"
        style={styles.input}
        keyboardType="numeric"
        onChangeText={(text) => {
          setPrice(text);
          setNewErrors({
            ...errors,
            price: ''
          })
        }}
        editable={!EDIT_MODE}
      />
      {errors.price && <Text style={styles.errorText}>{errors.price}</Text>}

      {EDIT_MODE && (
        <View>
                <TextInput
                  label="New Quantity"
                  value={newQuantity}
                  mode="outlined"
                  style={styles.input}
                  keyboardType="numeric"
                  onChangeText={(text) => {
                    setNewQuantity(text);
                    setNewErrors({
                      ...errors,
                      newQuantity: ''
                    })
                  }}
                  editable={EDIT_MODE}
                />
                {errors.newQuantity && <Text style={styles.errorText}>{errors.newQuantity}</Text>}
                <TextInput
                  label="New Price"
                  value={newPrice}
                  mode="outlined"
                  style={styles.input}
                  keyboardType="numeric"
                  onChangeText={(text) => {
                    setNewPrice(text);
                    setNewErrors({
                      ...errors,
                      newPrice: ''
                    })
                  }}
                  editable={EDIT_MODE}
                />
                {errors.newPrice && <Text style={styles.errorText}>{errors.newPrice}</Text>}
        </View>
      )}

      <View style={styles.saveInventoryBtn}>
        <Button buttonColor="#068136" loading={isLoading} mode="contained" onPress={handleSave}>
          Save Inventory
        </Button>

        <Button textColor="#068136"  style={styles.input} mode="outlined" onPress={handleCancel}>
          Cancel
        </Button>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
    centeredView: {
        marginLeft: '4%',
        marginRight: '4%',
        width: '92%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10
      },
      input: {
        // borderColor: "black",
        // border: 1,
        // borderStyle: 'solid',
        // height: 35,
        // paddingLeft: 10,
        // borderRadius: 4,
        // width: "50%",
        marginTop: 10,
        // borderRadius: "4px",
      },
      saveInventoryBtn: {
        marginTop: 20,
      },
      errorText: {
        color: 'red'
      }
  });
export default InventoryModal;

import axios from 'axios';
import { BASE_URL, END_POINT } from './config';
import jwt_decode from "jwt-decode";

export const configureAxiosHeaders = (token) => {
    axios.defaults.headers["authorization"] = 'Bearer '+ token;
    axios.defaults.headers["Content-Type"] = 'application/json';
};

export const removeConfigureAxiosHeaders = () => {
    delete axios.defaults.headers["authorization"];
};

export const getDecodedToken = (token) => {
    const decodedToken = jwt_decode(token);
    return decodedToken;
}

export const getAllInventory = async () => {
    try {
        const  res = await axios.get(`${BASE_URL}/${END_POINT.FETCH_INVENTORY}`);
        // console.log(">>> Res", res);
        return res;
    } catch (err) {
        console.log('Error in fetch', err.toString(), `${BASE_URL}/${END_POINT.FETCH_INVENTORY}`)
        return err
    }

}

export const login = async (data) => {
    try {

        console.log(">>> data", data, `${BASE_URL}/${END_POINT.LOGIN}`, axios.defaults.headers);
        const  res = await axios.post(`${BASE_URL}/${END_POINT.LOGIN}`, data, {
            headers: {
                "Content-Type": 'application/json'
            }
        });
        return res;
    } catch (err) {
        console.log('Error in create Login', JSON.stringify(err) , `${BASE_URL}/${END_POINT.LOGIN}`)
        return  err.response
    }
}

export const getAllUsers = async () => {
    try {
        const  res = await axios.get(`${BASE_URL}/${END_POINT.LIST_USER}`);
        return res;
    } catch (err) {
        console.log('Error in create Get ALL USers', err.toString(), `${BASE_URL}/${END_POINT.LIST_USER}`)
        return  err.response
    }
}

export const createInventory = async (data) => {
    try {
        const  res = await axios.post(`${BASE_URL}/${END_POINT.CREATE_INVENTORY}`, data);
        return res;
    } catch (err) {
        console.log('Error in create Inventory', err.toString(), `${BASE_URL}/${END_POINT.CREATE_INVENTORY}`)
        return err
    }
}

export const updateInventory = async (data) => {
    try {

        console.log("data===", data);
        const  res = await axios.post(`${BASE_URL}/${END_POINT.UPDATE_INVENTORY}`, data);
        return res;
    } catch (err) {
        console.log('Error in Update Inventory', err.toString(), `${BASE_URL}/${END_POINT.UPDATE_INVENTORY}`)
        return err
    }
}

export const createBatch = async (data) => {
    try {
        const  res = await axios.post(`${BASE_URL}/${END_POINT.NEW_BATCH}`, data);
        return res;
    } catch (err) {
        console.log('Error in Creating Batch', err.toString(), `${BASE_URL}/${END_POINT.NEW_BATCH}`)
        return err
    }
}

export const updateBatch = async (data) => {
    try {
        const  res = await axios.post(`${BASE_URL}/${END_POINT.UPDATE_BATCH}`, data);
        return res;
    } catch (err) {
        console.log('Error in Creating Batch', err.toString(), `${BASE_URL}/${END_POINT.UPDATE_BATCH}`)
        return err
    }
}

export const deleteBatch = async (data) => {
    try {
        const  res = await axios.post(`${BASE_URL}/${END_POINT.DELETE_BATCH}`, data);
        return res;
    } catch (err) {
        console.log('Error in Creating Batch', err.toString(), `${BASE_URL}/${END_POINT.DELETE_BATCH}`)
        return err
    }
}

export const getAllBatches = async () => {
    try {
        const  res = await axios.get(`${BASE_URL}/${END_POINT.FETCH_BATCH}`);
        return res;
    } catch (err) {
        console.log('Error in fetch', err.toString(), `${BASE_URL}/${END_POINT.FETCH_BATCH}`)
        return err
    }
}
//

export const createCleaningBatch = async (data) => {
    try {
        const  res = await axios.post(`${BASE_URL}/${END_POINT.CLEANING_NEW_BATCH}`, data);
        return res;
    } catch (err) {
        console.log('Error in Creating Cleaning Batch', err.toString(), `${BASE_URL}/${END_POINT.CLEANING_NEW_BATCH}`)
        return err
    }
}

export const updateCleaningBatch = async (data) => {
    try {
        const  res = await axios.post(`${BASE_URL}/${END_POINT.CLEANING_UPDATE_BATCH}`, data);
        return res;
    } catch (err) {
        console.log('Error in updating Cleaning Batch', err.toString(), `${BASE_URL}/${END_POINT.CLEANING_UPDATE_BATCH}`)
        return err
    }
}

export const deleteCleaningBatch = async (data) => {
    try {
        const  res = await axios.post(`${BASE_URL}/${END_POINT.CLEANING_DELETE_BATCH}`, data);
        return res;
    } catch (err) {
        console.log('Error in Creating Cleaning Batch', err.toString(), `${BASE_URL}/${END_POINT.CLEANING_DELETE_BATCH}`)
        return err
    }
}

export const getAllCleaningBatches = async () => {
    try {
        const  res = await axios.get(`${BASE_URL}/${END_POINT.CLEANING_FETCH_BATCH}`);
        return res;
    } catch (err) {
        console.log('Error in Cleaning fetch', err.toString(), `${BASE_URL}/${END_POINT.CLEANING_FETCH_BATCH}`)
        return err
    }
}

export const createReadyMaterialSummary = async (data) => {
    try {
        const  res = await axios.post(`${BASE_URL}/${END_POINT.CREATE_MATERIAL}`, data);
        return res;
    } catch (err) {
        console.log('Error in Creating Material', err.toString(), `${BASE_URL}/${END_POINT.CREATE_MATERIAL}`)
        return  err.response
    }
}

export const updateReadyMaterialSummary = async (data) => {
    try {
        const  res = await axios.post(`${BASE_URL}/${END_POINT.UPDATE_READY_MATERIAL}`, data);
        return res;
    } catch (err) {
        console.log('Error in Updating Material', err.response.data, `${BASE_URL}/${END_POINT.UPDATE_READY_MATERIAL}`)
        return  err.response
    }
}



export const deleteReadyMaterialSummary = async (data) => {
    try {
        const  res = await axios.post(`${BASE_URL}/${END_POINT.DELETE_READY_MATERIAL}`, data);
        return res;
    } catch (err) {
        console.log('Error in Creating Material', err.toString(), `${BASE_URL}/${END_POINT.DELETE_READY_MATERIAL}`)
        return  err.response
    }
}




export const getAllMaterialSummary = async () => {
    try {
        const  res = await axios.get(`${BASE_URL}/${END_POINT.FETCH_MATERIAL}`);
        return res;
    } catch (err) {
        console.log('Error in fetch', err.toString(), `${BASE_URL}/${END_POINT.FETCH_MATERIAL}`)
        return err
    }
}
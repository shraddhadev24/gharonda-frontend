export const BASE_URL = 'https://cce6-2405-201-6808-4048-7809-adaa-e976-e0a.ngrok-free.app/api';

export const END_POINT = {
    FETCH_INVENTORY: 'inventory/list',
    CREATE_INVENTORY: 'inventory/newInventory',
    UPDATE_INVENTORY: 'inventory/updateInventory',
    NEW_BATCH: 'batch/newBatch',
    FETCH_BATCH: 'batch/list',
    DELETE_BATCH: 'batch/deleteBatch',
    UPDATE_BATCH: 'batch/updateBatch',
    CLEANING_NEW_BATCH: 'cleaningBatch/newBatch',
    CLEANING_FETCH_BATCH: 'cleaningBatch/list',
    CLEANING_DELETE_BATCH: 'cleaningBatch/deleteBatch',
    CLEANING_UPDATE_BATCH: 'cleaningBatch/updateBatch',
    CREATE_MATERIAL: 'readyMaterial/newReadyMaterial',
    FETCH_MATERIAL: 'readyMaterial/list',
    UPDATE_READY_MATERIAL: 'readyMaterial/updateReadyMaterial',
    DELETE_READY_MATERIAL: 'readyMaterial/deleteReadyMaterial',
    LOGIN: 'user/login',
    LIST_USER: 'user/list'
}
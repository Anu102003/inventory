import axios from 'axios';

const API_BASE_URL = 'http://192.168.0.68:8080/inventoryManagement/';

const baseApi = axios.create({
    baseURL: API_BASE_URL,
});

export const filterApi = (data) => {
    return baseApi.get(`/listOf${data}`)
        .then(response => {
            // console.log(response);
            return response.data.data;
        })
        .catch(error => {
            console.log('Failed to login ', error);
            throw error;
        });
};

export const listApi = () => {
    return baseApi.get(`/listOfInventory`)
        .then(response => {
            // console.log(response);
            return response.data.data;
        })
        .catch(error => {
            console.log('Failed to listOfInventory ', error);
            throw error;
        });
};

export const createInventoryApi = (data) => {
    return baseApi.post(`/createInventory`, data)
        .then(response => {
            // console.log(response);
            return response
        })
        .catch(error => {
            console.log('Failed to create Inventory ', error);
            throw error;
        });
};

export const particularInventoryApi = (data) => {
    return baseApi.get(`/particularInventory/${data}`)
        .then(response => {
            // console.log(response);
            return response.data.data
        })
        .catch(error => {
            console.log('Failed to create Inventory ', error);
            throw error;
        });
};

export const editInventoryApi = (id, data) => {
    return baseApi.put(`/editInventory/${id}`, data)
        .then(response => {
            // console.log(response);
            return response
        })
        .catch(error => {
            console.log('Failed to edit Inventory ', error);
            throw error;
        });
};

export const deleteInventoryApi = (id) => {
    return baseApi.delete(`/deleteInventory/${id}`)
        .then(response => {
            // console.log(response);
            return response
        })
        .catch(error => {
            console.log('Failed to delete Inventory ', error);
            throw error;
        });
};

export const searchInventoryApi = (id) => {
    return baseApi.get(`/searchByImei/${id}`)
        .then(response => {
            // console.log(response);
            return response.data.data
        })
        .catch(error => {
            console.log('Failed to search Inventory ', error);
            throw error;
        });
};

export const filterInventoryApi = async (device, model, sim) => {
    try {
        const response = await baseApi.get(`/filterByInventories`, {
            params: {
                model: model,
                device: device,
                sim: sim
            }
        });
        // console.log(response.data);
        return response?.data.data
    }
    catch (err) {
        console.log("Failed to filter Inventory " + err)
    }
};
// export const filterInventoryApi = (id) => {
//     return baseApi.get(`/filterByInventories/${id}`)
//         .then(response => {
//             console.log(response);
//             return response.data.data
//         })
//         .catch(error => {
//             console.log('Failed to filter Inventory ', error);
//             throw error; 
//         });
// };
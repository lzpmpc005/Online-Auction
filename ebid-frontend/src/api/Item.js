import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/';

const Item = {
    getAllItems: () => {
        return axios.get(`${BASE_URL}animals/`);
    },


    createItems: (newAnimalData) => {
        return axios.post(`${BASE_URL}animals/`, newAnimalData);
    },

    deleteItem: (animalId) => {
        return axios.delete(`${BASE_URL}animals/${animalId}/`);
    },

    updateItem: (animalId, updatedAnimalData) => {
        return axios.put(`${BASE_URL}animals/${animalId}/`, updatedAnimalData);
    }
};

export default Item;

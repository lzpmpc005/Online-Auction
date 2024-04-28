import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/items/';

const ItemList = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await axios.get(BASE_URL);
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    const deleteItem = async (itemId) => {
        try {
            await axios.delete(`${BASE_URL}${itemId}/`);
            // Remove the deleted item from the state
            setItems(items.filter(item => item.id !== itemId));
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    return (
        <div>
            <h1>Item List</h1>
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        {item.name} - <button onClick={() => deleteItem(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const AddItem = ({ onAdd }) => {
    const [itemName, setItemName] = useState('');

    const addItem = async () => {
        try {
            const response = await axios.post(BASE_URL, { name: itemName });
            onAdd(response.data);
            setItemName('');
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    return (
        <div>
            <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} />
            <button onClick={addItem}>Add Item</button>
        </div>
    );
};

const App = () => {
    return (
        <div>
            <ItemList />
            <AddItem />
        </div>
    );
};

export default App;



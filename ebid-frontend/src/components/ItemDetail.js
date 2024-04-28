import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemDetail = ({ match }) => {
    const [item, setItem] = useState({});
    const [bids, setBids] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/items/${match.params.id}/`)
            .then(response => {
                setItem(response.data);
            })
            .catch(error => console.error('Error fetching item:', error));

        // WebSocket connection
        const ws = new WebSocket(`ws://localhost:8000/ws/auction/${match.params.id}/`);
        ws.onmessage = event => {
            const bidData = JSON.parse(event.data);
            setBids(currentBids => [...currentBids, bidData]);
        };

        return () => {
            ws.close();
        };
    }, [match.params.id]);

    return (
        <div>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <h3>Current Bids</h3>
            {bids.map((bid, index) => (
                <p key={index}>${bid.amount} by {bid.user}</p>
            ))}
        </div>
    );
};

export default ItemDetail;

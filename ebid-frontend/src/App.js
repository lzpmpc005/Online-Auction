// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ItemList from './components/ItemList';
import ItemDetail from './components/ItemDetail';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/item" component={ItemList} />
                <Route path="/item/:id" component={ItemDetail} />
            </Routes>
        </Router>
    );
};

export default App;

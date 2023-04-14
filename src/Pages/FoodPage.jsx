import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Box, Button } from '@mui/material';

const FoodList = () => {
    const [foods, setFoods] = useState([]);
    const [filterFoodType, setFilterFoodType] = useState('');
    const [filterMaxDeliveryTime, setFilterMaxDeliveryTime] = useState('');

    useEffect(() => {
        const existingFoods = JSON.parse(localStorage.getItem('foods')) || [];
        setFoods(existingFoods);
    }, []);

    const handleFilterFoodTypeChange = (event) => {
        setFilterFoodType(event.target.value);
    };

    const handleFilterMaxDeliveryTimeChange = (event) => {
        setFilterMaxDeliveryTime(event.target.value);
    };

    const handleFilterSubmit = (event) => {
        event.preventDefault();
        const filteredFoods = foods.filter((food) => {
            if (filterFoodType !== '' && food.foodType !== filterFoodType) {
                return false;
            }
            if (filterMaxDeliveryTime !== '' && food.maxDeliveryTime > filterMaxDeliveryTime) {
                return false;
            }
            return true;
        });
        setFoods(filteredFoods);
    };

    const handleClearFilter = () => {
        const existingFoods = JSON.parse(localStorage.getItem('foods')) || [];
        setFoods(existingFoods);
        setFilterFoodType('');
        setFilterMaxDeliveryTime('');
    };

    return (
        <Box>
            <form onSubmit={handleFilterSubmit}>
                <TextField
                    id="filter-food-type"
                    select
                    label="Filter by Food Type"
                    variant="outlined"
                    value={filterFoodType}
                    onChange={handleFilterFoodTypeChange}
                    margin="normal"
                >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="Delicious Food">Delicious Food</MenuItem>
                    <MenuItem value="Nutritious Food">Nutritious Food</MenuItem>
                    <MenuItem value="Fast Food">Fast Food</MenuItem>
                    <MenuItem value="Beverages">Beverages</MenuItem>
                    <MenuItem value="Desserts">Desserts</MenuItem>
                </TextField>
                <TextField
                    id="filter-max-delivery-time"
                    label="Max Delivery Time (in minutes)"
                    type="number"
                    variant="outlined"
                    value={filterMaxDeliveryTime}
                    onChange={handleFilterMaxDeliveryTimeChange}
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary" margin="normal">
                    Filter
                </Button>
                <Button type="button" variant="contained" color="secondary" onClick={handleClearFilter} margin="normal">
                    Clear Filter
                </Button>
            </form>
            <ul>
                {foods.map((food, index) => (
                    <li key={index}>
                        <div>Food Name: {food.foodName}</div>
                        <div>Food Type: {food.foodType}</div>
                        <div>Max Delivery Time: {food.maxDeliveryTime} minutes</div>
                    </li>
                ))}
            </ul>
        </Box>
    );
};
export default FoodList;

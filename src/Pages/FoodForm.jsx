import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

const FoodForm = () => {
    const [foodName, setFoodName] = useState('');
    const [foodType, setFoodType] = useState('');
    const [maxDeliveryTime, setMaxDeliveryTime] = useState('');

    const handleFoodNameChange = (event) => {
        setFoodName(event.target.value);
    };

    const handleFoodTypeChange = (event) => {
        setFoodType(event.target.value);
    };

    const handleMaxDeliveryTimeChange = (event) => {
        setMaxDeliveryTime(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newFoodItem = {
            foodName: foodName,
            foodType: foodType,
            maxDeliveryTime: maxDeliveryTime
        };
        const existingFoods = JSON.parse(localStorage.getItem('foods')) || [];
        const updatedFoods = [...existingFoods, newFoodItem];
        localStorage.setItem('foods', JSON.stringify(updatedFoods));
        setFoodName('');
        setFoodType('');
        setMaxDeliveryTime('');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: 'lightblue',
            }}
        >
            <Box
                sx={{
                    width: '50%',
                    padding: '20px',
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                <form onSubmit={handleSubmit}>
                    <TextField
                        id="food-name"
                        label="Food Name"
                        variant="outlined"
                        value={foodName}
                        onChange={handleFoodNameChange}
                        margin="normal"
                        required
                        fullWidth
                    />
                    <TextField
                        id="food-type"
                        select
                        label="Food Type"
                        variant="outlined"
                        value={foodType}
                        onChange={handleFoodTypeChange}
                        margin="normal"
                        required
                        fullWidth
                    >
                        <MenuItem value="Delicious Food">Delicious Food</MenuItem>
                        <MenuItem value="Nutritious Food">Nutritious Food</MenuItem>
                        <MenuItem value="Fast Food">Fast Food</MenuItem>
                        <MenuItem value="Beverages">Beverages</MenuItem>
                        <MenuItem value="Desserts">Desserts</MenuItem>
                    </TextField>
                    <TextField
                        id="max-delivery-time"
                        label="Max Delivery Time (in minutes)"
                        type="number"
                        variant="outlined"
                        value={maxDeliveryTime}
                        onChange={handleMaxDeliveryTimeChange}
                        margin="normal"
                        required
                        fullWidth
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Submit
                    </Button>
                </form>
            </Box>
        </Box>

    );
};

export default FoodForm;

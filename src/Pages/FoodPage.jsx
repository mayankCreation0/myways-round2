import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Box, Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material';

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
        <Box sx={{ mt: '70px', height: '100vh' }}>
            <form onSubmit={handleFilterSubmit}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" justifyContent="space-between">
                    <TextField
                        id="filter-food-type"
                        select
                        label="Filter by Food Type"
                        variant="outlined"
                        value={filterFoodType}
                        onChange={handleFilterFoodTypeChange}
                        margin="normal"
                        fullWidth
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
                        fullWidth
                    />
                    <Button type="submit" variant="contained" color="primary" margin="normal">
                        Filter
                    </Button>
                    <Button type="button" variant="contained" color="secondary" onClick={handleClearFilter} margin="normal">
                        Clear Filter
                    </Button>
                </Stack>
            </form>
            <Typography variant="h5"  sx={{ bgcolor: 'lightblue' }}>
                Food List
            </Typography>
            <Grid container spacing={3} sx={{ bgcolor: 'lightblue', height: '80vh'}}>
                {foods.map((food, index) => (
                    <Grid item key={index} xs={12} mb={-29} sm={6} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {food.foodName}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    {food.foodType}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Max Delivery Time: {food.maxDeliveryTime} minutes
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
export default FoodList;

import React from 'react'
import { Routes, Route } from 'react-router-dom';
import FoodForm from '../Pages/FoodForm';
import ResponsiveAppBar from '../Components/Navbar';
import FoodList from '../Pages/FoodPage';

const Routing = () => {
    return (
        <div>
        <ResponsiveAppBar/>
            <Routes>
                <Route path='/' element={<FoodForm />} />
                <Route path='/page' element={<FoodList />} />
            </Routes>
        </div>
    )
}
export default Routing

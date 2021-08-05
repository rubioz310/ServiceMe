import React from 'react';
import { connect, useSelector } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { useDispatch } from 'react-redux';

//Material-ui imports
import { Grid } from '@material-ui/core';

function AddCar() {
    const dispatch = useDispatch();
    const newCar = useSelector(store => store.car.newCar)

    const handleAdd = () => {
        dispatch({
            type: 'ADD_CAR',
            payload: newCar
        })
    }
    const handleChange = (event) => {
        dispatch({
            type: 'SET_CAR',
            payload: {
                property: event.target.id,
                value: event.target.value
            }
        })
    }
    return(
        <Grid container spacing={2} justifyContent="center"> 
            <Grid item xs={12}><input type="text" placeholder=" url" onChange={handleChange} id="photo_url" value={newCar.photo_url}/></Grid>
            <Grid item xs={12}><input type="text" placeholder="VIN" onChange={handleChange} id="vin" value={newCar.vin}/></Grid>
            <Grid item xs={12}><input type="text" placeholder="Year" onChange={handleChange} id="year" value={newCar.year}/></Grid>
            <Grid item xs={12}><input type="text" placeholder="Make" onChange={handleChange} id="make" value={newCar.make}/></Grid>
            <Grid item xs={12}><input type="text" placeholder="Model" onChange={handleChange} id="model" value={newCar.model}/></Grid>
            <Grid item xs={12}><input type="text" placeholder="License Plate" onChange={handleChange} id="plates" value={newCar.plates}/></Grid>
            <Grid item xs={12}><input type="date" onChange={handleChange} id="last_service" value={newCar.last_service}/></Grid>
            <Grid item xs={12}><input type="text" placeholder="Mileage" onChange={handleChange} id="mileage" value={newCar.mileage}/></Grid>
            <Grid item xs={12}><button onClick={handleAdd}>Add car</button></Grid>
        </Grid>
    )
}

export default connect(mapStoreToProps)(AddCar);

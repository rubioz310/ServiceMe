import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import UploadImageToS3WithReactS3 from '../PhotoUpload/PhotoUpload';
import { useHistory, useParams } from 'react-router';
//Material-ui imports
import { Grid, TextField } from '@material-ui/core';

import { KeyboardDatePicker } from '@material-ui/pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DayjsUtils from '@date-io/dayjs';


function UpdateCar() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const newCar = useSelector(store => store.car.carDetails)

    const handleAdd = () => {
        dispatch({
            type: 'UPDATE_CAR',
            payload: {
                id: id,
                car: newCar
            }
        })
        history.push('/personal')
    }
    const handleChange = (event) => {
        dispatch({
            type: 'CHANGE_CAR_DETAILS',
            payload: {
                property: event.target.id,
                value: event.target.value
            }
        })
    }
    return(
        <Grid container spacing={2} justifyContent="center" alignContent="center" direction="column"> 
            <Grid item ><h1>Add new car</h1></Grid>
            <Grid item xs={12}><UploadImageToS3WithReactS3/></Grid>
            <Grid item xs={12}><TextField variant="filled" fullWidth="true" placeholder="URL" onChange={handleChange} id="photo_url" value={newCar.photo_url}/></Grid>
            <Grid item xs={12}><TextField variant="filled" fullWidth="true" placeholder="VIN" onChange={handleChange} id="vin" value={newCar.vin}/></Grid>
            <Grid item xs={12}><TextField variant="filled" fullWidth="true" placeholder="Year" onChange={handleChange} id="year" value={newCar.year}/></Grid>
            <Grid item xs={12}><TextField variant="filled" fullWidth="true" placeholder="Make" onChange={handleChange} id="make" value={newCar.make}/></Grid>
            <Grid item xs={12}><TextField variant="filled" fullWidth="true" placeholder="Model" onChange={handleChange} id="model" value={newCar.model}/></Grid>
            <Grid item xs={12}><TextField variant="filled" fullWidth="true" placeholder="License Plate" onChange={handleChange} id="plates" value={newCar.plates}/></Grid>
            <Grid item xs={12}><TextField variant="filled" fullWidth="true" placeholder="Mileage" onChange={handleChange} id="mileage" value={newCar.mileage}/></Grid>
            <Grid item xs={12}>
                <TextField type="date" onChange={handleChange} id="last_service" value={new Date(newCar.last_service)}/>
                </Grid>
            <Grid item xs={12}><button onClick={handleAdd}>Add car</button></Grid>
        </Grid>
        
    )
}

export default connect(mapStoreToProps)(UpdateCar);

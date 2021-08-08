import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import UploadImageToS3WithReactS3 from '../PhotoUpload/PhotoUpload';
import { useHistory, useParams } from 'react-router';
//Material-ui imports
import { Grid, TextField } from '@material-ui/core';

import { KeyboardDatePicker } from '@material-ui/pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DayjsUtils from '@date-io/dayjs';
import dayjs from 'dayjs';


function UpdateCar() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const newCar = useSelector(store => store.car.carDetails)
    const [selectedDate, setSelectedDate] = useState(dayjs(newCar.last_service));

    useEffect(()=> {
        dispatch({
            type: 'FETCH_CAR_DETAILS',
            payload: id
        })
      },[]);
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
        {!newCar ? <h1>No car to update</h1> : 
            <>
                <Grid item ><h1>Update car</h1></Grid>
                <Grid item xs={12}><UploadImageToS3WithReactS3 oldPhoto={newCar.photo_url}/></Grid>
                <Grid item xs={12}><TextField variant="filled" fullWidth="true" placeholder="URL" onChange={handleChange} id="photo_url" value={newCar.photo_url}/></Grid>
                <Grid item xs={12}><TextField variant="filled" fullWidth="true" placeholder="VIN" onChange={handleChange} id="vin" value={newCar.vin}/></Grid>
                <Grid item xs={12}><TextField variant="filled" fullWidth="true" placeholder="Year" onChange={handleChange} id="year" value={newCar.year}/></Grid>
                <Grid item xs={12}><TextField variant="filled" fullWidth="true" placeholder="Make" onChange={handleChange} id="make" value={newCar.make}/></Grid>
                <Grid item xs={12}><TextField variant="filled" fullWidth="true" placeholder="Model" onChange={handleChange} id="model" value={newCar.model}/></Grid>
                <Grid item xs={12}><TextField variant="filled" fullWidth="true" placeholder="License Plate" onChange={handleChange} id="plates" value={newCar.plates}/></Grid>
                <Grid item xs={12}><TextField variant="filled" fullWidth="true" placeholder="Mileage" onChange={handleChange} id="mileage" value={newCar.mileage}/></Grid>
                <Grid item xs={12}>
                    <MuiPickersUtilsProvider utils={DayjsUtils}>
                        <label>Last service <KeyboardDatePicker onChange={setSelectedDate} id="last_service" value={selectedDate}/></label>
                    </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12}><button onClick={handleAdd}>Add car</button></Grid>
            </>}
        </Grid>
        
    )
}

export default connect(mapStoreToProps)(UpdateCar);

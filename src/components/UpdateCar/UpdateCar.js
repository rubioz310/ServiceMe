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
    const selectedCar = useSelector(store => store.car.carDetails)
    const [selectedDate, setSelectedDate] = useState(dayjs(selectedCar.last_service));

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
                car: selectedCar
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
        {!selectedCar ? <h1>No car to update</h1> : 
            <>
                <Grid item xs={12} className="addCarForm"><h1>Update car</h1></Grid>
                <Grid item xs={12}><UploadImageToS3WithReactS3 oldPhoto={selectedCar.photo_url} type="upload"/></Grid>
                <Grid item xs={12}><TextField variant="filled" fullWidth="true" placeholder="URL" onChange={handleChange} id="photo_url" value={selectedCar.photo_url}/></Grid>
                <Grid item xs={12}><TextField variant="filled" fullWidth="true" placeholder="VIN" onChange={handleChange} id="vin" value={selectedCar.vin}/></Grid>
                <Grid item xs={12}><TextField variant="filled" fullWidth="true" placeholder="Year" onChange={handleChange} id="year" value={selectedCar.year}/></Grid>
                <Grid item xs={12}><TextField variant="filled" fullWidth="true" placeholder="Make" onChange={handleChange} id="make" value={selectedCar.make}/></Grid>
                <Grid item xs={12}><TextField variant="filled" fullWidth="true" placeholder="Model" onChange={handleChange} id="model" value={selectedCar.model}/></Grid>
                <Grid item xs={12}><TextField variant="filled" fullWidth="true" placeholder="License Plate" onChange={handleChange} id="plates" value={selectedCar.plates}/></Grid>
                <Grid item xs={12}><TextField variant="filled" fullWidth="true" placeholder="Mileage" onChange={handleChange} id="mileage" value={selectedCar.mileage}/></Grid>
                <Grid item xs={12}>
                    <MuiPickersUtilsProvider utils={DayjsUtils}>
                        <label>Last service <KeyboardDatePicker onChange={setSelectedDate} id="last_service" value={selectedDate}/></label>
                    </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12}  className="addCarForm"><button onClick={handleAdd}>Upload car</button></Grid>
            </>}
        </Grid>
        
    )
}

export default connect(mapStoreToProps)(UpdateCar);

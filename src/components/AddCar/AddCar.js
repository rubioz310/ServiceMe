import React, {useEffect, useState} from 'react';
import { connect, useSelector } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import UploadImageToS3WithReactS3 from '../PhotoUpload/PhotoUpload';
//Material-ui imports
import { Grid, TextField } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DayjsUtils from '@date-io/dayjs';
import dayjs from 'dayjs';


function AddCar() {
    useEffect(()=> {
        dispatch({
            type: 'CLEAR_CAR'
        })
      },[]);
    
    const dispatch = useDispatch();
    const history = useHistory();
    const newCar = useSelector(store => store.car.newCar)
    const [selectedDate, setSelectedDate] = useState(new Date());

    

    const handleAdd = () => {
        const car={...newCar, last_service: dayjs(selectedDate).format('MM/DD/YYYY')};
        console.log(car);
        dispatch({
            type: 'ADD_CAR',
            payload: car
        })
        history.push('/personal')
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
        <Grid container spacing={2} justifyContent="center" alignContent="center" direction="column"> 
            <Grid item className="addCarForm"><h1>Add new car</h1></Grid>
            <Grid item xs={12}><UploadImageToS3WithReactS3 type="add"/></Grid>
            <Grid item xs={12}><TextField variant="filled" fullWidth={true} label="URL" onChange={handleChange} id="photo_url" value={newCar.photo_url}/></Grid>
            <Grid item xs={12}><TextField variant="filled" fullWidth={true} label="VIN" onChange={handleChange} id="vin" value={newCar.vin}/></Grid>
            <Grid item xs={12}><TextField variant="filled" fullWidth={true} label="Year" onChange={handleChange} id="year" value={newCar.year}/></Grid>
            <Grid item xs={12}><TextField variant="filled" fullWidth={true} label="Make" onChange={handleChange} id="make" value={newCar.make}/></Grid>
            <Grid item xs={12}><TextField variant="filled" fullWidth={true} label="Model" onChange={handleChange} id="model" value={newCar.model}/></Grid>
            <Grid item xs={12}><TextField variant="filled" fullWidth={true} label="License Plate" onChange={handleChange} id="plates" value={newCar.plates}/></Grid>
            <Grid item xs={12}><TextField variant="filled" fullWidth={true} label="Mileage" onChange={handleChange} id="mileage" value={newCar.mileage}/></Grid>
            <Grid item xs={12}>
                <MuiPickersUtilsProvider utils={DayjsUtils}>
                    <KeyboardDatePicker onChange={setSelectedDate} id="last_service" value={selectedDate}/>
                </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12}><button onClick={handleAdd}>Add car</button></Grid>
        </Grid>
        
    )
}

export default connect(mapStoreToProps)(AddCar);

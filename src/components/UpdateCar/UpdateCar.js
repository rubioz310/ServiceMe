import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import UploadImageToS3WithReactS3 from '../PhotoUpload/PhotoUpload';
import { useHistory, useParams } from 'react-router';
//Material-ui imports
import { Button, Grid, makeStyles, Paper, TextField } from '@material-ui/core';

import { KeyboardDatePicker } from '@material-ui/pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DayjsUtils from '@date-io/dayjs';
import dayjs from 'dayjs';


const useStyles = makeStyles(theme => ({
    customPaper: {
        borderRadius: 16,
        marginRight: 16,
        marginLeft: 16,
        padding: 32,
        border: '2px solid #c62828'
    },
    customButton:{
        backgroundColor: '#c62828',
        color: '#ffffff',
        '&:hover': {
            backgroundColor: '#ad2121',
            borderColor: '#0062cc',
            boxShadow: 'none',
        }
    }
}))

function UpdateCar() {
    const classes = useStyles();
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
        <>
        {!selectedCar ? <center><h1>No car to update</h1></center> : <>
        <Grid container spacing={4} justifyContent="center" alignContent="center" direction="column"> 
            <Grid item container justifyContent="center" alignContent="center">
                <h1>Update car</h1>
            </Grid>
            <Grid item container xs={12} justifyContent="center" alignContent="center" >
                <Grid item xs={12} sm={10} md={8} lg={6}>
                    <Paper className={classes.customPaper}>
                        <Grid spacing={2} container justifyContent="center" alignContent="center" direction="column">
                            <UploadImageToS3WithReactS3 oldPhoto={selectedCar.photo_url} type="upload"/>
                            <Grid item container justifyContent="center" alignContent="center">
                                <TextField variant="filled" fullWidth="true" placeholder="URL" onChange={handleChange} id="photo_url" value={selectedCar.photo_url}/>
                            </Grid>
                            <Grid item container justifyContent="center" alignContent="center">
                                <TextField variant="filled" fullWidth={true} label="VIN" onChange={handleChange} id="vin" value={selectedCar.vin}/>
                            </Grid>
                            <Grid item container justifyContent="center" alignContent="center">
                                <TextField variant="filled" fullWidth={true} label="Year" onChange={handleChange} id="year" value={selectedCar.year}/>
                            </Grid>
                            <Grid item container justifyContent="center" alignContent="center">
                                <TextField variant="filled" fullWidth={true} label="Make" onChange={handleChange} id="make" value={selectedCar.make}/>
                            </Grid>
                            <Grid item container justifyContent="center" alignContent="center">
                                <TextField variant="filled" fullWidth={true} label="Model" onChange={handleChange} id="model" value={selectedCar.model}/>
                            </Grid>
                            <Grid item container justifyContent="center" alignContent="center">
                                <TextField variant="filled" fullWidth={true} label="License Plate" onChange={handleChange} id="plates" value={selectedCar.plates}/>
                            </Grid>
                            <Grid item container justifyContent="center" alignContent="center">
                                <TextField variant="filled" fullWidth={true} label="Mileage" onChange={handleChange} id="mileage" value={selectedCar.mileage}/>
                            </Grid>
                            <Grid item container justifyContent="center" alignContent="center" direction="column">
                                <Grid item container justifyContent="center" alignContent="center">
                                    <p>Last service</p>
                                </Grid>
                                <Grid item container justifyContent="center" alignContent="center">
                                    <MuiPickersUtilsProvider utils={DayjsUtils}>
                                        <KeyboardDatePicker onChange={setSelectedDate} id="last_service" value={selectedDate}/>
                                    </MuiPickersUtilsProvider>
                                </Grid>
                            </Grid>
                            <Grid item container justifyContent="center" alignContent="center">
                                <Button className={classes.customButton} variant="contained" onClick={handleAdd}>Upload car</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
        </>}
        </>
        
    )
}

export default connect(mapStoreToProps)(UpdateCar);

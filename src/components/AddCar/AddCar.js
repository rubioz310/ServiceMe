import React, {useEffect, useState} from 'react';
import { connect, useSelector } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import UploadImageToS3WithReactS3 from '../PhotoUpload/PhotoUpload';
import dayjs from 'dayjs';

//Material-ui imports
import { Grid, TextField } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DayjsUtils from '@date-io/dayjs';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { Button } from '@material-ui/core';

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

function AddCar() {
    const classes = useStyles();
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
        <Grid container spacing={4} justifyContent="center" alignContent="center" direction="column"> 
            <Grid item container justifyContent="center" alignContent="center">
                <h1>Add new car</h1>
            </Grid>
            <Grid item container xs={12} justifyContent="center" alignContent="center" >
                <Grid item xs={12} sm={10} md={8} lg={6}>
                    <Paper className={classes.customPaper}>
                        <Grid spacing={2} container justifyContent="center" alignContent="center" direction="column">
                            <UploadImageToS3WithReactS3 type="add"/>
                            <Grid item container justifyContent="center" alignContent="center">
                                <TextField variant="filled" fullWidth={true} label="URL" onChange={handleChange} id="photo_url" value={newCar.photo_url}/>
                            </Grid>
                            <Grid item container justifyContent="center" alignContent="center">
                                <TextField variant="filled" fullWidth={true} label="VIN" onChange={handleChange} id="vin" value={newCar.vin}/>
                            </Grid>
                            <Grid item container justifyContent="center" alignContent="center">
                                <TextField variant="filled" fullWidth={true} label="Year" onChange={handleChange} id="year" value={newCar.year}/>
                            </Grid>
                            <Grid item container justifyContent="center" alignContent="center">
                                <TextField variant="filled" fullWidth={true} label="Make" onChange={handleChange} id="make" value={newCar.make}/>
                            </Grid>
                            <Grid item container justifyContent="center" alignContent="center">
                                <TextField variant="filled" fullWidth={true} label="Model" onChange={handleChange} id="model" value={newCar.model}/>
                            </Grid>
                            <Grid item container justifyContent="center" alignContent="center">
                                <TextField variant="filled" fullWidth={true} label="License Plate" onChange={handleChange} id="plates" value={newCar.plates}/>
                            </Grid>
                            <Grid item container justifyContent="center" alignContent="center">
                                <TextField variant="filled" fullWidth={true} label="Mileage" onChange={handleChange} id="mileage" value={newCar.mileage}/>
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
                                <Button className={classes.customButton} variant="contained" onClick={handleAdd}>Add car</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            
        </Grid>
    )
}

export default connect(mapStoreToProps)(AddCar);

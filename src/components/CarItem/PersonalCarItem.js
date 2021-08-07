import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import mapStoreToProps from '../../redux/mapStoreToProps';

//Material-ui imports
import { Grid, Paper } from '@material-ui/core';

function prettyDate(unformattedDate) {
    const dateString = new Date(unformattedDate);

    const year = dateString.getFullYear();
    let month = (1 + dateString.getMonth()).toString() ;
    let day = dateString.getDate().toString();

    month = month.length === 1 ? '0' + month : month;
    day = day.length === 1 ? '0' + day : day;

    return month + '-' + day + '-' + year;
}

function PersonalCarItem ({ car }) {

    const history = useHistory();

    const handleClick = () => {
        console.log(car.car_id);
        history.push(`/personalCar/${car.car_id}`)
    }
    return(
        <Paper className="roundedCorner" onClick={handleClick}>
            <Grid container>
                <Grid item xs={12}>
                    <img src={car.photo_url} className="uploadPreview"/>
                </Grid>
                <Grid item xs={12}>
                    <p>Make: {car.make}</p>
                    <p>Model: {car.model}</p>
                    <p>Year: {car.year}</p>
                    <p>Last service: {prettyDate(car.last_service)}</p>
                </Grid>
            </Grid>
            
        </Paper>
    )
}

export default connect(mapStoreToProps)(PersonalCarItem);

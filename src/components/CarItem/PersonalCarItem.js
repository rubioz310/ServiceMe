import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import mapStoreToProps from '../../redux/mapStoreToProps';

//Material-ui imports
import { Grid, Paper } from '@material-ui/core';
import dayjs from 'dayjs';

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
                    <p>Last service: {dayjs(car.last_service).format('MM/DD/YYYY')}</p>
                    <p>Next service: {dayjs(car.last_service).add(6,'M').format('MM/DD/YYYY')}</p>
                </Grid>
            </Grid>
            
        </Paper>
    )
}

export default connect(mapStoreToProps)(PersonalCarItem);

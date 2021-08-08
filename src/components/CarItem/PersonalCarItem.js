import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import mapStoreToProps from '../../redux/mapStoreToProps';
import dayjs from 'dayjs';

//Material-ui imports
import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    customPaper : {
        borderRadius: 16,
        marginRight: 16,
        marginLeft: 16,
        padding: 16,
        border: '2px solid black'
    }
}))

function PersonalCarItem ({ car }) {
    const classes = useStyles();
    const history = useHistory();

    const handleClick = () => {
        console.log(car.car_id);
        history.push(`/personalCar/${car.car_id}`)
    }
    return(
        <Grid item xs={12} md={10} lg={5}  className="hover">
            <Paper elevation={6} className={classes.customPaper} onClick={handleClick}>
                <Grid item container justifyContent="center" alignItems="center">
                    <Grid item xs={12} sm={6} container justifyContent="center" alignItems="center">
                        <img src={car.photo_url} className="uploadPreview"/>
                    </Grid>
                    <Grid item xs={12} sm={6} container justifyContent="center" alignItems="center" direction="column">
                        <p>Make: {car.make}</p>
                        <p>Model: {car.model}</p>
                        <p>Year: {car.year}</p>
                        <p>Last service: {dayjs(car.last_service).format('MM/DD/YYYY')}</p>
                        <p>Next service: {dayjs(car.last_service).add(6,'M').format('MM/DD/YYYY')}</p>
                    </Grid>
                </Grid>
            </Paper> 
        </Grid>

    )
}

export default connect(mapStoreToProps)(PersonalCarItem);

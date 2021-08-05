import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import mapStoreToProps from '../../redux/mapStoreToProps';

//Material-ui imports
import { Paper } from '@material-ui/core';

function PersonalCarItem ({ car }) {

    const history = useHistory();

    const handleClick = () => {
        console.log(car.car_id);
        history.push(`/personalCar/${car.car_id}`)
    }
    return(
        <Paper onClick={handleClick}>
            <img src={car.photo_url}/>
            <p>{car.make}</p>
            <p>{car.model}</p>
            <p>{car.year}</p>
            <p>{car.last_service}</p>
        </Paper>
    )
}

export default connect(mapStoreToProps)(PersonalCarItem);

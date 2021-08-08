import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import mapStoreToProps from '../../redux/mapStoreToProps';
import PersonalCarItem from '../CarItem/PersonalCarItem';
import { Button, Paper } from '@material-ui/core';
import { Grid } from '@material-ui/core';

function PersonalView() {
    const history = useHistory();
    const dispatch = useDispatch();
    const cars = useSelector(store => store.car.cars);

    useEffect(()=> {
        dispatch({
            type: 'FETCH_CARS'
        })
      },[]);

    const handleAddCar = () => {
        history.push('/addCar')
    }

    return(
        <Grid container spacing={8} justifyContent="center" direction="column" alignItems="center">
            <Grid item>
                <Button color="primary" variant="contained" size="large" onClick={handleAddCar} className="ripple">Add Car</Button>
            </Grid>
            <Grid item>
                {!cars[0] && <Paper>No cars</Paper>}
                {cars.map(car => (
                    <PersonalCarItem car={car} key={car.user_car_id}/>
                ))}
            </Grid>
        </Grid>
        
    )
}

export default connect(mapStoreToProps)(PersonalView);

import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import mapStoreToProps from '../../redux/mapStoreToProps';
import PersonalCarItem from '../CarItem/PersonalCarItem';

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
        <div>
            <p onClick={handleAddCar}>Add Car</p>
            <p>Personal Cars</p>
            {cars.map(car => (
                <PersonalCarItem car={car} key={car.user_car_id}/>
            ))}
        </div>
        
    )
}

export default connect(mapStoreToProps)(PersonalView);

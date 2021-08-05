import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* addCar(action) {
  try {
    // passes the username and password from the payload to the server
    yield axios.post('/api/car', action.payload);
    yield put({type: 'CLEAR_CAR'});
    yield put({ type: 'FETCH_CARS'});

  } catch (error) {
    console.log('Error adding new car:', error);
    yield put({ type: 'ADD_CAR_FAILURE' });
  }
}
function* fetchCars(action) {
  try {
    // passes the username and password from the payload to the server
    const cars = yield axios.get('/api/car');
    yield put({type: 'SET_CARS', payload: cars.data})

  } catch (error) {
    console.log('Error getting cars:', error);
  }
}

function* carSaga() {
  yield takeLatest('ADD_CAR', addCar);
  yield takeLatest('FETCH_CARS', fetchCars);
}

export default carSaga;

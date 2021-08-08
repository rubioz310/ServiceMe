import { put, take, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Add new car for the current user
function* addCar(action) {
  try {
    yield axios.post('/api/car', action.payload); 
    yield put({type: 'CLEAR_CAR'}); //Clears reducer
    yield put({ type: 'FETCH_CARS'}); //Reloads list of cars to include the new one
  } catch (error) {
    console.log('Error adding new car:', error);
    yield put({ type: 'ADD_CAR_FAILURE' });
  }
}
//Get all the cars that belongs to the user
function* fetchCars() {
  try {
    const cars = yield axios.get('/api/car');
    yield put({type: 'SET_CARS', payload: cars.data}) //Loads user cars into a reducer
  } catch (error) {
    console.log('Error getting cars:', error);
  }
}
//Gets the details of a singular car
function* fetchCarDetails(action) {
  try {
    const carDetails = yield axios.get(`/api/car/details/${action.payload}`);
    yield put({type: 'SET_CAR_DETAILS', payload: carDetails.data}); //Set car details into reducer
  } catch (error) {
    console.log('Error getting car details:', error);
  }
}
function* updateCar(action) {
  try {
    yield axios.put(`/api/car/${action.payload.id}`, action.payload.car); 
    yield put({type: 'CLEAR_CAR_DETAILS'}); //Clears reducer
    yield put({ type: 'FETCH_CARS'}); //Reloads list of cars to include the new one
  } catch (error) {
    console.log('Error updating car:', error);
  }
}
function* deleteCar(action) {
  try {
    console.log(action);
    yield axios.delete(`/api/car/${action.payload}`);
    yield put({ type: 'FETCH_CARS'}); //Reloads list of cars to include the new one
  } catch (error) {
    console.log('Error deleting car:', error);
  }
}

function* carSaga() {
  yield takeLatest('ADD_CAR', addCar);
  yield takeLatest('FETCH_CARS', fetchCars);
  yield takeLatest('FETCH_CAR_DETAILS', fetchCarDetails);
  yield takeLatest('DELETE_CAR', deleteCar);
  yield takeLatest('UPDATE_CAR', updateCar)
}

export default carSaga;

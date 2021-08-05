import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* addCar(action) {
  try {
    // passes the username and password from the payload to the server
    yield axios.post('/api/car', action.payload);
    yield put({type: 'CLEAR_CAR'})

  } catch (error) {
    console.log('Error adding new car:', error);
    yield put({ type: 'ADD_CAR_FAILURE' });
  }
}

function* carSaga() {
  yield takeLatest('ADD_CAR', addCar);
}

export default carSaga;

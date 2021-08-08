import { combineReducers } from 'redux';

// for saving new car
const newCar = (state = {}, action) => {
  switch (action.type) {
    case 'CLEAR_CAR':
      return {};
    case 'SET_CAR':
        return {...state, [action.payload.property]: action.payload.value}
    default:
      return state;
  }
};
const carDetails = (state = {}, action) => {
  switch (action.type) {
    case 'CLEAR_CAR_DETAILS':
      return {};
    case 'SET_CAR_DETAILS':
      return action.payload;
    case 'CHANGE_CAR_DETAILS':
      return {...state, [action.payload.property]: action.payload.value}
    default:
      return state;
  }
};
const cars = (state = [], action) => {
  switch (action.type) {
    case 'SET_CARS':
        return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  newCar,
  carDetails,
  cars
});

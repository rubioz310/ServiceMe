import { combineReducers } from 'redux';

// for saving new car
const car = (state = {}, action) => {
  switch (action.type) {
    case 'CLEAR_CAR':
      return {};
    case 'SET_CAR':
        return {...state, [action.payload.property]: action.payload.value}
    case 'SET_CAR_DETAILS':
      return action.payload;
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
  car,
  cars
});

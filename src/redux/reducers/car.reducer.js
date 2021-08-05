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

export default combineReducers({
  newCar
});
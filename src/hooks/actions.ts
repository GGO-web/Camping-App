import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';

import {
  addLocation,
  setTripName,
  setTripPeriod,
  setTeammates,
  setLatestLocation,
  setLatestLocationsList,
  addBagItem,
} from '../redux/trip/tripSlice';

const actions = {
  addLocation,
  setTripName,
  setTripPeriod,
  setTeammates,
  setLatestLocation,
  setLatestLocationsList,
  addBagItem,
};

type ActionsType = typeof actions;

export const useActions = (): ActionsType => {
  const dispatch = useDispatch();

  return bindActionCreators(actions, dispatch);
};

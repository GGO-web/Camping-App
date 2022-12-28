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
  updateBagItemCount,
} from '../redux/trip/tripSlice';

import {
  addNewTripToCollection,
  setActivedTrip,
} from '../redux/tripsCollection/tripsCollection';

const actions = {
  addLocation,
  setTripName,
  setTripPeriod,
  setTeammates,
  setLatestLocation,
  setLatestLocationsList,
  addBagItem,
  updateBagItemCount,
  addNewTripToCollection,
  setActivedTrip,
};

type ActionsType = typeof actions;

export const useActions = (): ActionsType => {
  const dispatch = useDispatch();

  return bindActionCreators(actions, dispatch);
};

import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';

import { setProfileAvatar } from '../redux/userConfig/userSlice';

import {
  addLocation,
  setTripName,
  setTripPeriod,
  setTeammates,
  setLatestLocation,
  setLatestLocationsList,
  addBagItem,
  updateBagItemCount,
  toggleBagItemChecked,
  clearTripFormInfo,
  setActiveTrip,
} from '../redux/trip/tripSlice';

import {
  addNewTripToCollection,
  setActivedTrip,
  addActivity,
  removeActivity,
  setCompletedActivity,
  updateBackpackItemCount,
  setBackpackItemUri,
} from '../redux/tripsCollection/tripsCollection';

// import {
//   addActivity,
//   removeActivity,
//   setCompletedActivity,
// } from '../redux/activities/activitiesSlice';

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
  toggleBagItemChecked,
  clearTripFormInfo,
  setActiveTrip,
  addActivity,
  removeActivity,
  setCompletedActivity,
  updateBackpackItemCount,
  setBackpackItemUri,
  setProfileAvatar,
};

type ActionsType = typeof actions;

export const useActions = (): ActionsType => {
  const dispatch = useDispatch();

  return bindActionCreators(actions, dispatch);
};

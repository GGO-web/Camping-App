import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';

import { setProfileAvatar, setProfileInfo } from '../redux/userConfig/userSlice';

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
  addNewSnap,
  destroyTrip,
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
  setProfileInfo,
  addNewSnap,
  destroyTrip,
};

type ActionsType = typeof actions;

export const useActions = (): ActionsType => {
  const dispatch = useDispatch();

  return bindActionCreators(actions, dispatch);
};

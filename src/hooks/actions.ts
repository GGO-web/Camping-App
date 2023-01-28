import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';

import { setProfileAvatar, setProfileInfo } from '../redux/userConfig/userSlice';

import {
  addLocation,
  setTripName,
  setTripPeriod,
  setTeammates,
  setLatestLocation,
  addBagItem,
  updateBagItemCount,
  toggleBagItemChecked,
  clearTripFormInfo,
  setActiveTrip,
} from '../redux/trip/tripSlice';

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
  addBagItem,
  updateBagItemCount,
  toggleBagItemChecked,
  clearTripFormInfo,
  setActiveTrip,
  setProfileAvatar,
  setProfileInfo,
};

type ActionsType = typeof actions;

export const useActions = (): ActionsType => {
  const dispatch = useDispatch();

  return bindActionCreators(actions, dispatch);
};

import { Assets, ToastPresets } from 'react-native-ui-lib';

import { v4 } from 'uuid';

import { AssetsHomeActionsType } from './matherialUI';
import { IActionTab } from './models/ActionsTab.model';

export const authConfig = {
  clientId: process.env.REACT_APP_CLIENT_ID,
  scopes: ['profile', 'email'],
};

export const languagesList = [
  'English',
  'ودُراُ',
  'हिंदी',
  'Español',
  'Deutsche',
];

export const initialLanguage = { English: true };

export const CAMPING_LOCATIONS = '@camping-locations';

export const NEW_TRIP_TOAST_MESSAGES: { [key: string]: {
  preset: ToastPresets,
  message: string
} } = {
  tripNameEmpty: {
    preset: ToastPresets.FAILURE,
    message: 'Your trip name is empty, just write smth😉',
  },
  tripLocationsEmpty: {
    preset: ToastPresets.FAILURE,
    message: 'Locations couldn`t be empty🏕',
  },
  tripDatePeriodEmpty: {
    preset: ToastPresets.FAILURE,
    message: 'Please choose time period for camping⏳',
  },
  tripSuccess: {
    preset: ToastPresets.SUCCESS,
    message: 'Info was successfully defined, lets prepare your bag🎒',
  },
};

export const actionTabs: IActionTab[] = [
  {
    id: v4(),
    title: 'Activities',
    active: true,
    icon: (Assets.actions as AssetsHomeActionsType).activities,
    iconStyles: { width: 16, height: 20 },
  },
  {
    id: v4(),
    title: 'Fitness',
    active: false,
    icon: (Assets.actions as AssetsHomeActionsType).fitness,
    iconStyles: { width: 18, height: 15 },
  },
  {
    id: v4(),
    title: 'Backpack',
    active: false,
    icon: (Assets.actions as AssetsHomeActionsType).backpack,
    iconStyles: { width: 18, height: 16 },
  },
  {
    id: v4(),
    title: 'Teammates',
    active: false,
    icon: (Assets.actions as AssetsHomeActionsType).teammates,
    iconStyles: { width: 18, height: 16 },
  },
];

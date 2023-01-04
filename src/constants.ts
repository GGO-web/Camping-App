import { Assets, ToastPresets } from 'react-native-ui-lib';

// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 } from 'uuid';

import type { IRoute } from './App.models';
import type { AssetsHomeActionsType, AssetsIconsType, AssetsNavigationIconsType } from './matherialUI';
import type { IActionTab } from './models/ActionsTab.model';
import { EFitnessTrackerTypes, EFitnessUnits, IFitnessTracker } from './models/FitnessTracker.model';

export const authConfig = {
  clientId: process.env.REACT_APP_CLIENT_ID,
  scopes: ['profile', 'email'],
};

export const mainNavigationRoutes: IRoute[] = [
  {
    name: 'Home',
    path: 'Homepage',
    icon: Assets.icons.homeIcon,
  },
  {
    name: 'How to use',
    path: 'HowToUse',
    icon: Assets.icons.question,
  },
  {
    name: 'Language',
    path: 'Language',
    icon: Assets.icons.globe,
  },
  {
    name: 'Log-out',
    path: 'Logout',
    icon: Assets.icons.logout,
  },
];

export const expandedNavigationRoutes: IRoute[] = [
  {
    name: 'Home',
    path: 'Homepage',
    icon: Assets.icons.homeIcon,
  },
  {
    name: 'Tips & Tricks',
    path: 'TipsAndTricks',
    icon: (Assets.navigation as AssetsNavigationIconsType).bulb,
  },
  {
    name: 'Notifications',
    path: 'Notifications',
    icon: (Assets.navigation as AssetsNavigationIconsType).bell,
  },
  {
    name: 'Catch Snaps',
    path: 'Snaps',
    icon: (Assets.navigation as AssetsNavigationIconsType).camera,
  },
  {
    name: 'Settings',
    path: 'Settings',
    icon: (Assets.navigation as AssetsNavigationIconsType).settings,
  },
  {
    name: 'Feedback',
    path: 'Feedback',
    icon: (Assets.navigation as AssetsNavigationIconsType).message,
  },
  {
    name: 'How to use',
    path: 'HowToUse',
    icon: Assets.icons.question,
  },
  {
    name: 'Language',
    path: 'Language',
    icon: Assets.icons.globe,
  },
  {
    name: 'Exit trip',
    path: 'Logout',
    icon: (Assets.navigation as AssetsNavigationIconsType).exit,
  },
];

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

export const fitnessTrackers: Array<[EFitnessTrackerTypes, IFitnessTracker]> = [
  [EFitnessTrackerTypes.running, {
    id: v4(),
    unit: EFitnessUnits.steps,
    icon: (Assets.icons as AssetsIconsType).runningMan,
    title: 'Running',
    target: 3000,
    currentValue: 0,
  }],
  [EFitnessTrackerTypes.hiking, {
    id: v4(),
    unit: EFitnessUnits.miles,
    icon: (Assets.icons as AssetsIconsType).hikingMan,
    title: 'Hiking',
    target: 3,
    currentValue: 0,
  }],
];

export const MILES_IN_ONE_STEP = 0.0005;

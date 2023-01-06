import { Assets, ToastPresets } from 'react-native-ui-lib';

// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 } from 'uuid';

import type { IRoute } from './App.models';
import type {
  AssetsHomeActionsType, AssetsIconsType, AssetsNavigationIconsType, AssetsTipsAndTricksType,
} from './matherialUI';
import type { IActionTab } from './models/ActionsTab.model';
import { EFitnessTrackerTypes, EFitnessUnits, IFitnessTracker } from './models/FitnessTracker.model';
import { ITipAndTrick } from './models/TipsAndTricks.model';

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
    path: 'ExitTrip',
    icon: (Assets.navigation as AssetsNavigationIconsType).exit,
  },
  {
    name: 'Log-out',
    path: 'Logout',
    icon: Assets.icons.logout,
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

export const tipsAndTricks: ITipAndTrick[] = [
  {
    image: (Assets.tipsAndTricks as AssetsTipsAndTricksType).tip1,
    title: 'Use these camping tips, tricks and hacks to make you happy',
    text: 'Camping connects you with the quiet majesty of nature, allowing mountain peeks',
  },
  {
    image: (Assets.tipsAndTricks as AssetsTipsAndTricksType).tip2,
    title: 'These camping food hacks will definately make your c....',
    text: 'As everyone knows that making food is always hard when you do...',
  },
  {
    image: (Assets.tipsAndTricks as AssetsTipsAndTricksType).tip3,
    title: 'Top ten must carry equipments for your next c....',
    text: 'In this tip we have a list of compulsary taken equipments for...',
  },
  {
    image: (Assets.tipsAndTricks as AssetsTipsAndTricksType).tip4,
    title: 'Make a lantern out of a headlamp and a jug of wat...',
    text: 'All you need is your headlamp and a gallon jug of water or large wat....',
  },
  {
    image: (Assets.tipsAndTricks as AssetsTipsAndTricksType).tip5,
    title: 'Line your bag with a garbage bag to keep contents dry',
    text: 'Weather is everything when you’re camping, and a seasoned campe...',
  },
  {
    image: (Assets.tipsAndTricks as AssetsTipsAndTricksType).tip6,
    title: 'Make a Makeshift Grommet by Tying Line Around a Roc...',
    text: 'Tarp grommets wear out quickly and often when you need them....',
  },
  {
    image: (Assets.tipsAndTricks as AssetsTipsAndTricksType).tip7,
    title: 'Burn Sage in Your Campfire to Help Repel Mosquitoes',
    text: 'Mosquitoes can dampen an otherwise great camping experience. Knowing ',
  },
];

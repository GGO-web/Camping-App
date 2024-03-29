import { Assets, Colors, ThemeManager, Typography } from 'react-native-ui-lib';

export const colors = {
  primary: '#84CC16',
  primary50: '#F7FEE7',
  primary100: '#ECFCCB',
  primary200: '#D9F99D',
  primary500: '#84CC16',
  primary600: '#65A30D',
  primary700: '#4D7C0F',
  primary900: '#365314',
  red: '#EA1601',
  dark: '#3F3F46',
  gray: '#F4F4F5',
  gray50: 'FAFAFA',
  gray200: '#E4E4E7',
  gray300: '#A1A1AA',
  gray500: '#71717A',
  gray700: '#3F3F46',
  success: '#64BC26',
};

export const typographies = {
  heading2: {
    fontFamily: 'SFProSemibold',
    fontWeight: '600',
    fontSize: 32,
    color: '#000',
  },
  heading4: {
    fontFamily: 'SFProSemibold',
    fontWeight: '600',
    fontSize: 20,
  },
  heading3: {
    fontFamily: 'SFProSemibold',
    fontWeight: '600',
    fontSize: 24,
  },
  paragraph1: {
    fontFamily: 'SFProMedium',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 30,
  },
  paragraph2: {
    fontFamily: 'SFProRegular',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
  },
  paragraph3: {
    fontFamily: 'SFProMedium',
    fontWeight: '500',
    fontSize: 14,
  },
  paragraph4: {
    fontFamily: 'SFProRegular',
    fontWeight: '400',
    fontSize: 12,
  },
  underline: {
    textDecorationLine: 'underline',
    textDecorationColor: '#000',
    textDecorationStyle: 'solid',
  },
  textCenter: {
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  textMuted: {
    color: Colors.gray300,
  },
  mrAuto: {
    marginRight: 'auto',
  },
};

const iconsGroup = {
  chevron_left: require('../assets/chevron-left.png'),
  chevron_down: require('../assets/chevron-down.png'),
  checkmark: require('../assets/checkmark.png'),
  back: require('../assets/prev.png'),
  menu: require('../assets/menu.png'),
  copy: require('../assets/copy.png'),
  avatar: require('../assets/avatar.png'),
  pen: require('../assets/pen.png'),
  plus: require('../assets/plus.png'),
  minus: require('../assets/minus.png'),
  search: require('../assets/search.png'),
  enter: require('../assets/enter.png'),
  failure: require('../assets/failure.png'),
  info: require('../assets/info.png'),
  runningMan: require('../assets/running-man.png'),
  hikingMan: require('../assets/hiking-man.png'),
  reward: require('../assets/reward.png'),
  garbage: require('../assets/garbage.png'),
  bell: require('../assets/bell.png'),
};

export const navigationGroup = {
  home: require('../assets/navigation/home.png'),
  question: require('../assets/navigation/question.png'),
  globe: require('../assets/navigation/globe.png'),
  bell: require('../assets/navigation/bell.png'),
  bulb: require('../assets/navigation/bulb.png'),
  camera: require('../assets/navigation/camera.png'),
  exit: require('../assets/navigation/exit.png'),
  message: require('../assets/navigation/message.png'),
  settings: require('../assets/navigation/settings.png'),
};

const graphicGroup = {
  trips: require('../assets/trips.png'),
  activitiesTasks: require('../assets/activitiesTasks.png'),
  camp: require('../assets/onboarding/img-4.png'),
  onboarding1: require('../assets/onboarding/img-1.png'),
  onboarding2: require('../assets/onboarding/img-2.png'),
  onboarding3: require('../assets/onboarding/img-3.png'),
  onboarding4: require('../assets/onboarding/img-4.png'),
};

const tipsAndTricksGroup = {
  tip1: require('../assets/tipsAndTricks/tip-1.png'),
  tip2: require('../assets/tipsAndTricks/tip-2.png'),
  tip3: require('../assets/tipsAndTricks/tip-3.png'),
  tip4: require('../assets/tipsAndTricks/tip-4.png'),
  tip5: require('../assets/tipsAndTricks/tip-5.png'),
  tip6: require('../assets/tipsAndTricks/tip-6.png'),
  tip7: require('../assets/tipsAndTricks/tip-7.png'),
};

const homeActionsGroup = {
  activities: require('../assets/homeactions/activities.png'),
  fitness: require('../assets/homeactions/fitness.png'),
  backpack: require('../assets/homeactions/backpack.png'),
  teammates: require('../assets/homeactions/members.png'),
};

Colors.loadColors(colors);

Typography.loadTypographies(typographies);

Assets.loadAssetsGroup('icons', iconsGroup);
Assets.loadAssetsGroup('graphic', graphicGroup);
Assets.loadAssetsGroup('actions', homeActionsGroup);
Assets.loadAssetsGroup('navigation', navigationGroup);
Assets.loadAssetsGroup('tipsAndTricks', tipsAndTricksGroup);

export type AssetsIconsType = typeof Assets & typeof iconsGroup;
export type AssetsGraphicType = typeof Assets & typeof graphicGroup;
export type AssetsNavigationIconsType = typeof Assets & typeof navigationGroup;
export type AssetsTipsAndTricksType = typeof Assets & typeof tipsAndTricksGroup;
export type AssetsHomeActionsType = typeof Assets & typeof homeActionsGroup;

export type AssetsColorsType = typeof Colors & typeof colors;
export type AssetsTypographiesType = typeof Assets & typeof typographies;

// custom components styles
ThemeManager.setComponentTheme('Checkbox', () => ({
  color: Colors.primary,
  size: 20,
  borderRadius: 6,
}));

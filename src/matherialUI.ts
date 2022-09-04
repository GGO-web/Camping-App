import { Assets, Colors, Typography } from 'react-native-ui-lib';

Colors.loadColors({
   primary: '#84CC16',
   primary50: '#F7FEE7',
   primary100: '#ECFCCB',
   primary600: '#65A30D',
   primary700: '#4D7C0F',
   primary900: '#365314',
   red: '#EA1601',
   dark: '#3F3F46',
   gray: '#F4F4F5',
   gray300: '#A1A1AA',
   gray700: '#3F3F46',
});

Typography.loadTypographies({
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
});

Assets.loadAssetsGroup('icons', {
   chevron_left: require('../assets/chevron-left.png'),
   back: require('../assets/prev.png'),
   menu: require('../assets/menu.png'),
   copy: require('../assets/copy.png'),
   avatar: require('../assets/avatar.png'),
   pen: require('../assets/pen.png'),
   homeIcon: require('../assets/home.png'),
   question: require('../assets/question.png'),
   globe: require('../assets/globe.png'),
   logout: require('../assets/logout.png'),
});

Assets.loadAssetsGroup('graphic', {
   trips: require('../assets/trips.png'),
});

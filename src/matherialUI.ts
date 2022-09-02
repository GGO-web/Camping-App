import { Assets, Colors, Typography } from 'react-native-ui-lib';

Colors.loadColors({
   primary: '#84CC16',
   primary50: '#F7FEE7',
   primary100: '#ECFCCB',
   primary900: '#365314',
   red: '#EA1601',
   dark: '#3F3F46',
   gray: '#F4F4F5',
   gray300: '#A1A1AA',
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
   paragraph2: {
      fontFamily: 'SFProRegular',
      fontWeight: '400',
      fontSize: 16,
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
   menu: require('../assets/menu.png'),
   copy: require('../assets/copy.png'),
});

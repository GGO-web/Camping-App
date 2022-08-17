import { DefaultTheme } from 'react-native-paper';

import { Colors, Typography } from 'react-native-ui-lib';

Colors.loadColors({
   primary: '#84CC16',
   primary100: '#ECFCCB',
   primary900: '#365314',
   red: '#EA1601',
   dark: '#3F3F46',
   gray: '#F4F4F5',
});

Typography.loadTypographies({
   heading2: {
      fontFamily: 'SFProSemibold',
      fontWeight: '600',
      fontSize: 32,
      color: '#000',
   },
   paragraph2: {
      fontFamily: 'SFProRegular',
      fontWeight: '400',
      fontSize: 16,
      textAlign: 'center',
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
});

export const theme = {
   ...DefaultTheme,
   roundness: 12,
   version: 3,
   colors: {
      ...DefaultTheme.colors,
      ...Colors,
      text: '#000',
   },
};

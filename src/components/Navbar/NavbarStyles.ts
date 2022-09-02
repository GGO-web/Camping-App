import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-ui-lib';

export const navbarStyles = StyleSheet.create({
   container: {
      backgroundColor: Colors.primary600,
      color: Colors.white,
   },
   innerContainer: {
      maxWidth: 150,
   },
   profile: {
      flexDirection: 'row',
   },
   route: {
      borderRadius: 16,
   },
   activeRoute: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: Colors.white,
   },
});

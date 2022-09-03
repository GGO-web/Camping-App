import { StyleSheet } from 'react-native';

export const headerStyles = StyleSheet.create({
   header: {
      paddingTop: 24,
      paddingBottom: 28,
      position: 'relative',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   headerTitle: {
      position: 'absolute',
      zIndex: -1,
      left: 0,
      right: 0,
      textAlign: 'center',
   },
   headerButton: {
      width: 32,
      height: 32,
   },
});

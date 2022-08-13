import { StyleSheet } from 'react-native';

export const loginStyles = StyleSheet.create({
   logoWrapper: {
      flexDirection: 'row',
      justifyContent: 'center',
      resizeMode: 'center',
      height: 100,
   },
   wrapper: {
      flex: 1,
      paddingHorizontal: 15,
      justifyContent: 'center',
      paddingVertical: 50,
      backgroundColor: '#fff',
   },
   form: {
      flex: 1,
      justifyContent: 'center',
   },
   formGroup: {
      marginBottom: 20,
   },
});

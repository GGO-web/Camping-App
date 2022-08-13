import { StyleSheet } from 'react-native';

export const loginStyles = StyleSheet.create({
   logoWrapper: {
      textAlign: 'center',
      height: 100,
      marginBottom: 64,
   },
   logo: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
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
   formButton: {
      padding: 12,
      borderRadius: 12,
   },
   formButtonText: {
      color: '#fff',
      fontFamily: 'SFPro',
      fontWeight: '500',
   },
});

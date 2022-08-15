import { StyleProp, StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
   text: {
      fontSize: 14,
      fontFamily: 'SFProRegular',
   },
   container: {
      flex: 1,
      paddingHorizontal: 15,
      justifyContent: 'center',
      backgroundColor: '#fff',
   },
   input: {
      fontSize: 16,
      backgroundColor: '#fafafa',
      borderWidth: 1,
      borderRadius: 12,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderColor: '#3f3f46',
      caretColor: '#000',
   },
   isError: {
      borderColor: '#EA1601',
   },
   isValid: {
      borderColor: '#84CC16',
      color: '#84CC16',
   },
   label: {
      fontSize: 16,
      color: '#71717A',
      marginBottom: 8,
   },
   validationMessage: {
      marginLeft: 'auto',
      marginTop: 4,
   },
   button: {
      borderRadius: 12,
   },
   buttonText: {
      fontFamily: 'SFProMedium',
      fontWeight: '500',
      color: '#fff',
   },
   buttonOutlined: {
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#84CC16',
   },
   buttonTextOutlined: {
      fontFamily: 'SFProMedium',
      color: '#84CC16',
      fontWeight: '500',
   },
});

export const mergeStyles = <T>(...styles: [StyleProp<T>]) => {
   return StyleSheet.flatten([...styles]);
};

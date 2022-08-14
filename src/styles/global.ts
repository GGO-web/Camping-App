import { StyleProp, StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
   text: {
      fontSize: 14,
      fontFamily: 'SFPro',
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
      color: '#3F3F46',
   },
   button: {
      borderRadius: 12,
   },
   buttonText: {
      color: '#fff',
      fontWeight: '500',
   },
   buttonOutlined: {
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#84CC16',
   },
   buttonTextOutlined: {
      color: '#84CC16',
      fontWeight: '500',
   },
});

export const mergeStyles = <T>(...styles: [StyleProp<T>]) => {
   return StyleSheet.flatten([...styles]);
};

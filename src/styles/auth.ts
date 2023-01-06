import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-ui-lib';

export const authStyles = StyleSheet.create({
  logoWrapper: {
    flexDirection: 'row',
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: 32,
  },
  logo: {
    resizeMode: 'contain',
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
    marginBottom: 10,
  },
  feedback: {
    textAlign: 'center',
    padding: 10,
    backgroundColor: Colors.red,
    justifyContent: 'center',
    color: '#fff',
  },
});

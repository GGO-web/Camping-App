import { StyleProp, StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontFamily: 'SFProRegular',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
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
    borderColor: '#F4F4F5',
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
  formGroup: {
    marginBottom: 10,
  },
  button: {
    borderRadius: 12,
    elevation: 5,
  },
  buttonText: {
    fontFamily: 'SFProMedium',
    fontWeight: '500',
    color: '#fff',
    textTransform: 'capitalize',
  },
  buttonOutlined: {
    elevation: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#84CC16',
    backgroundColor: '#fff',
  },
  buttonTextOutlined: {
    fontFamily: 'SFProMedium',
    color: '#84CC16',
    fontWeight: '500',
  },
  visuallyHidden: {
    display: 'none',
    opacity: 0,
    backgroundColor: 'transparent',
    height: 0,
  },
  imageCenter: {
    resizeMode: 'cover',
    margin: 'auto',
    alignSelf: 'center',
  },
  navcontainer: {
    justifyContent: 'flex-start',
    paddingTop: 45,
    paddingBottom: 15,
  },
});

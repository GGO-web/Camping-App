import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-ui-lib';

export const loginProvidersStyles = StyleSheet.create({
  headline: {
    textAlign: 'center',
    paddingVertical: 20,
    borderBottomColor: Colors.gray,
    borderBottomWidth: 1,
  },
  icons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: -10,
  },
  icon: {
    padding: 10,
    borderColor: 'gray',
    margin: 10,
  },
});

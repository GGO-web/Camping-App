import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type StackNavigatorParamsList = {
  [key: string]: any
};

export type ScreenNavigationProp = NativeStackNavigationProp<StackNavigatorParamsList, string>;

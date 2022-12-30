import { ToastPresets } from 'react-native-ui-lib';

export interface IToast {
  visible: boolean;
  preset: ToastPresets;
  message: string;
}

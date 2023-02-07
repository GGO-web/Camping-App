import { createNavigationContainerRef } from '@react-navigation/native';

import { ScreenNavigationProp } from './types';

export const navigationRef = createNavigationContainerRef<ScreenNavigationProp>();

export function navigate(name: any, params: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

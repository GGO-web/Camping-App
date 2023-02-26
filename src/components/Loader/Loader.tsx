import React from 'react';

import { Colors, LoaderScreen } from 'react-native-ui-lib';

export function Loader({ message }: { message?: string }) {
  return (
    <LoaderScreen
      message={message || 'Sorry for the delay, service is starting up'}
      color={Colors.primary500}
      messageStyle={{ maxWidth: '90%', textAlign: 'center' }}
    />
  );
}

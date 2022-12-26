import React from 'react';

import { Button, Colors, Text } from 'react-native-ui-lib';

import { globalStyles } from '../../styles/global';

export function ButtonPrimary({
  buttonText,
  buttonCallback,
}: {
  buttonText: string,
  buttonCallback?: Function
}) {
  return (
    <Button
      style={globalStyles.button}
      backgroundColor={Colors.primary}
      mode="outlined"
      onPress={buttonCallback}
    >
      <Text
        style={{
          ...globalStyles.text,
          ...globalStyles.buttonText,
        }}
      >
        {buttonText}
      </Text>
    </Button>
  );
}

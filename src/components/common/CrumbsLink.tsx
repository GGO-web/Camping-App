import React from 'react';
import { Button, Icon, Text } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';

export function CrumbsLink({
  children,
  style,
  iconStyles,
}: {
  children: any,
  style?: any,
  iconStyles?: any
}) {
  const navigation = useNavigation();

  return (
    <Button
      left
      marginB-25
      onPress={() => navigation.goBack()}
      centerV
      style={style}
      backgroundColor="transparent"
    >
      <Icon
        style={{
          width: 14, height: 14, resizeMode: 'contain', ...iconStyles,
        }}
        marginR-8
        assetName="chevron_left"
      />

      <Text paragraph1 mrAuto>
        {children}
      </Text>
    </Button>
  );
}

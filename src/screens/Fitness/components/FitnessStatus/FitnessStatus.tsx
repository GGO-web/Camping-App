import React from 'react';
import {
  View, Text, Badge, Colors,
} from 'react-native-ui-lib';

export function FitnessStatus() {
  return (
    <View marginT-12 marginB-40>
      <View row centerV marginB-4>
        <Text heading3 marginR-16>Fitness Status</Text>
        <Badge label="" size={16} backgroundColor={Colors.primary} />
      </View>

      <Text paragraph3 gray700>You are very good in fitness!</Text>
    </View>
  );
}

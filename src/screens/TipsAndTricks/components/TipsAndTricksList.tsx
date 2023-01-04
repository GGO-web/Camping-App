import React from 'react';
import { ScrollView } from 'react-native';
import {
  View, Image, Text, Colors,
} from 'react-native-ui-lib';

// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 } from 'uuid';

import { tipsAndTricks } from '../../../constants';

export function TipsAndTricksList() {
  return (
    <ScrollView>
      {tipsAndTricks.map((tipAndTrick) => (
        <View key={v4()} row centerV marginB-24>
          <Image
            marginR-16
            source={tipAndTrick.image}
            style={{
              width: 120,
              height: 80,
              borderRadius: 16,
              backgroundColor: Colors.gray100,
            }}
          />

          <View flex>
            <Text marginB-4 numberOfLines={2} heading4>{tipAndTrick.title}</Text>
            <Text numberOfLines={2} paragraph3 gray700>{tipAndTrick.text}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

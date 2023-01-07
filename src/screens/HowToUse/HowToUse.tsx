import React from 'react';
import { ScrollView } from 'react-native';
import {
  Badge,
  Colors,
  ListItem,
  Text,
  Typography,
} from 'react-native-ui-lib';

import { MainWrapper } from '../../components/MainWrapper/MainWrapper';

import { howToUseRules } from '../../constants';

export function HowToUse() {
  const rules = howToUseRules;

  const renderItem = (
    item: { title: string; text: string },
    index: number,
  ) => (
    <ListItem
      key={index}
      activeOpacity={0.8}
      backgroundColor={Colors.primary50}
      style={{ borderRadius: 16 }}
      padding-16
      marginB-24
    >
      <ListItem.Part left marginR-16>
        <Badge
          backgroundColor={Colors.primary100}
          borderRadius={16}
          customElement={(
            <Text
              style={{
                ...Typography.heading3,
                ...{ color: Colors.primary900 },
              }}
            >
              {1 + index}
            </Text>
          )}
          size={48}
        />
      </ListItem.Part>

      <ListItem.Part flex column>
        <Text paragraph3 primary900>
          {item.title}
        </Text>

        <Text
          numberOfLines={3}
          style={{ maxWidth: 220 }}
          paragraph3
          primary700
        >
          {item.text}
        </Text>
      </ListItem.Part>
    </ListItem>
  );

  return (
    <MainWrapper headerTitle="How To Use">
      <ScrollView>
        {rules.map((item, index) => renderItem(item, index))}
      </ScrollView>
    </MainWrapper>
  );
}

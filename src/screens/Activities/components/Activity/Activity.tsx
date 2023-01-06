import React from 'react';

import { useRoute } from '@react-navigation/native';
import { View, Text, Colors } from 'react-native-ui-lib';

import { CrumbsLink } from '../../../../components/common/CrumbsLink';

import { IActivity } from '../../../../models/Activity.model';

import { globalStyles } from '../../../../styles/global';

export function Activity() {
  const { activity } = useRoute().params as { activity: IActivity };

  return (
    <View style={{ ...globalStyles.container, ...globalStyles.navcontainer }}>
      <CrumbsLink>
        <Text paragraph>Activity</Text>
      </CrumbsLink>

      <View style={{
        padding: 24,
        borderRadius: 20,
        backgroundColor: activity.completed ? Colors.primary : Colors.gray,
      }}
      >
        <View
          row
          spread
          centerV
          marginB-8
        >
          <Text
            heading3
            style={{
              maxWidth: 180,
              color: activity.completed ? Colors.white : Colors.dark,
            }}
          >
            {activity.heading}
          </Text>

          <Text
            paragraph3
            gray300
            style={{
              color: activity.completed ? Colors.white : Colors.gray300,
            }}
          >
            By you
          </Text>
        </View>

        <Text
          paragraph2
          gray700
          style={{
            color: activity.completed ? Colors.white : Colors.gray700,
          }}
        >
          {activity.description}
        </Text>
      </View>
    </View>
  );
}

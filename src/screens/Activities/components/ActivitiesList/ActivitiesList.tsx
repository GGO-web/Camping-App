import React from 'react';
import { ScrollView } from 'react-native';
import {
  Colors, Drawer, Text, View,
} from 'react-native-ui-lib';
import { useAppSelector } from '../../../../redux/hooks';

export function ActivitiesList() {
  const activities = useAppSelector((store) => store.activities.activities);

  return (
    <ScrollView>
      {activities.map((activity) => (
        <Drawer
          key={activity.id}
          style={{
            padding: 24,
            borderRadius: 20,
            marginBottom: 24,
            backgroundColor: Colors.gray,
          }}
        >
          <View row spread centerV marginB-8>
            <Text numberOfLines={1} heading4 style={{ maxWidth: 180 }}>{activity.heading}</Text>
            <Text paragraph3 gray300>By you</Text>
          </View>

          <Text numberOfLines={2} paragraph2 gray700>{activity.description}</Text>
        </Drawer>
      ))}
    </ScrollView>
  );
}

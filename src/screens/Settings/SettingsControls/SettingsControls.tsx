import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import {
  Colors, Switch, Text, TouchableOpacity, View,
} from 'react-native-ui-lib';

import { useDeleteTripMutation, useGetActivatedTripQuery } from '../../../redux/api/trip';

export function SettingsControls() {
  const [notifications, setNotifications] = useState(true);

  const { data: activatedTrip } = useGetActivatedTripQuery();
  const [destroyTrip] = useDeleteTripMutation();

  const navigation = useNavigation();

  const destroyTripCallback = () => {
    Alert.alert(
      'Are you sure?',
      'This action will permanently delete all.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            destroyTrip(activatedTrip?._id as string);

            navigation.navigate('Homepage' as never);
          },
        },
      ],
    );
  };

  return (
    <View>
      <TouchableOpacity marginB-20 row centerV spread>
        <Text paragraph2>
          Notifications
        </Text>

        <Switch
          value={notifications}
          offColor={Colors.gray300}
          onColor={Colors.primary500}
          onValueChange={() => setNotifications((notif) => !notif)}
        />
      </TouchableOpacity>

      <TouchableOpacity marginB-20 centerV spread onPress={destroyTripCallback}>
        <Text paragraph2 red>
          Destroy Trip
        </Text>

        <Text paragraph3 red style={{ opacity: 0.5 }}>
          It`ll delete your entire trip history and clear out data.
        </Text>
      </TouchableOpacity>
    </View>
  );
}
